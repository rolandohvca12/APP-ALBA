import type { RuleResult } from '../../core/types.js';
import type { E030SeismicZone, E030SoilProfile } from './metadata.js';
import { e030Rules } from './metadata.js';

export type BuildingCategory = 'A1' | 'A2' | 'B' | 'C';
export type StructuralSystem =
  | 'steel-smf' | 'steel-imf' | 'steel-omf' | 'steel-scbf' | 'steel-ocbf' | 'steel-ebf'
  | 'concrete-frame' | 'concrete-dual' | 'concrete-wall' | 'concrete-emdl'
  | 'masonry' | 'wood' | 'earth' | 'inverted-pendulum';

export type HeightIrregularity = 'softStory' | 'weakStory' | 'extremeSoftStory' | 'extremeWeakStory' | 'mass' | 'verticalGeometry' | 'discontinuity' | 'extremeDiscontinuity';
export type PlanIrregularity = 'torsion' | 'extremeTorsion' | 'reentrantCorner' | 'diaphragmDiscontinuity' | 'nonParallel';

const r0Values: Readonly<Record<Exclude<StructuralSystem, 'earth'>, number>> = {
  'steel-smf': 8, 'steel-imf': 5, 'steel-omf': 4, 'steel-scbf': 7, 'steel-ocbf': 4, 'steel-ebf': 8,
  'concrete-frame': 8, 'concrete-dual': 7, 'concrete-wall': 6, 'concrete-emdl': 3.5,
  masonry: 3, wood: 7, 'inverted-pendulum': 2.5,
};

const heightFactors: Readonly<Record<HeightIrregularity, number>> = {
  softStory: 0.75, weakStory: 0.75, extremeSoftStory: 0.5, extremeWeakStory: 0.5,
  mass: 0.9, verticalGeometry: 0.9, discontinuity: 0.8, extremeDiscontinuity: 0.6,
};

const planFactors: Readonly<Record<PlanIrregularity, number>> = {
  torsion: 0.75, extremeTorsion: 0.6, reentrantCorner: 0.9, diaphragmDiscontinuity: 0.85, nonParallel: 0.9,
};

const systems = {
  steelDuctile: new Set<StructuralSystem>(['steel-smf', 'steel-imf', 'steel-scbf', 'steel-ocbf', 'steel-ebf']),
  essential: new Set<StructuralSystem>(['steel-scbf', 'steel-ebf', 'concrete-dual', 'concrete-wall', 'masonry']),
  important: new Set<StructuralSystem>(['steel-smf', 'steel-imf', 'steel-scbf', 'steel-ocbf', 'steel-ebf', 'concrete-frame', 'concrete-dual', 'concrete-wall', 'masonry', 'wood']),
};

export interface UseFactorInput {
  category: BuildingCategory;
  seismicZone: E030SeismicZone;
  baseIsolated?: boolean;
}

export interface BuildingUseArea {
  category: BuildingCategory;
  areaM2: number;
}

export class E030BuildingClassification2026 {
  public classifyConcreteSystem(wallBaseShearShare: number): 'concrete-frame' | 'concrete-dual' | 'concrete-wall' {
    if (wallBaseShearShare < 0 || wallBaseShearShare > 1) throw new RangeError('wallBaseShearShare must be between zero and one.');
    return wallBaseShearShare >= 0.7 ? 'concrete-wall' : wallBaseShearShare > 0.2 ? 'concrete-dual' : 'concrete-frame';
  }

  public useFactor(input: UseFactorInput): number {
    if (input.category === 'A1') {
      if (input.baseIsolated) return 1;
      if (input.seismicZone >= 3) throw new Error('Category A1 buildings in zones 3 and 4 require base isolation.');
      return 1.5;
    }
    return input.category === 'A2' ? 1.5 : input.category === 'B' ? 1.3 : 1;
  }

  public useFactorForCombinedUses(uses: readonly BuildingUseArea[], seismicZone: E030SeismicZone, baseIsolated = false): number {
    const totalArea = uses.reduce((sum, use) => sum + use.areaM2, 0);
    if (!(totalArea > 0) || uses.some((use) => !(use.areaM2 > 0))) throw new RangeError('Use areas must be greater than zero.');
    const relevant = uses.filter((use) => use.areaM2 / totalArea > 0.15);
    const considered = relevant.length > 0 ? relevant : uses;
    return Math.max(...considered.map((use) => this.useFactor({ category: use.category, seismicZone, baseIsolated })));
  }

