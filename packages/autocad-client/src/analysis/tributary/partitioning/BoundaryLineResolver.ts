import type { BoundaryLineGroup, InwardLine, OwnedBoundarySpan, PanoWallEdge, Point2D } from './types.js';

interface RawLineGroup { line: InwardLine; edges: PanoWallEdge[] }
const TOPOLOGY_TOLERANCE = 1e-3;

/** Normalizes collinear overlaps and assigns each half-lintel directly to an adjacent wall. */
export class BoundaryLineResolver {
    static resolve(edges: PanoWallEdge[], interior: Point2D, tolerance = 1e-6): BoundaryLineGroup[] {
        const groups = groupByLine(edges.filter((edge) => edgeLength(edge) > 1e-9), interior, tolerance);
        for (const group of groups) group.edges = normalizeOverlaps(group);
        const structural = groups.flatMap((group) => group.edges).filter((edge) => !edge.isDintel);
        return groups
            .map((group) => ({
                line: group.line,
                spans: resolveOwnership(group, groups, structural),
            }))
            .filter((group) => group.spans.length > 0);
    }
}

function groupByLine(edges: PanoWallEdge[], interior: Point2D, tolerance: number): RawLineGroup[] {
    const groups: RawLineGroup[] = [];
    for (const edge of edges) {
        const line = edgeLine(edge, interior);
        const group = groups.find((item) => Math.abs(item.line.a - line.a) <= tolerance
            && Math.abs(item.line.b - line.b) <= tolerance && Math.abs(item.line.c - line.c) <= tolerance);
        if (group) group.edges.push(edge);
        else groups.push({ line, edges: [edge] });
    }
    return groups;
}

function normalizeOverlaps(group: RawLineGroup, tolerance = 1e-9): PanoWallEdge[] {
    const tx = -group.line.b;
    const ty = group.line.a;
    const project = (point: Point2D) => tx * point.x + ty * point.y;
    const intervals = group.edges.map((edge, order) => {
        const values = [project(edge.p1), project(edge.p2)];
        return { edge, order, min: Math.min(...values), max: Math.max(...values) };
    });
    const breaks = [...new Set(intervals.flatMap(({ min, max }) => [min, max]))].sort((a, b) => a - b);
    const base = { x: group.line.a * group.line.c, y: group.line.b * group.line.c };
    const pieces: PanoWallEdge[] = [];

    for (let index = 0; index < breaks.length - 1; index++) {
        const start = breaks[index];
        const end = breaks[index + 1];
        if (end - start <= tolerance) continue;
        const middle = (start + end) / 2;
        const covering = intervals.filter(({ min, max }) => middle >= min - tolerance && middle <= max + tolerance);
        if (covering.length === 0) continue;
        const selected = covering.sort((a, b) =>
            Number(Boolean(b.edge.isDintel)) - Number(Boolean(a.edge.isDintel)) || a.order - b.order)[0].edge;
        const p1 = { x: base.x + tx * start, y: base.y + ty * start };
        const p2 = { x: base.x + tx * end, y: base.y + ty * end };
        const previous = pieces[pieces.length - 1];
        if (previous && previous.id === selected.id && previous.isDintel === selected.isDintel) previous.p2 = p2;
        else {
            const followsSource = distance(p1, selected.p1) <= distance(p1, selected.p2);
            const startWallId = followsSource ? selected.startWallId : selected.endWallId;
            const endWallId = followsSource ? selected.endWallId : selected.startWallId;
            pieces.push({
                id: selected.id,
                p1,
                p2,
                ...(selected.isDintel ? { isDintel: true } : {}),
                ...(startWallId ? { startWallId } : {}),
                ...(endWallId ? { endWallId } : {}),
            });
        }
    }
    return pieces;
}

