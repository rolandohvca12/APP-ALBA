import type {
  AutoCadQueryClient,
  GeometrySelector,
  RawGeometry,
} from '@app-alba/autocad-client';

export interface DuplicateGeometry {
  keptHandle: string;
  duplicateHandle: string;
}

/** Removes coincident closed geometries before they can duplicate mass or stiffness. */
export class DistinctGeometrySelector implements GeometrySelector {
  private readonly reported = new Set<string>();

  public constructor(
    private readonly source: GeometrySelector,
    private readonly tolerance = 1e-6,
    private readonly onDuplicate?: (duplicate: DuplicateGeometry) => void,
  ) {
    if (!(tolerance > 0 && Number.isFinite(tolerance))) {
      throw new RangeError('Distinct geometry tolerance must be finite and positive.');
    }
  }

  public async resolve(query: AutoCadQueryClient): Promise<RawGeometry[]> {
    const geometries = await this.source.resolve(query);
    const distinct: RawGeometry[] = [];
    for (const geometry of geometries) {
      const existing = distinct.find((candidate) => sameGeometry(candidate, geometry, this.tolerance));
      if (!existing) {
        distinct.push(geometry);
        continue;
      }
      const key = `${existing.handle}|${geometry.handle}`;
      if (!this.reported.has(key)) {
        this.reported.add(key);
        this.onDuplicate?.({ keptHandle: existing.handle, duplicateHandle: geometry.handle });
      }
    }
    return distinct;
  }

  public resolveLabels(query: AutoCadQueryClient): Promise<Map<string, string>> {
    return this.source.resolveLabels(query);
  }

  public describe(): string { return `distinct(${this.source.describe()})`; }
}

function sameGeometry(a: RawGeometry, b: RawGeometry, tolerance: number): boolean {
  const pointsA = openPoints(a.points, tolerance);
  const pointsB = openPoints(b.points, tolerance);
  if (pointsA.length !== pointsB.length) return false;
  if (Math.abs(a.area - b.area) > tolerance ** 2) return false;
  if (pointsA.length === 0) return true;

  for (let start = 0; start < pointsB.length; start += 1) {
    if (!samePoint(pointsA[0]!, pointsB[start]!, tolerance)) continue;
    if (matchesRing(pointsA, pointsB, start, 1, tolerance)) return true;
    if (matchesRing(pointsA, pointsB, start, -1, tolerance)) return true;
  }
  return false;
}

function matchesRing(
  a: RawGeometry['points'],
  b: RawGeometry['points'],
  start: number,
  direction: 1 | -1,
  tolerance: number,
): boolean {
  return a.every((point, index) => {
    const bIndex = (start + direction * index + b.length) % b.length;
    return samePoint(point, b[bIndex]!, tolerance);
  });
}

function samePoint(
  a: RawGeometry['points'][number],
  b: RawGeometry['points'][number],
  tolerance: number,
): boolean {
  return Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z) <= tolerance;
}

function openPoints(points: RawGeometry['points'], tolerance: number): RawGeometry['points'] {
  if (points.length < 2) return points;
  const first = points[0]!;
  const last = points.at(-1)!;
  return Math.hypot(first.x - last.x, first.y - last.y, first.z - last.z) <= tolerance
    ? points.slice(0, -1)
    : points;
}
