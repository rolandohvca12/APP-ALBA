export type AnalysisDirection = 'x' | 'y';

export interface Point2 {
  x: number;
  y: number;
}

export interface ElasticMaterial {
  /** E and G are in kN/m2 in the solver-neutral model. */
  elasticModulus: number;
  shearModulus: number;
  /** Specific weight in kN/m3; optional for existing weightless static models. */
  weightPerVolume?: number;
  poissonRatio?: number;
  thermalCoefficient?: number;
}

export interface WideColumnWallInput {
  id: string;
  /** Fused/transformed section used to calculate A, I, centroid and shear area. */
  sectionPolygon: readonly Point2[];
  /** Physical wall footprint used only to locate the faces where lintels start. */
  physicalPolygon?: readonly Point2[];
  material: ElasticMaterial;
}

export interface LintelInput {
  id: string;
  levelId: string;
  wallAId: string;
  wallBId: string;
  width: number;
  depth: number;
  material: ElasticMaterial;
}

export interface WideColumnSection {
  wallId: string;
  direction: AnalysisDirection;
  area: number;
  bendingInertia: number;
  shearCorrection: number;
  effectiveShearArea: number;
  centroid: Point2;
  axisMinimum: number;
  axisMaximum: number;
  localCentroid: number;
  negativeArm: number;
  positiveArm: number;
  /** Physical AutoCAD dimensions used only for section display in analysis programs. */
  displayLength: number;
  displayThickness: number;
  material: ElasticMaterial;
}

export interface SpatialWallInput extends WideColumnWallInput {
  direction: AnalysisDirection;
}

export interface SpatialLintelInput extends LintelInput {
  direction: AnalysisDirection;
  /** Physical centerline endpoints at the two supporting wall faces. */
  startFace?: Point2;
  endFace?: Point2;
}

export interface SpatialLevelInput {
  id: string;
  elevation: number;
  centerOfMass: Point2;
}

export interface SpatialLevelLoad {
  levelId: string;
  fx: number;
  fy: number;
  /** Moment applied at the floor center of mass. */
  mz?: number;
}

export interface SpatialLoadCaseInput {
  id: string;
  levelLoads: readonly SpatialLevelLoad[];
}

export interface SpatialWideColumnAnalysisInput {
  /** All numeric geometry, forces, moments and moduli are normalized to kN-m. */
  id: string;
  baseElevation?: number;
  walls: readonly SpatialWallInput[];
  lintels?: readonly SpatialLintelInput[];
  levels: readonly SpatialLevelInput[];
  loadCases: readonly SpatialLoadCaseInput[];
  geometryTolerance?: number;
  /** Connections on the same wall side closer than this distance share a tap (m). */
  rigidArmTapTolerance?: number;
  /** Fraction of in-plane I and Av retained outside the wall plane. */
  outOfPlaneStiffnessRatio?: number;
  /** Stiffness multiplier used by explicit solera/rigid-arm frame elements. */
  rigidArmStiffnessFactor?: number;
}

export interface SpatialNode {
  id: string;
  x: number;
  y: number;
  z: number;
  role: 'wall-center' | 'rigid-arm-face' | 'diaphragm-master';
  levelId: string | 'BASE';
  wallId?: string;
}

export interface SpatialWallPierElement {
  kind: 'spatial-wall-pier';
  id: string;
  wallId: string;
  levelId: string;
  startNodeId: string;
  endNodeId: string;
  section: WideColumnSection;
  direction: AnalysisDirection;
  outOfPlaneStiffnessRatio: number;
}

export interface SpatialRigidSoleraArm {
  kind: 'spatial-rigid-solera-arm';
  id: string;
  wallId: string;
  lintelIds: readonly string[];
  levelId: string;
  direction: AnalysisDirection;
  centerNodeId: string;
  faceNodeId: string;
  center: Point2;
  face: Point2;
  length: number;
  width: number;
  depth: number;
  material: ElasticMaterial;
  stiffnessFactor: number;
}

export interface SpatialLintelFrameElement {
  kind: 'spatial-lintel';
  id: string;
  levelId: string;
  direction: AnalysisDirection;
  startWallId: string;
  endWallId: string;
  startNodeId: string;
  endNodeId: string;
  startArmId: string;
  endArmId: string;
  clearLength: number;
  width: number;
  depth: number;
  area: number;
  bendingInertia: number;
  material: ElasticMaterial;
  releases: {
    inPlaneMomentStart: true;
    inPlaneMomentEnd: true;
  };
}

export interface SpatialFloorConstraint {
  levelId: string;
  masterNodeId: string;
  constrainedNodeIds: readonly string[];
  coupledDofs: readonly ['ux', 'uy', 'rz'];
}

export interface SpatialNodalLoad {
  caseId: string;
  levelId: string;
  nodeId: string;
  fx: number;
  fy: number;
  mz: number;
}

export interface SpatialStructuralModel {
  id: string;
  baseElevation: number;
  nodes: readonly SpatialNode[];
  wallPiers: readonly SpatialWallPierElement[];
  rigidArms: readonly SpatialRigidSoleraArm[];
  lintels: readonly SpatialLintelFrameElement[];
  floorConstraints: readonly SpatialFloorConstraint[];
  loads: readonly SpatialNodalLoad[];
  loadCaseIds: readonly string[];
  fixedNodeIds: readonly string[];
}

export interface SpatialLevelResponse {
  levelId: string;
  ux: number;
  uy: number;
  rz: number;
}

/** Design actions at the lower end of one equivalent wall pier. */
export interface WallStoryAction {
  wallId: string;
  levelId: string;
  direction: AnalysisDirection;
  /** In-plane shear magnitude. */
  shear: number;
  /** In-plane bending-moment magnitude. */
  moment: number;
  /** Axial-force magnitude. */
  axial: number;
  station: 'bottom';
}

export interface SpatialStaticCaseResult {
  caseId: string;
  appliedResultant: { fx: number; fy: number; mz: number };
  baseReaction: { fx: number; fy: number; mz: number };
  equilibriumError: number;
  converged: boolean;
  levels: readonly SpatialLevelResponse[];
  wallActions: readonly WallStoryAction[];
}

export interface SpatialStaticAnalysisResult {
  engine: 'opensees' | 'etabs';
  modelId: string;
  cases: readonly SpatialStaticCaseResult[];
  diagnostics: readonly string[];
}

export type ComparedWallQuantity = 'shear' | 'moment' | 'axial';

export interface WallActionComparison {
  caseId: string;
  wallId: string;
  levelId: string;
  quantity: ComparedWallQuantity;
  openSees: number;
  etabs: number;
  absoluteDifference: number;
  relativeDifference: number;
  withinTolerance: boolean;
}

export interface StructuralEngineComparison {
  modelId: string;
  relativeTolerance: number;
  absoluteTolerance: number;
  wallActions: readonly WallActionComparison[];
  maximumRelativeDifference: number;
  allWithinTolerance: boolean;
  diagnostics: readonly string[];
}
