import { units } from '@app-alba/engineering-units';
import { accelerationMps2, forceKNValue } from '../../core/measurements.js';
import type { Measure } from '../../core/measurements.js';

export type NonStructuralElement = 'fallingHazard' | 'interiorWall' | 'roofTankOrParapet' | 'rigidEquipment' | 'otherStructure';

const coefficients: Readonly<Record<NonStructuralElement, number>> = {
  fallingHazard: 3,
  interiorWall: 2,
  roofTankOrParapet: 3,
  rigidEquipment: 1.5,
  otherStructure: 3,
};

export class E030NonStructural2026 {
  public elementCoefficient(element: NonStructuralElement): number {
    return coefficients[element];
  }

  public designForceFromAcceleration(elementAcceleration: Measure<'acceleration'>, coefficient: number, elementWeight: Measure<'force'>): number {
    return accelerationMps2(elementAcceleration) / units.convert(1, 'g', 'm/s2') * coefficient * forceKNValue(elementWeight);
  }

  public designForceFromFloorForce(floorForce: Measure<'force'>, floorWeight: Measure<'force'>, coefficient: number, elementWeight: Measure<'force'>): number {
    const weight = forceKNValue(floorWeight);
    if (!(weight > 0)) throw new RangeError('floorWeight must be greater than zero.');
    return forceKNValue(floorForce) / weight * coefficient * forceKNValue(elementWeight);
  }

  public minimumHorizontalForce(zoneFactor: number, useFactor: number, soilFactor: number, elementWeight: Measure<'force'>): number {
    return 0.5 * zoneFactor * useFactor * soilFactor * forceKNValue(elementWeight);
  }

  public governingHorizontalForce(calculatedForce: Measure<'force'>, zoneFactor: number, useFactor: number, soilFactor: number, elementWeight: Measure<'force'>): number {
    return Math.max(forceKNValue(calculatedForce), this.minimumHorizontalForce(zoneFactor, useFactor, soilFactor, elementWeight));
  }

  public verticalForce(horizontalForce: Measure<'force'>): number {
    return 2 / 3 * forceKNValue(horizontalForce);
  }
}
