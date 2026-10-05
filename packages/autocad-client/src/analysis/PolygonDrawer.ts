import { AutoCadDrawingClient } from '../cad/AutoCadDrawingClient.js';
import type { Ring } from './PolygonOps.js';

export interface DrawPolygonOptions {
    layer: string;
    layerColorIndex?: number;
    offsetX?: number;
    offsetY?: number;
}

/** Shared AutoCAD adapter for drawing calculated polygon rings. */
export class PolygonDrawer {
    static async draw(
        cad: AutoCadDrawingClient,
        rings: Ring[],
        options: DrawPolygonOptions,
    ): Promise<void> {
        await cad.createLayer(options.layer, options.layerColorIndex ?? 7);
        const offsetX = options.offsetX ?? 0;
        const offsetY = options.offsetY ?? 0;

        for (const ring of rings) {
            if (ring.length < 2) continue;
            await cad.polyline(
                ring.map((point) => ({
                    x: point.x + offsetX,
                    y: point.y + offsetY,
                    z: 0,
                })),
                true,
                { layer: options.layer },
            );
        }
    }
}
