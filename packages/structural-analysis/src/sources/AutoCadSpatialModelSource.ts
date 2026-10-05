import {
  WallFusionService,
  PolygonOps,
  centroid,
  mainAxisAngle,
  minWidth,
  ringArea,
  segmentDistance,
  toSegments,
  toRing,
  type AutoCadQueryClient,
  type GeometrySelector,
  type RawGeometry,
  type Ring,
} from '@app-alba/autocad-client';
import type {
  AnalysisDirection,
  ElasticMaterial,
  SpatialLevelInput,
  SpatialLoadCaseInput,
  SpatialWideColumnAnalysisInput,
} from '../domain/types.js';

export interface AutoCadStructuralSources {
  wallsX: GeometrySelector;
  wallsY: GeometrySelector;
  lintels?: GeometrySelector;
  columns?: GeometrySelector;
}

export interface AutoCadSpatialModelSourceInput {
  id: string;
  sources: AutoCadStructuralSources;
  levels: readonly SpatialLevelInput[];
  loadCases: readonly SpatialLoadCaseInput[];
  wallMaterial: ElasticMaterial;
  lintelMaterial: ElasticMaterial;
  /** Vertical lintel depth. */
  lintelDepth: number;
  /** Optional nominal width shared by all lintels and their rigid arms. */
  lintelWidth?: number;
  /** Maximum width difference grouped under one nominal section; defaults to 0.01 m. */
  lintelWidthTolerance?: number;
  baseElevation?: number;
  contactTolerance?: number;
  geometryTolerance?: number;
  rigidArmTapTolerance?: number;
  outOfPlaneStiffnessRatio?: number;
  transverseLengthLimiter?: (thickness: number, availableLength: number) => number;
}

export interface AutoCadSpatialModelLoadResult {
  input: SpatialWideColumnAnalysisInput;
  warnings: readonly string[];
  coverage: AutoCadStructuralCoverage;
}

export interface AutoCadStructuralCoverage {
  sourceWallCount: number;
  sourceLintelCount: number;
  analyticalWallCount: number;
  analyticalLintelCount: number;
}

interface ResolvedWall {
  id: string;
  direction: AnalysisDirection;
  reference: RawGeometry;
  sectionPolygon: Ring;
}

/** Converts tagged AutoCAD plan geometry into the solver-neutral 3D model input. */
export class AutoCadSpatialModelSource {
  public static async load(query: AutoCadQueryClient, options: AutoCadSpatialModelSourceInput): Promise<AutoCadSpatialModelLoadResult> {
    validateOptions(options);
    const [wallsX, wallsY, lintels, columns] = await Promise.all([
      options.sources.wallsX.resolve(query),
      options.sources.wallsY.resolve(query),
      options.sources.lintels?.resolve(query) ?? Promise.resolve([]),
      options.sources.columns?.resolve(query) ?? Promise.resolve([]),
    ]);
    if (wallsX.length === 0 || wallsY.length === 0) throw new Error('AutoCAD must provide at least one wall in X and one wall in Y.');
    const all = [...wallsX, ...wallsY, ...lintels];
    const tags = await readTags(query, all);
    const warnings: string[] = [];
    const limiter = options.transverseLengthLimiter ?? defaultTransverseLengthLimiter;
    const contactTolerance = options.contactTolerance ?? 0.02;
    const resolvedWalls = [
      ...resolveWalls(wallsX, wallsY, columns, 'x', tags, limiter, contactTolerance, warnings, options),
      ...resolveWalls(wallsY, wallsX, columns, 'y', tags, limiter, contactTolerance, warnings, options),
    ];
    assertUniqueWallTags(resolvedWalls);
    const wallInputs = resolvedWalls.map((wall) => ({
      id: wall.id,
      direction: wall.direction,
      sectionPolygon: wall.sectionPolygon,
      physicalPolygon: toRing(wall.reference),
      material: options.wallMaterial,
    }));
    const lintelWidths = normalizeLintelWidths(lintels, options.lintelWidthTolerance ?? 0.01);
    const lintelIdByHandle = new Map(lintels.map((geometry) => [
      geometry.handle,
      structuralId(geometry, tags, 'lintel', warnings),
    ]));
    assertUniqueIds([...lintelIdByHandle.values()], 'AutoCAD lintel tag');
    const lintelInputs = lintels.flatMap((geometry) => {
      const direction = directionOf(geometry);
      const { startFace, endFace } = lintelFaces(geometry, direction);
      const pair = resolveEndWalls(startFace, endFace, resolvedWalls, direction, lintelWidths.get(geometry.handle)!, contactTolerance);
      if (!pair) {
        throw new Error(`Lintel ${geometry.handle} cannot be connected to a wall at both ends. Check its layer, alignment and support geometry.`);
      }
      const baseId = lintelIdByHandle.get(geometry.handle)!;
      return options.levels.map((level) => ({
        id: `${baseId}:${level.id}`,
        levelId: level.id,
        direction,
        wallAId: pair[0].id,
        wallBId: pair[1].id,
        startFace,
        endFace,
        width: options.lintelWidth ?? lintelWidths.get(geometry.handle)!,
        depth: options.lintelDepth,
        material: options.lintelMaterial,
      }));
    });
    const expectedLintelCount = lintels.length * options.levels.length;
    if (lintelInputs.length !== expectedLintelCount) {
      throw new Error(`Lintel coverage mismatch: AutoCAD requires ${expectedLintelCount} analytical lintels, but ${lintelInputs.length} were created.`);
    }
    return {
      input: {
        id: options.id,
        ...(options.baseElevation !== undefined ? { baseElevation: options.baseElevation } : {}),
        walls: wallInputs,
        lintels: lintelInputs,
        levels: options.levels,
        loadCases: options.loadCases,
        ...(options.geometryTolerance !== undefined ? { geometryTolerance: options.geometryTolerance } : {}),
        ...(options.rigidArmTapTolerance !== undefined ? { rigidArmTapTolerance: options.rigidArmTapTolerance } : {}),
        ...(options.outOfPlaneStiffnessRatio !== undefined ? { outOfPlaneStiffnessRatio: options.outOfPlaneStiffnessRatio } : {}),
      },
      warnings,
      coverage: {
        sourceWallCount: wallsX.length + wallsY.length,
        sourceLintelCount: lintels.length,
        analyticalWallCount: wallInputs.length,
        analyticalLintelCount: lintelInputs.length,
      },
    };
  }
}

