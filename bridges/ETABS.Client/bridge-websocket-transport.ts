import type { EtabsRpcMessage, EtabsTransport } from "./etabs-client.js";

export const ETABS_BRIDGE_PROTOCOL_VERSION = 1 as const;
export const ETABS_BRIDGE_WEBSOCKET_PROTOCOL = "etabs-bridge-v1";

export interface BridgeErrorDetail {
  type?: string;
  message?: string;
  api?: string;
  method?: string;
  code?: number;
}

interface BridgeEnvelope<T> {
  id?: string;
  ok: boolean;
  data?: T;
  error?: BridgeErrorDetail;
}

interface PendingRequest {
  resolve: (value: unknown) => void;
  reject: (reason: unknown) => void;
  timeout: ReturnType<typeof setTimeout>;
}

export class BridgeError extends Error {
  readonly name = "BridgeError";

  constructor(public readonly detail: BridgeErrorDetail = {}) {
    super(detail.message ?? "Bridge request failed.");
  }
}

export class BridgeWebSocketTransport implements EtabsTransport {
  private socket: WebSocket | undefined;
  private connectPromise: Promise<WebSocket> | undefined;
  private nextId = 1;
  private readonly pending = new Map<string, PendingRequest>();

  constructor(
    private readonly url = "ws://localhost:5006",
    private readonly requestTimeoutMs = 30_000,
    private readonly authToken?: string,
    private readonly maxResponseBytes = 64 * 1024 * 1024,
  ) {}

  async request<T>(message: EtabsRpcMessage): Promise<T> {
    const socket = await this.connect();
    const id = message.id ?? String(this.nextId++);
    if (this.pending.has(id)) {
      throw new Error(`A bridge request with id ${id} is already pending.`);
    }

    const promise = new Promise<T>((resolve, reject) => {
      const timeout = setTimeout(() => {
        this.pending.delete(id);
        reject(new Error(`Bridge request ${id} timed out after ${this.requestTimeoutMs} ms.`));
      }, this.requestTimeoutMs);

      this.pending.set(id, {
        resolve: value => resolve(value as T),
        reject,
        timeout,
      });
    });

    try {
      socket.send(JSON.stringify({
        ...message,
        id,
        protocolVersion: ETABS_BRIDGE_PROTOCOL_VERSION,
      }));
    } catch (error) {
      this.rejectPending(id, error);
    }

    return promise;
  }

  close(): void {
    const socket = this.socket;
    this.socket = undefined;
    this.connectPromise = undefined;
    this.rejectAll(new Error("Bridge WebSocket closed by the client."));
    socket?.close();
  }

  private connect(): Promise<WebSocket> {
    if (this.socket?.readyState === WebSocket.OPEN) {
      return Promise.resolve(this.socket);
    }
    if (this.connectPromise) return this.connectPromise;

    const connection = new Promise<WebSocket>((resolve, reject) => {
      const protocols = [ETABS_BRIDGE_WEBSOCKET_PROTOCOL];
      if (this.authToken) protocols.push(`auth.${this.authToken}`);

      const socket = new WebSocket(this.url, protocols);
      let settled = false;

      socket.onopen = () => {
        if (socket.protocol !== ETABS_BRIDGE_WEBSOCKET_PROTOCOL) {
          settled = true;
          socket.close(1002, "Unexpected bridge protocol");
          reject(new Error("ETABS bridge negotiated an unexpected WebSocket protocol."));
          return;
        }

        settled = true;
        this.socket = socket;
        resolve(socket);
      };

      socket.onerror = () => {
        if (!settled) reject(new Error(`Unable to connect to ${this.url}.`));
      };

      socket.onclose = () => {
        if (this.socket === socket) this.socket = undefined;
        this.connectPromise = undefined;
        if (!settled) reject(new Error(`Unable to connect to ${this.url}.`));
        this.rejectAll(new Error("Bridge WebSocket closed."));
      };

      socket.onmessage = event => {
        void this.handleMessage(event.data).catch(error => {
          this.rejectAll(error);
          socket.close(1002, "Invalid bridge response");
        });
      };
    }).finally(() => {
      this.connectPromise = undefined;
    });

    this.connectPromise = connection;
    return connection;
  }

  private async handleMessage(data: unknown): Promise<void> {
    const text = await messageText(data);
    if (new TextEncoder().encode(text).byteLength > this.maxResponseBytes) {
      throw new Error("ETABS bridge response exceeds the configured size limit.");
    }

    const envelope = JSON.parse(text) as BridgeEnvelope<unknown>;
    if (typeof envelope.ok !== "boolean") {
      throw new Error("ETABS bridge returned an invalid response envelope.");
    }

    const id = envelope.id ?? "";
    const pending = this.pending.get(id);
    if (!pending) return;

    this.pending.delete(id);
    clearTimeout(pending.timeout);
    if (envelope.ok) pending.resolve(envelope.data);
    else pending.reject(new BridgeError(envelope.error));
  }

  private rejectPending(id: string, reason: unknown): void {
    const pending = this.pending.get(id);
    if (!pending) return;
    this.pending.delete(id);
    clearTimeout(pending.timeout);
    pending.reject(reason);
  }

  private rejectAll(reason: unknown): void {
    for (const id of [...this.pending.keys()]) this.rejectPending(id, reason);
  }
}

async function messageText(data: unknown): Promise<string> {
  if (typeof data === "string") return data;
  if (data instanceof ArrayBuffer) return new TextDecoder().decode(data);
  if (ArrayBuffer.isView(data)) {
    return new TextDecoder().decode(new Uint8Array(data.buffer, data.byteOffset, data.byteLength));
  }
  if (typeof Blob !== "undefined" && data instanceof Blob) return data.text();
  throw new Error("ETABS bridge returned an unsupported WebSocket payload.");
}
