import {
  AxialFloorWeightStrategy,
  FloorMassCalculator,
  FloorMassGeometrySource,
  SeismicFloorWeightStrategy,
  TributaryAreaService,
  maxWidth,
  minWidth,
  ringArea,
  ringDistance,
  toRing,
  type AutoCadQueryClient,
  type FloorMassContribution,
  type FloorMassCalculationOptions,
  type FloorMassGeometry,
  type RawGeometry,
  type TaggedFloorGeometry,
  type TributaryCell,
} from '@app-alba/autocad-client';
import { e030_2026, e070_2006, type RuleResult } from '@app-alba/peru-rne';
import { createGeometrySelector } from './selectorFactory.js';
import type {
  BuildingLevelInput,
  TypicalFloorInput,
  BuildingVerificationInput,
  BuildingVerificationResult,
  DirectionDensityVerification,
  LevelVerificationResult,
  WallAxialVerification,
  ResolvedSeismicParameters,
} from './types.js';

interface WallLoad {
  tag: string;
  direction: 'x' | 'y';
  wallLength: number;
  effectiveThickness: number;
  dead: number;
  live: number;
  tributaryArea: number;
}

interface ResolvedLevel {
  input: BuildingLevelInput;
  index: number;
  seismicWeight: number;
  totalServiceWeight: number;
  walls: WallLoad[];
  warnings: string[];
}

interface PreparedTypicalFloor {
  geometry: FloorMassGeometry;
  taggedWalls: TaggedFloorGeometry[];
  supports: readonly { geometry: RawGeometry; kind: 'wall-x' | 'wall-y' | 'lintel' }[];
  cells: readonly TributaryCell[];
  common: Omit<FloorMassCalculationOptions, 'strategy'>;
  floorArea: number;
  warnings: readonly string[];
}

/** Coordinates AutoCAD extraction, load metering and E.070 verification. */
export class AutoCadBuildingVerificationService {
  public static async calculate(
    query: AutoCadQueryClient,
    input: BuildingVerificationInput,
  ): Promise<BuildingVerificationResult> {
    validateInput(input);
    const floor = await this.prepareTypicalFloor(query, input);
    const resolved: ResolvedLevel[] = [];
    for (let index = 0; index < input.levels.length; index++) {
      resolved.push(this.resolveLevel(input, input.levels[index]!, index, floor));
    }

    const accumulated = new Map<string, { dead: number; live: number; tributaryArea: number }>();
    for (let index = resolved.length - 1; index >= 0; index--) {
      const level = resolved[index]!;
      for (const wall of level.walls) {
        const upper = accumulated.get(wall.tag) ?? { dead: 0, live: 0, tributaryArea: 0 };
        accumulated.set(wall.tag, { dead: upper.dead + wall.dead, live: upper.live + wall.live, tributaryArea: upper.tributaryArea + wall.tributaryArea });
      }
    }

    const base = resolved[0]!;
    const masonryProperties = e070_2006.materials.table9Properties(input.masonryUnit.table9Unit);
    const axial = base.walls.map((wall) => axialVerification(wall, accumulated.get(wall.tag)!, base.input.wallHeight, masonryProperties.masonryCompressiveStrengthMpa));
    const seismicParameters = resolveSeismicParameters(input);
    const density = densityChecks(base.walls, floor.floorArea, input.levels.length, seismicParameters);
    const levels: LevelVerificationResult[] = resolved.map((level) => ({
      id: level.input.id,
      index: level.index,
      seismicWeight: level.seismicWeight,
      totalServiceWeight: level.totalServiceWeight,
      warnings: level.warnings,
    }));

    return {
      source: 'autocad',
      generatedAt: new Date().toISOString(),
      levels,
      axial,
      density,
      seismicParameters,
      masonryUnit: input.masonryUnit,
      masonryProperties,
      warnings: [...new Set(levels.flatMap((level) => level.warnings))],
    };
  }