function resolveEndWalls(
  startFace: { x: number; y: number },
  endFace: { x: number; y: number },
  walls: readonly ResolvedWall[],
  direction: AnalysisDirection,
  lintelWidth: number,
  tolerance: number,
): [ResolvedWall, ResolvedWall] | undefined {
  const start = nearestWallAt(startFace, walls, direction, tolerance)
    ?? nearestWallAlongLintel(startFace, walls, direction, 'start', lintelWidth, tolerance);
  const remaining = walls.filter((wall) => wall.id !== start?.id);
  const end = nearestWallAt(endFace, remaining, direction, tolerance)
    ?? nearestWallAlongLintel(endFace, remaining, direction, 'end', lintelWidth, tolerance);
  return start && end ? [start, end] : undefined;
}

function nearestWallAlongLintel(
  point: { x: number; y: number },
  walls: readonly ResolvedWall[],
  direction: AnalysisDirection,
  end: 'start' | 'end',
  lintelWidth: number,
  tolerance: number,
): ResolvedWall | undefined {
  return nearestWallAlongRing(point, walls, direction, end, lintelWidth, tolerance, 'physical')
    ?? nearestWallAlongRing(point, walls, direction, end, lintelWidth, tolerance, 'transformed');
}

function nearestWallAlongRing(
  point: { x: number; y: number },
  walls: readonly ResolvedWall[],
  direction: AnalysisDirection,
  end: 'start' | 'end',
  lintelWidth: number,
  tolerance: number,
  geometry: 'physical' | 'transformed',
): ResolvedWall | undefined {
  const axis = direction === 'x' ? 'x' : 'y';
  const perpendicular = direction === 'x' ? 'y' : 'x';
  return walls.map((wall) => {
    const ring = geometry === 'physical' ? toRing(wall.reference) : wall.sectionPolygon;
    const axisValues = ring.map((vertex) => vertex[axis]);
    const perpendicularValues = ring.map((vertex) => vertex[perpendicular]);
    const axisMin = Math.min(...axisValues);
    const axisMax = Math.max(...axisValues);
    const gap = end === 'start' ? point[axis] - axisMax : axisMin - point[axis];
    const thickness = Math.min(axisMax - axisMin, Math.max(...perpendicularValues) - Math.min(...perpendicularValues));
    const reach = Math.max(lintelWidth, thickness) + tolerance;
    const aligned = point[perpendicular] >= Math.min(...perpendicularValues) - lintelWidth / 2 - tolerance
      && point[perpendicular] <= Math.max(...perpendicularValues) + lintelWidth / 2 + tolerance;
    return { wall, gap, reach, aligned };
  })
    .filter((item) => item.aligned && item.gap >= -tolerance && item.gap <= item.reach)
    .sort((a, b) => compareConnectionCandidates(
      a.gap, b.gap, a.wall, b.wall, direction,
    ))[0]?.wall;
}

