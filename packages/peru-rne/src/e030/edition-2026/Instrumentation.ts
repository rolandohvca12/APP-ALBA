import { areaM2 } from '../../core/measurements.js';
import type { Measure } from '../../core/measurements.js';
import type { BuildingCategory } from './BuildingClassification.js';

export interface AccelerometricStationRequirementInput {
  coveredArea: Measure<'area'>;
  category: BuildingCategory;
  stories: number;
  hasBaseIsolation: boolean;
  hasEnergyDissipation: boolean;
}

export interface AccelerometricStationRequirement {
  baseStations: 0 | 1;
  roofStations: 0 | 1;
  total: 0 | 1 | 2;
}

export class E030Instrumentation2026 {
  public requiredStations(input: AccelerometricStationRequirementInput): AccelerometricStationRequirement {
    const roofRequired = input.stories > 20 || input.hasBaseIsolation || input.hasEnergyDissipation;
    const baseRequired = roofRequired || areaM2(input.coveredArea) >= 10_000 || input.category === 'A1';
    const baseStations = baseRequired ? 1 : 0;
    const roofStations = roofRequired ? 1 : 0;
    return { baseStations, roofStations, total: (baseStations + roofStations) as 0 | 1 | 2 };
  }
}
