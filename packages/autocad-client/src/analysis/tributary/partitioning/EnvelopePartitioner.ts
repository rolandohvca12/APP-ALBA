import type { Ring } from '../../PolygonOps.js';
import { clipToHalfPlane } from './HalfPlaneClipper.js';
import type { BoundaryLineGroup, WallTributaryArea } from './types.js';

export class EnvelopePartitioner {
    static partition(polygon: Ring, groups: BoundaryLineGroup[]): WallTributaryArea[] {
        return groups.flatMap((group) => this.subdivide(this.nearestCell(polygon, group, groups), group));
    }

    static nearestCell(polygon: Ring, group: BoundaryLineGroup, groups: BoundaryLineGroup[]): Ring[] {
        let cell: Ring[] = [polygon];
        for (const other of groups) {
            if (other === group) continue;
            cell = cell.flatMap((ring) => clipToHalfPlane(ring, other.line.a - group.line.a,
                other.line.b - group.line.b, other.line.c - group.line.c));
            if (cell.length === 0) break;
        }
        return cell;
    }

    static subdivide(rings: Ring[], group: BoundaryLineGroup): WallTributaryArea[] {
        if (rings.length === 0 || group.spans.length === 0) return [];
        const tx = -group.line.b;
        const ty = group.line.a;
        const project = (point: Ring[number]) => tx * point.x + ty * point.y;
        const ordered = group.spans.map((span) => {
            const values = [project(span.p1), project(span.p2)];
            return { span, min: Math.min(...values), max: Math.max(...values) };
        }).sort((a, b) => a.min - b.min);

        return ordered.flatMap((entry, index) => {
            let polygons = rings;
            const previous = ordered[index - 1];
            const next = ordered[index + 1];
            if (previous) {
                const lower = (previous.max + entry.min) / 2;
                polygons = polygons.flatMap((ring) => clipToHalfPlane(ring, tx, ty, lower));
            }
            if (next) {
                const upper = (entry.max + next.min) / 2;
                polygons = polygons.flatMap((ring) => clipToHalfPlane(ring, -tx, -ty, -upper));
            }
            return polygons.map((polygon) => ({ wallId: entry.span.ownerId, polygon }));
        });
    }
}