  private static async prepareTypicalFloor(
    query: AutoCadQueryClient,
    building: BuildingVerificationInput,
  ): Promise<PreparedTypicalFloor> {
    const floor = building.typicalFloor;
    const sources = {
      wallsX: createGeometrySelector(floor.sources.wallsX),
      wallsY: createGeometrySelector(floor.sources.wallsY),
      ...(floor.sources.lintels ? { lintels: createGeometrySelector(floor.sources.lintels) } : {}),
      ...(floor.sources.slabs ? { slabs: createGeometrySelector(floor.sources.slabs) } : {}),
    };
    const loaded = await FloorMassGeometrySource.load(query, sources, floor.closureTolerance);
    const tributary = TributaryAreaService.analyzeGeometry(loaded.sourceGeometry, {
      slabBehavior: floor.slab.type === 'bidirectional'
        ? { type: 'bidirectional' }
        : { type: 'unidirectional', spanDirection: floor.slab.spanDirection, thickness: building.slabThickness },
      ...(floor.closureTolerance !== undefined ? { closureTolerance: floor.closureTolerance } : {}),
    });
    const tags = new Map(loaded.geometry.walls.map((wall) => [wall.geometry.handle, wall.tag]));
    const cells = tributary.slabs.flatMap((slab) => slab.cells);
    const geometry: FloorMassGeometry = {
      ...loaded.geometry,
      tributaryAreas: cells.map((cell) => ({
        wallHandle: cell.supportHandle,
        wallTag: tags.get(cell.supportHandle) ?? null,
        polygon: cell.polygon,
        area: cell.area,
      })),
    };
    const slab = floor.slab.type === 'bidirectional'
      ? { type: 'bidirectional' as const, thickness: building.slabThickness }
      : {
          type: 'unidirectional' as const,
          thickness: building.slabThickness,
          spanDirection: floor.slab.spanDirection,
          selfWeightPerArea: floor.slab.selfWeightPerArea,
        };
    const common = {
      liveLoadPerArea: floor.liveLoadPerArea,
      lintelHeight: floor.lintelHeight,
      plasterThickness: floor.plasterThickness,
      slab,
      specificWeights: building.specificWeights,
      ...(building.includePlaster !== undefined ? { includePlaster: building.includePlaster } : {}),
      ...(building.includeBondBeams !== undefined ? { includeBondBeams: building.includeBondBeams } : {}),
    };
    const floorArea = tributary.slabs.reduce((sum, item) => sum + item.slabArea, 0);
    if (!(floorArea > 0)) throw new Error('No slab area could be inferred from the typical AutoCAD plan.');
    return {
      geometry,
      taggedWalls: loaded.geometry.walls,
      supports: loaded.sourceGeometry.supports,
      cells,
      common,
      floorArea,
      warnings: [...loaded.warnings, ...tributary.warnings],
    };
  }

  private static resolveLevel(
    building: BuildingVerificationInput,
    level: BuildingLevelInput,
    index: number,
    floor: PreparedTypicalFloor,
  ): ResolvedLevel {
    const axialMass = FloorMassCalculator.calculate(floor.geometry, {
      ...floor.common,
      strategy: new AxialFloorWeightStrategy({
        totalLevelHeight: level.wallHeight + building.slabThickness,
      }),
    });
    const adjacent = adjacentHeight(building, index);
    const seismicMass = FloorMassCalculator.calculate(floor.geometry, {
      ...floor.common,
      strategy: new SeismicFloorWeightStrategy({
        levelBelow: adjacent.current,
        ...(adjacent.above ? { levelAbove: adjacent.above } : {}),
        alpha: building.seismicLiveLoadFactor,
      }),
    });
    const warnings = [...floor.warnings];
    const walls = buildWallLoads(floor.taggedWalls, floor.supports, axialMass.contributions, floor.cells, building.typicalFloor, building, warnings);
    return {
      input: level,
      index,
      seismicWeight: seismicMass.totalWeight,
      totalServiceWeight: axialMass.totalWeight,
      walls,
      warnings,
    };
  }
}

