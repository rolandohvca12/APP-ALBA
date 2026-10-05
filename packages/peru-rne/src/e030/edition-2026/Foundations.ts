import { forceKNValue, stressMPaValue } from '../../core/measurements.js';
import type { Measure } from '../../core/measurements.js';
import type { RuleResult } from '../../core/types.js';
import type { E030SeismicZone, E030SoilProfile } from './metadata.js';
import { e030Rules } from './metadata.js';

export class E030Foundations2026 {
  public allowableStressSeismicForce(force: Measure<'force'>): number {
    return 0.8 * forceKNValue(force);
  }

  public checkOverturningSafetyFactor(safetyFactor: number): RuleResult {
    return e030Rules.minimum('64.2', 'Factor de seguridad al volteo', safetyFactor, 1.2, 'ratio');
  }

  public requiresFoundationConnection(zone: E030SeismicZone, soil: E030SoilProfile, allowablePressure: Measure<'stress'>): boolean {
    return (zone >= 3 && (soil === 'S3' || soil === 'S4')) || stressMPaValue(allowablePressure) < 0.1;
  }

  public minimumConnectionForce(amplifiedVerticalLoad: Measure<'force'>): number {
    return 0.1 * forceKNValue(amplifiedVerticalLoad);
  }

  public minimumPileTension(verticalLoad: Measure<'force'>): number {
    return 0.15 * forceKNValue(verticalLoad);
  }
}
