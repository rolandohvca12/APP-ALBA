export type BridgeId = 'autocad' | 'etabs';
export type BridgeConnectionState = 'connected' | 'disconnected';

export interface BridgeStatus {
  id: BridgeId;
  name: string;
  port: number;
  state: BridgeConnectionState;
  checkedAt: string;
}

export interface RuntimeInfo {
  appVersion: string;
  electronVersion: string;
  nodeVersion: string;
  platform: string;
}

export interface DesktopActionResult {
  ok: boolean;
  message: string;
}

export type {
  BuildingLevelInput,
  TypicalFloorInput,
  AutoCadSelectorInput,
  BuildingVerificationInput,
  BuildingVerificationResult,
  DirectionDensityVerification,
  LevelVerificationResult,
  ResolvedSeismicParameters,
  WallAxialVerification,
} from '@app-alba/building-analysis';

import type {
  BuildingVerificationInput,
  BuildingVerificationResult,
  AutoCadSelectorInput,
} from '@app-alba/building-analysis';
import type {
  AutoCadStructuralCoverage,
  ElasticMaterial,
  SpatialStaticAnalysisResult,
  StructuralEngineComparison,
} from '@app-alba/structural-analysis';

export type BuildingVerificationActionResult =
  | { ok: true; data: BuildingVerificationResult }
  | { ok: false; message: string };

export type StructuralEngineSelection = 'opensees' | 'etabs' | 'both';

export interface StructuralAnalysisInput {
  modelId: string;
  engine: StructuralEngineSelection;
  building: BuildingVerificationInput;
  columns?: AutoCadSelectorInput;
  drawingLengthUnit: 'm' | 'cm' | 'mm' | 'ft' | 'in';
  wallMaterial: ElasticMaterial;
  lintelMaterial: ElasticMaterial;
  comparisonTolerance: number;
}

export interface StructuralLevelSummary {
  id: string;
  elevation: number;
  centerOfMass: { x: number; y: number };
  seismicWeightKN: number;
  inertialForceKN: number;
}

export interface StructuralAnalysisResult {
  source: 'autocad';
  reductionFactor: 3;
  periodSeconds: number;
  seismicWeightKN: number;
  baseShearKN: number;
  levels: readonly StructuralLevelSummary[];
  coverage: AutoCadStructuralCoverage;
  warnings: readonly string[];
  openSees?: SpatialStaticAnalysisResult;
  etabs?: SpatialStaticAnalysisResult;
  comparison?: StructuralEngineComparison;
}

export type StructuralAnalysisActionResult =
  | { ok: true; data: StructuralAnalysisResult }
  | { ok: false; message: string };

export interface AlbaDesktopApi {
  getBridgeStatuses(): Promise<BridgeStatus[]>;
  getRuntimeInfo(): Promise<RuntimeInfo>;
  launchEtabsHost(): Promise<DesktopActionResult>;
  calculateBuildingVerification(input: BuildingVerificationInput): Promise<BuildingVerificationActionResult>;
  runStructuralAnalysis(input: StructuralAnalysisInput): Promise<StructuralAnalysisActionResult>;
}

export const IPC_CHANNELS = {
  bridgeStatuses: 'bridge:statuses',
  launchEtabsHost: 'bridge:launch-etabs-host',
  runtimeInfo: 'system:runtime-info',
  calculateBuildingVerification: 'analysis:calculate-building-verification',
  runStructuralAnalysis: 'analysis:run-structural',
} as const;
