import {
  checkMaximum,
  checkMinimum,
  rule,
} from '../../core/rules.js';
import type { RuleResult } from '../../core/types.js';
import type { E070SeismicZone2006 } from './metadata.js';
import { lengthMm, stressMPaValue } from '../../core/measurements.js';
import type { Measure } from '../../core/measurements.js';

export type MasonryUnitClass = 'Ladrillo I' | 'Ladrillo II' | 'Ladrillo III' | 'Ladrillo IV' | 'Ladrillo V' | 'Bloque P' | 'Bloque NP';
export type MasonryUnitMaterial = 'clay' | 'calciumSilicate' | 'concrete';
export type MasonryUnitGeometry = 'solid' | 'hollow' | 'alveolar' | 'tubular';
export type MasonryUnitProduction = 'industrial' | 'artisanal';

export interface UnitClassLimits {
  variationPercent: readonly [number, number, number];
  warpageMm: number;
  compressiveStrengthMpa: number;
}

export type MasonryTable9Unit =
  | 'clay-king-kong-artisanal'
  | 'clay-king-kong-industrial'
  | 'clay-industrial-grating'
  | 'calcium-silicate-king-kong-normal'
  | 'calcium-silicate-dedalo'
  | 'calcium-silicate-standard-meccano'
  | 'concrete-block-p-50'
  | 'concrete-block-p-65'
  | 'concrete-block-p-75'
  | 'concrete-block-p-85';

export interface MasonryTable9Properties {
  id: MasonryTable9Unit;
  rawMaterial: 'clay' | 'calciumSilicate' | 'concrete';
  denomination: string;
  unitCompressiveStrengthMpa: number;
  masonryCompressiveStrengthMpa: number;
  masonryShearStrengthMpa: number;
  reinforcedMasonryOnly: boolean;
}

const unitClassLimits: Readonly<Record<MasonryUnitClass, UnitClassLimits>> = {
  'Ladrillo I': { variationPercent: [8, 6, 4], warpageMm: 10, compressiveStrengthMpa: 4.9 },
  'Ladrillo II': { variationPercent: [7, 6, 4], warpageMm: 8, compressiveStrengthMpa: 6.9 },
  'Ladrillo III': { variationPercent: [5, 4, 3], warpageMm: 6, compressiveStrengthMpa: 9.3 },
  'Ladrillo IV': { variationPercent: [4, 3, 2], warpageMm: 4, compressiveStrengthMpa: 12.7 },
  'Ladrillo V': { variationPercent: [3, 2, 1], warpageMm: 2, compressiveStrengthMpa: 17.6 },
  'Bloque P': { variationPercent: [4, 3, 2], warpageMm: 4, compressiveStrengthMpa: 4.9 },
  'Bloque NP': { variationPercent: [7, 6, 4], warpageMm: 8, compressiveStrengthMpa: 2.0 },
};

export const E070_TABLE_9: Readonly<Record<MasonryTable9Unit, MasonryTable9Properties>> = Object.freeze({
  'clay-king-kong-artisanal': table9('clay-king-kong-artisanal', 'clay', 'King Kong Artesanal', 5.4, 3.4, 0.5),
  'clay-king-kong-industrial': table9('clay-king-kong-industrial', 'clay', 'King Kong Industrial', 14.2, 6.4, 0.8),
  'clay-industrial-grating': table9('clay-industrial-grating', 'clay', 'Rejilla Industrial', 21.1, 8.3, 0.9),
  'calcium-silicate-king-kong-normal': table9('calcium-silicate-king-kong-normal', 'calciumSilicate', 'King Kong Normal', 15.7, 10.8, 1.0),
  'calcium-silicate-dedalo': table9('calcium-silicate-dedalo', 'calciumSilicate', 'Dédalo', 14.2, 9.3, 1.0),
  'calcium-silicate-standard-meccano': table9('calcium-silicate-standard-meccano', 'calciumSilicate', 'Estándar y mecano', 14.2, 10.8, 0.9, true),
  'concrete-block-p-50': table9('concrete-block-p-50', 'concrete', 'Bloque Tipo P - 50', 4.9, 7.3, 0.8, true),
  'concrete-block-p-65': table9('concrete-block-p-65', 'concrete', 'Bloque Tipo P - 65', 6.4, 8.3, 0.9, true),
  'concrete-block-p-75': table9('concrete-block-p-75', 'concrete', 'Bloque Tipo P - 75', 7.4, 9.3, 1.0, true),
  'concrete-block-p-85': table9('concrete-block-p-85', 'concrete', 'Bloque Tipo P - 85', 8.3, 11.8, 1.1, true),
});

