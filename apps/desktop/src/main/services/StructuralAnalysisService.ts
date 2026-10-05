import {
  AutoCadQueryClient,
  AutoCadRealtimeClient,
  BuildingCenterOfMassService,
} from '@app-alba/autocad-client';
import { createGeometrySelector } from '@app-alba/building-analysis';
import { e030_2026 } from '@app-alba/peru-rne';
import {
  AutoCadSpatialModelSource,
  DistinctGeometrySelector,
  Etabs3DStaticStrategy,
  ScaledGeometrySelector,
  SpatialWideColumnModelAssembler,
  StructuralEngineComparator,
} from '@app-alba/structural-analysis';
import { mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import type {
  StructuralAnalysisInput,
  StructuralAnalysisResult,
  StructuralLevelSummary,
} from '../../shared/contracts';
import { EtabsHostService } from './EtabsHostService';
import { OpenSeesAnalysisRunner } from './OpenSeesAnalysisRunner';

const MASONRY_REDUCTION_FACTOR = 3 as const;

export class StructuralAnalysisService {
  public constructor(
    private readonly etabsHost: EtabsHostService,
    private readonly openSeesRunner = new OpenSeesAnalysisRunner(),
  ) {}

  public async analyze(input: StructuralAnalysisInput): Promise<StructuralAnalysisResult> {
    validateInput(input);
    const transport = new AutoCadRealtimeClient();
    try {
      await transport.connect();
      const query = new AutoCadQueryClient(transport);
      const geometryWarnings: string[] = [];
      const selector = (source: Parameters<typeof createGeometrySelector>[0]) =>
        new DistinctGeometrySelector(
          new ScaledGeometrySelector(createGeometrySelector(source), input.drawingLengthUnit),
          1e-6,
          ({ keptHandle, duplicateHandle }) => geometryWarnings.push(
            `AutoCAD ${duplicateHandle} coincide con ${keptHandle}; se excluyó para no duplicar masa y rigidez.`,
          ),
        );
      const floorSources = {
        wallsX: selector(input.building.typicalFloor.sources.wallsX),
        wallsY: selector(input.building.typicalFloor.sources.wallsY),
        ...(input.building.typicalFloor.sources.lintels
          ? { lintels: selector(input.building.typicalFloor.sources.lintels) }
          : {}),
      };
      const mass = await BuildingCenterOfMassService.calculate(query, {
        levels: input.building.levels.map((level) => ({
          id: level.id,
          wallHeight: level.wallHeight,
          sources: floorSources,
          liveLoadPerArea: input.building.typicalFloor.liveLoadPerArea,
          lintelHeight: input.building.typicalFloor.lintelHeight,
          plasterThickness: input.building.typicalFloor.plasterThickness,
          slab: input.building.typicalFloor.slab,
          ...(input.building.typicalFloor.closureTolerance === undefined
            ? {}
            : { closureTolerance: input.building.typicalFloor.closureTolerance }),
        })),
        slabThickness: input.building.slabThickness,
        metering: { type: 'seismic', alpha: input.building.seismicLiveLoadFactor },
        specificWeights: input.building.specificWeights,
        ...(input.building.includePlaster === undefined ? {} : { includePlaster: input.building.includePlaster }),
        ...(input.building.includeBondBeams === undefined ? {} : { includeBondBeams: input.building.includeBondBeams }),
      });

      let elevation = 0;
      const levels = input.building.levels.map((level, index) => ({
        id: level.id,
        elevation: elevation += level.wallHeight + input.building.slabThickness,
        centerOfMass: mass.levels[index]!.result.centerOfMass,
      }));
      const seismic = resolveSeismic(
        input,
        levels,
        mass.totalWeight,
        mass.levels.map((level) => level.result.totalWeight),
      );
      const forceByLevel = new Map(seismic.forces.map((item) => [String(item.level), item.forceKN]));
      const loadCases = [
        { id: 'SX', levelLoads: levels.map((level) => ({ levelId: level.id, fx: forceByLevel.get(level.id)!, fy: 0, mz: 0 })) },
        { id: 'SY', levelLoads: levels.map((level) => ({ levelId: level.id, fx: 0, fy: forceByLevel.get(level.id)!, mz: 0 })) },
      ];
      const source = await AutoCadSpatialModelSource.load(query, {
        id: input.modelId,
        sources: {
          ...floorSources,
          ...(input.columns ? { columns: selector(input.columns) } : {}),
        },
        levels,
        loadCases,
        wallMaterial: { ...input.wallMaterial, weightPerVolume: input.building.specificWeights.masonry },
        lintelMaterial: { ...input.lintelMaterial, weightPerVolume: input.building.specificWeights.concrete },
        lintelDepth: input.building.typicalFloor.lintelHeight,
      });
      const model = new SpatialWideColumnModelAssembler().assemble(source.input);
      const runOpenSees = input.engine === 'opensees' || input.engine === 'both';
      const runEtabs = input.engine === 'etabs' || input.engine === 'both';
      const etabs = runEtabs ? await this.etabsHost.connect() : undefined;

      const openSees = runOpenSees
        ? await this.openSeesRunner.analyze(model)
        : undefined;
      const etabsResult = runEtabs
        ? await new Etabs3DStaticStrategy(etabs!, { savePath: etabsModelPath(input.modelId) }).analyze(model)
        : undefined;
      const comparison = openSees && etabsResult
        ? new StructuralEngineComparator().compare(openSees, etabsResult, { relativeTolerance: input.comparisonTolerance })
        : undefined;
      const summaries: StructuralLevelSummary[] = levels.map((level, index) => ({
        ...level,
        seismicWeightKN: mass.levels[index]!.result.totalWeight,
        inertialForceKN: forceByLevel.get(level.id)!,
      }));
      return {
        source: 'autocad',
        reductionFactor: MASONRY_REDUCTION_FACTOR,
        periodSeconds: seismic.periodSeconds,
        seismicWeightKN: mass.totalWeight,
        baseShearKN: seismic.baseShearKN,
        levels: summaries,
        coverage: source.coverage,
        warnings: [...geometryWarnings, ...mass.warnings, ...source.warnings],
        ...(openSees ? { openSees } : {}),
        ...(etabsResult ? { etabs: etabsResult } : {}),
        ...(comparison ? { comparison } : {}),
      };
    } finally {
      transport.close();
    }
  }
}

function etabsModelPath(modelId: string): string {
  const directory = resolve(tmpdir(), 'APP-ALBA');
  mkdirSync(directory, { recursive: true });
  const safeModelId = modelId.trim().replace(/[^A-Za-z0-9_-]+/g, '_').replace(/^_+|_+$/g, '') || 'ALBA';
  return resolve(directory, `${safeModelId}.edb`);
}

function resolveSeismic(
  input: StructuralAnalysisInput,
  levels: readonly { id: string; elevation: number }[],
  seismicWeight: number,
  levelWeights: readonly number[],
) {
  const parameters = input.building.seismicParameters;
  const site = e030_2026.hazard.siteParameters(parameters.zone, parameters.soilProfile, parameters.vs30Mps);
  if (site.soilFactor === null || site.tpSeconds === null || site.tlSeconds === null) {
    throw new Error('La configuración de suelo requiere un estudio específico de respuesta de sitio.');
  }
  const periodSeconds = e030_2026.staticAnalysis.approximatePeriod(levels.at(-1)!.elevation, 'masonryDualOrWalls');
  const amplificationFactor = e030_2026.hazard.staticAmplificationFactor(periodSeconds, site.tpSeconds, site.tlSeconds);
  const useFactor = e030_2026.buildings.useFactor({
    category: parameters.category,
    seismicZone: parameters.zone,
    baseIsolated: parameters.baseIsolated ?? false,
  });
  const baseShearKN = e030_2026.staticAnalysis.baseShear({
    zoneFactor: e030_2026.hazard.zoneFactor(parameters.zone),
    useFactor,
    amplificationFactor,
    soilFactor: site.soilFactor,
    reductionFactor: MASONRY_REDUCTION_FACTOR,
    seismicWeight,
  }).baseShearKN;
  const forces = e030_2026.staticAnalysis.distributeByHeight(
    baseShearKN,
    levels.map((level, index) => ({
      level: level.id,
      weight: levelWeights[index]!,
      height: level.elevation,
    })),
    periodSeconds,
  );
  return { periodSeconds, baseShearKN, forces };
}

function validateInput(input: StructuralAnalysisInput): void {
  if (!input.modelId.trim()) throw new Error('El modelo requiere un nombre.');
  if (input.building.levels.length === 0) throw new Error('Debe existir al menos un nivel.');
  if (!(input.comparisonTolerance >= 0 && input.comparisonTolerance <= 1)) throw new Error('La tolerancia debe estar entre 0 y 1.');
  for (const [name, material] of [['muro', input.wallMaterial], ['dintel', input.lintelMaterial]] as const) {
    if (!(material.elasticModulus > 0 && material.shearModulus > 0)) throw new Error(`El material de ${name} requiere E y G positivos.`);
  }
}
