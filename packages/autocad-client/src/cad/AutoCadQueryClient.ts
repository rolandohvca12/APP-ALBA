import { AutoCadRealtimeClient } from './AutoCadRealtimeClient.js';

export interface LayerInfo {
    name: string;
    colorIndex: number;
    isOff: boolean;
    isFrozen: boolean;
}

export interface EntityInfo {
    handle: string;
    type: string;
    layer: string;
}

export interface RawGeometry {
    handle: string;
    type: 'Line' | 'Polyline';
    points: { x: number; y: number; z: number }[];
    length: number;
    closed: boolean;
    area: number;
}

export class AutoCadQueryClient {
    constructor(private readonly transport: AutoCadRealtimeClient) { }

    private async query<T>(type: string, params: Record<string, unknown> = {}): Promise<T> {
        const response = (await this.transport.send({ kind: 'query', type, ...params })) as {
            ok: boolean;
            data?: T;
            error?: string;
        };
        if (!response.ok) throw new Error(response.error ?? 'Query falló');
        return response.data as T;
    }

    getLayers(): Promise<LayerInfo[]> {
        return this.query('getLayers');
    }

    getBlocks(): Promise<string[]> {
        return this.query('getBlocks');
    }

    getEntitiesByLayer(layer: string): Promise<EntityInfo[]> {
        return this.query('getEntitiesByLayer', { layer });
    }
    getGeometryByLayer(layer: string): Promise<RawGeometry[]> {
        return this.query('getGeometryByLayer', { layer });
    }
    getGeometryByTag(tag: string): Promise<RawGeometry[]> {
        return this.query('getGeometryByTag', { tag });
    }
    getTagsByHandles(handles: string[]): Promise<Record<string, string | null>> {
        return this.query('getTagsByHandles', { handles });
    }
}
