import type { Dimension, Quantity, UnitByDimension, UnitDefinition, UnitFor, UnitSymbol } from './types.js';

const definitions = [
  ['length', 'mm', 1e-3], ['length', 'cm', 1e-2], ['length', 'm', 1], ['length', 'in', 0.0254], ['length', 'ft', 0.3048],
  ['area', 'mm2', 1e-6], ['area', 'cm2', 1e-4], ['area', 'm2', 1], ['area', 'in2', 0.00064516], ['area', 'ft2', 0.09290304],
  ['force', 'N', 1], ['force', 'kN', 1e3], ['force', 'MN', 1e6], ['force', 'kgf', 9.80665], ['force', 'tf', 9806.65], ['force', 'lbf', 4.4482216152605], ['force', 'kip', 4448.2216152605],
  ['stress', 'Pa', 1], ['stress', 'kPa', 1e3], ['stress', 'MPa', 1e6], ['stress', 'GPa', 1e9], ['stress', 'N/mm2', 1e6], ['stress', 'kgf/cm2', 98066.5], ['stress', 'tf/m2', 9806.65], ['stress', 'psi', 6894.757293168], ['stress', 'ksi', 6894757.293168],
  ['moment', 'N-mm', 1e-3], ['moment', 'kN-mm', 1], ['moment', 'N-m', 1], ['moment', 'kN-m', 1e3], ['moment', 'kgf-m', 9.80665], ['moment', 'tf-m', 9806.65], ['moment', 'lbf-ft', 1.3558179483314], ['moment', 'kip-ft', 1355.8179483314],
  ['plateMoment', 'N-mm/mm', 1], ['plateMoment', 'kN-m/m', 1e3], ['plateMoment', 'kgf-m/m', 9.80665], ['plateMoment', 'tf-m/m', 9806.65], ['plateMoment', 'lbf-ft/ft', 4.4482216152605], ['plateMoment', 'kip-ft/ft', 4448.2216152605],
  ['lineLoad', 'N/mm', 1e3], ['lineLoad', 'kN/mm', 1e6], ['lineLoad', 'N/m', 1], ['lineLoad', 'kN/m', 1e3], ['lineLoad', 'kgf/m', 9.80665], ['lineLoad', 'tf/m', 9806.65], ['lineLoad', 'lbf/ft', 14.593902937206], ['lineLoad', 'kip/ft', 14593.902937206],
  ['areaLoad', 'N/mm2', 1e6], ['areaLoad', 'N/m2', 1], ['areaLoad', 'kN/m2', 1e3], ['areaLoad', 'kgf/m2', 9.80665], ['areaLoad', 'tf/m2', 9806.65], ['areaLoad', 'psf', 47.8802589803358], ['areaLoad', 'ksf', 47880.2589803358],
  ['volumetricWeight', 'N/mm3', 1e9], ['volumetricWeight', 'N/m3', 1], ['volumetricWeight', 'kN/m3', 1e3], ['volumetricWeight', 'kgf/m3', 9.80665], ['volumetricWeight', 'tf/m3', 9806.65], ['volumetricWeight', 'pcf', 157.087463846246], ['volumetricWeight', 'kcf', 157087.463846246],
  ['acceleration', 'mm/s2', 1e-3], ['acceleration', 'cm/s2', 1e-2], ['acceleration', 'm/s2', 1], ['acceleration', 'in/s2', 0.0254], ['acceleration', 'ft/s2', 0.3048], ['acceleration', 'g', 9.80665],
  ['time', 'ms', 1e-3], ['time', 's', 1], ['time', 'min', 60],
  ['mass', 'kg', 1], ['mass', 't', 1e3], ['mass', 'lbm', 0.45359237],
  ['angle', 'rad', 1], ['angle', 'deg', Math.PI / 180],
] as const satisfies readonly (readonly [Dimension, UnitSymbol, number])[];

const registry = new Map<UnitSymbol, UnitDefinition>();
for (const [dimension, symbol, toSI] of definitions) {
  if (!registry.has(symbol)) registry.set(symbol, { dimension, symbol, toSI } as UnitDefinition);
}

function compatible(left: Dimension, right: Dimension): boolean {
  return left === right || (left === 'stress' && right === 'areaLoad') || (left === 'areaLoad' && right === 'stress');
}

function definition<D extends Dimension>(unit: UnitFor<D>, expected?: D): UnitDefinition<D> {
  const found = registry.get(unit as UnitSymbol);
  if (!found) throw new RangeError(`Unknown unit: ${unit}.`);
  if (expected !== undefined && !compatible(found.dimension, expected)) throw new TypeError(`${unit} is not a ${expected} unit.`);
  return found as UnitDefinition<D>;
}

export class UnitConverter {
  public convert<D extends Dimension>(value: number, from: UnitFor<D>, to: UnitFor<D>): number {
    if (!Number.isFinite(value)) throw new TypeError('value must be finite.');
    const source = definition(from);
    const target = definition(to, source.dimension as D);
    return value * source.toSI / target.toSI;
  }

  public quantity<D extends Dimension>(value: number, unit: UnitFor<D>): Quantity<D> {
    if (!Number.isFinite(value)) throw new TypeError('value must be finite.');
    definition(unit);
    return Object.freeze({ value, unit });
  }

  public toSI<D extends Dimension>(quantity: Quantity<D>, dimension?: D): number {
    return quantity.value * definition(quantity.unit, dimension).toSI;
  }

  public fromSI<D extends Dimension>(value: number, unit: UnitFor<D>): Quantity<D> {
    return this.quantity(value / definition(unit).toSI, unit);
  }

  public dimension(unit: UnitSymbol): Dimension {
    return definition(unit).dimension;
  }

  public units<D extends Dimension>(dimension: D): readonly UnitByDimension[D][] {
    return definitions.filter(([candidate]) => candidate === dimension).map(([, symbol]) => symbol) as UnitByDimension[D][];
  }
}

export const units = new UnitConverter();
