import { useCallback, useEffect, useState } from 'react';
import { Box, Cable, CircleAlert, CircleCheck, LoaderCircle, Play, RefreshCw } from 'lucide-react';
import type { BridgeStatus, RuntimeInfo } from '../../../../shared/contracts';

type Notice = { kind: 'success' | 'error'; message: string };

export function SystemPage(): React.JSX.Element {
  const [statuses, setStatuses] = useState<BridgeStatus[]>([]);
  const [runtime, setRuntime] = useState<RuntimeInfo>();
  const [loading, setLoading] = useState(true);
  const [launching, setLaunching] = useState(false);
  const [notice, setNotice] = useState<Notice>();
  const refresh = useCallback(async () => {
    setLoading(true);
    try { setStatuses(await window.alba.getBridgeStatuses()); } finally { setLoading(false); }
  }, []);

  useEffect(() => { void Promise.all([refresh(), window.alba.getRuntimeInfo().then(setRuntime)]); }, [refresh]);
  const launchEtabs = async (): Promise<void> => {
    setLaunching(true);
    setNotice(undefined);
    const response = await window.alba.launchEtabsHost();
    setNotice({ kind: response.ok ? 'success' : 'error', message: response.message });
    await refresh();
    setLaunching(false);
  };

  return <>
    <header className="topbar">
      <div><p className="product-name">APP ALBA</p><h1>Entorno estructural</h1></div>
      <button className="icon-button" type="button" onClick={() => void refresh()} disabled={loading} title="Actualizar conexiones"><RefreshCw size={18} className={loading ? 'spin' : undefined} /></button>
    </header>
    <section className="content-band">
      <div className="section-heading"><div><span className="eyebrow">SISTEMA</span><h2>Conexiones</h2></div><span className="summary-count">{statuses.filter((item) => item.state === 'connected').length}/{statuses.length || 2} activas</span></div>
      <div className="integration-list">
        {statuses.map((status) => <IntegrationRow key={status.id} status={status} launching={launching} onLaunchEtabs={launchEtabs} />)}
        {loading && statuses.length === 0 ? <div className="loading-state"><LoaderCircle size={20} className="spin" /><span>Comprobando conexiones</span></div> : null}
      </div>
      {notice ? <div className={`notice ${notice.kind}`}>{notice.kind === 'success' ? <CircleCheck size={17} /> : <CircleAlert size={17} />}<span>{notice.message}</span></div> : null}
    </section>
    <section className="runtime-band">
      <div><span className="eyebrow">ENTORNO</span><h2>Ejecución</h2></div>
      <dl className="runtime-grid"><RuntimeValue label="Aplicación" value={runtime?.appVersion} /><RuntimeValue label="Electron" value={runtime?.electronVersion} /><RuntimeValue label="Node.js" value={runtime?.nodeVersion} /><RuntimeValue label="Plataforma" value={runtime?.platform} /></dl>
    </section>
  </>;
}

function IntegrationRow({ status, launching, onLaunchEtabs }: { status: BridgeStatus; launching: boolean; onLaunchEtabs(): Promise<void> }): React.JSX.Element {
  const connected = status.state === 'connected';
  return <article className="integration-row">
    <div className={`integration-icon ${status.id}`}>{status.id === 'autocad' ? <Box size={23} /> : <Cable size={23} />}</div>
    <div className="integration-name"><h3>{status.name}</h3><span>localhost:{status.port}</span></div>
    <div className={`status-label ${status.state}`}><span className="status-dot" />{connected ? 'Conectado' : 'Desconectado'}</div>
    {status.id === 'etabs' && !connected ? <button className="primary-button" type="button" disabled={launching} onClick={() => void onLaunchEtabs()}>{launching ? <LoaderCircle size={16} className="spin" /> : <Play size={16} />}Iniciar</button> : <span className="row-spacer" />}
  </article>;
}

function RuntimeValue({ label, value }: { label: string; value: string | undefined }): React.JSX.Element {
  return <div><dt>{label}</dt><dd>{value ?? '...'}</dd></div>;
}