function nearestWallAt(point: { x: number; y: number }, walls: readonly ResolvedWall[], direction: AnalysisDirection, tolerance: number): ResolvedWall | undefined {
  return nearestWallAtRing(point, walls, direction, tolerance, 'physical')
    ?? nearestWallAtRing(point, walls, direction, tolerance, 'transformed');
}

function nearestWallAtRing(
  point: { x: number; y: number },
  walls: readonly ResolvedWall[],
  direction: AnalysisDirection,
  tolerance: number,
  geometry: 'physical' | 'transformed',
): ResolvedWall | undefined {
  const pointSegment = { p1: point, p2: point };
  return walls
    .map((wall) => {
      const ring = geometry === 'physical' ? toRing(wall.reference) : wall.sectionPolygon;
      return {
        wall,
        distance: pointInRing(point, ring)
        ? 0
        : Math.min(...toSegments(ring).map((edge) => segmentDistance(pointSegment, edge))),
      };
    })
    .filter((item) => item.distance <= tolerance)
    .sort((a, b) => compareConnectionCandidates(
      a.distance, b.distance, a.wall, b.wall, direction,
    ))[0]?.wall;
}

function supportDirectionRank(wall: ResolvedWall, lintelDirection: AnalysisDirection): number {
  return wall.direction === lintelDirection ? 1 : 0;
}

function compareConnectionCandidates(
  distanceA: number,
  distanceB: number,
  wallA: ResolvedWall,
  wallB: ResolvedWall,
  lintelDirection: AnalysisDirection,
): number {
  const distanceDifference = distanceA - distanceB;
  if (Math.abs(distanceDifference) > 1e-9) return distanceDifference;
  return supportDirectionRank(wallA, lintelDirection) - supportDirectionRank(wallB, lintelDirection)
    || wallA.id.localeCompare(wallB.id);
}

function pointInRing(point: { x: number; y: number }, ring: Ring): boolean {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const a = ring[i]!; const b = ring[j]!;
    const crosses = (a.y > point.y) !== (b.y > point.y)
      && point.x < (b.x - a.x) * (point.y - a.y) / (b.y - a.y) + a.x;
    if (crosses) inside = !inside;
  }
  return inside;
}

function lintelFaces(geometry: RawGeometry, direction: AnalysisDirection): { startFace: { x: number; y: number }; endFace: { x: number; y: number } } {
  const ring = toRing(geometry);
  const center = centroid(ring);
  const values = ring.map((point) => direction === 'x' ? point.x : point.y);
  const minimum = Math.min(...values); const maximum = Math.max(...values);
  return direction === 'x'
    ? { startFace: { x: minimum, y: center.y }, endFace: { x: maximum, y: center.y } }
    : { startFace: { x: center.x, y: minimum }, endFace: { x: center.x, y: maximum } };
}

/** Existing APP-ALBA effective transverse-wall contribution criterion. */
export function defaultTransverseLengthLimiter(thickness: number, availableLength: number): number {
  return Math.min(availableLength / 2, Math.max(6 * thickness, availableLength / 4));
}

function resolveWalls(
  main: RawGeometry[],
  transverse: RawGeometry[],
  columns: RawGeometry[],
  direction: AnalysisDirection,
  tags: Readonly<Record<string, string | null>>,
  limiter: (thickness: number, availableLength: number) => number,
  tolerance: number,
  warnings: string[],
  options: AutoCadSpatialModelSourceInput,
): ResolvedWall[] {
  const results = columns.length > 0
    ? WallFusionService.fuseAllWithEndSections(
      main, transverse, columns, new Set(columns.map((column) => column.handle)),
      limiter, options.lintelMaterial.elasticModulus / options.wallMaterial.elasticModulus, tolerance,
    )
    : WallFusionService.fuseAll(main, transverse, limiter, tolerance);
  return results.map((result) => {
    if (result.polygons.length === 0) throw new Error(`Wall ${result.reference.handle} produced no transformed section polygon.`);
    const sectionPolygon = connectedWallComponent(result.reference, result.polygons);
    if (result.polygons.length > 1) {
      warnings.push(`Wall ${result.reference.handle} produced ${result.polygons.length} disconnected transformed components; ${result.polygons.length - 1} component(s) not connected to the physical wall were excluded.`);
    }
    return {
      id: structuralId(result.reference, tags, 'wall', warnings),
      direction,
      reference: result.reference,
      sectionPolygon,
    };
  });
}

