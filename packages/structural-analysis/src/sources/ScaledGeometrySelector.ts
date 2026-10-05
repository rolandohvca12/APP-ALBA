import { units, type UnitFor } from '@app-alba/engineering-units';
import type { AutoCadQueryClient, GeometrySelector, RawGeometry } from '@app-alba/autocad-client';

/** Reads AutoCAD drawing coordinates in their declared length unit and returns meters. */
export class ScaledGeometrySelector implements GeometrySelector {
  private readonly scale: number;

  public constructor(private readonly source: GeometrySelector, drawingLengthUnit: UnitFor<'length'>) {
    this.scale = units.convert(1, drawingLengthUnit, 'm');
  }

  public async resolve(query: AutoCadQueryClient): Promise<RawGeometry[]> {
    const geometry = await this.source.resolve(query);
    if (this.scale === 1) return geometry;
    return geometry.map((item) => ({
      ...item,
      points: item.points.map((point) => ({
        x: point.x * this.scale,
        y: point.y * this.scale,
        z: point.z * this.scale,
      })),
      length: item.length * this.scale,
      area: item.area * this.scale ** 2,
    }));
  }

  public resolveLabels(query: AutoCadQueryClient): Promise<Map<string, string>> {
    return this.source.resolveLabels(query);
  }

  public describe(): string { return this.source.describe(); }
}
