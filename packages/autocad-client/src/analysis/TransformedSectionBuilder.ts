import { type RawGeometry } from '../cad/AutoCadQueryClient.js';
import { type Ring } from './PolygonOps.js';
import { toRing, boundingBox, mainAxisAngle, centroid, rotateRing, epsilonFor, computeLocalFrame, toLocalBox, type LocalFrame } from './geometryMath.js'; import { type EndElementMatch } from './EndElementDetector.js';

export type AdjacentTransverse = 'none' | 'oneSide' | 'bothSides';
export type Side = 'positive' | 'negative';
export interface TransformedSectionOptions {
    transformationFactor: number;
}
export interface TransformedSectionResult {
    match: EndElementMatch;
    adjacency: AdjacentTransverse;
    polygon: Ring;
}

/**
 * TransformedSectionBuilder
 * --------------------------
 * Única responsabilidad: construir la sección transformada equivalente
 * en el extremo de un muro. No detecta nada, no dibuja nada, no conoce
 * layers.
 *
 * Reglas aplicadas:
 * 1. El largo transformado corre perpendicular al muro (eje local y) y
 *    su magnitud = match.thickness * transformationFactor. Este largo
 *    REEMPLAZA el ancho original del elemento (no se suma a él).
 * 2. La extensión a lo largo del muro (eje local x) se conserva igual a
 *    la del elemento original (match.alongWallLength), pero anclada
 *    exactamente en la punta del muro.
 * 4. El borde que se apoya sobre el muro (baseY) se desplaza hacia
 *    ADENTRO del muro en `epsilon` (mismo criterio que
 *    GeometryFuser.clipBySide: proporcional al tamaño del muro) para
 *    que el rectángulo transformado SOLAPE al polígono del muro en vez
 *    de tocarlo exactamente al ras. Sin este margen, polygon-clipping
 *    falla con "Unable to complete output ring" al unir dos polígonos
 *    que comparten una arista colineal sin área de solape real — es un
 *    problema de precisión numérica del algoritmo de barrido, no de tu
 *    geometría en sí.
 */
export class TransformedSectionBuilder {
    static build(
        reference: RawGeometry,
        match: EndElementMatch,
        adjacency: AdjacentTransverse,
        occupiedSide?: Side,
        options: TransformedSectionOptions = { transformationFactor: 1 },
        frame?: LocalFrame
    ): TransformedSectionResult {
        const f = frame ?? computeLocalFrame(reference);
        const refBox = f.refBox;

        const xMin = match.localXMin;
        const xMax = match.localXMax;

        if (options.transformationFactor <= 0) {
            throw new Error('transformationFactor debe ser mayor que cero');
        }

        const epsilon = epsilonFor(refBox);

        const baseY = refBox.yMin;
        const transformedThickness = match.thickness * options.transformationFactor;

        let yMin: number;
        let yMax: number;

        if (adjacency === 'oneSide') {
            if (!occupiedSide) {
                throw new Error('occupiedSide es requerido cuando adjacency === "oneSide"');
            }

            const freeSide: Side = occupiedSide === 'positive' ? 'negative' : 'positive';

            if (freeSide === 'positive') {
                yMin = baseY - epsilon;
                yMax = baseY + transformedThickness;
            } else {
                yMax = baseY + epsilon;
                yMin = baseY - transformedThickness;
            }
        } else if (adjacency === 'bothSides') {
            const centerY = (refBox.yMin + refBox.yMax) / 2;
            yMin = centerY - transformedThickness / 2;
            yMax = centerY + transformedThickness / 2;
        } else {
            yMin = baseY - epsilon;
            yMax = baseY + transformedThickness;
        }

        const localRing = rectRing(xMin, xMax, yMin, yMax);
        const polygon = rotateRing(localRing, f.angle, f.pivot);

        return { match, adjacency, polygon };
    }

    static resolveOccupiedSide(
        reference: RawGeometry,
        transverse: RawGeometry | Ring,
        frame?: LocalFrame
    ): Side {
        const f = frame ?? computeLocalFrame(reference);
        const refBox = f.refBox;
        const centerY = (refBox.yMin + refBox.yMax) / 2;

        const transverseRing = Array.isArray(transverse) ? transverse : toRing(transverse);
        const box = toLocalBox(f, transverseRing);
        const transverseCenterY = (box.yMin + box.yMax) / 2;

        return transverseCenterY >= centerY ? 'positive' : 'negative';
    }
}

function rectRing(xMin: number, xMax: number, yMin: number, yMax: number): Ring {
    return [
        { x: xMin, y: yMin },
        { x: xMax, y: yMin },
        { x: xMax, y: yMax },
        { x: xMin, y: yMax },
    ];
}