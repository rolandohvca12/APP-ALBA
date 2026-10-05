import { checkMaximum, checkMinimum, clamp, forceKN } from '../../core/rules.js';
import { units } from '@app-alba/engineering-units';
import { areaMm2, forceKNValue, lengthM, lengthMm, momentKNm, stressMPaValue } from '../../core/measurements.js';
import type { Measure } from '../../core/measurements.js';
import type { RuleResult } from '../../core/types.js';
import type { E070SeismicZone2006 } from './metadata.js';

export interface ReinforcedFlexureInput {
  steelAreaMm2: Measure<'area'>;
  steelYieldMpa: Measure<'stress'>;
  effectiveDepthM: Measure<'length'>;
  axialLoadKN: Measure<'force'>;
  wallLengthM: Measure<'length'>;
  wallThicknessM: Measure<'length'>;
  fmMpa: Measure<'stress'>;
  ultimateMomentKNm: Measure<'moment'>;
}

export interface ReinforcedFlexureResult {
  nominalMomentKNm: number;
  phi: number;
  designMomentKNm: number;
  check: RuleResult;
}

export class E070ReinforcedMasonry2006 {
  public checkMinimumRatios(horizontalRatio: number, verticalRatio: number, secondaryRatio = 0.0007): RuleResult[] {
    return [
      checkMinimum('28.2', 'Cuantía horizontal de acero', horizontalRatio, 0.001, 'ratio'),
      checkMinimum('28.2', 'Cuantía vertical de acero', verticalRatio, 0.001, 'ratio'),
      checkMinimum('28.2', 'Cuantía del refuerzo secundario', Math.min(horizontalRatio, verticalRatio), secondaryRatio, 'ratio'),
    ];
  }

  public maximumHorizontalSpacing(zone: E070SeismicZone2006, stories: number, story: number, totalHeightM: Measure<'length'>): number {
    if (zone === 1) return 0.8;
    return stories <= 3 && lengthM(totalHeightM) <= 12 && story === 1 ? 0.45 : 0.2;
  }

  public checkHorizontalSpacing(spacingM: Measure<'length'>, zone: E070SeismicZone2006, stories: number, story: number, totalHeightM: Measure<'length'>): RuleResult {
    return checkMaximum('28.2', 'Espaciamiento del refuerzo horizontal', lengthM(spacingM), this.maximumHorizontalSpacing(zone, stories, story, totalHeightM), 'm');
  }

  public checkVerticalBarDiameter(barDiameterMm: Measure<'length'>): RuleResult {
    return checkMaximum('28.2', 'Diámetro de barra vertical', lengthMm(barDiameterMm), 25, 'mm');
  }

  public designFlexure(input: ReinforcedFlexureInput): ReinforcedFlexureResult {
    const fy = stressMPaValue(input.steelYieldMpa);
    const steelForceKN = units.convert(areaMm2(input.steelAreaMm2) * units.convert(fy, 'MPa', 'N/mm2'), 'N', 'kN');
    const axialLoadKN = forceKNValue(input.axialLoadKN);
    const wallLengthM = lengthM(input.wallLengthM);
    const nominalMomentKNm = steelForceKN * lengthM(input.effectiveDepthM)
      + axialLoadKN * wallLengthM / 2;
    const nominalAxialCapacityKN = forceKN(0.1 * stressMPaValue(input.fmMpa), lengthM(input.wallThicknessM) * wallLengthM);
    const phi = clamp(0.85 - 0.2 * axialLoadKN / nominalAxialCapacityKN, 0.65, 0.85);
    const designMomentKNm = phi * nominalMomentKNm;
    return {
      nominalMomentKNm,
      phi,
      designMomentKNm,
      check: checkMinimum('28.3', 'Resistencia a flexión del muro armado', designMomentKNm, momentKNm(input.ultimateMomentKNm), 'kN-m'),
    };
  }

  public requiredHorizontalSteelArea(shearKN: Measure<'force'>, spacingM: Measure<'length'>, steelYieldMpa: Measure<'stress'>, effectiveDepthM: Measure<'length'>): number {
    return units.convert(forceKNValue(shearKN), 'kN', 'N') * lengthM(spacingM) / (units.convert(stressMPaValue(steelYieldMpa), 'MPa', 'N/mm2') * lengthM(effectiveDepthM));
  }

  public checkShearStress(shearStressMpa: Measure<'stress'>, fmMpa: Measure<'stress'>, inPlasticHinge: boolean): RuleResult {
    return checkMaximum('28.4', 'Esfuerzo cortante del muro armado', stressMPaValue(shearStressMpa), (inPlasticHinge ? 0.1 : 0.2) * stressMPaValue(fmMpa), 'MPa', { inPlasticHinge });
  }
}
