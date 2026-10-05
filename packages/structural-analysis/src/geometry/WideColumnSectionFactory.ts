import { Polygon } from '@app-alba/autocad-client';
import type {
  AnalysisDirection,
  WideColumnSection,
  WideColumnWallInput,
} from '../domain/types.js';

export class WideColumnSectionFactory {
  public create(wall: WideColumnWallInput, direction: AnalysisDirection): WideColumnSection {
    const polygon = new Polygon(normalizeRing(wall.sectionPolygon));
    const physical = new Polygon(normalizeRing(wall.physicalPolygon ?? wall.sectionPolygon));
    const axisMinimum = direction === 'x' ? polygon.xMin() : polygon.yMin();
    const axisMaximum = direction === 'x' ? polygon.xMax() : polygon.yMax();
    const axisCentroid = direction === 'x' ? polygon.Cx() : polygon.Cy();
    const shearCorrection = direction === 'x' ? polygon.kx() : polygon.ky();
    const area = polygon.A();

    if (!(area > 0) || !(axisMaximum > axisMinimum)) {
      throw new RangeError(`Wall ${wall.id} has a degenerate transformed section.`);
    }
    if (!(shearCorrection > 0) || !Number.isFinite(shearCorrection)) {
      throw new RangeError(`Wall ${wall.id} has an invalid ${direction} shear correction factor.`);
    }

    const localCentroid = axisCentroid - axisMinimum;
    const displayLength = direction === 'x' ? physical.xSpan() : physical.ySpan();
    const displayThickness = physical.A() / displayLength;
    if (!(displayLength > 0 && displayThickness > 0)) throw new RangeError(`Wall ${wall.id} has invalid physical display dimensions.`);
    return {
      wallId: wall.id,
      direction,
      area,
      bendingInertia: direction === 'x' ? polygon.Iy() : polygon.Ix(),
      shearCorrection,
      effectiveShearArea: area * shearCorrection,
      centroid: { x: polygon.Cx(), y: polygon.Cy() },
      axisMinimum,
      axisMaximum,
      localCentroid,
      negativeArm: localCentroid,
      positiveArm: axisMaximum - axisCentroid,
      displayLength,
      displayThickness,
      material: wall.material,
    };
  }
}

/** Removes closure duplication and floating noise introduced by CAD boolean operations. */
function normalizeRing(points: readonly { x: number; y: number }[], tolerance = 1e-8): { x: number; y: number }[] {
  const normalized: { x: number; y: number }[] = [];
  for (const point of points) {
    const snapped = {
      x: Math.round(point.x / tolerance) * tolerance,
      y: Math.round(point.y / tolerance) * tolerance,
    };
    const previous = normalized.at(-1);
    if (!previous || previous.x !== snapped.x || previous.y !== snapped.y) normalized.push(snapped);
  }
  if (normalized.length > 1) {
    const first = normalized[0]!;
    const last = normalized.at(-1)!;
    if (first.x === last.x && first.y === last.y) normalized.pop();
  }
  if (normalized.length < 3) throw new RangeError('The normalized wall polygon has fewer than three distinct vertices.');
  return normalized;
}
