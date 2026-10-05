import { AutoCadDrawingClient } from '../../cad/AutoCadDrawingClient.js';
import { centroid } from '../geometryMath.js';
import { PolygonDrawer, type DrawPolygonOptions } from '../PolygonDrawer.js';
import type { TributaryAnalysisResult } from './types.js';

export interface DrawTributaryOptions extends DrawPolygonOptions {
    drawAreaLabels?: boolean;
    labelLayer?: string;
    labelColorIndex?: number;
    labelHeight?: number;
    areaDecimals?: number;
}

/** Draws calculated cells without participating in their geometry. */
export class TributaryAreaDrawer {
    static async draw(
        cad: AutoCadDrawingClient,
        result: TributaryAnalysisResult,
        options: DrawTributaryOptions,
    ): Promise<void> {
        const cells = result.slabs.flatMap((slab) => slab.cells);
        await PolygonDrawer.draw(cad, cells.map((cell) => cell.polygon), options);

        if (!options.drawAreaLabels) return;
        const labelLayer = options.labelLayer ?? `${options.layer}_AREAS`;
        await cad.createLayer(labelLayer, options.labelColorIndex ?? options.layerColorIndex ?? 7);

        for (const cell of cells) {
            const center = centroid(cell.polygon);
            await cad.text(
                {
                    x: center.x + (options.offsetX ?? 0),
                    y: center.y + (options.offsetY ?? 0),
                    z: 0,
                },
                options.labelHeight ?? 0.15,
                `${cell.supportTag ?? cell.supportHandle}: ${cell.area.toFixed(options.areaDecimals ?? 3)} m2`,
                { layer: labelLayer },
            );
        }
    }
}
