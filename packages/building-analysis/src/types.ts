import type {
  BuildingCategory,
  E030SeismicZone,
  E030SoilProfile,
  MasonryUnitClass,
  MasonryUnitGeometry,
  MasonryUnitMaterial,
  MasonryUnitProduction,
  MasonryTable9Properties,
  MasonryTable9Unit,
  RuleResult,
} from '@app-alba/peru-rne';

export type AutoCadSelectorInput =
  | { type: 'layer'; values: readonly string[] }
  | { type: 'tag'; values: readonly string[] };

export type LevelSlabInput =
  | { type: 'bidirectional' }
  | { type: 'unidirectional'; spanDirection: 'x' | 'y'; selfWeightPerArea: number };

export interface BuildingLevelInput {
  id: string;
  wallHeight: number;
}

export interface TypicalFloorInput {
  sources: {
    wallsX: AutoCadSelectorInput;
    wallsY: AutoCadSelectorInput;
    lintels?: AutoCadSelectorInput;
    slabs?: AutoCadSelectorInput;
  };
  liveLoadPerArea: number;
  lintelHeight: number;
  plasterThickness: number;
  slab: LevelSlabInput;
  closureTolerance?: number;
}

export interface BuildingVerificationInput {
  levels: readonly BuildingLevelInput[];
  typicalFloor: TypicalFloorInput;
  slabThickness: number;
  seismicLiveLoadFactor: number;
  specificWeights: {
    masonry: number;
    concrete: number;
    plaster: number;
  };
  masonryUnit: {
    unitClass: MasonryUnitClass;
    table9Unit: MasonryTable9Unit;
    material: MasonryUnitMaterial;
    geometry: MasonryUnitGeometry;
    production: MasonryUnitProduction;
    grout: 'none' | 'partial' | 'full';
  };
  seismicParameters: {
    zone: E030SeismicZone;
    soilProfile: E030SoilProfile;
    category: BuildingCategory;
    baseIsolated?: boolean;
    vs30Mps?: number;
  };
  includePlaster?: boolean;
  includeBondBeams?: boolean;
}

export interface WallAxialVerification {
  tag: string;
  direction: 'x' | 'y';
  wallLength: number;
  effectiveThickness: number;
  serviceDeadLoad: number;
  serviceLiveLoad: number;
  tributaryAreaPerFloor: number;
  accumulatedTributaryArea: number;
  result: RuleResult;
}

export interface DirectionDensityVerification {
  direction: 'x' | 'y';
  wallCount: number;
  providedWallArea: number;
  floorArea: number;
  result: RuleResult;
}

export interface LevelVerificationResult {
  id: string;
  index: number;
  seismicWeight: number;
  totalServiceWeight: number;
  warnings: readonly string[];
}

export interface ResolvedSeismicParameters {
  zone: E030SeismicZone;
  soilProfile: E030SoilProfile;
  category: BuildingCategory;
  zoneFactor: number;
  useFactor: number;
  soilFactor: number;
}

export interface BuildingVerificationResult {
  source: 'autocad';
  generatedAt: string;
  levels: readonly LevelVerificationResult[];
  axial: readonly WallAxialVerification[];
  density: readonly DirectionDensityVerification[];
  seismicParameters: ResolvedSeismicParameters;
  masonryUnit: BuildingVerificationInput['masonryUnit'];
  masonryProperties: MasonryTable9Properties;
  warnings: readonly string[];
}
