import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { randomBytes } from 'node:crypto';
import { resolve } from 'node:path';
import { app } from 'electron';
import {
  connectToEtabs,
  type ConnectedEtabsClient,
} from '@app-alba/etabs-bridge-client';
import type { DesktopActionResult } from '../../shared/contracts';

export class EtabsHostService {
  private client: ConnectedEtabsClient | undefined;
  private pendingConnection: Promise<ConnectedEtabsClient> | undefined;

  public async connect(): Promise<ConnectedEtabsClient> {
    if (this.client) return this.client;
    if (this.pendingConnection) return this.pendingConnection;

    const executable = this.findExecutable();
    if (!executable) {
      throw new Error('No se encontró EtabsRealtimeBridge.Host.exe. Compila ETABS.Host en x64 Release.');
    }

    this.pendingConnection = connectToEtabs({
      hostExecutablePath: executable,
      authToken: this.getPersistentAuthToken(),
      startupTimeoutMs: 60_000,
      requestTimeoutMs: 120_000,
    });
    try {
      this.client = await this.pendingConnection;
      return this.client;
    } finally {
      this.pendingConnection = undefined;
    }
  }

  public async launch(): Promise<DesktopActionResult> {
    try {
      const alreadyConnected = this.client !== undefined;
      await this.connect();
      return {
        ok: true,
        message: alreadyConnected ? 'El bridge de ETABS ya está activo.' : 'Bridge de ETABS iniciado.',
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return { ok: false, message: `No se pudo iniciar ETABS Host: ${message}` };
    }
  }

  public close(): void {
    this.client?.close();
    this.client = undefined;
  }

  private findExecutable(): string | undefined {
    const candidates = app.isPackaged
      ? [resolve(process.resourcesPath, 'backends', 'etabs', 'EtabsRealtimeBridge.Host.exe')]
      : [
          resolve(app.getAppPath(), '..', '..', 'bridges', 'ETABS.Host', 'bin', 'x64', 'Release', 'EtabsRealtimeBridge.Host.exe'),
          resolve(app.getAppPath(), '..', '..', 'bridges', 'ETABS.Host', 'bin', 'x64', 'Debug', 'EtabsRealtimeBridge.Host.exe'),
        ];

    return candidates.find((candidate) => existsSync(candidate));
  }

  private getPersistentAuthToken(): string {
    const directory = app.getPath('userData');
    const path = resolve(directory, 'etabs-bridge.token');
    if (existsSync(path)) {
      const token = readFileSync(path, 'utf8').trim();
      if (token) return token;
    }
    mkdirSync(directory, { recursive: true });
    const token = randomBytes(32).toString('hex');
    writeFileSync(path, token, { encoding: 'utf8', mode: 0o600 });
    return token;
  }
}
