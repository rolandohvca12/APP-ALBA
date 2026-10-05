import { AutoCadDrawingClient } from '../cad/AutoCadDrawingClient.js';
import { PolygonDrawer } from './PolygonDrawer.js';
import { type WallFusionResult } from './WallFusionService.js';

export interface DrawFusionOptions {
    layer: string;
    layerColorIndex?: number;
    offsetX?: number;
    offsetY?: number;
}

/**
 * WallFusionDrawer
 * ----------------
 * Única responsabilidad: dibujar en AutoCAD los polígonos que produjo
 * WallFusionService. No calcula geometría ni conoce contactos/fusión —
 * solo traduce Ring[] a polilíneas. Las secciones transformadas de
 * extremo ya vienen unidas (PolygonOps.union) dentro de
 * WallFusionResult.polygons, así que no requieren un método aparte.
 *
 * Antes de dibujar, asegura que el layer de salida exista (createLayer);
 * dibujar en un layer que aún no existe en el documento es la causa más
 * común de que no aparezca nada aunque polyline() no lance error.
 */
export class WallFusionDrawer {
    static async draw(cad: AutoCadDrawingClient, results: WallFusionResult[], options: DrawFusionOptions): Promise<void> {
        await PolygonDrawer.draw(
            cad,
            results.flatMap(({ polygons }) => polygons),
            options,
        );
    }
}
