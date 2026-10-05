import { createContext, useContext, useMemo, useState } from 'react';
import { UnitSystems, units, type Dimension, type UnitFor } from '@app-alba/engineering-units';

export type UnitSystemKey = keyof typeof UnitSystems;

const canonicalUnits = {
  length: 'm', area: 'm2', force: 'kN', stress: 'MPa', moment: 'kN-m',
  plateMoment: 'kN-m/m', lineLoad: 'kN/m', areaLoad: 'kN/m2',
  volumetricWeight: 'kN/m3', acceleration: 'm/s2', time: 's', mass: 'kg', angle: 'rad',
} as const;

interface EngineeringUnitsValue {
  systemKey: UnitSystemKey;
  setSystemKey(key: UnitSystemKey): void;
  unit<D extends Dimension>(dimension: D): UnitFor<D>;
  toDisplay<D extends Dimension>(value: number, dimension: D): number;
  fromDisplay<D extends Dimension>(value: number, dimension: D): number;
}

const UnitsContext = createContext<EngineeringUnitsValue | null>(null);

export function EngineeringUnitsProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  const [systemKey, setSystemKey] = useState<UnitSystemKey>('kN_m');
  const value = useMemo<EngineeringUnitsValue>(() => {
    const system = UnitSystems[systemKey];
    return {
      systemKey,
      setSystemKey,
      unit: <D extends Dimension>(dimension: D) => system.definition[dimension],
      toDisplay: <D extends Dimension>(amount: number, dimension: D) => units.convert(amount, canonicalUnits[dimension] as UnitFor<D>, system.definition[dimension]),
      fromDisplay: <D extends Dimension>(amount: number, dimension: D) => units.convert(amount, system.definition[dimension], canonicalUnits[dimension] as UnitFor<D>),
    };
  }, [systemKey]);
  return <UnitsContext.Provider value={value}>{children}</UnitsContext.Provider>;
}

export function useEngineeringUnits(): EngineeringUnitsValue {
  const value = useContext(UnitsContext);
  if (!value) throw new Error('EngineeringUnitsProvider is missing.');
  return value;
}
