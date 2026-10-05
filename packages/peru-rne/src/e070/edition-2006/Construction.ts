import { checkBoolean, checkMaximum, checkMinimum, rule } from '../../core/rules.js';
import type { RuleResult } from '../../core/types.js';
import { lengthM, lengthMm } from '../../core/measurements.js';
import type { Measure } from '../../core/measurements.js';

export interface MasonryJointInput {
  thicknessMm: Measure<'length'>;
  unitHeightToleranceMm: Measure<'length'>;
  reinforced: boolean;
  horizontalBarDiameterMm?: Measure<'length'>;
}

export interface ConstructionInspectionInput {
  dailyWallLiftM: Measure<'length'>;
  joints: MasonryJointInput;
  verticalityDeviationPerStoryMm: Measure<'length'>;
  verticalityLimitPerStoryMm: Measure<'length'>;
  unitsCleanAndSound: boolean;
  jointsFullyFilled: boolean;
  reinforcementPlacedAsDesigned: boolean;
  conduitsDoNotDamageWall: boolean;
  confinementPlacedAfterMasonry: boolean;
}

export class E070Construction2006 {
  public check(input: ConstructionInspectionInput): RuleResult[] {
    const thicknessMm = lengthMm(input.joints.thicknessMm);
    const toleranceMm = lengthMm(input.joints.unitHeightToleranceMm);
    const barDiameterMm = input.joints.horizontalBarDiameterMm === undefined ? 0 : lengthMm(input.joints.horizontalBarDiameterMm);
    const minimumJoint = input.joints.reinforced
      ? Math.max(10, barDiameterMm + 6)
      : 10;
    const maximumJoint = Math.max(15, 2 * toleranceMm + 4);
    return [
      checkMaximum('10.6', 'Altura de construcción por jornada', lengthM(input.dailyWallLiftM), 1.3, 'm'),
      checkMinimum('10.2', 'Espesor de junta horizontal', thicknessMm, minimumJoint, 'mm'),
      checkMaximum('10.2', 'Espesor de junta horizontal', thicknessMm, maximumJoint, 'mm'),
      checkMaximum('10.4', 'Verticalidad del muro por piso', lengthMm(input.verticalityDeviationPerStoryMm), lengthMm(input.verticalityLimitPerStoryMm), 'mm'),
      checkBoolean('10.1', 'Estado de las unidades', input.unitsCleanAndSound, 'Las unidades deben estar limpias y sin deterioro.'),
      checkBoolean('10.2', 'Llenado de juntas', input.jointsFullyFilled, 'Las juntas deben quedar completamente llenas.'),
      checkBoolean('10.7-10.9', 'Colocación del refuerzo', input.reinforcementPlacedAsDesigned, 'El refuerzo no corresponde a los planos o requisitos constructivos.'),
      checkBoolean('10.10', 'Instalaciones embutidas', input.conduitsDoNotDamageWall, 'Las instalaciones reducen o dañan indebidamente la albañilería.'),
      checkBoolean('11.1', 'Secuencia del confinamiento', input.confinementPlacedAfterMasonry, 'El concreto de confinamiento debe vaciarse después de construir la albañilería.'),
    ];
  }

  public inspectionRequired(note = 'Debe verificarse en obra y registrarse por el responsable de la inspección.'): RuleResult {
    return rule('10-12', 'Control del procedimiento constructivo', 'manual', note);
  }
}
