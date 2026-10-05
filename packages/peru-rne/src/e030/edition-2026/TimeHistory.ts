import type { RuleResult } from '../../core/types.js';
import { e030Rules } from './metadata.js';

export interface SpectrumPoint {
  periodSeconds: number;
  acceleration: number;
}

export class E030TimeHistory2026 {
  public checkRecordSets(count: number): RuleResult {
    return e030Rules.minimum('47.1', 'Conjuntos de registros sísmicos', count, 7, 'count');
  }

  public srssSpectrum(componentA: readonly SpectrumPoint[], componentB: readonly SpectrumPoint[]): SpectrumPoint[] {
    if (componentA.length !== componentB.length) throw new RangeError('Both components must contain the same number of points.');
    return componentA.map((point, index) => {
      const other = componentB[index]!;
      if (Math.abs(point.periodSeconds - other.periodSeconds) > 1e-9) throw new RangeError('Spectrum periods must match.');
      return { periodSeconds: point.periodSeconds, acceleration: Math.hypot(point.acceleration, other.acceleration) };
    });
  }

  public checkMeanSpectrum(meanSrss: readonly SpectrumPoint[], design: readonly SpectrumPoint[], fundamentalPeriod: number): RuleResult {
    if (meanSrss.length !== design.length) throw new RangeError('Spectrum arrays must have the same number of points.');
    const lower = 0.2 * fundamentalPeriod;
    const upper = 1.5 * fundamentalPeriod;
    const relevant = meanSrss.map((point, index) => ({ mean: point, design: design[index]! })).filter(({ mean }) => mean.periodSeconds >= lower && mean.periodSeconds <= upper);
    if (relevant.length === 0) throw new RangeError('No spectrum points lie in the required period range.');
    const minimumRatio = Math.min(...relevant.map(({ mean, design: target }) => mean.acceleration / target.acceleration));
    return e030Rules.minimum('47.5-47.6', 'Compatibilidad del espectro promedio', minimumRatio, 1, 'ratio');
  }

  public checkIndividualCompatibleSpectrum(record: readonly SpectrumPoint[], design: readonly SpectrumPoint[], fundamentalPeriod: number): RuleResult {
    const lower = 0.2 * fundamentalPeriod;
    const upper = 1.5 * fundamentalPeriod;
    const ratios = record.map((point, index) => ({ point, target: design[index]! })).filter(({ point }) => point.periodSeconds >= lower && point.periodSeconds <= upper).map(({ point, target }) => point.acceleration / target.acceleration);
    if (ratios.length === 0) throw new RangeError('No spectrum points lie in the required period range.');
    return e030Rules.minimum('47.6', 'Espectro individual compatible', Math.min(...ratios), 0.9, 'ratio');
  }

  public checkDamping(dampingRatio: number): RuleResult {
    return e030Rules.maximum('48.5', 'Amortiguamiento viscoso equivalente', dampingRatio, 0.05, 'ratio');
  }
}
