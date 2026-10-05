import type { BuildingVerificationResult } from '../../../../shared/contracts';
import { useEngineeringUnits } from '../units/EngineeringUnitsContext';

export function VerificationResults({ result }: { result: BuildingVerificationResult }): React.JSX.Element {
  const display = useEngineeringUnits();
  const quantity = (value: number, dimension: 'length' | 'area' | 'force' | 'stress'): string => `${format(display.toDisplay(value, dimension))} ${display.unit(dimension)}`;
  return <div className="results-stack">
    <section className="result-band">
      <div className="section-heading"><div><span className="eyebrow">METRADO</span><h2>Peso por nivel</h2></div><span className="source-chip">AutoCAD</span></div>
      <div className="table-wrap"><table><thead><tr><th>Nivel</th><th>Peso sísmico</th><th>Peso de servicio</th></tr></thead><tbody>{result.levels.map((level) => <tr key={level.id}><td>{level.id}</td><td>{quantity(level.seismicWeight, 'force')}</td><td>{quantity(level.totalServiceWeight, 'force')}</td></tr>)}</tbody></table></div>
    </section>
    <section className="result-band">
      <div className="section-heading"><div><span className="eyebrow">E.070 · EDIFICIO</span><h2>Verificaciones globales</h2></div><span className="summary-count">Z={result.seismicParameters.zoneFactor} · U={result.seismicParameters.useFactor} · S={result.seismicParameters.soilFactor} · N={result.levels.length}</span></div>
      <div className="material-summary"><strong>{result.masonryProperties.denomination}</strong><span>f'b = {quantity(result.masonryProperties.unitCompressiveStrengthMpa, 'stress')}</span><span>f'm = {quantity(result.masonryProperties.masonryCompressiveStrengthMpa, 'stress')}</span><span>v'm = {quantity(result.masonryProperties.masonryShearStrengthMpa, 'stress')}</span></div>
      <h3 className="table-title">Densidad de muros</h3>
      <div className="table-wrap"><table><thead><tr><th>Dirección</th><th>Muros</th><th>Área efectiva</th><th>Provista</th><th>Requerida</th><th>Estado</th></tr></thead><tbody>{result.density.map((item) => <tr key={item.direction}><td>{item.direction.toUpperCase()}</td><td>{item.wallCount}</td><td>{quantity(item.providedWallArea, 'area')}</td><td>{percent(item.result.demand?.value)}</td><td>{percent(item.result.limit?.value)}</td><td><Status status={item.result.status} /></td></tr>)}</tbody></table></div>
      <h3 className="table-title">Esfuerzo axial en la base del primer nivel</h3>
      <div className="table-wrap"><table><thead><tr><th>Tag</th><th>Dir.</th><th>Longitud</th><th>Espesor</th><th>Área trib./piso</th><th>Área trib. acum.</th><th>PD acumulada</th><th>PL acumulada</th><th>Esfuerzo</th><th>Límite</th><th>Estado</th></tr></thead><tbody>{result.axial.map((wall) => <tr key={`${wall.direction}-${wall.tag}`}><td>{wall.tag}</td><td>{wall.direction.toUpperCase()}</td><td>{quantity(wall.wallLength, 'length')}</td><td>{quantity(wall.effectiveThickness, 'length')}</td><td>{quantity(wall.tributaryAreaPerFloor, 'area')}</td><td>{quantity(wall.accumulatedTributaryArea, 'area')}</td><td>{quantity(wall.serviceDeadLoad, 'force')}</td><td>{quantity(wall.serviceLiveLoad, 'force')}</td><td>{wall.result.demand ? quantity(wall.result.demand.value, 'stress') : '-'}</td><td>{wall.result.limit ? quantity(wall.result.limit.value, 'stress') : '-'}</td><td><Status status={wall.result.status} /></td></tr>)}</tbody></table></div>
      {result.warnings.length ? <details className="warnings"><summary>{result.warnings.length} advertencias</summary><ul>{result.warnings.map((warning, index) => <li key={index}>{warning}</li>)}</ul></details> : null}
    </section>
  </div>;
}

function Status({ status }: { status: string }): React.JSX.Element { return <span className={`check-status ${status}`}>{status === 'pass' ? 'Cumple' : status === 'fail' ? 'No cumple' : status}</span>; }
function format(value: number | undefined): string { return value === undefined ? '-' : value.toFixed(3); }
function percent(value: number | undefined): string { return value === undefined ? '-' : `${(value * 100).toFixed(2)} %`; }
