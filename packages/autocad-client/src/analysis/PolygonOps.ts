import polygonClipping from 'polygon-clipping';
import type { Pair, Ring as ClipRing, Polygon as ClipPolygon, MultiPolygon as ClipMultiPolygon } from 'polygon-clipping';

export type Ring = { x: number; y: number }[];

export class PolygonOps {
    static union(a: Ring, b: Ring): Ring[] {
        return fromGeoResult(polygonClipping.union([toGeoRing(a)], [toGeoRing(b)]));
    }

    static intersection(a: Ring, b: Ring): Ring[] {
        return fromGeoResult(polygonClipping.intersection([toGeoRing(a)], [toGeoRing(b)]));
    }
    /**
     * Une TODOS los rings en una sola operación multipoligonal, en vez de
     * encadenar uniones binarias una por una.
     *
     * El patrón anterior (`result.flatMap(r => union(r, rings[i]))`)
     * es incorrecto en cuanto `result` deja de tener un único anillo: si
     * un ring nuevo toca a dos anillos ya presentes en `result` a la vez
     * (los "puentea"), cada unión binaria se calcula por separado y el
     * resultado queda como dos anillos que se solapan entre sí — nunca se
     * fusionan en uno solo. Ese estado intermedio (anillos superpuestos,
     * aristas ambiguas) es justo el tipo de entrada degenerada que hace
     * fallar a polygon-clipping con "Unable to complete output ring" en
     * una unión posterior. Dejar que la librería resuelva toda la
     * topología de una sola vez evita ese estado intermedio inconsistente.
     */
    static unionAll(rings: Ring[]): Ring[] {
        if (rings.length === 0) {
            return [];
        }
        if (rings.length === 1) {
            return [rings[0]];
        }

        const polygons: ClipPolygon[] = rings.map((ring) => [toGeoRing(ring)]);
        const [first, ...rest] = polygons;
        return fromGeoResult(polygonClipping.union(first, ...rest));
    }
    static clipToBand(ring: Ring, axis: 'x' | 'y', min: number, max: number): Ring[] {
        const BIG = 1e6;
        const band: Ring =
            axis === 'y'
                ? [{ x: -BIG, y: min }, { x: BIG, y: min }, { x: BIG, y: max }, { x: -BIG, y: max }]
                : [{ x: min, y: -BIG }, { x: max, y: -BIG }, { x: max, y: BIG }, { x: min, y: BIG }];
        return PolygonOps.intersection(ring, band);
    }
}

/**
 * Precisión a la que se redondean las coordenadas antes de entrar a
 * polygon-clipping. Vértices que "deberían" coincidir (p. ej. la punta
 * de un muro y el borde de su sección transformada) suelen diferir en
 * la enésima cifra decimal por el encadenamiento de rotate/traslada/
 * recorta. Ese ruido basta para que el algoritmo de barrido de
 * polygon-clipping los trate como no-conectados. Redondear a 1e-6 está
 * muy por debajo de cualquier tolerancia geométrica real del proyecto
 * (epsilon usado en GeometryFuser/TransformedSectionBuilder es 1e-4 del
 * tamaño del muro) y elimina ese ruido sin afectar la geometría.
 */
const SNAP_PRECISION = 1e6;

function snap(v: number): number {
    return Math.round(v * SNAP_PRECISION) / SNAP_PRECISION;
}

function toGeoRing(ring: Ring): ClipRing {
    const pts: Pair[] = ring.map((p) => [snap(p.x), snap(p.y)] as Pair);
    const closed = pts[0][0] === pts[pts.length - 1][0] && pts[0][1] === pts[pts.length - 1][1];
    return closed ? pts : [...pts, pts[0]];
}

function fromGeoResult(multiPoly: ClipMultiPolygon): Ring[] {
    return multiPoly.map((poly) => poly[0].map(([x, y]) => ({ x, y })));
}