function connectedWallComponent(reference: RawGeometry, polygons: readonly Ring[]): Ring {
  const physical = toRing(reference);
  const ranked = polygons.map((polygon) => ({
    polygon,
    overlap: PolygonOps.intersection(physical, polygon).reduce((sum, ring) => sum + ringArea(ring), 0),
  })).sort((a, b) => b.overlap - a.overlap);
  const selected = ranked[0];
  if (!selected || !(selected.overlap > 0)) {
    throw new Error(`Wall ${reference.handle} has no transformed component connected to its physical polygon.`);
  }
  return selected.polygon;
}

function structuralId(geometry: RawGeometry, tags: Readonly<Record<string, string | null>>, kind: string, warnings: string[]): string {
  const tag = tags[geometry.handle]?.trim();
  if (tag) return tag;
  warnings.push(`${kind} ${geometry.handle} has no AutoCAD tag; its handle is used as structural id.`);
  return geometry.handle;
}

async function readTags(query: AutoCadQueryClient, geometry: readonly RawGeometry[]): Promise<Record<string, string | null>> {
  const handles = [...new Set(geometry.map((item) => item.handle))];
  try { return handles.length > 0 ? await query.getTagsByHandles(handles) : {}; }
  catch { return {}; }
}

function directionOf(geometry: RawGeometry): AnalysisDirection {
  const angle = mainAxisAngle(toRing(geometry));
  return Math.abs(Math.cos(angle)) >= Math.abs(Math.sin(angle)) ? 'x' : 'y';
}

function assertUniqueWallTags(walls: readonly ResolvedWall[]): void {
  assertUniqueIds(walls.map((wall) => wall.id), 'AutoCAD wall tag');
}

function assertUniqueIds(ids: readonly string[], kind: string): void {
  const found = new Set<string>();
  for (const id of ids) {
    if (found.has(id)) throw new Error(`${kind} ${id} is not unique.`);
    found.add(id);
  }
}

function normalizeLintelWidths(lintels: readonly RawGeometry[], tolerance: number): Map<string, number> {
  const measured = lintels.map((geometry) => ({ handle: geometry.handle, width: minWidth(toRing(geometry)) }))
    .sort((a, b) => a.width - b.width || a.handle.localeCompare(b.handle));
  const normalized = new Map<string, number>();
  let groupStart = Number.NaN;
  let nominal = Number.NaN;
  for (const item of measured) {
    if (!(item.width > 0 && Number.isFinite(item.width))) throw new RangeError(`Lintel ${item.handle} has an invalid width.`);
    if (!Number.isFinite(groupStart) || item.width - groupStart > tolerance + 1e-9) {
      groupStart = item.width;
      nominal = Math.round(groupStart * 100) / 100;
      if (!(nominal > 0)) throw new RangeError(`Lintel ${item.handle} is too narrow for a 0.01 m nominal section.`);
    }
    normalized.set(item.handle, nominal);
  }
  return normalized;
}

function validateOptions(options: AutoCadSpatialModelSourceInput): void {
  if (!(options.lintelDepth > 0)) throw new RangeError('lintelDepth must be positive.');
  if (options.lintelWidth !== undefined && !(options.lintelWidth > 0 && Number.isFinite(options.lintelWidth))) {
    throw new RangeError('lintelWidth must be finite and positive.');
  }
  if (options.lintelWidthTolerance !== undefined && !(options.lintelWidthTolerance > 0 && Number.isFinite(options.lintelWidthTolerance))) {
    throw new RangeError('lintelWidthTolerance must be finite and positive.');
  }
  for (const [name, material] of [['wall', options.wallMaterial], ['lintel', options.lintelMaterial]] as const) {
    if (!(material.elasticModulus > 0 && material.shearModulus > 0)) throw new RangeError(`${name} material requires positive E and G.`);
  }
}
