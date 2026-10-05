import { useState } from 'react';
import { CircleAlert, Database, LoaderCircle, Play, Plus, SlidersHorizontal } from 'lucide-react';
import type { StructuralAnalysisInput, StructuralAnalysisResult, StructuralEngineSelection } from '../../../../shared/contracts';
import { NumericField } from '../../components/NumericField';
import { LevelEditor } from '../building-checks/LevelEditor';
import { SeismicParametersModal } from '../building-checks/SeismicParametersModal';
import { TypicalFloorForm } from '../building-checks/TypicalFloorForm';
import { createLevel } from '../building-checks/defaults';
import { UnitSystemControl } from '../units/UnitSystemControl';
import { MaterialPropertiesForm } from './MaterialPropertiesForm';
import { StructuralResults } from './StructuralResults';
import { StructuralSourceModal } from './StructuralSourceModal';
import { defaultStructuralAnalysisInput } from './defaults';

export function StructuralAnalysisPage(): React.JSX.Element {
  const [input, setInput] = useState<StructuralAnalysisInput>(defaultStructuralAnalysisInput);
  const [result, setResult] = useState<StructuralAnalysisResult>();
  const [error, setError] = useState<string>();
  const [running, setRunning] = useState(false);
  const [sourceOpen, setSourceOpen] = useState(false);
  const [seismicOpen, setSeismicOpen] = useState(false);
  const patchBuilding = (building: StructuralAnalysisInput['building']) => setInput((current) => ({ ...current, building }));
  const run = async () => {
    setRunning(true); setError(undefined);
    const response = await window.alba.runStructuralAnalysis(input);
    if (response.ok) setResult(response.data); else setError(response.message);
    setRunning(false);
  };
  return <>
    <header className="topbar"><div><p className="product-name">E.030 · R = 3</p><h1>Análisis estructural de albañilería</h1></div><div className="topbar-actions"><UnitSystemControl /><button className="icon-button" type="button" title="Capas de AutoCAD" onClick={() => setSourceOpen(true)}><Database size={18} /></button><button className="primary-button action-button" type="button" disabled={running} onClick={() => void run()}>{running ? <LoaderCircle size={16} className="spin" /> : <Play size={16} />}Analizar modelo</button></div></header>
    <section className="content-band analysis-form">
      <div className="section-heading"><div><span className="eyebrow">SOLUCIÓN</span><h2>Motor de análisis</h2></div><span className="source-chip">Geometría: AutoCAD</span></div>
      <div className="engine-selector">{(['opensees', 'etabs', 'both'] as const).map((engine) => <button type="button" key={engine} className={input.engine === engine ? 'active' : ''} onClick={() => setInput({ ...input, engine })}>{engineLabels[engine]}</button>)}</div>
      <div className="analysis-note"><SlidersHorizontal size={17} /><span>OpenSees y ETABS reciben el mismo modelo neutral. La concordancia se evalúa con una tolerancia relativa de {(input.comparisonTolerance * 100).toFixed(1)} %.</span><span className="locked-value">R = 3</span></div>
      <div className="form-grid columns-3 structural-basics"><label className="field"><span>Nombre del modelo</span><input value={input.modelId} onChange={(event) => setInput({ ...input, modelId: event.target.value })} /></label><NumericField label="Tolerancia de comparación (%)" value={input.comparisonTolerance * 100} min={0} max={100} step={0.5} onChange={(value) => setInput({ ...input, comparisonTolerance: value / 100 })} /></div>
    </section>
    <section className="content-band"><div className="section-heading"><div><span className="eyebrow">PROPIEDADES</span><h2>Materiales del modelo</h2></div><button className="secondary-button" type="button" onClick={() => setSeismicOpen(true)}>Parámetros E.030</button></div><MaterialPropertiesForm wall={input.wallMaterial} lintel={input.lintelMaterial} onWallChange={(wallMaterial) => setInput({ ...input, wallMaterial })} onLintelChange={(lintelMaterial) => setInput({ ...input, lintelMaterial })} /></section>
    <section className="content-band"><div className="section-heading"><div><span className="eyebrow">METRADO</span><h2>Planta típica y cargas</h2></div></div><TypicalFloorForm input={input.building} onChange={patchBuilding} /></section>
    <section className="content-band levels-band"><div className="section-heading"><div><span className="eyebrow">EDIFICIO</span><h2>Niveles</h2></div><button className="secondary-button" type="button" onClick={() => patchBuilding({ ...input.building, levels: [...input.building.levels, createLevel(input.building.levels.length)] })}><Plus size={16} />Agregar nivel</button></div><div className="levels-list">{input.building.levels.map((level, index) => <LevelEditor key={`${level.id}-${index}`} level={level} removable={input.building.levels.length > 1} onRemove={() => patchBuilding({ ...input.building, levels: input.building.levels.filter((_, current) => current !== index) })} onChange={(next) => patchBuilding({ ...input.building, levels: input.building.levels.map((item, current) => current === index ? next : item) })} />)}</div>{error ? <div className="notice error"><CircleAlert size={17} /><span>{error}</span></div> : null}</section>
    {result ? <StructuralResults result={result} /> : null}
    <StructuralSourceModal open={sourceOpen} input={input} onChange={setInput} onClose={() => setSourceOpen(false)} />
    <SeismicParametersModal open={seismicOpen} input={input.building} onChange={patchBuilding} onClose={() => setSeismicOpen(false)} />
  </>;
}

const engineLabels: Record<StructuralEngineSelection, string> = { opensees: 'OpenSees', etabs: 'ETABS', both: 'Comparar ambos' };