function adjacentHeight(input: BuildingVerificationInput, index: number): { current: { wallHeight: number; slabThickness: number }; above?: { wallHeight: number; slabThickness: number } } {
  const current = input.levels[index]!;
  const above = input.levels[index + 1];
  return {
    current: { wallHeight: current.wallHeight, slabThickness: input.slabThickness },
    ...(above ? { above: { wallHeight: above.wallHeight, slabThickness: input.slabThickness } } : {}),
  };
}

function buildWallLoads(
  taggedWalls: TaggedFloorGeometry[],
  supports: readonly { geometry: RawGeometry; kind: 'wall-x' | 'wall-y' | 'lintel' }[],
  contributions: readonly FloorMassContribution[],
  cells: readonly TributaryCell[],
  level: TypicalFloorInput,
  building: BuildingVerificationInput,
  warnings: string[],
): WallLoad[] {
  const supportKind = new Map(supports.map((support) => [support.geometry.handle, support.kind]));
  const byHandle = new Map<string, WallLoad>();
  for (const wall of taggedWalls) {
    if (!wall.tag) {
      warnings.push(`Wall ${wall.geometry.handle} has no AutoCAD tag and was excluded from axial accumulation.`);
      continue;
    }
    const kind = supportKind.get(wall.geometry.handle);
    if (kind !== 'wall-x' && kind !== 'wall-y') continue;
    const ring = toRing(wall.geometry);
    byHandle.set(wall.geometry.handle, {
      tag: wall.tag,
      direction: kind === 'wall-x' ? 'x' : 'y',
      wallLength: maxWidth(ring),
      effectiveThickness: minWidth(ring),
      dead: 0,
      live: 0,
      tributaryArea: 0,
    });
  }

  for (const item of contributions) {
    const wall = byHandle.get(item.sourceHandle);
    if (!wall) continue;
    if (item.kind === 'live-load') wall.live += item.weight;
    else if (item.kind !== 'slab' && item.kind !== 'lintel') wall.dead += item.weight;
  }

  const slabDeadPerArea = level.slab.type === 'bidirectional'
    ? building.slabThickness * building.specificWeights.concrete
    : level.slab.selfWeightPerArea;
  const lintels = supports.filter((support) => support.kind === 'lintel').map((support) => support.geometry);
  for (const cell of cells) {
    const direct = byHandle.get(cell.supportHandle);
    if (direct) {
      direct.dead += cell.area * slabDeadPerArea;
      direct.tributaryArea += cell.area;
      continue;
    }
    const lintel = lintels.find((item) => item.handle === cell.supportHandle);
    if (lintel) distributeToAdjacentWalls(cell.area * slabDeadPerArea, lintel, taggedWalls, byHandle, warnings, 'slab load', cell.area);
  }
  for (const lintel of lintels) {
    const weight = ringArea(toRing(lintel)) * level.lintelHeight * building.specificWeights.concrete;
    distributeToAdjacentWalls(weight, lintel, taggedWalls, byHandle, warnings, 'lintel weight');
  }

  return mergeWallSegments([...byHandle.values()], warnings);
}

