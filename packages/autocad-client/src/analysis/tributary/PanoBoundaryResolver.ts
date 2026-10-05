import type { RawGeometry } from '../../cad/AutoCadQueryClient.js';
import type { PanoWallEdge } from '../TributaryPartitioner.js';
import { centroid, distance, segmentDistance, toRing, toSegments, type Segment } from '../geometryMath.js';
import type { Ring } from '../PolygonOps.js';
import type { TributarySupport, TributarySupportKind } from './types.js';

export interface ResolvedPanoEdge extends PanoWallEdge {
    supportKind: TributarySupportKind;
}

/** Resolves the support face that bounds one closed slab polygon. */
export class PanoBoundaryResolver {
    static resolve(
        slab: RawGeometry,
        supports: TributarySupport[],
        tolerance = 0.02,
    ): ResolvedPanoEdge[] {
        const slabRing = normalizeRing(toRing(slab));
        if (!slab.closed || slabRing.length < 3) return [];

        const slabCenter = centroid(slabRing);
        const slabEdges = toSegments(slabRing);
        const resolved: ResolvedPanoEdge[] = [];

        for (const support of supports) {
            const face = interiorFace(support.geometry, slabCenter);
            if (!face || !touchesBoundary(face, slabEdges, tolerance)) continue;

            resolved.push({
                id: support.geometry.handle,
                p1: { x: face.p1.x, y: face.p1.y },
                p2: { x: face.p2.x, y: face.p2.y },
                isDintel: support.kind === 'lintel',
                ...(support.kind === 'lintel'
                    ? endpointOwners(face, supports.filter((item) => item.kind !== 'lintel'))
                    : {}),
                supportKind: support.kind,
            });
        }

        return resolved;
    }
}

function endpointOwners(face: Segment, structural: TributarySupport[]): { startWallId?: string; endWallId?: string } {
    const startWallId = nearestSupportId(face.p1, face, structural);
    const endWallId = nearestSupportId(face.p2, face, structural);
    return {
        ...(startWallId ? { startWallId } : {}),
        ...(endWallId ? { endWallId } : {}),
    };
}

function nearestSupportId(
    point: { x: number; y: number },
    lintelFace: Segment,
    supports: TributarySupport[],
): string | undefined {
    if (supports.length === 0) return undefined;
    const parallel = supports.filter((support) => {
        const face = interiorFace(support.geometry, point);
        return face && areParallel(lintelFace, face);
    });
    const candidates = parallel.length > 0 ? parallel : supports;
    return candidates.reduce((nearest, support) =>
        pointToGeometryDistance(point, support.geometry) < pointToGeometryDistance(point, nearest.geometry)
            ? support
            : nearest,
    ).geometry.handle;
}

function pointToGeometryDistance(point: { x: number; y: number }, geometry: RawGeometry): number {
    const ring = toRing(geometry);
    return Math.min(...toSegments(ring).map((segment) => segmentDistance({ p1: point, p2: point }, segment)));
}

function interiorFace(
    geometry: RawGeometry,
    slabCenter: { x: number; y: number },
): Segment | undefined {
    const ring = normalizeRing(toRing(geometry));
    if (ring.length < 2) return undefined;
    if (geometry.type === 'Line' || !geometry.closed) {
        return { p1: ring[0], p2: ring[ring.length - 1] };
    }

    const segments = toSegments(ring);
    const maxLength = Math.max(...segments.map(segmentLength));
    const principalFaces = segments.filter((segment) => segmentLength(segment) >= maxLength * 0.95);

    return principalFaces.reduce((nearest, candidate) =>
        distance(segmentMidpoint(candidate), slabCenter) < distance(segmentMidpoint(nearest), slabCenter)
            ? candidate
            : nearest,
    );
}

function touchesBoundary(face: Segment, slabEdges: Segment[], tolerance: number): boolean {
    return slabEdges.some((edge) =>
        areParallel(face, edge)
        && projectedOverlap(face, edge) > tolerance
        && segmentDistance(face, edge) <= tolerance,
    );
}

function areParallel(a: Segment, b: Segment): boolean {
    const adx = a.p2.x - a.p1.x;
    const ady = a.p2.y - a.p1.y;
    const bdx = b.p2.x - b.p1.x;
    const bdy = b.p2.y - b.p1.y;
    const denominator = Math.hypot(adx, ady) * Math.hypot(bdx, bdy);
    return denominator > 0 && Math.abs(adx * bdy - ady * bdx) / denominator <= 1e-4;
}

function projectedOverlap(a: Segment, b: Segment): number {
    const dx = a.p2.x - a.p1.x;
    const dy = a.p2.y - a.p1.y;
    const length = Math.hypot(dx, dy);
    if (length === 0) return 0;
    const ux = dx / length;
    const uy = dy / length;
    const project = (point: { x: number; y: number }) =>
        (point.x - a.p1.x) * ux + (point.y - a.p1.y) * uy;
    const b1 = project(b.p1);
    const b2 = project(b.p2);
    return Math.max(0, Math.min(length, Math.max(b1, b2)) - Math.max(0, Math.min(b1, b2)));
}

function segmentLength(segment: Segment): number {
    return distance(segment.p1, segment.p2);
}

function segmentMidpoint(segment: Segment): { x: number; y: number } {
    return {
        x: (segment.p1.x + segment.p2.x) / 2,
        y: (segment.p1.y + segment.p2.y) / 2,
    };
}

function normalizeRing(ring: Ring): Ring {
    if (ring.length < 2) return ring;
    const first = ring[0];
    const last = ring[ring.length - 1];
    return distance(first, last) <= 1e-9 ? ring.slice(0, -1) : ring;
}
