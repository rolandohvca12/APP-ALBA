import { type GeometrySelector } from '../cad/GeometrySelector.js';

/**
 * WallFusionSources
 * ------------------
 * Reemplaza el antiguo WallFusionLayers para las entradas de consulta:
 * cada muro/elemento se identifica con un GeometrySelector (por layer,
 * por tag, o lo que sea), no con un string de layer fijo. `output` se
 * mantiene como layer real porque el dibujo SIEMPRE necesita un layer
 * de AutoCAD para escribir en él.
 */
export interface WallFusionSources {
    mainWalls: GeometrySelector;
    transverseWalls: GeometrySelector;
    endElements: GeometrySelector;
    output: string;
}