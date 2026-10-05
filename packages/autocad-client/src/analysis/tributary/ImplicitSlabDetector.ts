import type { RawGeometry } from '../../cad/AutoCadQueryClient.js';
import { boundingBox, distance, toRing } from '../geometryMath.js';
import type { ResolvedPanoEdge } from './PanoBoundaryResolver.js';
import type { TributarySupport } from './types.js';

interface AxisSupport {
    source: TributarySupport;
    axis: 'x' | 'y';
    coordinate: number;
    min: number;
    max: number;
    thickness: number;
}

interface SupportLine {
    axis: 'x' | 'y';
    coordinate: number;
    thickness: number;
    supports: AxisSupport[];
}

export interface ImplicitSlab {
    geometry: RawGeometry;
    edges: ResolvedPanoEdge[];
}

export interface ImplicitSlabDetection {
    slabs: ImplicitSlab[];
    warnings: string[];
}

/** Finds minimal orthogonal faces enclosed by wall/lintel support lines. */
export class ImplicitSlabDetector {
    static detect(
        supports: TributarySupport[],
        closureTolerance = 0.05,
    ): ImplicitSlabDetection {
        const warnings: string[] = [];
        const axisSupports = supports
            .map((support) => toAxisSupport(support, closureTolerance))
            .filter((support): support is AxisSupport => support !== undefined);
        const rejected = supports.length - axisSupports.length;
        if (rejected > 0) {
            warnings.push(`${rejected} support(s) were ignored because they are not orthogonal X/Y geometry.`);
        }

        const horizontal = groupSupportLines(axisSupports.filter((support) => support.axis === 'x'), closureTolerance);
        const vertical = groupSupportLines(axisSupports.filter((support) => support.axis === 'y'), closureTolerance);
        const slabs: ImplicitSlab[] = [];

        for (let leftIndex = 0; leftIndex < vertical.length - 1; leftIndex++) {
            for (let rightIndex = leftIndex + 1; rightIndex < vertical.length; rightIndex++) {
                const left = vertical[leftIndex];
                const right = vertical[rightIndex];
                for (let bottomIndex = 0; bottomIndex < horizontal.length - 1; bottomIndex++) {
                    for (let topIndex = bottomIndex + 1; topIndex < horizontal.length; topIndex++) {
                        const bottom = horizontal[bottomIndex];
                        const top = horizontal[topIndex];
                        if (!isClosed(left, right, bottom, top, closureTolerance)) continue;
                        if (hasInteriorDivider(vertical, horizontal, left, right, bottom, top, closureTolerance)) continue;

                        const slab = createImplicitSlab(
                            left,
                            right,
                            bottom,
                            top,
                            slabs.length + 1,
                            axisSupports.filter((support) => support.source.kind !== 'lintel'),
                        );
                        if (slab) slabs.push(slab);
                    }
                }
            }
        }

        if (slabs.length === 0) {
            warnings.push('No closed orthogonal panel could be inferred from the selected walls and lintels.');
        }
        return { slabs, warnings };
    }
}

function toAxisSupport(
    source: TributarySupport,
    tolerance: number,
): AxisSupport | undefined {
    const ring = toRing(source.geometry);
    if (ring.length < 2) return undefined;
    const longest = longestSegment(ring, source.geometry.closed);
    const dx = longest.p2.x - longest.p1.x;
    const dy = longest.p2.y - longest.p1.y;
    const segmentLength = Math.hypot(dx, dy);
    if (segmentLength === 0 || Math.min(Math.abs(dx), Math.abs(dy)) > tolerance) return undefined;

    const box = boundingBox(ring);
    const axis = Math.abs(dx) >= Math.abs(dy) ? 'x' : 'y';
    return axis === 'x'
        ? {
            source,
            axis,
            coordinate: (box.yMin + box.yMax) / 2,
            min: box.xMin,
            max: box.xMax,
            thickness: box.yMax - box.yMin,
        }
        : {
            source,
            axis,
            coordinate: (box.xMin + box.xMax) / 2,
            min: box.yMin,
            max: box.yMax,
            thickness: box.xMax - box.xMin,
        };
}

function longestSegment(ring: ReturnType<typeof toRing>, closed: boolean) {
    const count = closed ? ring.length : ring.length - 1;
    let longest = { p1: ring[0], p2: ring[1] };
    for (let index = 0; index < count; index++) {
        const candidate = { p1: ring[index], p2: ring[(index + 1) % ring.length] };
        if (distance(candidate.p1, candidate.p2) > distance(longest.p1, longest.p2)) longest = candidate;
    }
    return longest;
}

function groupSupportLines(supports: AxisSupport[], tolerance: number): SupportLine[] {
    const groups: SupportLine[] = [];
    for (const support of supports.sort((a, b) => a.coordinate - b.coordinate)) {
        const group = groups.find((candidate) => Math.abs(candidate.coordinate - support.coordinate) <= tolerance);
        if (group) {
            group.supports.push(support);
            group.thickness = Math.max(group.thickness, support.thickness);
            group.coordinate = group.supports.reduce((sum, item) => sum + item.coordinate, 0) / group.supports.length;
        } else {
            groups.push({
                axis: support.axis,
                coordinate: support.coordinate,
                thickness: support.thickness,
                supports: [support],
            });
        }
    }
    return groups.sort((a, b) => a.coordinate - b.coordinate);
}

