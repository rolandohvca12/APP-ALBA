import type { StructuralAnalysisInput } from '../../../../shared/contracts';
import { createLevel, defaultVerificationInput } from '../building-checks/defaults';

export const defaultStructuralAnalysisInput: StructuralAnalysisInput = {
  modelId: 'ALBA',
  engine: 'both',
  drawingLengthUnit: 'm',
  columns: { type: 'layer', values: ['COLS'] },
  comparisonTolerance: 0.05,
  wallMaterial: {
    elasticModulus: 2_500_000,
    shearModulus: 1_000_000,
    poissonRatio: 0.25,
  },
  lintelMaterial: {
    elasticModulus: 20_000_000,
    shearModulus: 8_000_000,
    poissonRatio: 0.2,
  },
  building: {
    ...defaultVerificationInput,
    levels: Array.from({ length: 4 }, (_, index) => createLevel(index)),
    typicalFloor: {
      ...defaultVerificationInput.typicalFloor,
      sources: { ...defaultVerificationInput.typicalFloor.sources },
    },
    seismicParameters: { ...defaultVerificationInput.seismicParameters },
    specificWeights: { ...defaultVerificationInput.specificWeights },
    masonryUnit: { ...defaultVerificationInput.masonryUnit },
  },
};
