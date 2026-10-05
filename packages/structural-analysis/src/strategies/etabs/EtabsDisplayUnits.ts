import { eForce, eLength } from '@app-alba/etabs-bridge-client';
import type { StructuralUnitSelection } from '../../units/StructuralModelUnits.js';

const force = {
  N: eForce.N,
  kN: eForce.kN,
  kgf: eForce.kgf,
  tf: eForce.tonf,
  lbf: eForce.lb,
  kip: eForce.kip,
} as const;

const length = {
  mm: eLength.mm,
  cm: eLength.cm,
  m: eLength.m,
  in: eLength.inch,
  ft: eLength.ft,
} as const;

export function etabsDisplayUnits(selection: StructuralUnitSelection): {
  force: eForce;
  length: eLength;
  warning?: string;
} {
  const requestedForce = force[selection.force as keyof typeof force];
  const requestedLength = length[selection.length as keyof typeof length];
  if (!requestedLength) throw new RangeError(`ETABS cannot display length unit ${selection.length}.`);
  return requestedForce
    ? { force: requestedForce, length: requestedLength }
    : {
      force: eForce.kN,
      length: requestedLength,
      warning: `ETABS cannot display ${selection.force}; its UI remains in kN, while exported results use ${selection.force}.`,
    };
}
