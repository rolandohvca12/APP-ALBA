import { checkMinimum, checkMaximum } from '../../core/rules.js';
import { units } from '@app-alba/engineering-units';
import { areaLoadKNm2, lengthM, plateMomentKNmPerM, stressMPaValue, volumetricWeightKNm3 } from '../../core/measurements.js';
import type { Measure } from '../../core/measurements.js';
import type { RuleResult } from '../../core/types.js';

export type WallSupportCase = 1 | 2 | 3 | 4;

const case1 = [[1, 0.0479], [1.2, 0.0627], [1.4, 0.0755], [1.6, 0.0862], [1.8, 0.0948], [2, 0.1017], [3, 0.118], [Number.POSITIVE_INFINITY, 0.125]] as const;
const case2 = [[0.5, 0.06], [0.6, 0.074], [0.7, 0.087], [0.8, 0.097], [0.9, 0.106], [1, 0.112], [1.5, 0.128], [2, 0.132], [Number.POSITIVE_INFINITY, 0.133]] as const;

function interpolate(table: readonly (readonly [number, number])[], ratio: number): number {
  if (ratio <= table[0]![0]) return table[0]![1];
  for (let index = 1; index < table.length; index += 1) {
    const upper = table[index]!;
    const lower = table[index - 1]!;
    if (ratio <= upper[0]) {
      if (!Number.isFinite(upper[0])) return upper[1];
      const fraction = (ratio - lower[0]) / (upper[0] - lower[0]);
      return lower[1] + fraction * (upper[1] - lower[1]);
    }
  }
  return table.at(-1)![1];
}

export interface OutOfPlaneLoadInput {
  seismicZoneFactor: number;
  useFactor: number;
  elementCoefficient: number;
  unitWeightKNm3: Measure<'volumetricWeight'>;
  thicknessM: Measure<'length'>;
}

export class E070OutOfPlane2006 {
  public perpendicularLoad(input: OutOfPlaneLoadInput): number {
    return 0.8 * input.seismicZoneFactor * input.useFactor * input.elementCoefficient * volumetricWeightKNm3(input.unitWeightKNm3) * lengthM(input.thicknessM);
  }

  public momentCoefficient(supportCase: WallSupportCase, aspectRatio: number): number {
    if (!(aspectRatio > 0)) throw new RangeError('aspectRatio must be greater than zero.');
    if (supportCase === 1) return interpolate(case1, aspectRatio);
    if (supportCase === 2) return interpolate(case2, aspectRatio);
    if (supportCase === 3) return 0.125;
    return 0.5;
  }

  public designMoment(loadKNm2: Measure<'areaLoad'>, freeDimensionM: Measure<'length'>, coefficient: number): number {
    return coefficient * areaLoadKNm2(loadKNm2) * lengthM(freeDimensionM) ** 2;
  }

  public flexuralStress(momentKNmPerM: Measure<'plateMoment'>, thicknessM: Measure<'length'>): number {
    const stressKNm2 = 6 * plateMomentKNmPerM(momentKNmPerM) / lengthM(thicknessM) ** 2;
    return units.convert(stressKNm2, 'kN/m2', 'MPa');
  }

  public checkFlexuralStress(stressMpa: Measure<'stress'>, reinforcedAndFilled: boolean): RuleResult {
    return checkMaximum('30.7', 'Tracción por flexión perpendicular al plano', stressMPaValue(stressMpa), reinforcedAndFilled ? 0.3 : 0.15, 'MPa');
  }

  public checkParapetStability(overturningSafetyFactor: number, slidingSafetyFactor: number): RuleResult[] {
    return [
      checkMinimum('31', 'Seguridad al volteo', overturningSafetyFactor, 2, 'ratio'),
      checkMinimum('31', 'Seguridad al deslizamiento', slidingSafetyFactor, 1.5, 'ratio'),
    ];
  }
}
