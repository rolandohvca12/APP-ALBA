import type { E030Report, RuleResult } from '../../core/types.js';
import { E030BuildingClassification2026 } from './BuildingClassification.js';
import { E030DriftAndSeparation2026 } from './DriftAndSeparation.js';
import { E030Foundations2026 } from './Foundations.js';
import { E030GeneralChecks2026 } from './GeneralChecks.js';
import { E030Hazard2026 } from './Hazard.js';
import { E030Instrumentation2026 } from './Instrumentation.js';
import { E030ModalSpectral2026 } from './ModalSpectral.js';
import { E030NonStructural2026 } from './NonStructural.js';
import { E030SeismicWeight2026 } from './SeismicWeight.js';
import { E030StaticAnalysis2026 } from './StaticAnalysis.js';
import { E030TimeHistory2026 } from './TimeHistory.js';
import { E030_2026_SOURCE, e030Rules } from './metadata.js';
import { E030ZoningCatalog2026 } from './ZoningCatalog.js';

export class E030_2026 {
  public readonly source = E030_2026_SOURCE;
  public readonly zoning = new E030ZoningCatalog2026();
  public readonly hazard = new E030Hazard2026();
  public readonly buildings = new E030BuildingClassification2026();
  public readonly seismicWeight = new E030SeismicWeight2026();
  public readonly staticAnalysis = new E030StaticAnalysis2026();
  public readonly modalSpectral = new E030ModalSpectral2026();
  public readonly timeHistory = new E030TimeHistory2026();
  public readonly driftAndSeparation = new E030DriftAndSeparation2026();
  public readonly nonStructural = new E030NonStructural2026();
  public readonly foundations = new E030Foundations2026();
  public readonly instrumentation = new E030Instrumentation2026();
  public readonly generalChecks = new E030GeneralChecks2026();

  public report(results: readonly RuleResult[]): E030Report {
    return e030Rules.report(results) as E030Report;
  }
}

export const e030_2026 = new E030_2026();
