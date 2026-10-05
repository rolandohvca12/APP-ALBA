import { units } from '@app-alba/engineering-units';
import { forceKNValue, lengthM, timeSeconds } from '../../core/measurements.js';
import type { Measure } from '../../core/measurements.js';
import type { RuleResult } from '../../core/types.js';
import type { E030SeismicZone } from './metadata.js';
import { e030Rules } from './metadata.js';

export type ApproximatePeriodSystem = 'concreteOrSteelFrame' | 'bracedFrame' | 'masonryDualOrWalls';

export interface BaseShearInput {
  zoneFactor: number;
  useFactor: number;
  amplificationFactor: number;
  soilFactor: number;
  reductionFactor: number;
  seismicWeight: Measure<'force'>;
}

export interface BaseShearResult {
  coefficient: number;
  effectiveAmplificationFactor: number;
  baseShearKN: number;
}

export interface LevelWeight {
  level: string | number;
  weight: Measure<'force'>;
  height: Measure<'length'>;
}

export interface LevelForce {
  level: string | number;
  alpha: number;
  forceKN: number;
}

export interface RayleighLevel {
  weight: Measure<'force'>;
  lateralForce: Measure<'force'>;
  displacement: Measure<'length'>;
}

export class E030StaticAnalysis2026 {
  public checkEligibility(zone: E030SeismicZone, regular: boolean, totalHeight: Measure<'length'>, bearingWallSystem: boolean): RuleResult {
    const heightM = lengthM(totalHeight);
    const allowed = zone === 1 || (regular && heightM <= 30) || (bearingWallSystem && heightM <= 15);
    return e030Rules.boolean('33.2', 'Aplicabilidad del análisis estático', allowed, 'La estructura requiere análisis dinámico modal espectral.');
  }

  public baseShear(input: BaseShearInput): BaseShearResult {
    if (!(input.reductionFactor > 0)) throw new RangeError('reductionFactor must be greater than zero.');
    const effectiveAmplificationFactor = Math.max(input.amplificationFactor, 0.11 * input.reductionFactor);
    const coefficient = input.zoneFactor * input.useFactor * input.soilFactor * effectiveAmplificationFactor / input.reductionFactor;
    return { coefficient, effectiveAmplificationFactor, baseShearKN: coefficient * forceKNValue(input.seismicWeight) };
  }

  public heightExponent(periodSeconds: Measure<'time'>): number {
    const period = timeSeconds(periodSeconds);
    if (period < 0) throw new RangeError('periodSeconds must not be negative.');
    return period <= 0.5 ? 1 : Math.min(0.75 + 0.5 * period, 2);
  }

  public distributeByHeight(baseShear: Measure<'force'>, levels: readonly LevelWeight[], periodSeconds: Measure<'time'>): LevelForce[] {
    if (levels.length === 0) throw new RangeError('At least one level is required.');
    const k = this.heightExponent(periodSeconds);
    const terms = levels.map((level) => forceKNValue(level.weight) * lengthM(level.height) ** k);
    const denominator = terms.reduce((sum, value) => sum + value, 0);
    if (!(denominator > 0)) throw new RangeError('The sum of level distribution terms must be greater than zero.');
    const shearKN = forceKNValue(baseShear);
    return levels.map((level, index) => ({ level: level.level, alpha: terms[index]! / denominator, forceKN: shearKN * terms[index]! / denominator }));
  }

  public approximatePeriod(totalHeight: Measure<'length'>, system: ApproximatePeriodSystem): number {
    const ct = system === 'concreteOrSteelFrame' ? 35 : system === 'bracedFrame' ? 45 : 60;
    return lengthM(totalHeight) / ct;
  }

  public rayleighPeriod(levels: readonly RayleighLevel[], includeNonStructuralStiffness: boolean): number {
    if (levels.length === 0) throw new RangeError('At least one level is required.');
    const numerator = levels.reduce((sum, level) => sum + forceKNValue(level.weight) * lengthM(level.displacement) ** 2, 0);
    const denominator = units.convert(1, 'g', 'm/s2') * levels.reduce((sum, level) => sum + forceKNValue(level.lateralForce) * lengthM(level.displacement), 0);
    if (!(denominator > 0)) throw new RangeError('Rayleigh denominator must be greater than zero.');
    const period = 2 * Math.PI * Math.sqrt(numerator / denominator);
    return includeNonStructuralStiffness ? period : 0.85 * period;
  }

  public accidentalEccentricity(perpendicularPlanDimension: Measure<'length'>): number {
    return 0.05 * lengthM(perpendicularPlanDimension);
  }

  public accidentalTorsion(levelForce: Measure<'force'>, eccentricity: Measure<'length'>): number {
    return forceKNValue(levelForce) * lengthM(eccentricity);
  }

  public verticalSeismicForceFraction(zoneFactor: number, useFactor: number, soilFactor: number): number {
    return 2 / 3 * zoneFactor * useFactor * soilFactor;
  }

  public directionalCombination(primary: number, perpendicular: number): number {
    return Math.abs(primary) + 0.3 * Math.abs(perpendicular);
  }
}
