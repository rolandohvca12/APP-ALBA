import { e030_2026 } from '@app-alba/peru-rne';
import type { BuildingVerificationInput } from '../../../../shared/contracts';
import { Modal } from '../../components/Modal';
import { NumericField } from '../../components/NumericField';

export function SeismicParametersModal({ open, input, onChange, onClose }: { open: boolean; input: BuildingVerificationInput; onChange(input: BuildingVerificationInput): void; onClose(): void }): React.JSX.Element | null {
  const seismic = input.seismicParameters;
  const patch = (next: Partial<typeof seismic>): void => onChange({ ...input, seismicParameters: { ...seismic, ...next } });
  const setVs30 = (value: number): void => {
    const { vs30Mps: _, ...withoutVs30 } = seismic;
    onChange({ ...input, seismicParameters: value > 0 ? { ...withoutVs30, vs30Mps: value } : withoutVs30 });
  };
  const derived = derive(input);
  return <Modal open={open} title="Parámetros sísmicos E.030" onClose={onClose}>
    <div className="form-grid columns-3">
      <label className="field"><span>Zona sísmica</span><select value={seismic.zone} onChange={(event) => patch({ zone: Number(event.target.value) as typeof seismic.zone })}>{[1, 2, 3, 4].map((zone) => <option key={zone} value={zone}>Zona {zone}</option>)}</select></label>
      <label className="field"><span>Perfil de suelo</span><select value={seismic.soilProfile} onChange={(event) => patch({ soilProfile: event.target.value as typeof seismic.soilProfile })}>{['S0', 'S1', 'S2', 'S3', 'S4', 'S5'].map((profile) => <option key={profile}>{profile}</option>)}</select></label>
      <label className="field"><span>Categoría</span><select value={seismic.category} onChange={(event) => patch({ category: event.target.value as typeof seismic.category })}>{['A1', 'A2', 'B', 'C'].map((category) => <option key={category}>{category}</option>)}</select></label>
      {(seismic.soilProfile === 'S2' || seismic.soilProfile === 'S3') ? <NumericField label="Vs30 opcional (m/s)" value={seismic.vs30Mps ?? 0} min={0} onChange={setVs30} /> : null}
      <label className="check-field"><input type="checkbox" checked={seismic.baseIsolated ?? false} onChange={(event) => patch({ baseIsolated: event.target.checked })} />Aislamiento sísmico</label>
    </div>
    {derived.error ? <div className="notice error">{derived.error}</div> : <dl className="derived-grid"><div><dt>Z</dt><dd>{derived.z}</dd></div><div><dt>U</dt><dd>{derived.u}</dd></div><div><dt>S</dt><dd>{derived.s}</dd></div></dl>}
    <div className="modal-actions"><button className="primary-button" type="button" onClick={onClose}>Listo</button></div>
  </Modal>;
}

function derive(input: BuildingVerificationInput): { z?: number; u?: number; s?: number; error?: string } {
  try {
    const value = input.seismicParameters;
    const site = e030_2026.hazard.siteParameters(value.zone, value.soilProfile, value.vs30Mps);
    if (site.soilFactor === null) return { error: 'Esta combinación requiere un estudio específico de respuesta de sitio.' };
    return { z: e030_2026.hazard.zoneFactor(value.zone), u: e030_2026.buildings.useFactor({ category: value.category, seismicZone: value.zone, baseIsolated: value.baseIsolated ?? false }), s: site.soilFactor };
  } catch (error) {
    return { error: error instanceof Error ? error.message : String(error) };
  }
}
