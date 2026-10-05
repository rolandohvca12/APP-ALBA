export interface UnitByDimension {
  length: 'mm' | 'cm' | 'm' | 'in' | 'ft';
  area: 'mm2' | 'cm2' | 'm2' | 'in2' | 'ft2';
  force: 'N' | 'kN' | 'MN' | 'kgf' | 'tf' | 'lbf' | 'kip';
  stress: 'Pa' | 'kPa' | 'MPa' | 'GPa' | 'N/mm2' | 'kgf/cm2' | 'tf/m2' | 'psi' | 'ksi';
  moment: 'N-mm' | 'kN-mm' | 'N-m' | 'kN-m' | 'kgf-m' | 'tf-m' | 'lbf-ft' | 'kip-ft';
  plateMoment: 'N-mm/mm' | 'kN-m/m' | 'kgf-m/m' | 'tf-m/m' | 'lbf-ft/ft' | 'kip-ft/ft';
  lineLoad: 'N/mm' | 'kN/mm' | 'N/m' | 'kN/m' | 'kgf/m' | 'tf/m' | 'lbf/ft' | 'kip/ft';
  areaLoad: 'N/mm2' | 'N/m2' | 'kN/m2' | 'kgf/m2' | 'tf/m2' | 'psf' | 'ksf';
  volumetricWeight: 'N/mm3' | 'N/m3' | 'kN/m3' | 'kgf/m3' | 'tf/m3' | 'pcf' | 'kcf';
  acceleration: 'mm/s2' | 'cm/s2' | 'm/s2' | 'in/s2' | 'ft/s2' | 'g';
  time: 'ms' | 's' | 'min';
  mass: 'kg' | 't' | 'lbm';
  angle: 'rad' | 'deg';
}

export type Dimension = keyof UnitByDimension;
export type UnitFor<D extends Dimension> = UnitByDimension[D];
export type UnitSymbol = UnitByDimension[Dimension];

export interface Quantity<D extends Dimension = Dimension> {
  readonly value: number;
  readonly unit: UnitFor<D>;
}

export interface UnitDefinition<D extends Dimension = Dimension> {
  readonly dimension: D;
  readonly symbol: UnitFor<D>;
  readonly toSI: number;
}

export type QuantityInput<D extends Dimension> = number | Quantity<D>;
