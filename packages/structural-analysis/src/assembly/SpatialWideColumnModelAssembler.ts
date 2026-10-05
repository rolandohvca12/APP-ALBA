import { Polygon } from '@app-alba/autocad-client';
import type {
  AnalysisDirection,
  Point2,
  SpatialLintelFrameElement,
  SpatialLintelInput,
  SpatialNode,
  SpatialRigidSoleraArm,
  SpatialStructuralModel,
  SpatialWallInput,
  SpatialWallPierElement,
  SpatialWideColumnAnalysisInput,
  WideColumnSection,
} from '../domain/types.js';
import { WideColumnSectionFactory } from '../geometry/WideColumnSectionFactory.js';
import { SpatialStabilityValidator } from '../validation/SpatialStabilityValidator.js';

export class SpatialWideColumnModelAssembler {
  public constructor(
    private readonly sections = new WideColumnSectionFactory(),
    private readonly validator = new SpatialStabilityValidator(),
  ) { }

  public assemble(input: SpatialWideColumnAnalysisInput): SpatialStructuralModel {
    const tolerance = input.geometryTolerance ?? 1e-8;
    const tapTolerance = input.rigidArmTapTolerance ?? 1e-3;
    const baseElevation = input.baseElevation ?? 0;
    const ratio = input.outOfPlaneStiffnessRatio ?? 1e-8;
    const rigidArmStiffnessFactor = input.rigidArmStiffnessFactor ?? 1e4;
    validateInput(input, baseElevation, ratio, rigidArmStiffnessFactor, tolerance);
    if (!(tapTolerance >= tolerance) || !Number.isFinite(tapTolerance)) {
      throw new RangeError('rigidArmTapTolerance must be finite and at least geometryTolerance.');
    }

    const levels = [...input.levels].sort((a, b) => a.elevation - b.elevation);
    const walls = new Map(input.walls.map((wall) => [wall.id, wall]));
    const sectionByWall = new Map(input.walls.map((wall) => [wall.id, this.sections.create(wall, wall.direction)]));
    const nodes: SpatialNode[] = [];
    const wallPiers: SpatialWallPierElement[] = [];
    const fixedNodeIds: string[] = [];

    for (const wall of input.walls) {
      const section = sectionByWall.get(wall.id)!;
      const center = analyticalCenter(wall, section);
      let previousNodeId = wallNodeId(wall.id, 'BASE');
      nodes.push(wallNode(previousNodeId, center, baseElevation, wall.id, 'BASE', tolerance));
      fixedNodeIds.push(previousNodeId);
      for (const level of levels) {
        const currentNodeId = wallNodeId(wall.id, level.id);
        nodes.push(wallNode(currentNodeId, center, level.elevation, wall.id, level.id, tolerance));
        wallPiers.push({
          kind: 'spatial-wall-pier',
          id: `PIER:${wall.id}:${level.id}`,
          wallId: wall.id,
          levelId: level.id,
          startNodeId: previousNodeId,
          endNodeId: currentNodeId,
          section,
          direction: wall.direction,
          outOfPlaneStiffnessRatio: ratio,
        });
        previousNodeId = currentNodeId;
      }
    }

    const floorConstraints = levels.map((level) => {
      const masterNodeId = masterNodeIdFor(level.id);
      nodes.push({
        id: masterNodeId,
        x: snap(level.centerOfMass.x, tolerance),
        y: snap(level.centerOfMass.y, tolerance),
        z: snap(level.elevation, tolerance),
        role: 'diaphragm-master',
        levelId: level.id,
      });
      return {
        levelId: level.id,
        masterNodeId,
        constrainedNodeIds: input.walls.map((wall) => wallNodeId(wall.id, level.id)),
        coupledDofs: ['ux', 'uy', 'rz'] as const,
      };
    });

    const armRequests: ArmRequest[] = [];
    const pendingLintels: PendingLintel[] = [];
    for (const lintel of input.lintels ?? []) {
      const a = walls.get(lintel.wallAId)!;
      const b = walls.get(lintel.wallBId)!;
      const sectionA = sectionByWall.get(a.id)!;
      const sectionB = sectionByWall.get(b.id)!;
      const [startWall, endWall, startSection, endSection] = lintel.startFace && lintel.endFace
        ? [a, b, sectionA, sectionB] as const
        : orderedPair(a, b, sectionA, sectionB, lintel.direction);
      const startCenter = analyticalCenter(startWall, startSection);
      const endCenter = analyticalCenter(endWall, endSection);
      const rawStartFace = lintel.startFace ?? facePoint(startWall, startSection, lintel.direction, 'positive', tolerance);
      const rawEndFace = lintel.endFace ?? facePoint(endWall, endSection, lintel.direction, 'negative', tolerance);
      const startFace = lintelConnectionPoint(startWall, startCenter, lintel.direction, rawStartFace, tolerance);
      const endFace = lintelConnectionPoint(endWall, endCenter, lintel.direction, rawEndFace, tolerance);
      const clearLength = axisValue(endFace, lintel.direction) - axisValue(startFace, lintel.direction);
      if (!(clearLength > tolerance)) throw new Error(`Lintel ${lintel.id} has no positive clear span.`);

      armRequests.push(
        { lintel, end: 'start', wall: startWall, center: startCenter, face: startFace },
        { lintel, end: 'end', wall: endWall, center: endCenter, face: endFace },
      );
      pendingLintels.push({ lintel, startWall, endWall, clearLength });
    }
    const { rigidArms, armByConnection } = buildRigidArms(armRequests, rigidArmStiffnessFactor, tolerance, tapTolerance);
    const lintels: SpatialLintelFrameElement[] = pendingLintels.map(({ lintel, startWall, endWall, clearLength }) => {
      const startArm = armByConnection.get(`${lintel.id}|start`)!;
      const endArm = armByConnection.get(`${lintel.id}|end`)!;
      return {
        kind: 'spatial-lintel',
        id: lintel.id,
        levelId: lintel.levelId,
        direction: lintel.direction,
        startWallId: startWall.id,
        endWallId: endWall.id,
        startNodeId: startArm.faceNodeId,
        endNodeId: endArm.faceNodeId,
        startArmId: startArm.id,
        endArmId: endArm.id,
        clearLength: snap(clearLength, tolerance),
        width: lintel.width,
        depth: lintel.depth,
        area: lintel.width * lintel.depth,
        bendingInertia: lintel.width * lintel.depth ** 3 / 12,
        material: lintel.material,
        releases: { inPlaneMomentStart: true, inPlaneMomentEnd: true },
      };
    });
    if (lintels.length !== (input.lintels?.length ?? 0)) {
      throw new Error(`Lintel coverage mismatch: received ${input.lintels?.length ?? 0}, assembled ${lintels.length}.`);
    }
    for (const arm of rigidArms) nodes.push(armFaceNode(arm, levels, tolerance));

    const floorById = new Map(floorConstraints.map((floor) => [floor.levelId, floor]));
    const loads = input.loadCases.flatMap((loadCase) => loadCase.levelLoads.map((load) => ({
      caseId: loadCase.id,
      levelId: load.levelId,
      nodeId: floorById.get(load.levelId)!.masterNodeId,
      fx: load.fx,
      fy: load.fy,
      mz: load.mz ?? 0,
    })));
    const model: SpatialStructuralModel = {
      id: input.id,
      baseElevation,
      nodes,
      wallPiers,
      rigidArms,
      lintels,
      floorConstraints,
      loads,
      loadCaseIds: input.loadCases.map((item) => item.id),
      fixedNodeIds,
    };
    this.validator.assertStable(model, tolerance);
    return model;
  }
}

