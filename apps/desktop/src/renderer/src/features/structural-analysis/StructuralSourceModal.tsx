import type { AutoCadSelectorInput, StructuralAnalysisInput } from '../../../../shared/contracts';
import { Modal } from '../../components/Modal';

type SourceKey = 'wallsX' | 'wallsY' | 'lintels' | 'columns';

export function StructuralSourceModal({ open, input, onChange, onClose }: {
  open: boolean;
  input: StructuralAnalysisInput;
  onChange(input: StructuralAnalysisInput): void;
  onClose(): void;
}): React.JSX.Element | null {
  const source = (key: SourceKey): AutoCadSelectorInput | undefined =>
    key === 'columns' ? input.columns : input.building.typicalFloor.sources[key];
  const setLayer = (key: SourceKey, value: string): void => {
    const selector = { type: 'layer' as const, values: split(value) };
    if (key === 'columns') onChange({ ...input, columns: selector });
    else onChange({
      ...input,
      building: {
        ...input.building,
        typicalFloor: {
          ...input.building.typicalFloor,
          sources: { ...input.building.typicalFloor.sources, [key]: selector },
        },
      },
    });
  };
  return <Modal open={open} title="Geometría estructural de AutoCAD" onClose={onClose}>
    <p className="modal-note">Cada polilínea cerrada de las capas seleccionadas se conserva en el modelo. Las columnas participan únicamente en la sección transformada.</p>
    <div className="form-grid columns-4">
      {(['wallsX', 'wallsY', 'lintels', 'columns'] as const).map((key) => <label className="field" key={key}><span>{labels[key]}</span><input value={source(key)?.values.join(', ') ?? ''} onChange={(event) => setLayer(key, event.target.value)} /></label>)}
    </div>
    <div className="inline-controls">
      <label className="field compact"><span>Unidad del dibujo</span><select value={input.drawingLengthUnit} onChange={(event) => onChange({ ...input, drawingLengthUnit: event.target.value as StructuralAnalysisInput['drawingLengthUnit'] })}>{['m', 'cm', 'mm', 'ft', 'in'].map((unit) => <option key={unit}>{unit}</option>)}</select></label>
    </div>
    <div className="modal-actions"><button className="primary-button" type="button" onClick={onClose}>Listo</button></div>
  </Modal>;
}

const labels: Record<SourceKey, string> = { wallsX: 'Muros X', wallsY: 'Muros Y', lintels: 'Dinteles', columns: 'Columnas' };
function split(value: string): string[] { return value.split(',').map((item) => item.trim()).filter(Boolean); }
