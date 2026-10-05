import type { Ring } from './PolygonOps.js';
import { BoundaryLineResolver } from './tributary/partitioning/BoundaryLineResolver.js';
import { mergeCellsByWall } from './tributary/partitioning/CellMerger.js';
import { EnvelopePartitioner } from './tributary/partitioning/EnvelopePartitioner.js';
import { clipToHalfPlane } from './tributary/partitioning/HalfPlaneClipper.js';
import type { BoundaryLineGroup, PanoWallEdge, Point2D, WallTributaryArea } from './tributary/partitioning/types.js';

export type { PanoWallEdge, WallTributaryArea } from './tributary/partitioning/types.js';

/** Public facade for envelope-based slab tributary partitioning. */
export class TributaryPartitioner {
    static partitionBidireccional(panoPolygon: Ring, walls: PanoWallEdge[]): WallTributaryArea[] {
        const groups = BoundaryLineResolver.resolve(walls, centroidOf(panoPolygon));
        return mergeCellsByWall(EnvelopePartitioner.partition(panoPolygon, groups));
    }

    static partitionUnidireccional(
        panoPolygon: Ring,
        walls: PanoWallEdge[],
        spanDirection: 'x' | 'y',
        losaThickness: number,
    ): WallTributaryArea[] {
        if (!Number.isFinite(losaThickness) || losaThickness <= 0) {
            throw new RangeError('losaThickness must be a finite positive number.');
        }

        const stripWidth = Math.max(4 * losaThickness, 0.8);
        const groups = BoundaryLineResolver.resolve(walls, centroidOf(panoPolygon));
        const parallel = groups.filter((group) => groupAxis(group) === spanDirection);
        const perpendicular = groups.filter((group) => groupAxis(group) !== spanDirection);
        const cells: WallTributaryArea[] = [];

        for (const group of groups) {
            const nearest = EnvelopePartitioner.nearestCell(panoPolygon, group, groups);
            if (!parallel.includes(group)) {
                cells.push(...EnvelopePartitioner.subdivide(nearest, group));
                continue;
            }

            const { a, b, c } = group.line;
            const strip = nearest.flatMap((ring) => clipToHalfPlane(ring, -a, -b, -(c + stripWidth)));
            cells.push(...EnvelopePartitioner.subdivide(strip, group));

            const overflow = nearest.flatMap((ring) => clipToHalfPlane(ring, a, b, c + stripWidth));
            for (const remnant of overflow) {
                cells.push(...(
                    perpendicular.length > 0
                        ? EnvelopePartitioner.partition(remnant, perpendicular)
                        : EnvelopePartitioner.subdivide([remnant], group)
                ));
            }
        }

        return mergeCellsByWall(cells);
    }
}

function centroidOf(ring: Ring): Point2D {
    const total = ring.reduce(
        (sum, point) => ({ x: sum.x + point.x, y: sum.y + point.y }),
        { x: 0, y: 0 },
    );
    return { x: total.x / ring.length, y: total.y / ring.length };
}

function groupAxis(group: BoundaryLineGroup): 'x' | 'y' {
    const span = group.spans[0];
    return Math.abs(span.p2.x - span.p1.x) >= Math.abs(span.p2.y - span.p1.y) ? 'x' : 'y';
}
