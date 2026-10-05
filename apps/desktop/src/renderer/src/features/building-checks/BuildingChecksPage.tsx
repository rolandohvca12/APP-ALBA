import { useState } from 'react';
import { BrickWall, CircleAlert, Database, LoaderCircle, MapPinned, Play, Plus } from 'lucide-react';
import { E070_TABLE_9 } from '@app-alba/peru-rne';
import type { BuildingVerificationInput, BuildingVerificationResult } from '../../../../shared/contracts';
import { createLevel, defaultVerificationInput } from './defaults';
import { LevelEditor } from './LevelEditor';
import { VerificationResults } from './VerificationResults';
import { AutoCadSourceModal } from './AutoCadSourceModal';
import { TypicalFloorForm } from './TypicalFloorForm';
import { UnitSystemControl } from '../units/UnitSystemControl';
import { MasonryUnitModal } from './MasonryUnitModal';
import { SeismicParametersModal } from './SeismicParametersModal';

export function BuildingChecksPage(): React.JSX.Element {
  const [input, setInput] = useState<BuildingVerificationInput>(defaultVerificationInput);
  const [result, setResult] = useState<BuildingVerificationResult>();
  const [error, setError] = useState<string>();
  const [running, setRunning] = useState(false);
  const [sourceOpen, setSourceOpen] = useState(false);
  const [masonryOpen, setMasonryOpen] = useState(false);
  const [seismicOpen, setSeismicOpen] = useState(false);
  const patch = (next: Partial<BuildingVerificationInput>): void => setInput((current) => ({ ...current, ...next }));
  const run = async (): Promise<void> => {
    setRunning(true); setError(undefined);
    const response = await window.alba.calculateBuildingVerification(input);
    if (response.ok) setResult(response.data); else setError(response.message);
    setRunning(false);
  };
  return <>
    <header className="topbar"><div><p className="product-name">RNE E.070 · 2006</p><h1>Predimensionamiento de albañilería</h1></div><div className="topbar-actions"><UnitSystemControl /><button className="icon-button" type="button" title="Configurar fuente AutoCAD" onClick={() => setSourceOpen(true)}><Database size={18} /></button><button className="primary-button action-button" type="button" disabled={running} onClick={() => void run()}>{running ? <LoaderCircle size={16} className="spin" /> : <Play size={16} />}Calcular</button></div></header>
    <section className="content-band analysis-form">
      <div className="section-heading"><div><span className="eyebrow">CONFIGURACIÓN</span><h2>Normativa y materiales</h2></div></div>
      <div className="configuration-list">
        <button type="button" className="configuration-row" onClick={() => setSeismicOpen(true)}><span className="configuration-icon"><MapPinned size={19} /></span><span><strong>Parámetros sísmicos</strong><small>E.030 · Zona {input.seismicParameters.zone} · Suelo {input.seismicParameters.soilProfile} · Categoría {input.seismicParameters.category}</small></span><span>Configurar</span></button>
        <button type="button" className="configuration-row" onClick={() => setMasonryOpen(true)}><span className="configuration-icon"><BrickWall size={19} /></span><span><strong>Unidad de albañilería</strong><small>E.070 · {input.masonryUnit.unitClass} · {E070_TABLE_9[input.masonryUnit.table9Unit].denomination}</small></span><span>Configurar</span></button>
      </div>
    </section>
    <section className="content-band"><div className="section-heading"><div><span className="eyebrow">MODELO</span><h2>Planta típica</h2></div><span className="summary-count">Geometría y tags desde AutoCAD</span></div><TypicalFloorForm input={input} onChange={setInput} /></section>
    <section className="content-band levels-band">
      <div className="section-heading"><div><span className="eyebrow">EDIFICIO</span><h2>Alturas por nivel</h2></div><button className="secondary-button" type="button" onClick={() => patch({ levels: [...input.levels, createLevel(input.levels.length)] })}><Plus size={16} />Agregar nivel</button></div>
      <div className="levels-list">{input.levels.map((level, index) => <LevelEditor key={index} level={level} removable={input.levels.length > 1} onRemove={() => patch({ levels: input.levels.filter((_, current) => current !== index) })} onChange={(next) => patch({ levels: input.levels.map((item, current) => current === index ? next : item) })} />)}</div>
      {error ? <div className="notice error"><CircleAlert size={17} /><span>{error}</span></div> : null}
    </section>
    {result ? <VerificationResults result={result} /> : null}
    <AutoCadSourceModal open={sourceOpen} floor={input.typicalFloor} onChange={(typicalFloor) => patch({ typicalFloor })} onClose={() => setSourceOpen(false)} />
    <MasonryUnitModal open={masonryOpen} input={input} onChange={setInput} onClose={() => setMasonryOpen(false)} />
    <SeismicParametersModal open={seismicOpen} input={input} onChange={setInput} onClose={() => setSeismicOpen(false)} />
  </>;
}
