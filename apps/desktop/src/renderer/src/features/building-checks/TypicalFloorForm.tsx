import type { BuildingVerificationInput } from '../../../../shared/contracts';
import { NumericField } from '../../components/NumericField';
import { QuantityField } from '../../components/QuantityField';

export function TypicalFloorForm({ input, onChange }: { input: BuildingVerificationInput; onChange(input: BuildingVerificationInput): void }): React.JSX.Element {
  const floor = input.typicalFloor;
  const patchFloor = (next: Partial<typeof floor>): void => onChange({ ...input, typicalFloor: { ...floor, ...next } });
  const setSpan = (spanDirection: 'x' | 'y'): void => { if (floor.slab.type === 'unidirectional') patchFloor({ slab: { ...floor.slab, spanDirection } }); };
  const setSlabWeight = (selfWeightPerArea: number): void => { if (floor.slab.type === 'unidirectional') patchFloor({ slab: { ...floor.slab, selfWeightPerArea } }); };
  return <>
    <div className="form-grid columns-4">
      <QuantityField label="Espesor de losa" dimension="length" value={input.slabThickness} min={0.01} onChange={(slabThickness) => onChange({ ...input, slabThickness })} />
      <QuantityField label="Sobrecarga" dimension="areaLoad" value={floor.liveLoadPerArea} min={0} onChange={(liveLoadPerArea) => patchFloor({ liveLoadPerArea })} />
      <QuantityField label="Altura de dintel" dimension="length" value={floor.lintelHeight} min={0.01} onChange={(lintelHeight) => patchFloor({ lintelHeight })} />
      <QuantityField label="Espesor de tarrajeo" dimension="length" value={floor.plasterThickness} min={0} onChange={(plasterThickness) => patchFloor({ plasterThickness })} />
      <QuantityField label="Peso albañilería" dimension="volumetricWeight" value={input.specificWeights.masonry} min={0.01} onChange={(masonry) => onChange({ ...input, specificWeights: { ...input.specificWeights, masonry } })} />
      <QuantityField label="Peso concreto" dimension="volumetricWeight" value={input.specificWeights.concrete} min={0.01} onChange={(concrete) => onChange({ ...input, specificWeights: { ...input.specificWeights, concrete } })} />
      <QuantityField label="Peso tarrajeo" dimension="volumetricWeight" value={input.specificWeights.plaster} min={0.01} onChange={(plaster) => onChange({ ...input, specificWeights: { ...input.specificWeights, plaster } })} />
      <QuantityField label="Tolerancia geométrica" dimension="length" value={floor.closureTolerance ?? 0.25} min={0.001} onChange={(closureTolerance) => patchFloor({ closureTolerance })} />
    </div>
    <div className="inline-controls"><label className="field"><span>Tipo de losa</span><select value={floor.slab.type} onChange={(event) => patchFloor({ slab: event.target.value === 'bidirectional' ? { type: 'bidirectional' } : { type: 'unidirectional', spanDirection: 'x', selfWeightPerArea: 3 } })}><option value="bidirectional">Bidireccional</option><option value="unidirectional">Unidireccional</option></select></label>
      {floor.slab.type === 'unidirectional' ? <><label className="field"><span>Dirección</span><select value={floor.slab.spanDirection} onChange={(event) => setSpan(event.target.value as 'x' | 'y')}><option value="x">X</option><option value="y">Y</option></select></label><QuantityField label="Peso propio de losa" dimension="areaLoad" value={floor.slab.selfWeightPerArea} min={0.01} onChange={setSlabWeight} /></> : null}
      <NumericField label="α sísmico" value={input.seismicLiveLoadFactor} min={0} max={1} onChange={(seismicLiveLoadFactor) => onChange({ ...input, seismicLiveLoadFactor })} />
    </div>
    <div className="toggle-row"><label><input type="checkbox" checked={input.includePlaster ?? true} onChange={(event) => onChange({ ...input, includePlaster: event.target.checked })} />Tarrajeo</label><label><input type="checkbox" checked={input.includeBondBeams ?? true} onChange={(event) => onChange({ ...input, includeBondBeams: event.target.checked })} />Vigas soleras</label></div>
  </>;
}
