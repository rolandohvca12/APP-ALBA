import { AutoCadRealtimeClient } from './AutoCadRealtimeClient.js';

/**
 * AutoCadDocumentClient
 * ---------------------
 * Única responsabilidad: gestión de documento (crear, abrir, guardar,
 * cerrar). No dibuja ni consulta geometría.
 */
export class AutoCadDocumentClient {
    constructor(private readonly transport: AutoCadRealtimeClient) { }

    private async run<T>(type: string, params: Record<string, unknown> = {}): Promise<T> {
        const response = (await this.transport.send({ kind: 'document', type, ...params })) as {
            ok: boolean;
            data?: T;
            error?: string;
        };
        if (!response.ok) throw new Error(response.error ?? 'Comando de documento falló');
        return response.data as T;
    }

    newDrawing(templatePath?: string): Promise<{ fileName: string }> {
        return this.run('newDrawing', { templatePath });
    }

    openDrawing(path: string): Promise<{ fileName: string }> {
        return this.run('openDrawing', { path });
    }

    saveDrawing(savePath?: string): Promise<{ savedTo: string }> {
        return this.run('saveDrawing', { savePath });
    }

    closeDrawing(saveChanges = false): Promise<{ closed: string }> {
        return this.run('closeDrawing', { saveChanges });
    }
}