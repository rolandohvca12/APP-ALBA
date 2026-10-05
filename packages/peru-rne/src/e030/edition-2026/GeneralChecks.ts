import type { RuleResult } from '../../core/types.js';
import { e030Rules } from './metadata.js';

export interface ModelReviewInput {
  spatialMassAndStiffnessRepresented: boolean;
  grossSectionsUsedForConcreteAndMasonry: boolean;
  diaphragmAssumptionVerified: boolean;
  nonIsolatedPartitionsConsidered: boolean;
  perpendicularWallInteractionConsidered: boolean;
  slabOutOfPlaneStiffnessExcluded: boolean;
}

export class E030GeneralChecks2026 {
  public checkModel(input: ModelReviewInput): RuleResult[] {
    return [
      e030Rules.boolean('30.1', 'Distribución espacial de masas y rigideces', input.spatialMassAndStiffnessRepresented, 'El modelo no representa adecuadamente las masas y rigideces.'),
      e030Rules.boolean('30.2', 'Secciones brutas en concreto y albañilería', input.grossSectionsUsedForConcreteAndMasonry, 'Deben usarse inercias de secciones brutas según E.030:2026.'),
      e030Rules.boolean('30.3-30.4', 'Hipótesis de diafragma', input.diaphragmAssumptionVerified, 'La rigidez, resistencia o conexión del diafragma no ha sido verificada.'),
      e030Rules.boolean('30.5', 'Tabiquería no aislada', input.nonIsolatedPartitionsConsidered, 'Deben analizarse los escenarios con y sin tabiquería no aislada.'),
      e030Rules.boolean('30.7', 'Interacción de muros perpendiculares', input.perpendicularWallInteractionConsidered, 'El modelo de muros debe considerar formas H, T y L.'),
      e030Rules.boolean('30.8', 'Rigidez fuera del plano de losas', input.slabOutOfPlaneStiffnessExcluded, 'La rigidez fuera del plano de las losas no debe incluirse en el modelo estructural.'),
    ];
  }

  public manualReview(clause: string, title: string, message: string): RuleResult {
    return e030Rules.rule(clause, title, 'manual', message);
  }
}
