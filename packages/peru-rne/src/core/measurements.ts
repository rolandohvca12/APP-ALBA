import { units } from '@app-alba/engineering-units';
import type { Dimension, QuantityInput, UnitFor } from '@app-alba/engineering-units';

export type Measure<D extends Dimension> = QuantityInput<D>;

function canonical<D extends Dimension>(value: Measure<D>, unit: UnitFor<D>): number {
  if (typeof value === 'number') return value;
  return units.convert(value.value, value.unit, unit);
}

export const lengthM = (value: Measure<'length'>): number => canonical(value, 'm');
export const lengthMm = (value: Measure<'length'>): number => canonical(value, 'mm');
export const areaM2 = (value: Measure<'area'>): number => canonical(value, 'm2');
export const areaMm2 = (value: Measure<'area'>): number => canonical(value, 'mm2');
export const forceKNValue = (value: Measure<'force'>): number => canonical(value, 'kN');
export const stressMPaValue = (value: Measure<'stress'>): number => canonical(value, 'MPa');
export const momentKNm = (value: Measure<'moment'>): number => canonical(value, 'kN-m');
export const plateMomentKNmPerM = (value: Measure<'plateMoment'>): number => canonical(value, 'kN-m/m');
export const areaLoadKNm2 = (value: Measure<'areaLoad'>): number => canonical(value, 'kN/m2');
export const volumetricWeightKNm3 = (value: Measure<'volumetricWeight'>): number => canonical(value, 'kN/m3');
export const accelerationMps2 = (value: Measure<'acceleration'>): number => canonical(value, 'm/s2');
export const timeSeconds = (value: Measure<'time'>): number => canonical(value, 's');
