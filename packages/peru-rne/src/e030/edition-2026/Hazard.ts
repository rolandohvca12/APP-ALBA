import { lengthM, stressMPaValue, timeSeconds } from '../../core/measurements.js';
import type { Measure } from '../../core/measurements.js';
import { clamp } from '../../core/rules.js';
import type { RuleResult } from '../../core/types.js';
import type { BuildingCategory } from './BuildingClassification.js';
import type { E030SeismicZone, E030SoilProfile } from './metadata.js';
import { e030Rules } from './metadata.js';

export interface SoilLayer<T> {
  thicknessM: Measure<'length'>;
  value: T;
}

export interface SoilClassificationInput {
  exceptional?: boolean;
  vs30Mps?: number;
  correctedN60?: number;
  undrainedShearStrength?: Measure<'stress'>;
}

export interface SiteParameters {
  soilFactor: number | null;
  tpSeconds: number | null;
  tlSeconds: number | null;
  requiresSiteResponseAnalysis: boolean;
}

const zoneFactors: Readonly<Record<E030SeismicZone, number>> = { 1: 0.1, 2: 0.25, 3: 0.35, 4: 0.45 };

function interpolateByVs(vs: number, lowerVs: number, upperVs: number, valueAtLowerVs: number, valueAtUpperVs: number): number {
  const position = clamp((vs - lowerVs) / (upperVs - lowerVs), 0, 1);
  return valueAtLowerVs + position * (valueAtUpperVs - valueAtLowerVs);
}

export class E030Hazard2026 {
  public zoneFactor(zone: E030SeismicZone): number {
    return zoneFactors[zone];
  }

  public harmonicAverage(layers: readonly SoilLayer<number>[]): number {
    if (layers.length === 0) throw new RangeError('At least one soil layer is required.');
    const totalThickness = layers.reduce((sum, layer) => sum + lengthM(layer.thicknessM), 0);
    if (!(totalThickness > 0) || layers.some((layer) => !(lengthM(layer.thicknessM) > 0) || !(layer.value > 0))) {
      throw new RangeError('Layer thicknesses and values must be greater than zero.');
    }
    return totalThickness / layers.reduce((sum, layer) => sum + lengthM(layer.thicknessM) / layer.value, 0);
  }

  public classifySoil(input: SoilClassificationInput): E030SoilProfile {
    if (input.exceptional) return 'S5';
    const candidates: E030SoilProfile[] = [];
    if (input.vs30Mps !== undefined) {
      const vs = input.vs30Mps;
      if (!(vs > 0)) throw new RangeError('vs30Mps must be greater than zero.');
      candidates.push(vs >= 800 ? 'S0' : vs >= 550 ? 'S1' : vs >= 350 ? 'S2' : vs >= 200 ? 'S3' : 'S4');
    }
    if (input.correctedN60 !== undefined) {
      const n = input.correctedN60;
      if (!(n > 0)) throw new RangeError('correctedN60 must be greater than zero.');
      candidates.push(n > 50 ? 'S1' : n >= 30 ? 'S2' : n >= 15 ? 'S3' : 'S4');
    }
    if (input.undrainedShearStrength !== undefined) {
      const suKpa = stressMPaValue(input.undrainedShearStrength) * 1000;
      candidates.push(suKpa > 100 ? 'S1' : suKpa >= 80 ? 'S2' : suKpa >= 50 ? 'S3' : 'S4');
    }
    if (candidates.length === 0) throw new RangeError('At least one soil classification parameter is required.');
    const rank: Record<E030SoilProfile, number> = { S0: 0, S1: 1, S2: 2, S3: 3, S4: 4, S5: 5 };
    return candidates.reduce((worst, candidate) => rank[candidate] > rank[worst] ? candidate : worst);
  }

