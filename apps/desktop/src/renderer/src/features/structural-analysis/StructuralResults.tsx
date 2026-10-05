import { CircleCheck, CircleX } from 'lucide-react';
import type { StructuralAnalysisResult } from '../../../../shared/contracts';
import { useEngineeringUnits } from '../units/EngineeringUnitsContext';

type EngineKey = 'openSees' | 'etabs';

export function StructuralResults({ result }: { result: StructuralAnalysisResult }): React.JSX.Element {
  const display = useEngineeringUnits();
  const force = (value: number) => display.toDisplay(value, 'force').toFixed(2);
  const moment = (value: number) => display.toDisplay(value, 'moment').toFixed(2);
  const availableEngines = (['openSees', 'etabs'] as const).filter((engine) => result[engine]);

  return <div className="results-stack">
    <section className="result-band">
      <div className="section-heading"><div><span className="eyebrow">E.030 · ANÁLISIS ESTÁTICO</span><h2>Demanda sísmica</h2></div><span className="summary-count">R = {result.reductionFactor} · T = {result.periodSeconds.toFixed(3)} s</span></div>
      <div className="metric-strip"><div><span>Peso sísmico</span><strong>{force(result.seismicWeightKN)} {display.unit('force')}</strong></div><div><span>Cortante basal</span><strong>{force(result.baseShearKN)} {display.unit('force')}</strong></div><div><span>Muros analíticos</span><strong>{result.coverage.analyticalWallCount}</strong></div><div><span>Dinteles analíticos</span><strong>{result.coverage.analyticalLintelCount}</strong></div></div>
      <div className="table-wrap"><table><thead><tr><th>Nivel</th><th>Elevación</th><th>Peso sísmico</th><th>Fuerza inercial</th><th>CM X</th><th>CM Y</th></tr></thead><tbody>{result.levels.map((level) => <tr key={level.id}><td>{level.id}</td><td>{display.toDisplay(level.elevation, 'length').toFixed(3)} {display.unit('length')}</td><td>{force(level.seismicWeightKN)} {display.unit('force')}</td><td>{force(level.inertialForceKN)} {display.unit('force')}</td><td>{display.toDisplay(level.centerOfMass.x, 'length').toFixed(3)}</td><td>{display.toDisplay(level.centerOfMass.y, 'length').toFixed(3)}</td></tr>)}</tbody></table></div>
    </section>

    <section className="result-band">
      <div className="section-heading"><div><span className="eyebrow">MUROS POR NIVEL</span><h2>Fuerzas internas Ve y Me</h2></div>{result.comparison ? <span className={`comparison-state ${result.comparison.allWithinTolerance ? 'pass' : 'fail'}`}>{result.comparison.allWithinTolerance ? <CircleCheck size={16} /> : <CircleX size={16} />}{result.comparison.allWithinTolerance ? 'Motores consistentes' : 'Revisar diferencias'}</span> : null}</div>
      <div className="wall-result-tables">
        {availableEngines.flatMap((engine) => (result[engine]?.cases ?? []).map((loadCase) =>
          <WallActionTable
            key={`${engine}-${loadCase.caseId}`}
            engine={engine}
            caseId={loadCase.caseId}
            levels={result.levels.map((level) => level.id)}
            actions={loadCase.wallActions}
            forceUnit={display.unit('force')}
            momentUnit={display.unit('moment')}
            force={force}
            moment={moment}
          />))}
      </div>
      {result.warnings.length ? <details className="warnings"><summary>{result.warnings.length} advertencias de geometría</summary><ul>{result.warnings.map((warning, index) => <li key={index}>{warning}</li>)}</ul></details> : null}
    </section>
  </div>;
}

function WallActionTable({ engine, caseId, levels, actions, forceUnit, momentUnit, force, moment }: {
  engine: EngineKey;
  caseId: string;
  levels: readonly string[];
  actions: NonNullable<StructuralAnalysisResult[EngineKey]>['cases'][number]['wallActions'];
  forceUnit: string;
  momentUnit: string;
  force(value: number): string;
  moment(value: number): string;
}): React.JSX.Element {
  const direction = caseDirection(caseId);
  const filtered = direction ? actions.filter((action) => action.direction === direction) : actions;
  const wallIds = [...new Set(filtered.map((action) => action.wallId))]
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  const byWallLevel = new Map(filtered.map((action) => [`${action.wallId}|${action.levelId}`, action]));
  const axis = direction ? `${direction.toUpperCase()}-${direction.toUpperCase()}` : caseId;
  return <div className="wall-action-matrix">
    <h3>{engineLabel(engine)} · Sismo moderado {axis}</h3>
    <p>Fuerzas internas Ve ({forceUnit}) y Me ({momentUnit})</p>
    <div className="table-wrap"><table>
      <thead>
        <tr><th rowSpan={2}>Muro</th>{levels.map((level, index) => <th key={level} colSpan={2}>PISO {index + 1}</th>)}</tr>
        <tr>{levels.flatMap((level) => [<th key={`${level}-ve`}>Ve</th>, <th key={`${level}-me`}>Me</th>])}</tr>
      </thead>
      <tbody>{wallIds.map((wallId) => <tr key={wallId}><td><strong>{wallId}</strong></td>{levels.flatMap((level) => {
        const action = byWallLevel.get(`${wallId}|${level}`);
        return [<td key={`${level}-ve`}>{action ? force(action.shear) : '-'}</td>, <td key={`${level}-me`}>{action ? moment(action.moment) : '-'}</td>];
      })}</tr>)}</tbody>
    </table></div>
  </div>;
}

function caseDirection(caseId: string): 'x' | 'y' | undefined {
  const normalized = caseId.toLowerCase();
  if (normalized.endsWith('x')) return 'x';
  if (normalized.endsWith('y')) return 'y';
  return undefined;
}

function engineLabel(engine: EngineKey): string {
  return engine === 'openSees' ? 'OpenSees' : 'ETABS';
}
