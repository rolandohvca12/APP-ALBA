import { checkMaximum, checkMinimum, rule, stressMpa } from '../../core/rules.js';
import type { RuleResult } from '../../core/types.js';
import type { E070SeismicZone2006 } from './metadata.js';
import { areaM2, forceKNValue, lengthM, stressMPaValue } from '../../core/measurements.js';
import type { Measure } from '../../core/measurements.js';

export interface WallThicknessInput {
  seismicZone: E070SeismicZone2006;
  clearHeightM: Measure<'length'>;
  effectiveThicknessM: Measure<'length'>;
}

export interface AxialStressInput {
  serviceDeadLoadKN: Measure<'force'>;
  serviceLiveLoadKN: Measure<'force'>;
  wallLengthM: Measure<'length'>;
  effectiveThicknessM: Measure<'length'>;
  clearHeightM: Measure<'length'>;
  fmMpa: Measure<'stress'>;
}

export interface WallDensityInput {
  seismicZoneFactor: number;
  useFactor: number;
  soilFactor: number;
  stories: number;
  floorAreaM2: Measure<'area'>;
  walls: readonly { lengthM: Measure<'length'>; thicknessM: Measure<'length'> }[];
}

export class E070MinimumRequirements2006 {
  public minimumWallThickness(clearHeightM: Measure<'length'>, zone: E070SeismicZone2006): number {
    return lengthM(clearHeightM) / (zone === 1 ? 25 : 20);
  }

  public checkWallThickness(input: WallThicknessInput): RuleResult {
    return checkMinimum('19.1', 'Espesor efectivo del muro', lengthM(input.effectiveThicknessM), this.minimumWallThickness(input.clearHeightM, input.seismicZone), 'm', { seismicZone: input.seismicZone });
  }

  public allowableAxialStress(fmMpa: Measure<'stress'>, clearHeightM: Measure<'length'>, effectiveThicknessM: Measure<'length'>): number {
    const fm = stressMPaValue(fmMpa);
    const slendernessTerm = 1 - (lengthM(clearHeightM) / (35 * lengthM(effectiveThicknessM))) ** 2;
    return Math.min(0.2 * fm * slendernessTerm, 0.15 * fm);
  }

  public checkAxialStress(input: AxialStressInput): RuleResult {
    const fm = stressMPaValue(input.fmMpa);
    const stress = stressMpa(forceKNValue(input.serviceDeadLoadKN) + forceKNValue(input.serviceLiveLoadKN), lengthM(input.wallLengthM) * lengthM(input.effectiveThicknessM));
    const allowable = this.allowableAxialStress(input.fmMpa, input.clearHeightM, input.effectiveThicknessM);
    return checkMaximum('19.2', 'Esfuerzo axial máximo de servicio', stress, allowable, 'MPa', { fmMpa: fm });
  }

  public checkConcentratedLoad(forceKN: Measure<'force'>, bearingWidthM: Measure<'length'>, thicknessM: Measure<'length'>, fmMpa: Measure<'stress'>): RuleResult {
    const thickness = lengthM(thicknessM);
    const effectiveWidth = lengthM(bearingWidthM) + 4 * thickness;
    return checkMaximum('19.3', 'Esfuerzo por carga concentrada', stressMpa(forceKNValue(forceKN), effectiveWidth * thickness), 0.375 * stressMPaValue(fmMpa), 'MPa', { effectiveWidthM: effectiveWidth });
  }

  public requiredWallDensity(input: Omit<WallDensityInput, 'floorAreaM2' | 'walls'>): number {
    return input.seismicZoneFactor * input.useFactor * input.soilFactor * input.stories / 56;
  }

  public checkWallDensity(input: WallDensityInput): RuleResult {
    const provided = input.walls.reduce((sum, wall) => sum + lengthM(wall.lengthM) * lengthM(wall.thicknessM), 0) / areaM2(input.floorAreaM2);
    const required = this.requiredWallDensity(input);
    return checkMinimum('19.2.b', 'Densidad mínima de muros reforzados', provided, required, 'ratio', { stories: input.stories });
  }

  public checkConfinedSpacing(columnSpacingM: Measure<'length'>, horizontalDistanceM: Measure<'length'>): RuleResult {
    return checkMaximum('20.2', 'Separación entre columnas de confinamiento', lengthM(columnSpacingM), Math.min(2 * lengthM(horizontalDistanceM), 5), 'm');
  }

  public reinforcementRequirement(zone: E070SeismicZone2006, seismicForceShare: number, isPerimeterWall: boolean): RuleResult {
    const required = zone !== 1 ? seismicForceShare >= 0.1 : isPerimeterWall;
    return rule('19.4', 'Muro reforzado', required ? 'warning' : 'notApplicable', required ? 'Este muro debe cumplir los requisitos de albañilería reforzada de la norma.' : 'No se activa el requisito mínimo por la información declarada.', null, null, { seismicForceShare, isPerimeterWall });
  }
}
