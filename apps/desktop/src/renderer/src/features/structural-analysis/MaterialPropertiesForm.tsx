import type { ElasticMaterial } from '@app-alba/structural-analysis';
import { NumericField } from '../../components/NumericField';
import { useEngineeringUnits } from '../units/EngineeringUnitsContext';

export function MaterialPropertiesForm({ wall, lintel, onWallChange, onLintelChange }: {
  wall: ElasticMaterial;
  lintel: ElasticMaterial;
  onWallChange(material: ElasticMaterial): void;
  onLintelChange(material: ElasticMaterial): void;
}): React.JSX.Element {
  const display = useEngineeringUnits();
  const stressUnit = display.unit('stress');
  const modulus = (label: string, valueKNM2: number, onChange: (value: number) => void) =>
    <NumericField label={`${label} (${stressUnit})`} value={display.toDisplay(valueKNM2 / 1000, 'stress')} min={0} onChange={(value) => onChange(display.fromDisplay(value, 'stress') * 1000)} />;
  return <div className="material-columns">
    <div><h3>Albañilería</h3><div className="form-grid columns-3">{modulus('E', wall.elasticModulus, (elasticModulus) => onWallChange({ ...wall, elasticModulus }))}{modulus('G', wall.shearModulus, (shearModulus) => onWallChange({ ...wall, shearModulus }))}<NumericField label="Poisson" value={wall.poissonRatio ?? 0.25} min={0} max={0.49} onChange={(poissonRatio) => onWallChange({ ...wall, poissonRatio })} /></div></div>
    <div><h3>Concreto de dinteles</h3><div className="form-grid columns-3">{modulus('E', lintel.elasticModulus, (elasticModulus) => onLintelChange({ ...lintel, elasticModulus }))}{modulus('G', lintel.shearModulus, (shearModulus) => onLintelChange({ ...lintel, shearModulus }))}<NumericField label="Poisson" value={lintel.poissonRatio ?? 0.2} min={0} max={0.49} onChange={(poissonRatio) => onLintelChange({ ...lintel, poissonRatio })} /></div></div>
  </div>;
}