  public siteParameters(zone: E030SeismicZone, profile: E030SoilProfile, vs30Mps?: number): SiteParameters {
    if (profile === 'S5' || (profile === 'S4' && zone === 4)) {
      return { soilFactor: null, tpSeconds: null, tlSeconds: null, requiresSiteResponseAnalysis: true };
    }
    if (profile === 'S0') return { soilFactor: 0.8, tpSeconds: 0.3, tlSeconds: 3, requiresSiteResponseAnalysis: false };
    if (profile === 'S1') return { soilFactor: 1, tpSeconds: 0.4, tlSeconds: 2.5, requiresSiteResponseAnalysis: false };
    if (profile === 'S4') {
      const soilFactor = ({ 1: 2.4, 2: 1.7, 3: 1.3 } as const)[zone as 1 | 2 | 3];
      return { soilFactor, tpSeconds: 1.2, tlSeconds: 1.6, requiresSiteResponseAnalysis: false };
    }
    const ranges = profile === 'S2'
      ? { lowerVs: 350, upperVs: 550, sLow: { 1: 1.3, 2: 1.3, 3: 1.15, 4: 1.1 }, sHigh: { 1: 1, 2: 1, 3: 1, 4: 1 }, tpLow: 0.6, tpHigh: 0.4, tlLow: 2, tlHigh: 2.5 }
      : { lowerVs: 200, upperVs: 350, sLow: { 1: 1.6, 2: 1.4, 3: 1.2, 4: 1.2 }, sHigh: { 1: 1.3, 2: 1.3, 3: 1.15, 4: 1.1 }, tpLow: 0.9, tpHigh: 0.6, tlLow: 1.6, tlHigh: 2 };
    if (vs30Mps === undefined) {
      return { soilFactor: ranges.sLow[zone], tpSeconds: ranges.tpLow, tlSeconds: ranges.tlLow, requiresSiteResponseAnalysis: false };
    }
    return {
      soilFactor: interpolateByVs(vs30Mps, ranges.lowerVs, ranges.upperVs, ranges.sLow[zone], ranges.sHigh[zone]),
      tpSeconds: interpolateByVs(vs30Mps, ranges.lowerVs, ranges.upperVs, ranges.tpLow, ranges.tpHigh),
      tlSeconds: interpolateByVs(vs30Mps, ranges.lowerVs, ranges.upperVs, ranges.tlLow, ranges.tlHigh),
      requiresSiteResponseAnalysis: false,
    };
  }

  public amplificationFactor(periodSeconds: Measure<'time'>, tpSeconds: Measure<'time'>, tlSeconds: Measure<'time'>): number {
    const period = timeSeconds(periodSeconds);
    const tp = timeSeconds(tpSeconds);
    const tl = timeSeconds(tlSeconds);
    if (period < 0 || !(tp > 0) || !(tl > tp)) throw new RangeError('Invalid spectral periods.');
    if (period < 0.2 * tp) return 1 + 7.5 * period / tp;
    if (period <= tp) return 2.5;
    if (period < tl) return 2.5 * tp / period;
    return 2.5 * tp * tl / period ** 2;
  }

  public staticAmplificationFactor(periodSeconds: Measure<'time'>, tpSeconds: Measure<'time'>, tlSeconds: Measure<'time'>): number {
    return timeSeconds(periodSeconds) <= timeSeconds(tpSeconds) ? 2.5 : this.amplificationFactor(periodSeconds, tpSeconds, tlSeconds);
  }

  public checkPredominantSitePeriod(category: BuildingCategory, zone: E030SeismicZone, profile: E030SoilProfile, sitePeriodSeconds: Measure<'time'>, tlSeconds: Measure<'time'>): RuleResult {
    const applies = (category === 'A1' || category === 'A2' || category === 'B') && zone === 4 && profile !== 'S0' && profile !== 'S5';
    if (!applies) return e030Rules.rule('14.8', 'Período predominante del sitio', 'notApplicable', 'La comprobación H/V de 14.8 no aplica a la combinación declarada.');
    return e030Rules.maximum('14.8', 'Período predominante del sitio', timeSeconds(sitePeriodSeconds), 0.65 * timeSeconds(tlSeconds), 's', { profile });
  }
}