function validateInput(input: SpatialWideColumnAnalysisInput, base: number, ratio: number, rigidArmStiffnessFactor: number, tolerance: number): void {
  if (!input.id.trim()) throw new Error('The spatial structural model requires a non-empty id.');
  if (!input.walls.some((wall) => wall.direction === 'x') || !input.walls.some((wall) => wall.direction === 'y')) {
    throw new Error('A spatial model requires at least one wall in X and one wall in Y.');
  }
  if (!(ratio > 0 && ratio <= 1)) throw new RangeError('outOfPlaneStiffnessRatio must be in (0, 1].');
  if (!(rigidArmStiffnessFactor > 1)) throw new RangeError('rigidArmStiffnessFactor must be greater than 1.');
  const wallIds = uniqueIds(input.walls, 'wall');
  const levelIds = uniqueIds(input.levels, 'level');
  uniqueIds(input.loadCases, 'load case');
  let previous = base;
  for (const level of [...input.levels].sort((a, b) => a.elevation - b.elevation)) {
    if (!(level.elevation > previous + tolerance)) throw new Error(`Level ${level.id} must be above the preceding elevation.`);
    if (!finitePoint(level.centerOfMass)) throw new Error(`Level ${level.id} has an invalid center of mass.`);
    previous = level.elevation;
  }
  for (const wall of input.walls) {
    if (wall.sectionPolygon.length < 3 || wall.sectionPolygon.some((point) => !finitePoint(point))) throw new Error(`Wall ${wall.id} has an invalid section polygon.`);
    if (!(wall.material.elasticModulus > 0 && wall.material.shearModulus > 0)) throw new Error(`Wall ${wall.id} requires positive E and G.`);
  }
  for (const lintel of input.lintels ?? []) {
    if (!levelIds.has(lintel.levelId) || !wallIds.has(lintel.wallAId) || !wallIds.has(lintel.wallBId)) throw new Error(`Lintel ${lintel.id} has an invalid reference.`);
    if (lintel.wallAId === lintel.wallBId) throw new Error(`Lintel ${lintel.id} must connect two distinct walls.`);
    if ((lintel.startFace && !finitePoint(lintel.startFace)) || (lintel.endFace && !finitePoint(lintel.endFace))) throw new Error(`Lintel ${lintel.id} has invalid face coordinates.`);
    if (!(lintel.width > 0 && lintel.depth > 0 && lintel.material.elasticModulus > 0 && lintel.material.shearModulus > 0)) throw new Error(`Lintel ${lintel.id} has invalid properties.`);
  }
  assertUniqueOptionalIds(input.lintels ?? [], 'lintel');
  for (const loadCase of input.loadCases) {
    for (const load of loadCase.levelLoads) {
      if (!levelIds.has(load.levelId) || ![load.fx, load.fy, load.mz ?? 0].every(Number.isFinite)) throw new Error(`Load case ${loadCase.id} has an invalid load at ${load.levelId}.`);
    }
  }
}

