import type { TypicalFloorInput } from '../../../../shared/contracts';
import { Modal } from '../../components/Modal';

export function AutoCadSourceModal({ open, floor, onChange, onClose }: { open: boolean; floor: TypicalFloorInput; onChange(floor: TypicalFloorInput): void; onClose(): void }): React.JSX.Element | null {
  const setLayer = (key: 'wallsX' | 'wallsY' | 'lintels', value: string): void => onChange({ ...floor, sources: { ...floor.sources, [key]: { type: 'layer', values: split(value) } } });
  const layer = (key: 'wallsX' | 'wallsY' | 'lintels'): string => floor.sources[key]?.values.join(', ') ?? '';
  return <Modal open={open} title="Fuente AutoCAD" onClose={onClose}>
    <p className="modal-note">Estas capas identifican la planta típica. Las dimensiones, áreas y etiquetas se leen directamente del dibujo.</p>
    <div className="form-grid columns-3"><label className="field"><span>Muros X</span><input value={layer('wallsX')} onChange={(event) => setLayer('wallsX', event.target.value)} /></label><label className="field"><span>Muros Y</span><input value={layer('wallsY')} onChange={(event) => setLayer('wallsY', event.target.value)} /></label><label className="field"><span>Dinteles</span><input value={layer('lintels')} onChange={(event) => setLayer('lintels', event.target.value)} /></label></div>
    <div className="modal-actions"><button className="primary-button" type="button" onClick={onClose}>Listo</button></div>
  </Modal>;
}

function split(value: string): string[] { return value.split(',').map((item) => item.trim()).filter(Boolean); }
