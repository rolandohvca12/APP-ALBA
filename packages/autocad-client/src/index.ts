// AutoCAD transport and API clients
export { AutoCadRealtimeClient } from './cad/AutoCadRealtimeClient.js';
export { AutoCadDrawingClient } from './cad/AutoCadDrawingClient.js';
export type { EntityOptions, BlockGeometryCommand } from './cad/AutoCadDrawingClient.js';
export { AutoCadQueryClient } from './cad/AutoCadQueryClient.js';
export type { LayerInfo, EntityInfo, RawGeometry } from './cad/AutoCadQueryClient.js';
export { AutoCadDocumentClient } from './cad/AutoCadDocumentClient.js';
export { AutoCadBatch } from './cad/AutoCadBatch.js';
export { ByLayer, ByTag, CombinedSelector, byLayers, byTags } from './cad/GeometrySelector.js';
export type { GeometrySelector } from './cad/GeometrySelector.js';

// Geometry workflows over AutoCAD entities
export { Polygon } from '@rolandohvca12/structural-lib';
export { ContactDetector } from './analysis/ContactDetector.js';
export type { ContactResult } from './analysis/ContactDetector.js';
export { GeometryExtractor } from './analysis/GeometryExtractor.js';
export type { IGeometryInterpreter } from './analysis/IGeometryInterpreter.js';
export { GeometryFuser } from './analysis/GeometryFuser.js';
export type { FusionContactSpec } from './analysis/GeometryFuser.js';
export { PolygonOps } from './analysis/PolygonOps.js';
export type { Ring } from './analysis/PolygonOps.js';
export { PolygonDrawer } from './analysis/PolygonDrawer.js';
export type { DrawPolygonOptions } from './analysis/PolygonDrawer.js';
export { TransformedSectionBuilder } from './analysis/TransformedSectionBuilder.js';
export type {
  AdjacentTransverse,
  Side,
  TransformedSectionOptions,
  TransformedSectionResult,
} from './analysis/TransformedSectionBuilder.js';
export { TributaryPartitioner } from './analysis/TributaryPartitioner.js';
export type { PanoWallEdge, WallTributaryArea } from './analysis/TributaryPartitioner.js';
export { EndElementDetector } from './analysis/EndElementDetector.js';
export type { WallEnd, EndElementMatch } from './analysis/EndElementDetector.js';
export { WallFusionService } from './analysis/WallFusionService.js';
export type { WallFusionResult } from './analysis/WallFusionService.js';
export { WallFusionDrawer } from './analysis/WallFusionDrawer.js';
export type { DrawFusionOptions } from './analysis/WallFusionDrawer.js';
export type { WallFusionSources } from './analysis/WallFusionLayers.js';
export { PanoBoundaryResolver } from './analysis/tributary/PanoBoundaryResolver.js';
export type { ResolvedPanoEdge } from './analysis/tributary/PanoBoundaryResolver.js';
export { ImplicitSlabDetector } from './analysis/tributary/ImplicitSlabDetector.js';
export type {
  ImplicitSlab,
  ImplicitSlabDetection,
} from './analysis/tributary/ImplicitSlabDetector.js';
export { TributaryGeometrySource } from './analysis/tributary/TributaryGeometrySource.js';
export type { TributaryGeometrySet } from './analysis/tributary/TributaryGeometrySource.js';
export { TributaryAreaService } from './analysis/tributary/TributaryAreaService.js';
export type { TributaryCalculationOptions } from './analysis/tributary/TributaryAreaService.js';
export { TributaryAreaDrawer } from './analysis/tributary/TributaryAreaDrawer.js';
export type { DrawTributaryOptions } from './analysis/tributary/TributaryAreaDrawer.js';
export { TributaryAreaWorkflow } from './analysis/tributary/TributaryAreaWorkflow.js';
export type {
  SlabLoadBehavior,
  TributarySourceSelectors,
  TributaryAnalysisOptions,
  TributarySupportKind,
  TributarySupport,
  TributaryCell,
  SlabTributaryResult,
  TributaryAnalysisResult,
} from './analysis/tributary/types.js';
export { FloorCenterOfMassService } from './analysis/mass/FloorCenterOfMassService.js';
export { BuildingCenterOfMassService } from './analysis/mass/BuildingCenterOfMassService.js';
export { BuildingWeightStrategyFactory } from './analysis/mass/BuildingWeightStrategyFactory.js';
export type {
  BuildingMeteringStrategy,
  BuildingLevelSlab,
  BuildingMassLevel,
  BuildingCenterOfMassOptions,
  BuildingLevelMassResult,
  BuildingCenterOfMassResult,
} from './analysis/mass/buildingTypes.js';
export {
  SeismicFloorWeightStrategy,
  AxialFloorWeightStrategy,
} from './analysis/mass/FloorWeightStrategy.js';
export type {
  FloorWeightStrategy,
  FloorWeightStrategyKind,
  AdjacentLevelDimensions,
  SeismicFloorWeightOptions,
  AxialFloorWeightOptions,
} from './analysis/mass/FloorWeightStrategy.js';
export { FloorMassCalculator } from './analysis/mass/FloorMassCalculator.js';
export type { FloorMassCalculationOptions } from './analysis/mass/FloorMassCalculator.js';
export { FloorMassGeometrySource } from './analysis/mass/FloorMassGeometrySource.js';
export type { FloorMassGeometryLoadResult } from './analysis/mass/FloorMassGeometrySource.js';
export type {
  FloorMassSourceSelectors,
  FloorMassElementKind,
  WeightElementContext,
  SpecificWeight,
  SlabMassBehavior,
  FloorCenterOfMassOptions,
  FloorMassContribution,
  FloorCenterOfMassResult,
  TaggedFloorGeometry,
  FloorMassGeometry,
  WallTributaryLoadArea,
} from './analysis/mass/types.js';
export { WallInterpreter } from './analysis/interpreters/WallInterpreter.js';
export type { Wall } from './analysis/interpreters/WallInterpreter.js';
export {
  boundingBox,
  axisProtrusion,
  localAxis,
  toPolygon,
  toRing,
  centroid,
  distance,
  ringArea,
  segmentDistance,
  toSegments,
  ringDistance,
  rotatePoint,
  rotateRing,
  mainAxisAngle,
  minWidth,
  maxWidth,
  firstDelimiterDistance,
  computeLocalFrame,
  toLocalBox,
  thicknessOf,
  epsilonFor,
} from './analysis/geometryMath.js';
export type {
  BoundingBox,
  AxisProtrusion,
  Segment,
  ContactSide,
  LocalFrame,
} from './analysis/geometryMath.js';
