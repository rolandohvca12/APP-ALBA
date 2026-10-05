import { checkMaximum, checkMinimum, clamp, forceKN } from '../../core/rules.js';
import type { RuleResult } from '../../core/types.js';
import type { MasonryUnitMaterial } from './Materials.js';
import { forceKNValue, lengthM, momentKNm, stressMPaValue } from '../../core/measurements.js';
import type { Measure } from '../../core/measurements.js';

export interface CrackingShearInput {
  material: MasonryUnitMaterial;
  vmMpa: Measure<'stress'>;
  wallThicknessM: Measure<'length'>;
  wallLengthM: Measure<'length'>;
  axialDeadLoadKN: Measure<'force'>;
  elasticShearKN: Measure<'force'>;
  elasticMomentKNm: Measure<'moment'>;
}

export interface MasonryElasticProperties {
  elasticModulusMpa: number;
  shearModulusMpa: number;
}

export class E070Analysis2006 {
  public responseReductionFactor(level: 'moderate' | 'severe'): number {
    return level === 'severe' ? 3 : 6;
  }

  public checkStoryDrift(driftRatio: number): RuleResult {
    return checkMaximum('22.1', 'Distorsión angular de entrepiso', driftRatio, 1 / 200, 'ratio');
  }

  public elasticProperties(material: MasonryUnitMaterial, fmMpa: Measure<'stress'>): MasonryElasticProperties {
    const multiplier = material === 'clay' ? 500 : material === 'calciumSilicate' ? 600 : 700;
    const elasticModulusMpa = multiplier * stressMPaValue(fmMpa);
    return { elasticModulusMpa, shearModulusMpa: 0.4 * elasticModulusMpa };
  }

  public shearReductionFactor(input: Pick<CrackingShearInput, 'elasticShearKN' | 'wallLengthM' | 'elasticMomentKNm'>): number {
    const moment = momentKNm(input.elasticMomentKNm);
    if (moment === 0) throw new RangeError('elasticMomentKNm must not be zero.');
    return clamp(Math.abs(forceKNValue(input.elasticShearKN) * lengthM(input.wallLengthM) / moment), 1 / 3, 1);
  }

  public crackingShear(input: CrackingShearInput): number {
    const coefficient = input.material === 'calciumSilicate' ? 0.35 : 0.5;
    const alpha = this.shearReductionFactor(input);
    return forceKN(coefficient * stressMPaValue(input.vmMpa) * alpha, lengthM(input.wallThicknessM) * lengthM(input.wallLengthM))
      + 0.23 * forceKNValue(input.axialDeadLoadKN);
  }

  public checkCrackingControl(elasticShearKN: Measure<'force'>, crackingShearKN: Measure<'force'>): RuleResult {
    return checkMaximum('26.2', 'Control de fisuración en servicio', forceKNValue(elasticShearKN), 0.55 * forceKNValue(crackingShearKN), 'kN');
  }

  public checkBuildingShearCapacity(sumCrackingShearKN: Measure<'force'>, buildingShearKN: Measure<'force'>): RuleResult {
    return checkMinimum('26.4', 'Resistencia global al corte', forceKNValue(sumCrackingShearKN), forceKNValue(buildingShearKN), 'kN');
  }

  public mayUseElasticResponse(sumCrackingShearKN: Measure<'force'>, buildingShearKN: Measure<'force'>): boolean {
    return forceKNValue(sumCrackingShearKN) >= 3 * forceKNValue(buildingShearKN);
  }

  public severeEarthquakeAmplification(firstStoryCrackingShearKN: Measure<'force'>, firstStoryElasticShearKN: Measure<'force'>): number {
    const elastic = forceKNValue(firstStoryElasticShearKN);
    if (!(elastic > 0)) throw new RangeError('firstStoryElasticShearKN must be greater than zero.');
    return clamp(forceKNValue(firstStoryCrackingShearKN) / elastic, 2, 3);
  }
}
