import { spawn, type ChildProcess } from "node:child_process";
import { randomBytes } from "node:crypto";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { BridgeWebSocketTransport } from "./bridge-websocket-transport.js";
import { EtabsClient } from "./etabs-client.js";

export interface ConnectToEtabsOptions {
  url?: string;
  hostExecutablePath?: string;
  startupTimeoutMs?: number;
  requestTimeoutMs?: number;
  attachOnly?: boolean;
  authToken?: string;
  etabsApiDllPath?: string;
  expectedMajorVersion?: number;
  allowUnsupportedVersion?: boolean;
}

export class UnsupportedEtabsVersionError extends Error {
  readonly name = "UnsupportedEtabsVersionError";
}

export class ConnectedEtabsClient extends EtabsClient {
  private readonly stopHostOnExit: (() => void) | undefined;

  constructor(
    private readonly managedTransport: BridgeWebSocketTransport,
    private readonly hostProcess: ChildProcess | undefined,
  ) {
    super(managedTransport);
    this.stopHostOnExit = hostProcess
      ? () => hostProcess.kill()
      : undefined;

    if (this.stopHostOnExit) {
      process.once("exit", this.stopHostOnExit);
    }
  }

  close(): void {
    this.managedTransport.close();

    if (this.stopHostOnExit) {
      process.removeListener("exit", this.stopHostOnExit);
    }

    if (this.hostProcess && !this.hostProcess.killed) {
      this.hostProcess.kill();
    }
  }

  async withSuspendedUpdates<T>(
    operation: (etabs: this) => Promise<T>,
  ): Promise<T> {
    await this.sapModel.treeSuspendUpdateData(true);

    try {
      return await operation(this);
    } finally {
      await this.sapModel.treeResumeUpdateData();
    }
  }
}

export async function connectToEtabs(
  options: ConnectToEtabsOptions = {},
): Promise<ConnectedEtabsClient> {
  const url = options.url ?? "ws://localhost:5006";
  const requestTimeoutMs = options.requestTimeoutMs ?? 30_000;
  const expectedMajorVersion = options.expectedMajorVersion ?? 22;
  if (options.authToken) {
    const existing = await tryExistingBridge(
      url,
      requestTimeoutMs,
      options.authToken,
      expectedMajorVersion,
      options.allowUnsupportedVersion ?? false,
    );
    if (existing) return existing;
  }

  const executablePath = options.hostExecutablePath ?? defaultHostPath();
  const authToken = options.authToken ?? randomBytes(32).toString("hex");
  const args = [
    bridgeHttpPrefix(url),
    `--token=${authToken}`,
    ...(options.attachOnly ? ["--attach-only"] : []),
    ...(options.etabsApiDllPath ? [`--etabs-api-dll=${options.etabsApiDllPath}`] : []),
  ];
  const hostProcess = await startHost(
    executablePath,
    args,
    options.startupTimeoutMs ?? 60_000,
  );

  const transport = new BridgeWebSocketTransport(url, requestTimeoutMs, authToken);
  const client = new ConnectedEtabsClient(transport, hostProcess);

  try {
    await assertSupportedVersion(client, expectedMajorVersion, options.allowUnsupportedVersion ?? false);
    return client;
  } catch (error) {
    client.close();
    throw error;
  }
}

async function tryExistingBridge(
  url: string,
  requestTimeoutMs: number,
  authToken: string,
  expectedMajorVersion: number,
  allowUnsupportedVersion: boolean,
): Promise<ConnectedEtabsClient | undefined> {
  const transport = new BridgeWebSocketTransport(url, requestTimeoutMs, authToken);
  const client = new ConnectedEtabsClient(transport, undefined);

  try {
    await assertSupportedVersion(client, expectedMajorVersion, allowUnsupportedVersion);
    return client;
  } catch (error) {
    client.close();
    if (error instanceof UnsupportedEtabsVersionError) throw error;
    return undefined;
  }
}

async function assertSupportedVersion(
  client: EtabsClient,
  expectedMajorVersion: number,
  allowUnsupportedVersion: boolean,
): Promise<void> {
  const version = await client.sapModel.getVersion();
  const match = /\d+/.exec(version.version);
  const major = match ? Number(match[0]) : Number.NaN;

  if (!allowUnsupportedVersion && major !== expectedMajorVersion) {
    throw new UnsupportedEtabsVersionError(
      `Unsupported ETABS version "${version.version}". This client targets ETABS ${expectedMajorVersion}; ` +
      "set allowUnsupportedVersion only after validating compatibility.",
    );
  }
}

function bridgeHttpPrefix(webSocketUrl: string): string {
  const prefix = new URL(webSocketUrl);
  if (prefix.protocol !== "ws:" && prefix.protocol !== "wss:") {
    throw new Error(`ETABS bridge URL must use ws: or wss:, received ${prefix.protocol}`);
  }

  prefix.protocol = prefix.protocol === "wss:" ? "https:" : "http:";
  if (!prefix.pathname.endsWith("/")) prefix.pathname += "/";
  return prefix.toString();
}

function defaultHostPath(): string {
  const moduleDirectory = dirname(fileURLToPath(import.meta.url));
  return resolve(
    moduleDirectory,
    "..",
    "host",
    "win-x64",
    "EtabsRealtimeBridge.Host.exe",
  );
}

function startHost(
  executablePath: string,
  args: string[],
  timeoutMs: number,
): Promise<ChildProcess> {
  return new Promise((resolvePromise, rejectPromise) => {
    const child = spawn(executablePath, args, {
      stdio: ["ignore", "pipe", "pipe"],
      windowsHide: true,
    });
    let output = "";
    let errors = "";
    let settled = false;

    const timeout = setTimeout(() => {
      if (settled) return;
      settled = true;
      child.kill();
      rejectPromise(new Error(`ETABS bridge did not start within ${timeoutMs} ms.`));
    }, timeoutMs);

    child.stdout?.on("data", chunk => {
      output += String(chunk);
      if (!settled && output.includes("bridge connected.")) {
        settled = true;
        clearTimeout(timeout);
        resolvePromise(child);
      }
    });

    child.stderr?.on("data", chunk => {
      errors += String(chunk);
    });

    child.once("error", error => {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      rejectPromise(error);
    });

    child.once("exit", code => {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      const detail = errors.trim() || output.trim() || `exit code ${code}`;
      rejectPromise(new Error(`Unable to start the ETABS bridge: ${detail}`));
    });
  });
}
