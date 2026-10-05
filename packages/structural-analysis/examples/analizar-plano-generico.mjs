import { mkdir, writeFile } from 'node:fs/promises';
import {
  AutoCadRealtimeClient,
  AutoCadQueryClient,
  BuildingCenterOfMassService,
  ByLayer,
} from '../../autocad-client/dist/index.js';
import { e030_2026 } from '../../peru-rne/dist/index.js';
import { connectToEtabs } from '../../../bridges/ETABS.Client/dist/index.js';
import {
  AutoCadSpatialModelSource,
  DistinctGeometrySelector,
  Etabs3DStaticStrategy,
  OpenSees3DStaticStrategy,
  ScaledGeometrySelector,
  SpatialWideColumnModelAssembler,
  StructuralModelUnits,
  StructuralEngineComparator,
  StructuralResultUnits,
} from '../dist/index.js';
import { geometry } from './config/geometry.mjs';
import { materials } from './config/materials.mjs';
import { loads } from './config/loads.mjs';
import { etabsAppearance } from './config/appearance.mjs';
import { execution } from './config/execution.mjs';
import { wallActionsCsv } from './report/wall-actions-csv.mjs';

const runOpenSees = process.env.APP_ALBA_RUN_OPENSEES === '1' || execution.engines.runOpenSees;
validateConfig();
const modelUnits = new StructuralModelUnits(execution.units);
await mkdir(execution.outputDirectory, { recursive: true });
const autoCad = new AutoCadRealtimeClient();
await autoCad.connect();
let etabs;

