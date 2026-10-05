import { checkMaximum, checkMinimum, forceKN } from '../../core/rules.js';
import type { RuleResult } from '../../core/types.js';
import { forceKNValue, lengthM, stressMPaValue } from '../../core/measurements.js';
import type { Measure } from '../../core/measurements.js';

export interface InfillCapacityInput {
  fmMpa: Measure<'stress'>;
  panelLengthM: Measure<'length'>;
  panelHeightM: Measure<'length'>;
  panelThicknessM: Measure<'length'>;
  axialCompressiveStressMpa: Measure<'stress'>;
}

export interface InfillCapacityResult {
  diagonalLengthM: number;
  equivalentStrutWidthM: number;
  crushingCapacityKN: number;
  tensionCapacityKN: number;
  slidingCapacityKN: number;
  governingCapacityKN: number;
}

export class E070InfillFrame2006 {
  public checkFrameDrift(driftRatio: number): RuleResult {
    return checkMaximum('32.2', 'Distorsión del pórtico con tabiques', driftRatio, 1 / 200, 'ratio');
  }

  public capacity(input: InfillCapacityInput): InfillCapacityResult {
    const panelLengthM = lengthM(input.panelLengthM);
    const panelHeightM = lengthM(input.panelHeightM);
    const diagonalLengthM = Math.hypot(panelLengthM, panelHeightM);
    const equivalentStrutWidthM = diagonalLengthM / 4;
    const diagonalAreaM2 = diagonalLengthM * lengthM(input.panelThicknessM);
    const crushingCapacityKN = forceKN(0.12 * stressMPaValue(input.fmMpa), diagonalAreaM2);
    const tensionCapacityKN = forceKN(0.85 * stressMPaValue(input.fmMpa), diagonalAreaM2);
    const denominator = 1 - 0.4 * panelHeightM / panelLengthM;
    if (!(denominator > 0)) throw new RangeError('Panel geometry is outside the sliding-capacity expression domain.');
    const slidingCapacityKN = forceKN(stressMPaValue(input.axialCompressiveStressMpa), diagonalAreaM2) / denominator;
    return {
      diagonalLengthM,
      equivalentStrutWidthM,
      crushingCapacityKN,
      tensionCapacityKN,
      slidingCapacityKN,
      governingCapacityKN: Math.min(crushingCapacityKN, tensionCapacityKN, slidingCapacityKN),
    };
  }

  public checkCompression(appliedCompressionKN: Measure<'force'>, capacity: InfillCapacityResult): RuleResult {
    return checkMinimum('33.4', 'Resistencia de la biela equivalente', capacity.governingCapacityKN, forceKNValue(appliedCompressionKN), 'kN');
  }
}
