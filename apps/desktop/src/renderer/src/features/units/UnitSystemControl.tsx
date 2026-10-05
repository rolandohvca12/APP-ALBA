import { useEngineeringUnits, type UnitSystemKey } from './EngineeringUnitsContext';

const labels: Record<UnitSystemKey, string> = { kN_m: 'kN · m', N_mm: 'N · mm', tf_m: 'tf · m', kip_ft: 'kip · ft' };

export function UnitSystemControl(): React.JSX.Element {
  const { systemKey, setSystemKey } = useEngineeringUnits();
  return <label className="unit-control"><span>Unidades</span><select value={systemKey} onChange={(event) => setSystemKey(event.target.value as UnitSystemKey)}>{Object.entries(labels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select></label>;
}
