import { buildReport } from '../../core/rules.js';
import type { E070Report, RuleResult } from '../../core/types.js';
import { E070Analysis2006 } from './Analysis.js';
import { E070ConfinedMasonry2006 } from './ConfinedMasonry.js';
import { E070Construction2006 } from './Construction.js';
import { E070InfillFrame2006 } from './InfillFrame.js';
import { E070Materials2006 } from './Materials.js';
import { E070MinimumRequirements2006 } from './MinimumRequirements.js';
import { E070OutOfPlane2006 } from './OutOfPlane.js';
import { E070QualityControl2006 } from './QualityControl.js';
import { E070ReinforcedMasonry2006 } from './ReinforcedMasonry.js';
import { E070Structuring2006 } from './Structuring.js';
import { E070_2006_SOURCE } from './metadata.js';

export class E070_2006 {
  public readonly source = E070_2006_SOURCE;
  public readonly materials = new E070Materials2006();
  public readonly construction = new E070Construction2006();
  public readonly qualityControl = new E070QualityControl2006();
  public readonly structuring = new E070Structuring2006();
  public readonly minimumRequirements = new E070MinimumRequirements2006();
  public readonly analysis = new E070Analysis2006();
  public readonly confinedMasonry = new E070ConfinedMasonry2006();
  public readonly reinforcedMasonry = new E070ReinforcedMasonry2006();
  public readonly outOfPlane = new E070OutOfPlane2006();
  public readonly infillFrame = new E070InfillFrame2006();

  public report(results: readonly RuleResult[]): E070Report {
    return buildReport(results);
  }
}

export const e070_2006 = new E070_2006();