function isClosed(
    left: SupportLine,
    right: SupportLine,
    bottom: SupportLine,
    top: SupportLine,
    tolerance: number,
): boolean {
    return covers(left, bottom.coordinate, top.coordinate, tolerance)
        && covers(right, bottom.coordinate, top.coordinate, tolerance)
        && covers(bottom, left.coordinate, right.coordinate, tolerance)
        && covers(top, left.coordinate, right.coordinate, tolerance);
}

function hasInteriorDivider(
    vertical: SupportLine[],
    horizontal: SupportLine[],
    left: SupportLine,
    right: SupportLine,
    bottom: SupportLine,
    top: SupportLine,
    tolerance: number,
): boolean {
    return vertical.some((line) =>
        line.coordinate > left.coordinate + tolerance
        && line.coordinate < right.coordinate - tolerance
        && covers(line, bottom.coordinate, top.coordinate, tolerance),
    ) || horizontal.some((line) =>
        line.coordinate > bottom.coordinate + tolerance
        && line.coordinate < top.coordinate - tolerance
        && covers(line, left.coordinate, right.coordinate, tolerance),
    );
}

function covers(line: SupportLine, start: number, end: number, tolerance: number): boolean {
    const intervals = line.supports
        .map((support) => ({ min: support.min, max: support.max }))
        .sort((a, b) => a.min - b.min);
    let cursor = start;
    for (const interval of intervals) {
        if (interval.max < cursor - tolerance) continue;
        if (interval.min > cursor + tolerance) return false;
        cursor = Math.max(cursor, interval.max);
        if (cursor >= end - tolerance) return true;
    }
    return cursor >= end - tolerance;
}

function createImplicitSlab(
    left: SupportLine,
    right: SupportLine,
    bottom: SupportLine,
    top: SupportLine,
    index: number,
    structural: AxisSupport[],
): ImplicitSlab | undefined {
    const xMin = left.coordinate + left.thickness / 2;
    const xMax = right.coordinate - right.thickness / 2;
    const yMin = bottom.coordinate + bottom.thickness / 2;
    const yMax = top.coordinate - top.thickness / 2;
    if (xMax <= xMin || yMax <= yMin) return undefined;

    const points = [
        { x: xMin, y: yMin, z: 0 },
        { x: xMax, y: yMin, z: 0 },
        { x: xMax, y: yMax, z: 0 },
        { x: xMin, y: yMax, z: 0 },
    ];
    const edges = [
        ...lineEdges(bottom, xMin, xMax, yMin, structural),
        ...lineEdges(right, yMin, yMax, xMax, structural),
        ...lineEdges(top, xMin, xMax, yMax, structural),
        ...lineEdges(left, yMin, yMax, xMin, structural),
    ];
    const handle = `implicit-slab-${index}`;

    return {
        geometry: {
            handle,
            type: 'Polyline',
            points,
            length: 2 * ((xMax - xMin) + (yMax - yMin)),
            closed: true,
            area: (xMax - xMin) * (yMax - yMin),
        },
        edges,
    };
}

function lineEdges(
    line: SupportLine,
    panelMin: number,
    panelMax: number,
    faceCoordinate: number,
    structural: AxisSupport[],
): ResolvedPanoEdge[] {
    return line.supports
        .filter((support) => support.max >= panelMin && support.min <= panelMax)
        .map((support) => {
            const start = Math.max(panelMin, support.min);
            const end = Math.min(panelMax, support.max);
            const horizontal = line.axis === 'x';
            const p1 = horizontal
                ? { x: start, y: faceCoordinate }
                : { x: faceCoordinate, y: start };
            const p2 = horizontal
                ? { x: end, y: faceCoordinate }
                : { x: faceCoordinate, y: end };
            const isDintel = support.source.kind === 'lintel';
            const startWallId = isDintel ? nearestStructuralId(p1, structural, support) : undefined;
            const endWallId = isDintel ? nearestStructuralId(p2, structural, support) : undefined;
            return {
                id: support.source.geometry.handle,
                p1,
                p2,
                ...(isDintel ? { isDintel: true } : {}),
                ...(startWallId ? { startWallId } : {}),
                ...(endWallId ? { endWallId } : {}),
                supportKind: support.source.kind,
            };
        })
        .filter((edge) => distance(edge.p1, edge.p2) > 1e-9);
}

function nearestStructuralId(
    point: { x: number; y: number },
    supports: AxisSupport[],
    lintel: AxisSupport,
): string | undefined {
    if (supports.length === 0) return undefined;
    const collinear = supports.filter((support) =>
        support.axis === lintel.axis && Math.abs(support.coordinate - lintel.coordinate) <= 0.25,
    );
    const candidates = collinear.length > 0 ? collinear : supports;
    return candidates.reduce((nearest, support) =>
        distanceToSupport(point, support) < distanceToSupport(point, nearest) ? support : nearest,
    ).source.geometry.handle;
}

function distanceToSupport(point: { x: number; y: number }, support: AxisSupport): number {
    const halfThickness = support.thickness / 2;
    const xMin = support.axis === 'x' ? support.min : support.coordinate - halfThickness;
    const xMax = support.axis === 'x' ? support.max : support.coordinate + halfThickness;
    const yMin = support.axis === 'x' ? support.coordinate - halfThickness : support.min;
    const yMax = support.axis === 'x' ? support.coordinate + halfThickness : support.max;
    const dx = Math.max(xMin - point.x, 0, point.x - xMax);
    const dy = Math.max(yMin - point.y, 0, point.y - yMax);
    return Math.hypot(dx, dy);
}
