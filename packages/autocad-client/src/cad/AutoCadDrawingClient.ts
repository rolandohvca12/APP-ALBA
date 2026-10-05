import { AutoCadRealtimeClient } from './AutoCadRealtimeClient.js';
import { AutoCadBatch } from './AutoCadBatch.js';

interface Point3 { x: number; y: number; z?: number; }

export interface EntityOptions {
    layer?: string;
}

/**
 * AutoCadDrawingClient
 * ---------------------
 * Única responsabilidad: exponer comandos de dibujo tipados, traduciéndolos
 * al protocolo JSON que entiende AutoCadBridge.cs (CadCommandFactory).
 */

export interface BlockGeometryCommand {
    type: string;
    [key: string]: unknown;
}

export class AutoCadDrawingClient {
    constructor(private readonly transport: AutoCadRealtimeClient) { }

    async connect(): Promise<void> {
        await this.transport.connect();
    }

    async line(p1: Point3, p2: Point3, opts?: EntityOptions): Promise<void> {
        await this.transport.send({ type: 'line', p1: normalize(p1), p2: normalize(p2), ...opts });
    }

    async circle(center: Point3, radius: number, opts?: EntityOptions): Promise<void> {
        await this.transport.send({ type: 'circle', center: normalize(center), radius, ...opts });
    }

    async polyline(points: Point3[], closed = false, opts?: EntityOptions): Promise<{ handle: string }> {
        const response = (await this.transport.send({ type: 'polyline', points: points.map(normalize), closed, ...opts })) as { ok: boolean; handle: string };
        return { handle: response.handle };
    }

    async rectangle(p1: Point3, p2: Point3, opts?: EntityOptions): Promise<void> {
        await this.transport.send({ type: 'rectangle', p1: normalize(p1), p2: normalize(p2), ...opts });
    }

    async text(position: Point3, height: number, content: string, opts?: EntityOptions & { style?: string; rotation?: number }): Promise<void> {
        await this.transport.send({
            type: 'text', position: normalize(position), height, content,
            style: opts?.style, rotation: opts?.rotation ?? 0.0, layer: opts?.layer,
        });
    }
    async dimensionLinear(p1: Point3, p2: Point3, dimLinePoint: Point3, opts?: EntityOptions & { style?: string }): Promise<void> {
        await this.transport.send({
            type: 'dimLinear', p1: normalize(p1), p2: normalize(p2), dimLinePoint: normalize(dimLinePoint),
            style: opts?.style, layer: opts?.layer,
        });
    }
    async createLayer(name: string, colorIndex = 7): Promise<void> {
        await this.transport.send({ type: 'createLayer', name, color: colorIndex });
    }
    async arc(center: Point3, radius: number, startAngleRad: number, endAngleRad: number, opts?: EntityOptions): Promise<void> {
        await this.transport.send({ type: 'arc', center: normalize(center), radius, startAngle: startAngleRad, endAngle: endAngleRad, ...opts });
    }

    async ellipse(center: Point3, majorAxis: { x: number; y: number }, radiusRatio: number, opts?: EntityOptions): Promise<void> {
        await this.transport.send({ type: 'ellipse', center: normalize(center), majorAxisX: majorAxis.x, majorAxisY: majorAxis.y, radiusRatio, ...opts });
    }

    async hatch(boundary: Point3[], pattern = 'ANSI31', scale = 1.0, opts?: EntityOptions): Promise<void> {
        await this.transport.send({ type: 'hatch', boundary: boundary.map(normalize), pattern, scale, ...opts });
    }
    async defineBlock(name: string, geometry: BlockGeometryCommand[]): Promise<void> {
        await this.transport.send({ type: 'defineBlock', name, geometry });
    }

    async insertBlock(blockName: string, position: Point3, opts?: { scale?: number; rotation?: number } & EntityOptions): Promise<void> {
        await this.transport.send({
            type: 'insertBlock',
            blockName,
            position: normalize(position),
            scale: opts?.scale ?? 1.0,
            rotation: opts?.rotation ?? 0.0,
            layer: opts?.layer,
        });
    }
    async clearModel(): Promise<void> {
        await this.transport.send({ type: 'clearModel' });
    }
    async defineTextStyle(name: string, font = 'romans.shx', widthFactor = 1.0): Promise<void> {
        await this.transport.send({ type: 'defineTextStyle', name, font, widthFactor });
    }

    async defineDimStyle(name: string, opts?: { decimalPlaces?: number; textHeight?: number; scale?: number }): Promise<void> {
        await this.transport.send({
            type: 'defineDimStyle', name,
            decimalPlaces: opts?.decimalPlaces ?? 2,
            textHeight: opts?.textHeight ?? 0.18,
            scale: opts?.scale ?? 1.0,
        });
    }
    async tagEntity(handle: string, tag: string): Promise<void> {
        await this.transport.send({ type: 'tagEntity', handle, tag });
    }

    async batch(build: (b: AutoCadBatch) => void): Promise<void> {
        const b = new AutoCadBatch();
        build(b);
        await this.transport.send({ type: 'batch', commands: b.toPayload() });
    }
    close(): void {
        this.transport.close();
    }
}




function normalize(p: Point3) {
    return { x: p.x, y: p.y, z: p.z ?? 0 };
}