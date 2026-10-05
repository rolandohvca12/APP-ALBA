import { type RawGeometry } from '../../cad/AutoCadQueryClient.js';
import { type IGeometryInterpreter } from '../IGeometryInterpreter.js';
import { toPolygon, distance } from '../geometryMath.js';

export interface Wall {
    length: number;
    thickness: number;
    areaSection: number;
    centroid: { x: number; y: number };
}

export class WallInterpreter implements IGeometryInterpreter<Wall> {
    canInterpret(g: RawGeometry): boolean {
        return g.type === 'Polyline' && g.closed && g.points.length >= 4;
    }

    interpret(g: RawGeometry): Wall {
        const poly = toPolygon(g);
        const sideA = distance(g.points[0]!, g.points[1]!);
        const sideB = distance(g.points[1]!, g.points[2]!);
        return {
            length: Math.max(sideA, sideB),
            thickness: Math.min(sideA, sideB),
            areaSection: poly.A(),
            centroid: { x: poly.Cx(), y: poly.Cy() },
        };
    }
}