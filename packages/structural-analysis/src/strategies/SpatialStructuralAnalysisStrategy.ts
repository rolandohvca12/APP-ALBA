import type { SpatialStaticAnalysisResult, SpatialStructuralModel } from '../domain/types.js';

export interface SpatialStructuralAnalysisStrategy {
  readonly engine: SpatialStaticAnalysisResult['engine'];
  analyze(model: SpatialStructuralModel): Promise<SpatialStaticAnalysisResult>;
}
