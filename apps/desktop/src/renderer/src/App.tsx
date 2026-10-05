import { useState } from 'react';
import { ChartNoAxesCombined, ClipboardCheck, MonitorCog } from 'lucide-react';
import { BuildingChecksPage } from './features/building-checks/BuildingChecksPage';
import { SystemPage } from './features/system/SystemPage';
import { EngineeringUnitsProvider } from './features/units/EngineeringUnitsContext';
import { StructuralAnalysisPage } from './features/structural-analysis/StructuralAnalysisPage';

type View = 'system' | 'checks' | 'structural';

export function App(): React.JSX.Element {
  const [view, setView] = useState<View>('checks');
  return <EngineeringUnitsProvider>
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-mark" aria-label="APP ALBA">A</div>
        <nav className="side-nav" aria-label="Navegación principal">
          <button className={`nav-button ${view === 'system' ? 'active' : ''}`} type="button" title="Sistema" aria-label="Sistema" onClick={() => setView('system')}>
            <MonitorCog size={20} />
          </button>
          <button className={`nav-button ${view === 'checks' ? 'active' : ''}`} type="button" title="Verificaciones E.070" aria-label="Verificaciones E.070" onClick={() => setView('checks')}>
            <ClipboardCheck size={20} />
          </button>
          <button className={`nav-button ${view === 'structural' ? 'active' : ''}`} type="button" title="Análisis estructural" aria-label="Análisis estructural" onClick={() => setView('structural')}>
            <ChartNoAxesCombined size={20} />
          </button>
        </nav>
      </aside>
      <main className="workspace">
        {view === 'system' ? <SystemPage /> : view === 'structural' ? <StructuralAnalysisPage /> : <BuildingChecksPage />}
      </main>
    </div>
  </EngineeringUnitsProvider>;
}
