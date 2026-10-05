import { units } from './UnitConverter.js';
import type { Dimension, Quantity, QuantityInput, UnitFor } from './types.js';

export type EngineeringUnitSystemDefinition = { readonly [D in Dimension]: UnitFor<D> };

export class EngineeringUnitSystem {
  public constructor(public readonly definition: EngineeringUnitSystemDefinition) {}

  public read<D extends Dimension>(value: QuantityInput<D>, dimension: D): number {
    const quantity: Quantity<D> = typeof value === 'number'
      ? units.quantity(value, this.definition[dimension])
      : value;
    return units.toSI(quantity, dimension);
  }

  public write<D extends Dimension>(siValue: number, dimension: D): Quantity<D> {
    return units.fromSI(siValue, this.definition[dimension]);
  }
}

const common = {
  mass: 'kg',
  angle: 'rad',
  acceleration: 'm/s2',
  time: 's',
} as const;

export const UnitSystems = Object.freeze({
  kN_m: new EngineeringUnitSystem({ ...common, length: 'm', area: 'm2', force: 'kN', stress: 'MPa', moment: 'kN-m', plateMoment: 'kN-m/m', lineLoad: 'kN/m', areaLoad: 'kN/m2', volumetricWeight: 'kN/m3' }),
  N_mm: new EngineeringUnitSystem({ ...common, length: 'mm', area: 'mm2', force: 'N', stress: 'MPa', moment: 'N-mm', plateMoment: 'N-mm/mm', lineLoad: 'N/mm', areaLoad: 'N/mm2', volumetricWeight: 'N/mm3' }),
  tf_m: new EngineeringUnitSystem({ ...common, length: 'm', area: 'm2', force: 'tf', stress: 'kgf/cm2', moment: 'tf-m', plateMoment: 'tf-m/m', lineLoad: 'tf/m', areaLoad: 'tf/m2', volumetricWeight: 'tf/m3' }),
  kip_ft: new EngineeringUnitSystem({ mass: 'lbm', angle: 'rad', acceleration: 'ft/s2', time: 's', length: 'ft', area: 'ft2', force: 'kip', stress: 'ksi', moment: 'kip-ft', plateMoment: 'kip-ft/ft', lineLoad: 'kip/ft', areaLoad: 'ksf', volumetricWeight: 'kcf' }),
});
