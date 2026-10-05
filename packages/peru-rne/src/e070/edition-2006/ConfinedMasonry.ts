import { checkMaximum, checkMinimum, steelAreaMm2 } from '../../core/rules.js';
import { units } from '@app-alba/engineering-units';
import { areaMm2, forceKNValue, lengthM, stressMPaValue } from '../../core/measurements.js';
import type { Measure } from '../../core/measurements.js';
import type { RuleResult } from '../../core/types.js';

export interface ConfinedColumnDesignInput {
  shearKN: Measure<'force'>;
  tensionKN: Measure<'force'>;
  concreteStrengthMpa: Measure<'stress'>;
  steelYieldMpa: Measure<'stress'>;
  frictionCoefficient: number;
  wallThicknessM: Measure<'length'>;
  providedConcreteAreaMm2: Measure<'area'>;
  providedSteelAreaMm2: Measure<'area'>;
}

export interface ConfinedColumnDesignResult {
  requiredConcreteAreaMm2: number;
  requiredSteelAreaMm2: number;
  checks: readonly RuleResult[];
}

export class E070ConfinedMasonry2006 {
  public checkApplicability(stories: number, totalHeightM: Measure<'length'>): RuleResult[] {
    return [
      checkMaximum('27.1', 'Número de pisos para albañilería confinada', stories, 5, 'count'),
      checkMaximum('27.1', 'Altura para albañilería confinada', lengthM(totalHeightM), 15, 'm'),
    ];
  }

  public requiresHorizontalReinforcement(ultimateShearKN: Measure<'force'>, crackingShearKN: Measure<'force'>, axialStressMpa: Measure<'stress'>, fmMpa: Measure<'stress'>, stories: number, story: number): boolean {
    return forceKNValue(ultimateShearKN) >= forceKNValue(crackingShearKN) || stressMPaValue(axialStressMpa) >= 0.05 * stressMPaValue(fmMpa) || (stories > 3 && story === 1);
  }

  public checkHorizontalReinforcementRatio(providedRatio: number, required: boolean): RuleResult {
    return required
      ? checkMinimum('27.1', 'Cuantía de refuerzo horizontal', providedRatio, 0.001, 'ratio')
      : checkMinimum('27.1', 'Cuantía de refuerzo horizontal', providedRatio, 0, 'ratio');
  }

  public designColumn(input: ConfinedColumnDesignInput): ConfinedColumnDesignResult {
    const phi = 0.85;
    const shearKN = forceKNValue(input.shearKN);
    const tensionKN = forceKNValue(input.tensionKN);
    const concreteStrengthMpa = stressMPaValue(input.concreteStrengthMpa);
    const steelYieldMpa = stressMPaValue(input.steelYieldMpa);
    const shearConcreteArea = units.convert(shearKN, 'kN', 'N') / (0.2 * units.convert(concreteStrengthMpa, 'MPa', 'N/mm2') * phi);
    const geometricConcreteArea = 150_000 * lengthM(input.wallThicknessM);
    const requiredConcreteAreaMm2 = Math.max(shearConcreteArea, geometricConcreteArea);
    const shearSteel = steelAreaMm2(shearKN, steelYieldMpa * input.frictionCoefficient * phi);
    const tensionSteel = steelAreaMm2(tensionKN, steelYieldMpa * phi);
    const minimumSteel = 0.1 * concreteStrengthMpa * requiredConcreteAreaMm2 / steelYieldMpa;
    const fourEightMillimeterBars = 4 * Math.PI * 8 ** 2 / 4;
    const requiredSteelAreaMm2 = Math.max(shearSteel + tensionSteel, minimumSteel, fourEightMillimeterBars);
    return {
      requiredConcreteAreaMm2,
      requiredSteelAreaMm2,
      checks: [
        checkMinimum('27.3', 'Área de concreto de columna de confinamiento', areaMm2(input.providedConcreteAreaMm2), requiredConcreteAreaMm2, 'mm2'),
        checkMinimum('27.3', 'Acero longitudinal de columna de confinamiento', areaMm2(input.providedSteelAreaMm2), requiredSteelAreaMm2, 'mm2'),
      ],
    };
  }

  public requiredTieBeamSteel(tensionKN: Measure<'force'>, concreteStrengthMpa: Measure<'stress'>, concreteAreaMm2: Measure<'area'>, steelYieldMpa: Measure<'stress'>): number {
    const fourEightMillimeterBars = 4 * Math.PI * 8 ** 2 / 4;
    const fy = stressMPaValue(steelYieldMpa);
    return Math.max(steelAreaMm2(forceKNValue(tensionKN), 0.9 * fy), 0.1 * stressMPaValue(concreteStrengthMpa) * areaMm2(concreteAreaMm2) / fy, fourEightMillimeterBars);
  }
}