function resolveOwnership(
    group: RawLineGroup,
    groups: RawLineGroup[],
    structural: PanoWallEdge[],
): OwnedBoundarySpan[] {
    const spans: OwnedBoundarySpan[] = [];
    for (const edge of group.edges) {
        if (!edge.isDintel) {
            appendSpan(spans, { ownerId: edge.id, p1: edge.p1, p2: edge.p2 });
            continue;
        }
        const midpoint = { x: (edge.p1.x + edge.p2.x) / 2, y: (edge.p1.y + edge.p2.y) / 2 };
        const startOwner = endpointOwner(edge, edge.p1, group, groups, structural, 'start');
        const endOwner = endpointOwner(edge, edge.p2, group, groups, structural, 'end');
        if (startOwner) appendSpan(spans, { ownerId: startOwner, p1: edge.p1, p2: midpoint });
        if (endOwner) appendSpan(spans, { ownerId: endOwner, p1: midpoint, p2: edge.p2 });
    }
    return spans;
}

function endpointOwner(
    edge: PanoWallEdge,
    point: Point2D,
    group: RawLineGroup,
    groups: RawLineGroup[],
    structural: PanoWallEdge[],
    endpoint: 'start' | 'end',
): string | undefined {
    const incidentWall = nearestIncidentWall(point, group, groups);
    if (incidentWall) return incidentWall;

    return nearestWallId(point, structural)
        ?? (endpoint === 'start' ? edge.startWallId : edge.endWallId);
}

function nearestIncidentWall(
    point: Point2D,
    group: RawLineGroup,
    groups: RawLineGroup[],
): string | undefined {
    const incidentGroups = groups.filter((candidate) =>
        candidate === group || pointOnLine(point, candidate.line),
    );
    const walls = incidentGroups.flatMap((candidate) =>
        candidate.edges.filter((edge) => !edge.isDintel),
    );
    if (walls.length === 0) return undefined;
    return walls.reduce((nearest, wall) =>
        distanceToSegment(point, wall) < distanceToSegment(point, nearest) ? wall : nearest,
    ).id;
}

function pointOnLine(point: Point2D, line: InwardLine, tolerance = TOPOLOGY_TOLERANCE): boolean {
    return Math.abs(line.a * point.x + line.b * point.y - line.c) <= tolerance;
}

function appendSpan(spans: OwnedBoundarySpan[], span: OwnedBoundarySpan): void {
    const previous = spans[spans.length - 1];
    if (previous && previous.ownerId === span.ownerId && distance(previous.p2, span.p1) <= 1e-9) previous.p2 = span.p2;
    else spans.push(span);
}

function nearestWallId(point: Point2D, walls: PanoWallEdge[]): string | undefined {
    if (walls.length === 0) return undefined;
    return walls.reduce((nearest, wall) => distanceToSegment(point, wall) < distanceToSegment(point, nearest) ? wall : nearest).id;
}

function distanceToSegment(point: Point2D, edge: PanoWallEdge): number {
    const dx = edge.p2.x - edge.p1.x;
    const dy = edge.p2.y - edge.p1.y;
    const lengthSquared = dx * dx + dy * dy;
    if (lengthSquared === 0) return distance(point, edge.p1);
    const value = ((point.x - edge.p1.x) * dx + (point.y - edge.p1.y) * dy) / lengthSquared;
    const t = Math.max(0, Math.min(1, value));
    return distance(point, { x: edge.p1.x + t * dx, y: edge.p1.y + t * dy });
}

function edgeLine(edge: PanoWallEdge, interior: Point2D): InwardLine {
    const dx = edge.p2.x - edge.p1.x;
    const dy = edge.p2.y - edge.p1.y;
    const length = Math.hypot(dx, dy);
    let a = -dy / length;
    let b = dx / length;
    let c = a * edge.p1.x + b * edge.p1.y;
    if (a * interior.x + b * interior.y - c < 0) { a = -a; b = -b; c = -c; }
    return { a, b, c };
}

function edgeLength(edge: PanoWallEdge): number { return distance(edge.p1, edge.p2); }
function distance(a: Point2D, b: Point2D): number { return Math.hypot(a.x - b.x, a.y - b.y); }
