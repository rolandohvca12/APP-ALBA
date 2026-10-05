import { lengthM } from '../../core/measurements.js';
import type { Measure } from '../../core/measurements.js';
import type { RuleResult } from '../../core/types.js';
import { e030Rules } from './metadata.js';

export type PredominantMaterial = 'reinforcedConcrete' | 'steel' | 'masonry' | 'wood' | 'emdl';

const driftLimits: Readonly<Record<PredominantMaterial, number>> = {
  reinforcedConcrete: 0.007,
  steel: 0.01,
  masonry: 0.005,
  wood: 0.01,
  emdl: 0.004,
};

export class E030DriftAndSeparation2026 {
  public amplifiedDisplacement(elasticDisplacement: Measure<'length'>, reductionFactor: number, regular: boolean): number {
    return (regular ? 0.75 : 0.85) * reductionFactor * lengthM(elasticDisplacement);
  }

  public drift(displacementDifference: Measure<'length'>, storyHeight: Measure<'length'>): number {
    return Math.abs(lengthM(displacementDifference)) / lengthM(storyHeight);
  }

  public driftLimit(material: PredominantMaterial, industrialLimit?: number): number {
    const baseLimit = driftLimits[material];
    if (industrialLimit === undefined) return baseLimit;
    if (!(industrialLimit > 0) || industrialLimit > 2 * baseLimit) throw new RangeError('The industrial drift limit must be positive and not exceed twice the Table 14 limit.');
    return industrialLimit;
  }

  public checkDrift(driftRatio: number, material: PredominantMaterial, industrialLimit?: number): RuleResult {
    return e030Rules.maximum('51 y Tabla 14', 'Distorsión de entrepiso', driftRatio, this.driftLimit(material, industrialLimit), 'ratio', { material, industrial: industrialLimit !== undefined });
  }

  public checkTimeHistoryDrift(driftRatio: number, material: PredominantMaterial, industrialLimit?: number): RuleResult {
    return e030Rules.maximum('49.2', 'Distorsión de entrepiso en tiempo-historia', driftRatio, 1.25 * this.driftLimit(material, industrialLimit), 'ratio', { material, industrial: industrialLimit !== undefined });
  }

  public minimumBuildingSeparation(zoneFactor: number, soilFactor: number, height: Measure<'length'>, adjacentDisplacementSum?: Measure<'length'>): number {
    const spectralMinimum = Math.max(0.02 * zoneFactor * soilFactor * lengthM(height), 0.03);
    return adjacentDisplacementSum === undefined ? spectralMinimum : Math.max(spectralMinimum, 2 / 3 * lengthM(adjacentDisplacementSum));
  }

  public propertyBoundarySeparation(maximumDisplacement: Measure<'length'>, regulatoryJoint?: Measure<'length'>): number {
    const displacementRequirement = 2 / 3 * lengthM(maximumDisplacement);
    return regulatoryJoint === undefined ? displacementRequirement : Math.max(displacementRequirement, lengthM(regulatoryJoint) / 2);
  }

  public redundancyAmplification(elementShearShare: number): number {
    return elementShearShare >= 0.3 ? 1.25 : 1;
  }
}