  public basicReductionFactor(system: StructuralSystem): number {
    if (system === 'earth') throw new Error('Table 10 of RNE E.030:2026 does not assign R0 to earth structures; use the applicable material standard.');
    return r0Values[system];
  }

  public checkSystem(category: BuildingCategory, zone: E030SeismicZone, system: StructuralSystem, soil: E030SoilProfile, baseIsolated = false): RuleResult[] {
    let allowed = true;
    if (system === 'earth' && (soil === 'S4' || soil === 'S5')) allowed = false;
    if (category === 'A1') allowed = allowed && (zone >= 3 ? baseIsolated : systems.essential.has(system));
    if (category === 'A2') allowed = allowed && (zone === 1 || systems.essential.has(system));
    if (category === 'B') allowed = allowed && (zone === 1 || systems.important.has(system));
    return [e030Rules.boolean('21 y Tabla 9', 'Sistema permitido por categoría y zona', allowed, 'El sistema estructural no está permitido para la categoría, zona o suelo declarados.')];
  }

  public heightIrregularityFactor(active: readonly HeightIrregularity[]): number {
    return active.reduce((factor, irregularity) => Math.min(factor, heightFactors[irregularity]), 1);
  }

  public planIrregularityFactor(active: readonly PlanIrregularity[]): number {
    return active.reduce((factor, irregularity) => Math.min(factor, planFactors[irregularity]), 1);
  }

  public reductionFactor(system: StructuralSystem, heightIrregularities: readonly HeightIrregularity[], planIrregularities: readonly PlanIrregularity[]): number {
    return this.basicReductionFactor(system) * this.heightIrregularityFactor(heightIrregularities) * this.planIrregularityFactor(planIrregularities);
  }

  public classifyStoryStiffness(current: number, upper: number, averageThreeUpper?: number): HeightIrregularity | null {
    if (!(current > 0) || !(upper > 0)) throw new RangeError('Story stiffnesses must be greater than zero.');
    const extreme = current < 0.6 * upper || (averageThreeUpper !== undefined && current < 0.7 * averageThreeUpper);
    if (extreme) return 'extremeSoftStory';
    const ordinary = current < 0.7 * upper || (averageThreeUpper !== undefined && current < 0.8 * averageThreeUpper);
    return ordinary ? 'softStory' : null;
  }

  public classifyStoryStrength(current: number, upper: number): HeightIrregularity | null {
    if (!(current > 0) || !(upper > 0)) throw new RangeError('Story strengths must be greater than zero.');
    return current < 0.65 * upper ? 'extremeWeakStory' : current < 0.8 * upper ? 'weakStory' : null;
  }

  public classifyTorsion(maximumDrift: number, averageEndDrift: number, allowableDrift: number, rigidDiaphragm: boolean): PlanIrregularity | null {
    if (!rigidDiaphragm || maximumDrift <= 0.5 * allowableDrift) return null;
    if (!(averageEndDrift > 0)) throw new RangeError('averageEndDrift must be greater than zero.');
    const ratio = maximumDrift / averageEndDrift;
    return ratio > 1.5 ? 'extremeTorsion' : ratio > 1.3 ? 'torsion' : null;
  }

  public checkIrregularityRestriction(category: BuildingCategory, zone: E030SeismicZone, activeHeight: readonly HeightIrregularity[], activePlan: readonly PlanIrregularity[], stories: number, totalHeightM: number): RuleResult {
    const hasAny = activeHeight.length + activePlan.length > 0;
    const hasExtreme = activeHeight.some((item) => item.startsWith('extreme')) || activePlan.includes('extremeTorsion');
    let allowed = true;
    if ((category === 'A1' || category === 'A2') && zone >= 2) allowed = !hasAny;
    else if ((category === 'A1' || category === 'A2') && zone === 1) allowed = !hasExtreme;
    else if (category === 'B' && zone >= 2) allowed = !hasExtreme;
    else if (category === 'C' && zone >= 3) allowed = !hasExtreme;
    else if (category === 'C' && zone === 2 && (stories > 2 || totalHeightM > 8)) allowed = !hasExtreme;
    return e030Rules.boolean('25 y Tabla 13', 'Restricciones a la irregularidad', allowed, 'La irregularidad detectada está prohibida para la categoría y zona declaradas.');
  }

  public checkTransferSystem(zone: E030SeismicZone, transferredLoadShare: number, isTopStory: boolean): RuleResult {
    const allowed = zone === 1 || isTopStory || transferredLoadShare <= 0.25;
    return e030Rules.boolean('25.2', 'Sistema de transferencia', allowed, 'Más del 25% de las cargas son soportadas por elementos verticales discontinuos.');
  }
}
