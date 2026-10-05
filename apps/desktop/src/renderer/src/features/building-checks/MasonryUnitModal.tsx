import { E070_TABLE_9, e070_2006, type MasonryTable9Unit } from '@app-alba/peru-rne';
import type { BuildingVerificationInput } from '../../../../shared/contracts';
import { Modal } from '../../components/Modal';

export function MasonryUnitModal({ open, input, onChange, onClose }: { open: boolean; input: BuildingVerificationInput; onChange(input: BuildingVerificationInput): void; onClose(): void }): React.JSX.Element | null {
  const unit = input.masonryUnit;
  const patch = (next: Partial<typeof unit>): void => onChange({ ...input, masonryUnit: { ...unit, ...next } });
  const properties = E070_TABLE_9[unit.table9Unit];
  const limits = e070_2006.materials.unitClassLimits(unit.unitClass);
  const setTable9Unit = (table9Unit: MasonryTable9Unit): void => {
    const selected = E070_TABLE_9[table9Unit];
    patch({ table9Unit, material: selected.rawMaterial, production: table9Unit.includes('artisanal') ? 'artisanal' : 'industrial' });
  };
  return <Modal open={open} title="Unidad de albañilería" onClose={onClose}>
    <div className="modal-section"><span className="eyebrow">TABLA 1</span><h3>Clasificación de la unidad</h3></div>
    <div className="form-grid columns-3">
      <label className="field"><span>Clase</span><select value={unit.unitClass} onChange={(event) => patch({ unitClass: event.target.value as typeof unit.unitClass })}>{['Ladrillo I', 'Ladrillo II', 'Ladrillo III', 'Ladrillo IV', 'Ladrillo V', 'Bloque P', 'Bloque NP'].map((value) => <option key={value}>{value}</option>)}</select></label>
      <label className="field"><span>Geometría</span><select value={unit.geometry} onChange={(event) => patch({ geometry: event.target.value as typeof unit.geometry })}><option value="solid">Sólida</option><option value="hollow">Hueca</option><option value="alveolar">Alveolar</option><option value="tubular">Tubular</option></select></label>
      <label className="field"><span>Relleno</span><select value={unit.grout} onChange={(event) => patch({ grout: event.target.value as typeof unit.grout })}><option value="none">Sin grout</option><option value="partial">Parcial</option><option value="full">Total</option></select></label>
    </div>
    <dl className="derived-grid"><div><dt>f'b mínimo</dt><dd>{limits.compressiveStrengthMpa} MPa</dd></div><div><dt>Alabeo máximo</dt><dd>{limits.warpageMm} mm</dd></div><div><dt>Variación dimensional</dt><dd>{limits.variationPercent.join(' / ')} %</dd></div></dl>
    <div className="modal-section spaced"><span className="eyebrow">TABLA 9</span><h3>Propiedades de la albañilería</h3></div>
    <label className="field"><span>Tipo de unidad</span><select value={unit.table9Unit} onChange={(event) => setTable9Unit(event.target.value as MasonryTable9Unit)}>{Object.values(E070_TABLE_9).map((item) => <option key={item.id} value={item.id}>{materialLabel(item.rawMaterial)} · {item.denomination}</option>)}</select></label>
    <dl className="derived-grid"><div><dt>f'b</dt><dd>{properties.unitCompressiveStrengthMpa} MPa</dd></div><div><dt>f'm</dt><dd>{properties.masonryCompressiveStrengthMpa} MPa</dd></div><div><dt>v'm</dt><dd>{properties.masonryShearStrengthMpa} MPa</dd></div></dl>
    <div className="modal-actions"><button className="primary-button" type="button" onClick={onClose}>Listo</button></div>
  </Modal>;
}

function materialLabel(material: 'clay' | 'calciumSilicate' | 'concrete'): string {
  return material === 'clay' ? 'Arcilla' : material === 'calciumSilicate' ? 'Sílice-cal' : 'Concreto';
}
