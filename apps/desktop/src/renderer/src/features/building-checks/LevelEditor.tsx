import { Trash2 } from 'lucide-react';
import type { BuildingLevelInput } from '../../../../shared/contracts';
import { QuantityField } from '../../components/QuantityField';

export function LevelEditor({ level, onChange, onRemove, removable }: { level: BuildingLevelInput; onChange(level: BuildingLevelInput): void; onRemove(): void; removable: boolean }): React.JSX.Element {
  return <div className="level-row">
    <label className="field"><span>Nivel</span><input value={level.id} onChange={(event) => onChange({ ...level, id: event.target.value })} /></label>
    <QuantityField label="Altura de muro" dimension="length" value={level.wallHeight} min={0.1} onChange={(wallHeight) => onChange({ ...level, wallHeight })} />
    <button className="icon-button danger" type="button" title="Eliminar nivel" disabled={!removable} onClick={onRemove}><Trash2 size={17} /></button>
  </div>;
}
