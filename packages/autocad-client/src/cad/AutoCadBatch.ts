import { AutoCadDrawingClient, type EntityOptions } from './AutoCadDrawingClient.js';

interface Point3 { x: number; y: number; z?: number; }
export class AutoCadBatch {
    private readonly commands: Record<string, unknown>[] = [];

    line(p1: Point3, p2: Point3, opts?: EntityOptions): this {
        this.commands.push({ type: 'line', p1: normalize(p1), p2: normalize(p2), ...opts });
        return this;
    }

    circle(center: Point3, radius: number, opts?: EntityOptions): this {
        this.commands.push({ type: 'circle', center: normalize(center), radius, ...opts });
        return this;
    }

    rectangle(p1: Point3, p2: Point3, opts?: EntityOptions): this {
        this.commands.push({ type: 'rectangle', p1: normalize(p1), p2: normalize(p2), ...opts });
        return this;
    }

    text(position: Point3, height: number, content: string, opts?: EntityOptions): this {
        this.commands.push({ type: 'text', position: normalize(position), height, content, ...opts });
        return this;
    }

    insertBlock(blockName: string, position: Point3, opts?: { scale?: number; rotation?: number } & EntityOptions): this {
        this.commands.push({
            type: 'insertBlock', blockName, position: normalize(position),
            scale: opts?.scale ?? 1.0, rotation: opts?.rotation ?? 0.0, layer: opts?.layer,
        });
        return this;
    }

    toPayload(): Record<string, unknown>[] {
        return this.commands;
    }
}

function normalize(p: Point3) {
    return { x: p.x, y: p.y, z: p.z ?? 0 };
}