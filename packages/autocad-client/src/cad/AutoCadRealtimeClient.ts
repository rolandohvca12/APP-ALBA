import WebSocket from 'ws';

/**
 * AutoCadRealtimeClient
 * ---------------------
 * Única responsabilidad: mantener la conexión WebSocket con el plugin de
 * AutoCAD y enviar/recibir mensajes JSON crudos. No sabe qué es una
 * "línea" o una "columna" — eso vive en AutoCadDrawingClient.
 */
export class AutoCadRealtimeClient {
    private ws: WebSocket | undefined;
    private readonly pending = new Map<
        string,
        {
            resolve: (value: unknown) => void;
            reject: (reason?: unknown) => void;
        }
    >();
    constructor(private readonly url = 'ws://localhost:5005') { }

    connect(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.ws = new WebSocket(this.url);

            this.ws.once('open', () => {
                this.ws!.on('message', (data) => {
                    this.handleMessage(data);
                });

                this.ws!.on('error', (error) => {
                    this.rejectPending(error);
                });

                this.ws!.on('close', () => {
                    this.rejectPending(new Error('Conexión WebSocket cerrada.'));
                    this.ws = undefined;
                });

                resolve();
            });

            this.ws.once('error', reject);
        });
    }

    send(command: Record<string, unknown>): Promise<unknown> {
        if (!this.ws) {
            throw new Error('No conectado. Llama connect() primero.');
        }

        const id = crypto.randomUUID();

        const message = {
            ...command,
            id
        };

        return new Promise((resolve, reject) => {
            this.pending.set(id, { resolve, reject });

            this.ws!.send(JSON.stringify(message), (error) => {
                if (error) {
                    this.pending.delete(id);
                    reject(error);
                }
            });
        });
    }
    private rejectPending(error: unknown): void {
        for (const { reject } of this.pending.values()) {
            reject(error);
        }

        this.pending.clear();
    }
    private handleMessage(data: WebSocket.RawData): void {
        let response: unknown;

        try {
            response = JSON.parse(data.toString());
        } catch (error) {
            return;
        }

        if (
            typeof response !== 'object' ||
            response === null ||
            !('id' in response) ||
            typeof response.id !== 'string'
        ) {
            return;
        }

        const pending = this.pending.get(response.id);

        if (!pending) {
            return;
        }

        this.pending.delete(response.id);

        pending.resolve(response);
    }
    close(): void {
        this.rejectPending(new Error('Conexión WebSocket cerrada.'));
        const socket = this.ws;
        this.ws = undefined;
        if (!socket) return;
        socket.close();
        socket.terminate();
    }
}
