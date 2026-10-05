import { units } from '@app-alba/engineering-units';
import { forceKNValue } from '../../core/measurements.js';
import type { Measure } from '../../core/measurements.js';

export interface ModalResponse {
  response: number;
  angularFrequency: number;
}

export class E030ModalSpectral2026 {
  public spectralAcceleration(zoneFactor: number, useFactor: number, amplificationFactor: number, soilFactor: number, reductionFactor: number): number {
    if (!(reductionFactor > 0)) throw new RangeError('reductionFactor must be greater than zero.');
    return zoneFactor * useFactor * amplificationFactor * soilFactor / reductionFactor * units.convert(1, 'g', 'm/s2');
  }

  public checkModalMassParticipation(effectiveMassRatio: number, modes: number): boolean {
    return effectiveMassRatio >= 0.9 && modes >= 3;
  }

  public correlationCoefficient(omegaI: number, omegaJ: number, dampingRatio = 0.05): number {
    if (!(omegaI > 0) || !(omegaJ > 0) || dampingRatio < 0) throw new RangeError('Frequencies must be positive and damping must not be negative.');
    const lambda = omegaJ / omegaI;
    const beta2 = dampingRatio ** 2;
    return 8 * beta2 * (1 + lambda) * lambda ** 1.5
      / ((1 - lambda ** 2) ** 2 + 4 * beta2 * lambda * (1 + lambda) ** 2);
  }

  public completeQuadraticCombination(modes: readonly ModalResponse[], dampingRatio = 0.05): number {
    let sum = 0;
    for (const modeI of modes) {
      for (const modeJ of modes) {
        sum += modeI.response * this.correlationCoefficient(modeI.angularFrequency, modeJ.angularFrequency, dampingRatio) * modeJ.response;
      }
    }
    return Math.sqrt(Math.max(0, sum));
  }

  public alternativeCombination(responses: readonly number[]): number {
    const absoluteSum = responses.reduce((sum, response) => sum + Math.abs(response), 0);
    const squareRootSum = Math.sqrt(responses.reduce((sum, response) => sum + response ** 2, 0));
    return 0.25 * absoluteSum + 0.75 * squareRootSum;
  }

  public directionalCombination(primary: number, perpendicular: number): number {
    return Math.hypot(primary, 0.3 * perpendicular);
  }

  public minimumBaseShearScale(dynamicBaseShear: Measure<'force'>, staticBaseShear: Measure<'force'>, regular: boolean): number {
    const dynamic = forceKNValue(dynamicBaseShear);
    const required = (regular ? 0.8 : 0.9) * forceKNValue(staticBaseShear);
    if (!(dynamic > 0)) throw new RangeError('dynamicBaseShear must be greater than zero.');
    return Math.max(1, required / dynamic);
  }
}
