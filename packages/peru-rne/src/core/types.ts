export type RuleStatus = 'pass' | 'fail' | 'warning' | 'manual' | 'notApplicable';
export type NormCode = 'RNE-E.030' | 'RNE-E.070';
export type NormEdition = '2006' | '2026';
import type { UnitSymbol } from '@app-alba/engineering-units';

export type QuantityUnit = UnitSymbol | 'ratio' | 'percent' | 'count';

export interface Quantity {
  value: number;
  unit: QuantityUnit;
}

export type RuleDetailValue = string | number | boolean | null;

export interface RuleResult {
  code: NormCode;
  edition: NormEdition;
  clause: string;
  title: string;
  status: RuleStatus;
  message: string;
  demand: Quantity | null;
  limit: Quantity | null;
  details: Readonly<Record<string, RuleDetailValue>>;
}

export interface ReportSummary {
  pass: number;
  fail: number;
  warning: number;
  manual: number;
  notApplicable: number;
}

export interface NormReport {
  code: NormCode;
  edition: NormEdition;
  legallyApprovedBy: string;
  generatedAt: string;
  compliant: boolean;
  summary: ReportSummary;
  results: readonly RuleResult[];
}

export interface E070Report extends NormReport {
  code: 'RNE-E.070';
  edition: '2006';
  legallyApprovedBy: 'DS 011-2006-VIVIENDA';
}

export interface E030Report extends NormReport {
  code: 'RNE-E.030';
  edition: '2026';
  legallyApprovedBy: 'RM 183-2026-VIVIENDA';
}

export interface NormativeSource {
  code: NormCode;
  edition: NormEdition;
  status: 'inForce';
  legalInstrument: string;
  officialRegistryUrl: string;
  publicationSha256: string;
  amendedBy?: readonly string[];
}
