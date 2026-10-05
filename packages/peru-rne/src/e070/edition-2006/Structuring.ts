import { checkBoolean, checkMaximum, checkMinimum, rule } from '../../core/rules.js';
import type { RuleResult } from '../../core/types.js';
import { lengthM } from '../../core/measurements.js';
import type { Measure } from '../../core/measurements.js';

export interface StructuringInput {
  diaphragmAspectRatio: number;
  planAspectRatio: number;
  elevationAspectRatio: number;
  resistingWallLengthM: Measure<'length'>;
  controlJointSpacingM?: Measure<'length'>;
  unitMaterial?: 'clay' | 'calciumSilicate' | 'concrete';
  rigidDiaphragm: boolean;
  regularConfiguration: boolean;
  wallsContinuousToFoundation: boolean;
  wallsConnectedToDiaphragm: boolean;
  openingsIncludedInAnalysis: boolean;
  nonBearingWallsBraced: boolean;
}

export class E070Structuring2006 {
  public check(input: StructuringInput): RuleResult[] {
    const results: RuleResult[] = [
      checkBoolean('14.1', 'Diafragma rígido', input.rigidDiaphragm, 'El sistema no garantiza el comportamiento de diafragma rígido.'),
      checkMaximum('14.1', 'Relación de lados del diafragma', input.diaphragmAspectRatio, 4, 'ratio'),
      checkMaximum('14.2', 'Relación de dimensiones en planta', input.planAspectRatio, 4, 'ratio'),
      rule('14.2', 'Relación de dimensiones en elevación', input.elevationAspectRatio < 4 ? 'pass' : 'fail', input.elevationAspectRatio < 4 ? 'Cumple.' : 'La relación en elevación debe ser menor que 4.', { value: input.elevationAspectRatio, unit: 'ratio' }, { value: 4, unit: 'ratio' }),
      checkMinimum('17.1', 'Longitud efectiva de muro portante', lengthM(input.resistingWallLengthM), 1.2, 'm'),
      checkBoolean('14-15', 'Configuración estructural', input.regularConfiguration, 'La configuración debe regularizarse o justificarse mediante el análisis correspondiente.'),
      checkBoolean('17.2', 'Continuidad vertical de muros', input.wallsContinuousToFoundation, 'Los muros portantes deben continuar hasta la cimentación.'),
      checkBoolean('18.1', 'Conexión muro-diafragma', input.wallsConnectedToDiaphragm, 'Debe asegurarse la conexión entre muros y diafragma.'),
      checkBoolean('17.4', 'Aberturas consideradas', input.openingsIncludedInAnalysis, 'Las aberturas deben considerarse en rigidez, resistencia y confinamiento.'),
      checkBoolean('16', 'Arriostramiento de muros no portantes', input.nonBearingWallsBraced, 'Los muros no portantes deben arriostrarse para acciones perpendiculares.'),
    ];
    if (input.controlJointSpacingM !== undefined && input.unitMaterial !== undefined) {
      const maximum = input.unitMaterial === 'concrete' ? 8 : 25;
      results.push(checkMaximum('15.2', 'Separación de juntas de control', lengthM(input.controlJointSpacingM), maximum, 'm', { material: input.unitMaterial }));
    }
    return results;
  }
}
