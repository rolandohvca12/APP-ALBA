import type { BuildingLevelInput, BuildingVerificationInput } from '../../../../shared/contracts';

export function createLevel(index: number): BuildingLevelInput {
  return {
    id: `N${index + 1}`,
    wallHeight: 2.6,
  };
}

export const defaultVerificationInput: BuildingVerificationInput = {
  levels: [createLevel(0)],
  typicalFloor: {
    sources: {
      wallsX: { type: 'layer', values: ['MUROS_X'] },
      wallsY: { type: 'layer', values: ['MUROS_Y'] },
      lintels: { type: 'layer', values: ['DINTELES'] },
    },
    liveLoadPerArea: 2,
    lintelHeight: 0.2,
    plasterThickness: 0.015,
    slab: { type: 'bidirectional' },
    closureTolerance: 0.25,
  },
  slabThickness: 0.2,
  seismicLiveLoadFactor: 0.25,
  specificWeights: { masonry: 18, concrete: 24, plaster: 20 },
  masonryUnit: {
    unitClass: 'Ladrillo IV',
    table9Unit: 'clay-king-kong-industrial',
    material: 'clay',
    geometry: 'solid',
    production: 'industrial',
    grout: 'none',
  },
  seismicParameters: {
    zone: 4,
    soilProfile: 'S1',
    category: 'C',
  },
  includePlaster: true,
  includeBondBeams: true,
};
