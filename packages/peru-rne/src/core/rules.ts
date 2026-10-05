import type {
  E070Report,
  NormCode,
  NormEdition,
  NormReport,
  Quantity,
  QuantityUnit,
  ReportSummary,
  RuleDetailValue,
  RuleResult,
  RuleStatus,
} from './types.js';
import { units } from '@app-alba/engineering-units';

export function quantity(value: number, unit: QuantityUnit): Quantity {
  assertFinite(value, 'quantity');
  return { value, unit };
}

export function rule(
  clause: string,
  title: string,
  status: RuleStatus,
  message: string,
  demand: Quantity | null = null,
  limit: Quantity | null = null,
  details: Readonly<Record<string, RuleDetailValue>> = {},
): RuleResult {
  return {
    code: 'RNE-E.070',
    edition: '2006',
    clause,
    title,
    status,
    message,
    demand,
    limit,
    details,
  };
}

export function checkMaximum(
  clause: string,
  title: string,
  demand: number,
  maximum: number,
  unit: QuantityUnit,
  details: Readonly<Record<string, RuleDetailValue>> = {},
): RuleResult {
  assertFinite(demand, 'demand');
  assertFinite(maximum, 'maximum');
  const passes = demand <= maximum;
  return rule(
    clause,
    title,
    passes ? 'pass' : 'fail',
    passes ? 'Cumple el máximo normativo.' : 'Excede el máximo normativo.',
    quantity(demand, unit),
    quantity(maximum, unit),
    details,
  );
}

export function checkMinimum(
  clause: string,
  title: string,
  demand: number,
  minimum: number,
  unit: QuantityUnit,
  details: Readonly<Record<string, RuleDetailValue>> = {},
): RuleResult {
  assertFinite(demand, 'provided value');
  assertFinite(minimum, 'minimum');
  const passes = demand >= minimum;
  return rule(
    clause,
    title,
    passes ? 'pass' : 'fail',
    passes ? 'Cumple el mínimo normativo.' : 'No alcanza el mínimo normativo.',
    quantity(demand, unit),
    quantity(minimum, unit),
    details,
  );
}

export function checkBoolean(
  clause: string,
  title: string,
  passes: boolean,
  failureMessage: string,
): RuleResult {
  return rule(
    clause,
    title,
    passes ? 'pass' : 'fail',
    passes ? 'Cumple.' : failureMessage,
  );
}

export function buildReport(results: readonly RuleResult[]): E070Report {
  return buildNormReport({ code: 'RNE-E.070', edition: '2006', legallyApprovedBy: 'DS 011-2006-VIVIENDA' }, results) as E070Report;
}

export interface NormRuleContext {
  code: NormCode;
  edition: NormEdition;
  legallyApprovedBy: string;
}

export function normRule(
  context: NormRuleContext,
  clause: string,
  title: string,
  status: RuleStatus,
  message: string,
  demand: Quantity | null = null,
  limit: Quantity | null = null,
  details: Readonly<Record<string, RuleDetailValue>> = {},
): RuleResult {
  return { ...context, clause, title, status, message, demand, limit, details };
}

export function buildNormReport(context: NormRuleContext, results: readonly RuleResult[]): NormReport {
  const summary: ReportSummary = {
    pass: 0,
    fail: 0,
    warning: 0,
    manual: 0,
    notApplicable: 0,
  };
  for (const result of results) summary[result.status] += 1;
  return {
    ...context,
    generatedAt: new Date().toISOString(),
    compliant: summary.fail === 0,
    summary,
    results: [...results],
  };
}

export class NormRuleEngine {
  public constructor(public readonly context: NormRuleContext) {}

  public rule(clause: string, title: string, status: RuleStatus, message: string, demand: Quantity | null = null, limit: Quantity | null = null, details: Readonly<Record<string, RuleDetailValue>> = {}): RuleResult {
    return normRule(this.context, clause, title, status, message, demand, limit, details);
  }

  public maximum(clause: string, title: string, demand: number, maximum: number, unit: QuantityUnit, details: Readonly<Record<string, RuleDetailValue>> = {}): RuleResult {
    assertFinite(demand, 'demand');
    assertFinite(maximum, 'maximum');
    const passes = demand <= maximum;
    return this.rule(clause, title, passes ? 'pass' : 'fail', passes ? 'Cumple el máximo normativo.' : 'Excede el máximo normativo.', quantity(demand, unit), quantity(maximum, unit), details);
  }

  public minimum(clause: string, title: string, demand: number, minimum: number, unit: QuantityUnit, details: Readonly<Record<string, RuleDetailValue>> = {}): RuleResult {
    assertFinite(demand, 'provided value');
    assertFinite(minimum, 'minimum');
    const passes = demand >= minimum;
    return this.rule(clause, title, passes ? 'pass' : 'fail', passes ? 'Cumple el mínimo normativo.' : 'No alcanza el mínimo normativo.', quantity(demand, unit), quantity(minimum, unit), details);
  }

  public boolean(clause: string, title: string, passes: boolean, failureMessage: string): RuleResult {
    return this.rule(clause, title, passes ? 'pass' : 'fail', passes ? 'Cumple.' : failureMessage);
  }

  public report(results: readonly RuleResult[]): NormReport {
    return buildNormReport(this.context, results);
  }
}

export function assertFinite(value: number, name: string): void {
  if (!Number.isFinite(value)) throw new TypeError(`${name} must be finite.`);
}

export function assertPositive(value: number, name: string): void {
  assertFinite(value, name);
  if (!(value > 0)) throw new RangeError(`${name} must be greater than zero.`);
}

export function clamp(value: number, minimum: number, maximum: number): number {
  return Math.min(maximum, Math.max(minimum, value));
}

export function stressMpa(forceKN: number, areaM2: number): number {
  assertPositive(areaM2, 'areaM2');
  const stressPa = units.convert(forceKN, 'kN', 'N') / units.convert(areaM2, 'm2', 'm2');
  return units.convert(stressPa, 'Pa', 'MPa');
}

export function forceKN(stressMPa: number, areaM2: number): number {
  const forceN = units.convert(stressMPa, 'MPa', 'Pa') * units.convert(areaM2, 'm2', 'm2');
  return units.convert(forceN, 'N', 'kN');
}

export function steelAreaMm2(forceKNValue: number, stressMPa: number): number {
  assertPositive(stressMPa, 'stressMPa');
  const forceN = units.convert(forceKNValue, 'kN', 'N');
  const stressNmm2 = units.convert(stressMPa, 'MPa', 'N/mm2');
  return forceN / stressNmm2;
}
