import { X } from 'lucide-react';
import { useEffect } from 'react';

export function Modal({ open, title, children, onClose }: { open: boolean; title: string; children: React.ReactNode; onClose(): void }): React.JSX.Element | null {
  useEffect(() => {
    if (!open) return undefined;
    const close = (event: KeyboardEvent): void => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [open, onClose]);
  if (!open) return null;
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <header className="modal-header"><h2 id="modal-title">{title}</h2><button className="icon-button" type="button" title="Cerrar" onClick={onClose}><X size={18} /></button></header>
      <div className="modal-body">{children}</div>
    </section>
  </div>;
}