function distributeToAdjacentWalls(
  weight: number,
  source: RawGeometry,
  walls: readonly TaggedFloorGeometry[],
  byHandle: Map<string, WallLoad>,
  warnings: string[],
  label: string,
  tributaryArea = 0,
): void {
  const candidates = walls
    .filter((wall) => byHandle.has(wall.geometry.handle))
    .map((wall) => ({ wall, distance: ringDistance(toRing(source), toRing(wall.geometry)) }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 2);
  if (candidates.length === 0) {
    warnings.push(`${label} from ${source.handle} could not be transferred to a tagged wall.`);
    return;
  }
  const share = weight / candidates.length;
  for (const candidate of candidates) {
    const target = byHandle.get(candidate.wall.geometry.handle)!;
    target.dead += share;
    target.tributaryArea += tributaryArea / candidates.length;
  }
}

function mergeWallSegments(walls: readonly WallLoad[], warnings: string[]): WallLoad[] {
  const merged = new Map<string, WallLoad>();
  for (const wall of walls) {
    const current = merged.get(wall.tag);
    if (!current) {
      merged.set(wall.tag, { ...wall });
      continue;
    }
    if (current.direction !== wall.direction) warnings.push(`Tag ${wall.tag} is used by walls in both directions.`);
    const totalLength = current.wallLength + wall.wallLength;
    current.effectiveThickness = (current.wallLength * current.effectiveThickness + wall.wallLength * wall.effectiveThickness) / totalLength;
    current.wallLength = totalLength;
    current.dead += wall.dead;
    current.live += wall.live;
    current.tributaryArea += wall.tributaryArea;
  }
  return [...merged.values()].sort((a, b) => a.tag.localeCompare(b.tag));
}

function densityChecks(
  walls: readonly WallLoad[],
  floorArea: number,
  stories: number,
  seismic: ResolvedSeismicParameters,
): DirectionDensityVerification[] {
  return (['x', 'y'] as const).map((direction) => {
    const selected = walls.filter((wall) => wall.direction === direction);
    const providedWallArea = selected.reduce((sum, wall) => sum + wall.wallLength * wall.effectiveThickness, 0);
    const result: RuleResult = e070_2006.minimumRequirements.checkWallDensity({
      seismicZoneFactor: seismic.zoneFactor,
      useFactor: seismic.useFactor,
      soilFactor: seismic.soilFactor,
      stories,
      floorAreaM2: floorArea,
      walls: selected.map((wall) => ({ lengthM: wall.wallLength, thicknessM: wall.effectiveThickness })),
    });
    return { direction, wallCount: selected.length, providedWallArea, floorArea, result };
  });
}

function axialVerification(wall: WallLoad, loads: { dead: number; live: number; tributaryArea: number }, clearHeight: number, masonryStrengthMpa: number): WallAxialVerification {
  return {
    tag: wall.tag,
    direction: wall.direction,
    wallLength: wall.wallLength,
    effectiveThickness: wall.effectiveThickness,
    serviceDeadLoad: loads.dead,
    serviceLiveLoad: loads.live,
    tributaryAreaPerFloor: wall.tributaryArea,
    accumulatedTributaryArea: loads.tributaryArea,
    result: e070_2006.minimumRequirements.checkAxialStress({
      serviceDeadLoadKN: loads.dead,
      serviceLiveLoadKN: loads.live,
      wallLengthM: wall.wallLength,
      effectiveThicknessM: wall.effectiveThickness,
      clearHeightM: clearHeight,
      fmMpa: masonryStrengthMpa,
    }),
  };
}

function resolveSeismicParameters(input: BuildingVerificationInput): ResolvedSeismicParameters {
  const seismic = input.seismicParameters;
  const site = e030_2026.hazard.siteParameters(seismic.zone, seismic.soilProfile, seismic.vs30Mps);
  if (site.soilFactor === null) throw new Error('The selected E.030 zone and soil profile require a site response analysis before calculating wall density.');
  return {
    zone: seismic.zone,
    soilProfile: seismic.soilProfile,
    category: seismic.category,
    zoneFactor: e030_2026.hazard.zoneFactor(seismic.zone),
    useFactor: e030_2026.buildings.useFactor({
      category: seismic.category,
      seismicZone: seismic.zone,
      ...(seismic.baseIsolated !== undefined ? { baseIsolated: seismic.baseIsolated } : {}),
    }),
    soilFactor: site.soilFactor,
  };
}

function validateInput(input: BuildingVerificationInput): void {
  if (input.levels.length === 0) throw new RangeError('At least one level is required.');
  const positive = [
    ['slabThickness', input.slabThickness],
    ['masonry specific weight', input.specificWeights.masonry],
    ['concrete specific weight', input.specificWeights.concrete],
    ['plaster specific weight', input.specificWeights.plaster],
  ] as const;
  for (const [name, value] of positive) if (!Number.isFinite(value) || value <= 0) throw new RangeError(`${name} must be positive.`);
  if (input.seismicLiveLoadFactor < 0 || input.seismicLiveLoadFactor > 1) throw new RangeError('seismicLiveLoadFactor must be between 0 and 1.');
}
