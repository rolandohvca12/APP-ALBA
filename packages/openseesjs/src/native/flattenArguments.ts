import type { OpenSeesPyArgument, OpenSeesPyExpression, OpenSeesPyFlagOptions } from '../openseespy/types.js';
import type { OpenSeesNativeScalar } from './types.js';

export function flattenNativeArguments(values: readonly OpenSeesPyArgument[]): OpenSeesNativeScalar[] {
  const result: OpenSeesNativeScalar[] = [];
  for (const value of values) {
    if (value === undefined) continue;
    if (isArgumentArray(value)) {
      result.push(...flattenNativeArguments(value));
    } else if (isExpression(value)) {
      throw new Error('Tcl expressions cannot be passed to the native backend. Invoke the query directly instead.');
    } else if (isFlagOptions(value)) {
      for (const [flag, flagValue] of Object.entries(value)) {
        if (flagValue === undefined || flagValue === false) continue;
        result.push(flag.startsWith('-') ? flag : `-${flag}`);
        if (flagValue !== true) result.push(...flattenNativeArguments([flagValue]));
      }
    } else {
      result.push(value);
    }
  }
  return result;
}

function isExpression(value: OpenSeesPyArgument): value is OpenSeesPyExpression {
  return typeof value === 'object' && value !== null && 'tcl' in value;
}

function isArgumentArray(value: OpenSeesPyArgument): value is readonly OpenSeesPyArgument[] {
  return Array.isArray(value);
}

function isFlagOptions(value: OpenSeesPyArgument): value is OpenSeesPyFlagOptions {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