try {
  const query = new AutoCadQueryClient(autoCad);
  const fromDrawing = (layer) => new DistinctGeometrySelector(
    new ScaledGeometrySelector(new ByLayer(layer), geometry.drawingLengthUnit),
  );
  const sources = {
    wallsX: fromDrawing(geometry.layers.wallsX),
    wallsY: fromDrawing(geometry.layers.wallsY),
    lintels: fromDrawing(geometry.layers.lintels),
    columns: fromDrawing(geometry.layers.columns),
  };
  const mass = await BuildingCenterOfMassService.calculate(query, {
    levels: geometry.levels.map((level) => ({
      id: level.id,
      wallHeight: modelUnits.length(level.wallHeight),
      sources,
      liveLoadPerArea: modelUnits.forcePerArea(loads.liveLoadPerArea),
      lintelHeight: modelUnits.length(geometry.lintelDepth),
      plasterThickness: modelUnits.length(geometry.plasterThickness),
      slab: geometry.slab.type === 'bidirectional'
        ? { type: 'bidirectional' }
        : {
          type: 'unidirectional',
          spanDirection: geometry.slab.spanDirection,
          selfWeightPerArea: modelUnits.forcePerArea(geometry.slab.selfWeightPerArea),
        },
    })),
    slabThickness: modelUnits.length(geometry.slab.thickness),
    metering: { type: 'seismic', alpha: loads.seismicLiveLoadFactor },
    specificWeights: Object.fromEntries(Object.entries(materials.specificWeights)
      .map(([name, value]) => [name, modelUnits.forcePerVolume(value)])),
  });
  console.log(mass)
  let elevation = 0;
  const levels = geometry.levels.map((level, index) => ({
    id: level.id,
    elevation: elevation += modelUnits.length(level.wallHeight + geometry.slab.thickness),
    centerOfMass: geometry.centerOfMass
      ? { x: modelUnits.length(geometry.centerOfMass.x), y: modelUnits.length(geometry.centerOfMass.y) }
      : mass.levels[index].result.centerOfMass,
  }));
  const totalHeight = levels.at(-1).elevation;
  const periodSeconds = loads.seismic.periodSeconds
    ?? e030_2026.staticAnalysis.approximatePeriod(totalHeight, 'masonryDualOrWalls');
  const baseShear = e030_2026.staticAnalysis.baseShear({
    ...loads.seismic,
    seismicWeight: mass.totalWeight,
  });

  const inertialForces = e030_2026.staticAnalysis.distributeByHeight(
    baseShear.baseShearKN,
    levels.map((level, index) => ({
      level: level.id,
      weight: mass.levels[index].result.totalWeight,
      height: level.elevation,
    })),
    periodSeconds,
  );

  const forceByLevel = new Map(inertialForces.map((item) => [String(item.level), item.forceKN]));
  const loadCases = [
    {
      id: 'SX',
      levelLoads: geometry.levels.map((level) => ({ levelId: level.id, fx: forceByLevel.get(level.id), fy: 0, mz: 0 })),
    },
    {
      id: 'SY',
      levelLoads: geometry.levels.map((level) => ({ levelId: level.id, fx: 0, fy: forceByLevel.get(level.id), mz: 0 })),
    },
  ];
  const etabsPath = `${execution.outputDirectory}\\${execution.modelId}.edb`;
  const resultsPath = `${execution.outputDirectory}\\${execution.modelId}-results.json`;
  const csvPath = `${execution.outputDirectory}\\${execution.modelId}-wall-actions.csv`;

  const source = await AutoCadSpatialModelSource.load(query, {
    id: execution.modelId,
    sources,
    levels,
    loadCases,
    wallMaterial: {
      ...materials.wall,
      elasticModulus: modelUnits.forcePerArea(materials.wall.elasticModulus),
      shearModulus: modelUnits.forcePerArea(materials.wall.shearModulus),
      weightPerVolume: modelUnits.forcePerVolume(materials.specificWeights.masonry),
    },
    lintelMaterial: {
      ...materials.lintel,
      elasticModulus: modelUnits.forcePerArea(materials.lintel.elasticModulus),
      shearModulus: modelUnits.forcePerArea(materials.lintel.shearModulus),
      weightPerVolume: modelUnits.forcePerVolume(materials.specificWeights.concrete),
    },
    lintelWidthTolerance: modelUnits.length(geometry.lintelWidthTolerance),
    lintelDepth: modelUnits.length(geometry.lintelDepth),
  });
  const model = new SpatialWideColumnModelAssembler().assemble(source.input);
  const openSeesStrategy = new OpenSees3DStaticStrategy();
  if (execution.engines.runEtabs) etabs = await connectToEtabs({ requestTimeoutMs: 120_000 });
  const [openSees, etabsResult] = await Promise.all([
    runOpenSees ? openSeesStrategy.analyze(model) : Promise.resolve(null),
    execution.engines.runEtabs
      ? new Etabs3DStaticStrategy(etabs, { savePath: etabsPath, ...etabsAppearance, displayUnits: execution.units }).analyze(model)
      : Promise.resolve(null),
  ]);
  const comparison = openSees && etabsResult
    ? new StructuralEngineComparator().compare(openSees, etabsResult)
    : null;
  const display = new StructuralResultUnits(modelUnits);
  const result = {
    units: { results: modelUnits.labels, model: 'kN-m' },
    model,
    openSees: display.analysis(openSees),
    etabs: display.analysis(etabsResult),
    comparison: display.comparison(comparison),
    warnings: source.warnings,
    coverage: source.coverage,
  };
  await writeFile(resultsPath, JSON.stringify(result, null, 2));
  await writeFile(csvPath, wallActionsCsv(result, levels.map((level) => level.id), modelUnits.labels), 'utf8');
  console.log(JSON.stringify({
    etabsPath: execution.engines.runEtabs ? etabsPath : null,
    resultsPath,
    csvPath,
    openSeesBackend: runOpenSees ? 'native-addon' : null,
    units: modelUnits.labels,
    seismicWeight: { value: modelUnits.fromForce(mass.totalWeight), unit: modelUnits.forceUnit },
    baseShear: { value: modelUnits.fromForce(baseShear.baseShearKN), unit: modelUnits.forceUnit },
    periodSeconds,
    inertialForces: inertialForces.map((item) => ({
      level: item.level,
      alpha: item.alpha,
      force: modelUnits.fromForce(item.forceKN),
      unit: modelUnits.forceUnit,
    })),
    warnings: result.warnings,
    coverage: result.coverage,
    comparedValues: comparison?.wallActions.length ?? 0,
    allWithinTolerance: comparison?.allWithinTolerance ?? null,
    maximumRelativeDifference: comparison?.maximumRelativeDifference ?? null,
  }, null, 2));
} finally {
  autoCad.close();
  etabs?.close(); // ETABS desktop remains open.
}

function validateConfig() {
  if (!runOpenSees && !execution.engines.runEtabs) {
    throw new Error('Enable at least one structural engine.');
  }
  if (geometry.levels.length === 0) throw new Error('Configure at least one level.');
  for (const level of geometry.levels) {
    if (!(level.wallHeight > 0)) throw new Error(`Level ${level.id} requires a positive wallHeight.`);
  }
}
