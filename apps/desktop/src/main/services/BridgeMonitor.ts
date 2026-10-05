import { createConnection } from 'node:net';
import type { BridgeId, BridgeStatus } from '../../shared/contracts';

interface BridgeEndpoint {
  id: BridgeId;
  name: string;
  port: number;
}

const endpoints: readonly BridgeEndpoint[] = [
  { id: 'autocad', name: 'AutoCAD', port: 5005 },
  { id: 'etabs', name: 'ETABS', port: 5006 },
];

export class BridgeMonitor {
  public async getStatuses(): Promise<BridgeStatus[]> {
    return Promise.all(endpoints.map((endpoint) => this.check(endpoint)));
  }

  public isListening(port: number): Promise<boolean> {
    return Promise.all([
      this.probe('localhost', port),
      this.probe('127.0.0.1', port),
      this.probe('::1', port),
    ]).then((results) => results.some(Boolean));
  }

  private probe(host: string, port: number): Promise<boolean> {
    return new Promise((resolve) => {
      const socket = createConnection({ host, port });
      let settled = false;

      const finish = (connected: boolean): void => {
        if (settled) return;
        settled = true;
        socket.destroy();
        resolve(connected);
      };

      socket.setTimeout(500);
      socket.once('connect', () => finish(true));
      socket.once('timeout', () => finish(false));
      socket.once('error', () => finish(false));
    });
  }

  private async check(endpoint: BridgeEndpoint): Promise<BridgeStatus> {
    const connected = await this.isListening(endpoint.port);
    return {
      ...endpoint,
      state: connected ? 'connected' : 'disconnected',
      checkedAt: new Date().toISOString(),
    };
  }
}