function table9(id: MasonryTable9Unit, rawMaterial: MasonryTable9Properties['rawMaterial'], denomination: string, fb: number, fm: number, vm: number, reinforcedMasonryOnly = false): MasonryTable9Properties {
  return Object.freeze({ id, rawMaterial, denomination, unitCompressiveStrengthMpa: fb, masonryCompressiveStrengthMpa: fm, masonryShearStrengthMpa: vm, reinforcedMasonryOnly });
}

export interface UnitClassificationInput {
  declaredClass: MasonryUnitClass;
  maximumDimensionMm: Measure<'length'>;
  dimensionVariationPercent: number;
  warpageMm: Measure<'length'>;
  compressiveStrengthMpa: Measure<'stress'>;
}

export interface UnitAcceptanceInput {
  material: MasonryUnitMaterial;
  production: MasonryUnitProduction;
  loadBearing: boolean;
  coefficientOfVariation: number;
  absorptionPercent: number;
  faceShellThicknessMm: Measure<'length'> | null;
  visuallyAcceptable: boolean;
}

export interface UnitUseInput {
  geometry: MasonryUnitGeometry;
  production: MasonryUnitProduction;
  seismicZone: E070SeismicZone2006;
  stories: number;
  loadBearing: boolean;
  grout: 'none' | 'partial' | 'full';
}

export type MortarType = 'P1' | 'P2' | 'NP';

export interface MortarProportionInput {
  type: MortarType;
  cement: number;
  lime: number;
  sand: number;
  loadBearing: boolean;
}

export interface GroutInput {
  kind: 'fine' | 'coarse';
  minimumCellDimensionMm: Measure<'length'>;
  slumpMm: Measure<'length'>;
  compressiveStrengthMpa: Measure<'stress'>;
}

export class E070Materials2006 {
  public unitClassLimits(unitClass: MasonryUnitClass): UnitClassLimits {
    return unitClassLimits[unitClass];
  }

  public table9Properties(unit: MasonryTable9Unit): MasonryTable9Properties {
    return E070_TABLE_9[unit];
  }
  public checkUnitClassification(input: UnitClassificationInput): RuleResult[] {
    const limits = unitClassLimits[input.declaredClass];
    const maximumDimensionMm = lengthMm(input.maximumDimensionMm);
    const warpageMm = lengthMm(input.warpageMm);
    const compressiveStrengthMpa = stressMPaValue(input.compressiveStrengthMpa);
    const dimensionIndex = maximumDimensionMm <= 100 ? 0 : maximumDimensionMm <= 150 ? 1 : 2;
    const dimensionLimit = limits.variationPercent[dimensionIndex];
    return [
      checkMaximum('5.2 - Tabla 1', 'Variación dimensional de la unidad', Math.abs(input.dimensionVariationPercent), dimensionLimit, 'percent', { declaredClass: input.declaredClass }),
      checkMaximum('5.2 - Tabla 1', 'Alabeo de la unidad', warpageMm, limits.warpageMm, 'mm', { declaredClass: input.declaredClass }),
      checkMinimum('5.2 - Tabla 1', 'Resistencia a compresión de la unidad', compressiveStrengthMpa, limits.compressiveStrengthMpa, 'MPa', { declaredClass: input.declaredClass }),
    ];
  }

  public checkUnitAcceptance(input: UnitAcceptanceInput): RuleResult[] {
    const dispersionLimit = input.production === 'industrial' ? 20 : 40;
    const absorptionLimit = input.material === 'concrete' ? (input.loadBearing ? 12 : 15) : 22;
    const results = [
      checkMaximum('5.5.a', 'Dispersión de resultados de unidades', input.coefficientOfVariation * 100, dispersionLimit, 'percent'),
      checkMaximum('5.5.b', 'Absorción de la unidad', input.absorptionPercent, absorptionLimit, 'percent'),
      input.visuallyAcceptable
        ? rule('5.5.d-g', 'Inspección visual de la unidad', 'pass', 'No se declararon defectos visuales incompatibles.')
        : rule('5.5.d-g', 'Inspección visual de la unidad', 'fail', 'La unidad presenta defectos, materias extrañas, fisuras o eflorescencia no admisibles.'),
    ];
    if (input.material === 'concrete' && input.faceShellThicknessMm !== null) {
      results.push(checkMinimum('5.5.c', 'Espesor de cara lateral del bloque', lengthMm(input.faceShellThicknessMm), input.loadBearing ? 25 : 12, 'mm'));
    }
    return results;
  }

