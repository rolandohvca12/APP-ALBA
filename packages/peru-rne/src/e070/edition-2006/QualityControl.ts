import { checkMaximum, rule } from '../../core/rules.js';
import type { RuleResult } from '../../core/types.js';
import type { E070SeismicZone2006 } from './metadata.js';
import type { MasonryUnitMaterial } from './Materials.js';
import { areaM2, stressMPaValue } from '../../core/measurements.js';
import type { Measure } from '../../core/measurements.js';

export type StrengthDeterminationMethod = 'empirical' | 'laboratory';
export type PrismKind = 'pile' | 'wallette';

export interface StrengthMethodRequirement {
  fm: StrengthDeterminationMethod;
  vm: StrengthDeterminationMethod;
}

export interface ConstructionTestFrequency {
  pileSets: number;
  walletteSets: number;
  specimensPerSet: 3;
}

export class E070QualityControl2006 {
  public characteristicStrength(values: readonly Measure<'stress'>[], standardDeviationFactor = 1): number {
    if (values.length < 2) throw new RangeError('At least two test values are required.');
    const normalized = values.map(stressMPaValue);
    if (normalized.some((value) => !Number.isFinite(value) || value <= 0)) throw new RangeError('Test values must be finite and positive.');
    const mean = normalized.reduce((sum, value) => sum + value, 0) / normalized.length;
    const variance = normalized.reduce((sum, value) => sum + (value - mean) ** 2, 0) / (normalized.length - 1);
    return mean - standardDeviationFactor * Math.sqrt(variance);
  }

  public requiredStrengthMethod(zone: E070SeismicZone2006, stories: number): StrengthMethodRequirement {
    if (!Number.isInteger(stories) || stories < 1) throw new RangeError('stories must be a positive integer.');
    if (stories <= 2) return { fm: 'empirical', vm: 'empirical' };
    if (stories <= 5) {
      return {
        fm: zone === 1 ? 'empirical' : 'laboratory',
        vm: zone === 3 ? 'laboratory' : 'empirical',
      };
    }
    return {
      fm: 'laboratory',
      vm: zone === 1 ? 'empirical' : 'laboratory',
    };
  }

  public constructionTestFrequency(zone: E070SeismicZone2006, stories: number, roofAreaM2: Measure<'area'>): ConstructionTestFrequency {
    if (zone === 1) return { pileSets: 0, walletteSets: 0, specimensPerSet: 3 };
    const normalizedAreaM2 = areaM2(roofAreaM2);
    const pileSets = Math.ceil(normalizedAreaM2 / 500);
    const walletteArea = stories <= 2 ? 1000 : 500;
    return { pileSets, walletteSets: Math.ceil(normalizedAreaM2 / walletteArea), specimensPerSet: 3 };
  }

  public ageCorrection(kind: PrismKind, material: MasonryUnitMaterial, ageDays: 14 | 21 | 28): number {
    if (ageDays === 28) return 1;
    if (kind === 'pile') return ageDays === 14 ? 1.1 : 1;
    if (material === 'calciumSilicate') throw new Error('Table 8 does not provide wallette age factors for calcium-silicate units.');
    if (ageDays === 21) return 1.05;
    return material === 'concrete' ? 1.25 : 1.15;
  }

  public checkShearStrengthLimit(vmMpa: Measure<'stress'>, fmMpa: Measure<'stress'>): RuleResult {
    const vm = stressMPaValue(vmMpa);
    const fm = stressMPaValue(fmMpa);
    return checkMaximum('13.8', 'Límite de resistencia característica a corte', vm, 0.319 * Math.sqrt(fm), 'MPa', { fmMpa: fm });
  }

  public documentMethod(zone: E070SeismicZone2006, stories: number, used: StrengthMethodRequirement): RuleResult[] {
    const required = this.requiredStrengthMethod(zone, stories);
    return (['fm', 'vm'] as const).map((property) => {
      const passes = used[property] === 'laboratory' || required[property] === 'empirical';
      return rule('13.1 - Tabla 7', `Método de determinación de ${property}`, passes ? 'pass' : 'fail', passes ? 'El método satisface la Tabla 7.' : `Se requieren ensayos de laboratorio para ${property}.`, null, null, { required: required[property], used: used[property] });
    });
  }
}