function assertUniqueOptionalIds(items: readonly { id: string }[], kind: string): void {
  const ids = new Set<string>();
  for (const item of items) {
    if (!item.id.trim() || ids.has(item.id)) throw new Error(`Invalid or duplicate ${kind} id: ${item.id}.`);
    ids.add(item.id);
  }
}

function uniqueIds(items: readonly { id: string }[], kind: string): Set<string> {
  if (items.length === 0) throw new Error(`At least one ${kind} is required.`);
  const result = new Set<string>();
  for (const item of items) {
    if (!item.id.trim() || result.has(item.id)) throw new Error(`Invalid or duplicate ${kind} id: ${item.id}.`);
    result.add(item.id);
  }
  return result;
}

function orderedPair(a: SpatialWallInput, b: SpatialWallInput, sa: WideColumnSection, sb: WideColumnSection, direction: AnalysisDirection): [SpatialWallInput, SpatialWallInput, WideColumnSection, WideColumnSection] {
  return axisValue(sa.centroid, direction) < axisValue(sb.centroid, direction) ? [a, b, sa, sb] : [b, a, sb, sa];
}

function facePoint(wall: SpatialWallInput, section: WideColumnSection, direction: AnalysisDirection, side: 'negative' | 'positive', tolerance: number): Point2 {
  const polygon = new Polygon((wall.physicalPolygon ?? wall.sectionPolygon).map(({ x, y }) => ({ x, y })));
  const axis = direction === 'x'
    ? (side === 'positive' ? polygon.xMax() : polygon.xMin())
    : (side === 'positive' ? polygon.yMax() : polygon.yMin());
  return direction === 'x'
    ? { x: snap(axis, tolerance), y: snap(analyticalCenter(wall, section).y, tolerance) }
    : { x: snap(analyticalCenter(wall, section).x, tolerance), y: snap(axis, tolerance) };
}

function analyticalCenter(wall: SpatialWallInput, section: WideColumnSection): Point2 {
  const physical = new Polygon((wall.physicalPolygon ?? wall.sectionPolygon).map(({ x, y }) => ({ x, y })));
  return wall.direction === 'x'
    ? { x: section.centroid.x, y: physical.Cy() }
    : { x: physical.Cx(), y: section.centroid.y };
}

function lintelConnectionPoint(wall: SpatialWallInput, wallCenter: Point2, lintelDirection: AnalysisDirection, physicalFace: Point2, tolerance: number): Point2 {
  if (wall.direction === lintelDirection) return snappedPoint(physicalFace, tolerance);
  return lintelDirection === 'x'
    ? { x: snap(wallCenter.x, tolerance), y: snap(physicalFace.y, tolerance) }
    : { x: snap(physicalFace.x, tolerance), y: snap(wallCenter.y, tolerance) };
}

interface ArmRequest {
  lintel: SpatialLintelInput;
  end: 'start' | 'end';
  wall: SpatialWallInput;
  center: Point2;
  face: Point2;
}