  public checkUnitUse(input: UnitUseInput): RuleResult {
    if (!input.loadBearing) {
      return rule('5.3 - Tabla 2', 'Uso estructural de la unidad', 'notApplicable', 'La Tabla 2 regula muros portantes.');
    }

    let allowed = false;
    let requiredGrout: UnitUseInput['grout'] | null = null;
    if (input.seismicZone === 1) {
      allowed = input.geometry !== 'tubular' || input.stories <= 2;
      if (input.geometry === 'alveolar') requiredGrout = 'partial';
    } else if (input.geometry === 'solid') {
      allowed = input.production === 'industrial' || input.stories <= 2;
    } else if (input.geometry === 'alveolar') {
      allowed = true;
      requiredGrout = input.stories >= 4 ? 'full' : 'partial';
    }

    const groutIsEnough = requiredGrout === null
      || input.grout === 'full'
      || (requiredGrout === 'partial' && input.grout === 'partial');
    const passes = allowed && groutIsEnough;
    return rule(
      '5.3 - Tabla 2',
      'Limitación de uso de la unidad',
      passes ? 'pass' : 'fail',
      passes ? 'La unidad es admisible para el uso declarado.' : 'La unidad o su relleno no es admisible para la zona y altura declaradas.',
      null,
      null,
      { ...input, requiredGrout },
    );
  }

  public checkMortar(input: MortarProportionInput): RuleResult[] {
    const usagePasses = input.loadBearing ? input.type !== 'NP' : true;
    const ranges: Record<MortarType, { lime: readonly [number, number]; sand: readonly [number, number] }> = {
      P1: { lime: [0, 0.25], sand: [3, 3.5] },
      P2: { lime: [0, 0.5], sand: [4, 5] },
      NP: { lime: [0, 0], sand: [0, 6] },
    };
    const range = ranges[input.type];
    const normalizedLime = input.lime / input.cement;
    const normalizedSand = input.sand / input.cement;
    return [
      rule('6.3', 'Tipo de mortero según uso', usagePasses ? 'pass' : 'fail', usagePasses ? 'El tipo de mortero corresponde al uso.' : 'Los muros portantes requieren mortero P1 o P2.'),
      rule('6.4 - Tabla 4', 'Proporción volumétrica del mortero', normalizedLime >= range.lime[0] && normalizedLime <= range.lime[1] && normalizedSand >= range.sand[0] && normalizedSand <= range.sand[1] ? 'pass' : 'fail', 'Se verificaron las proporciones respecto de una parte de cemento.', null, null, { normalizedLime, normalizedSand, type: input.type }),
    ];
  }

  public checkGrout(input: GroutInput): RuleResult[] {
    const minimumCellDimensionMm = lengthMm(input.minimumCellDimensionMm);
    const slumpMm = lengthMm(input.slumpMm);
    const compressiveStrengthMpa = stressMPaValue(input.compressiveStrengthMpa);
    const kindPasses = input.kind === 'fine' ? minimumCellDimensionMm < 60 : minimumCellDimensionMm >= 60;
    return [
      rule('7.2', 'Clasificación del grout por dimensión de celda', kindPasses ? 'pass' : 'fail', kindPasses ? 'El tipo de grout corresponde a la dimensión de celda.' : 'Debe cambiarse el tipo de grout para la dimensión de celda.'),
      rule('7.4', 'Revenimiento del grout', slumpMm >= 225 && slumpMm <= 275 ? 'pass' : 'fail', 'El intervalo normativo es 225 mm a 275 mm.', { value: slumpMm, unit: 'mm' }, null),
      checkMinimum('7.5', 'Resistencia a compresión del grout', compressiveStrengthMpa, 13.72, 'MPa'),
    ];
  }

  public checkSteelDuctility(elongationPercent: number): RuleResult {
    return checkMinimum('2.8', 'Elongación del acero de refuerzo', elongationPercent, 9, 'percent');
  }

  public checkConfinementConcrete(compressiveStrengthMpa: Measure<'stress'>): RuleResult {
    return checkMinimum('9.1 y 11.6', 'Resistencia del concreto de confinamiento', stressMPaValue(compressiveStrengthMpa), 17.15, 'MPa');
  }
}
