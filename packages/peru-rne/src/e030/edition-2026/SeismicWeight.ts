import { forceKNValue } from '../../core/measurements.js';
import type { Measure } from '../../core/measurements.js';
import type { BuildingCategory } from './BuildingClassification.js';

export type WeightComponentKind = 'regularFloor' | 'roof' | 'storage' | 'tankOrSilo';

export interface SeismicWeightInput {
  permanentLoad: Measure<'force'>;
  liveLoad: Measure<'force'>;
  category: BuildingCategory;
  kind?: WeightComponentKind;
}

export class E030SeismicWeight2026 {
  public liveLoadFraction(category: BuildingCategory, kind: WeightComponentKind = 'regularFloor'): number {
    if (kind === 'tankOrSilo') return 1;
    if (kind === 'storage') return 0.8;
    if (kind === 'roof') return 0.25;
    return category === 'C' ? 0.25 : 0.5;
  }

  public calculate(input: SeismicWeightInput): number {
    return forceKNValue(input.permanentLoad) + this.liveLoadFraction(input.category, input.kind) * forceKNValue(input.liveLoad);
  }
}