interface PendingLintel {
  lintel: SpatialLintelInput;
  startWall: SpatialWallInput;
  endWall: SpatialWallInput;
  clearLength: number;
}

function buildRigidArms(
  requests: readonly ArmRequest[],
  stiffnessFactor: number,
  tolerance: number,
  tapTolerance: number,
): { rigidArms: SpatialRigidSoleraArm[]; armByConnection: Map<string, SpatialRigidSoleraArm> } {
  const bySide = new Map<string, ArmRequest[]>();
  for (const request of requests) {
    const { wall, center, face, lintel } = request;
    const side = axisValue(face, wall.direction) >= axisValue(center, wall.direction) ? 'POS' : 'NEG';
    const key = `${lintel.levelId}|${wall.id}|${side}`;
    const group = bySide.get(key) ?? [];
    group.push(request);
    bySide.set(key, group);
  }

  const rigidArms: SpatialRigidSoleraArm[] = [];
  const armByConnection = new Map<string, SpatialRigidSoleraArm>();
  for (const [key, group] of bySide) {
    const [first] = group;
    const taps: ArmRequest[][] = [];
    for (const request of group) {
      const tap = taps.find((items) => Math.hypot(
        items[0]!.face.x - request.face.x,
        items[0]!.face.y - request.face.y,
      ) <= tapTolerance);
      if (tap) tap.push(request);
      else taps.push([request]);
    }
    taps.sort((a, b) =>
      Math.hypot(a[0]!.face.x - first!.center.x, a[0]!.face.y - first!.center.y)
      - Math.hypot(b[0]!.face.x - first!.center.x, b[0]!.face.y - first!.center.y));

    let previousNodeId = wallNodeId(first!.wall.id, first!.lintel.levelId);
    let previousPoint = snappedPoint(first!.center, tolerance);
    for (const [index, tap] of taps.entries()) {
      const request = tap[0]!;
      const face = snappedPoint(request.face, tolerance);
      const length = snap(Math.hypot(face.x - previousPoint.x, face.y - previousPoint.y), tolerance);
      if (!(length > tolerance)) throw new Error(`Rigid arm ${key} has a coincident or incompatible tap.`);
      const id = `ARM:${request.wall.id}:${request.lintel.levelId}:${key.split('|').at(-1)}${index ? `:${index + 1}` : ''}`;
      const arm: SpatialRigidSoleraArm = {
        kind: 'spatial-rigid-solera-arm',
        id,
        wallId: request.wall.id,
        lintelIds: tap.map((item) => item.lintel.id),
        levelId: request.lintel.levelId,
        direction: request.wall.direction,
        centerNodeId: previousNodeId,
        faceNodeId: `NODE:${id}:FACE`,
        center: previousPoint,
        face,
        length,
        width: request.lintel.width,
        depth: request.lintel.depth,
        material: request.lintel.material,
        stiffnessFactor,
      };
      rigidArms.push(arm);
      for (const item of tap) armByConnection.set(`${item.lintel.id}|${item.end}`, arm);
      previousNodeId = arm.faceNodeId;
      previousPoint = face;
    }
  }
  return { rigidArms, armByConnection };
}

function armFaceNode(arm: SpatialRigidSoleraArm, levels: readonly { id: string; elevation: number }[], tolerance: number): SpatialNode {
  const level = levels.find((item) => item.id === arm.levelId)!;
  return {
    id: arm.faceNodeId,
    ...snappedPoint(arm.face, tolerance),
    z: snap(level.elevation, tolerance),
    role: 'rigid-arm-face',
    wallId: arm.wallId,
    levelId: arm.levelId,
  };
}

function wallNode(id: string, point: Point2, z: number, wallId: string, levelId: string | 'BASE', tolerance: number): SpatialNode {
  return { id, ...snappedPoint(point, tolerance), z: snap(z, tolerance), role: 'wall-center', wallId, levelId };
}

function snappedPoint(point: Point2, tolerance: number): Point2 { return { x: snap(point.x, tolerance), y: snap(point.y, tolerance) }; }
function finitePoint(point: Point2): boolean { return Number.isFinite(point.x) && Number.isFinite(point.y); }
function axisValue(point: Point2, direction: AnalysisDirection): number { return direction === 'x' ? point.x : point.y; }
function wallNodeId(wallId: string, levelId: string): string { return `NODE:${wallId}:${levelId}`; }
function masterNodeIdFor(levelId: string): string { return `MASTER:${levelId}`; }
function snap(value: number, tolerance: number): number { return Math.round(value / tolerance) * tolerance; }
