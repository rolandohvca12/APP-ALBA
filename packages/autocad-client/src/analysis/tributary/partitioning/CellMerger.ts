import { PolygonOps } from '../../PolygonOps.js';
import type { Ring } from '../../PolygonOps.js';
import type { WallTributaryArea } from './types.js';

const TOPOLOGY_TOLERANCE = 1e-3;
const KEY_PRECISION = 1e4;

export function mergeCellsByWall(cells: WallTributaryArea[]): WallTributaryArea[] {
    const grouped = new Map<string, Ring[]>();
    for (const cell of cells) {
        const polygons = grouped.get(cell.wallId) ?? [];
        polygons.push(cell.polygon);
        grouped.set(cell.wallId, polygons);
    }

    return [...grouped].flatMap(([wallId, polygons]) => {
        const union = PolygonOps.unionAll(polygons);
        const merged = polygons.length > 1 && union.length > 1 ? dissolveAdjacent(polygons) : union;
        return merged.map((polygon) => ({ wallId, polygon }));
    });
}

/** Dissolves touching partition cells whose shared edges differ only by CAD noise. */
function dissolveAdjacent(polygons: Ring[]): Ring[] {
    const vertices = canonicalVertices(polygons);
    const boundary = new Map<string, { a: Ring[number]; b: Ring[number] }>();

    for (const polygon of polygons) {
        const ring = openRing(polygon).map(canonicalPoint);
        for (let index = 0; index < ring.length; index++) {
            const start = ring[index];
            const end = ring[(index + 1) % ring.length];
            const points = vertices
                .map((point) => ({ point, t: projectionParameter(point, start, end) }))
                .filter(({ point, t }) => t >= -1e-9 && t <= 1 + 1e-9
                    && distanceToSegment(point, start, end) <= TOPOLOGY_TOLERANCE)
                .sort((left, right) => left.t - right.t)
                .map(({ point }) => point)
                .filter((point, pointIndex, all) => pointIndex === 0
                    || pointKey(point) !== pointKey(all[pointIndex - 1]));

            for (let pointIndex = 0; pointIndex < points.length - 1; pointIndex++) {
                toggleEdge(boundary, points[pointIndex], points[pointIndex + 1]);
            }
        }
    }

    const rings = traceRings(boundary);
    return rings.length > 0 ? rings : PolygonOps.unionAll(polygons);
}

function canonicalVertices(polygons: Ring[]): Ring {
    const vertices = new Map<string, Ring[number]>();
    for (const point of polygons.flatMap(openRing)) {
        const canonical = canonicalPoint(point);
        vertices.set(pointKey(canonical), canonical);
    }
    return [...vertices.values()];
}

function toggleEdge(boundary: Map<string, { a: Ring[number]; b: Ring[number] }>, a: Ring[number], b: Ring[number]): void {
    if (pointKey(a) === pointKey(b)) return;
    const key = edgeKey(a, b);
    if (boundary.has(key)) boundary.delete(key);
    else boundary.set(key, { a, b });
}

function traceRings(boundary: Map<string, { a: Ring[number]; b: Ring[number] }>): Ring[] {
    const remaining = new Map(boundary);
    const rings: Ring[] = [];

    while (remaining.size > 0) {
        const firstEntry = remaining.entries().next().value as
            | [string, { a: Ring[number]; b: Ring[number] }]
            | undefined;
        if (!firstEntry) break;
        const [firstKey, first] = firstEntry;
        remaining.delete(firstKey);
        const ring: Ring = [first.a, first.b];
        const startKey = pointKey(first.a);
        let currentKey = pointKey(first.b);

        while (currentKey !== startKey) {
            const next = [...remaining].find(([, edge]) =>
                pointKey(edge.a) === currentKey || pointKey(edge.b) === currentKey,
            );
            if (!next) break;
            remaining.delete(next[0]);
            const point = pointKey(next[1].a) === currentKey ? next[1].b : next[1].a;
            ring.push(point);
            currentKey = pointKey(point);
        }

        if (currentKey === startKey) {
            ring.pop();
            if (ring.length >= 3) rings.push(ring);
        }
    }

    return rings;
}

function openRing(ring: Ring): Ring {
    if (ring.length < 2 || pointKey(ring[0]) !== pointKey(ring[ring.length - 1])) return ring;
    return ring.slice(0, -1);
}

function canonicalPoint(point: Ring[number]): Ring[number] {
    return {
        x: Math.round(point.x * KEY_PRECISION) / KEY_PRECISION,
        y: Math.round(point.y * KEY_PRECISION) / KEY_PRECISION,
    };
}

function projectionParameter(point: Ring[number], start: Ring[number], end: Ring[number]): number {
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const lengthSquared = dx * dx + dy * dy;
    return lengthSquared === 0 ? 0 : ((point.x - start.x) * dx + (point.y - start.y) * dy) / lengthSquared;
}

function distanceToSegment(point: Ring[number], start: Ring[number], end: Ring[number]): number {
    const t = Math.max(0, Math.min(1, projectionParameter(point, start, end)));
    return Math.hypot(point.x - (start.x + (end.x - start.x) * t), point.y - (start.y + (end.y - start.y) * t));
}

function pointKey(point: Ring[number]): string {
    return `${Math.round(point.x * KEY_PRECISION)},${Math.round(point.y * KEY_PRECISION)}`;
}

function edgeKey(a: Ring[number], b: Ring[number]): string {
    return [pointKey(a), pointKey(b)].sort().join('|');
}
