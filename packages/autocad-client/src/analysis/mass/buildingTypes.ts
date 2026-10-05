import type { FloorCenterOfMassResult, FloorMassSourceSelectors, SpecificWeight } from './types.js';
import type { AdjacentLevelDimensions } from './FloorWeightStrategy.js';

export type BuildingMeteringStrategy =
    | { type: 'seismic'; alpha: number; topAdjacentLevel?: AdjacentLevelDimensions }
    | { type: 'axial' };

export type BuildingLevelSlab =
    | { type: 'unidirectional'; selfWeightPerArea: number; spanDirection: 'x' | 'y' }
    | { type: 'bidirectional' };

export interface BuildingMassLevel {
    id: string;
    /** Clear masonry-wall height for this level. */
    wallHeight: number;
    sources: FloorMassSourceSelectors;
    liveLoadPerArea: number;
    lintelHeight: number;
    plasterThickness: number;
    slab: BuildingLevelSlab;
    closureTolerance?: number;
}

export interface BuildingCenterOfMassOptions {
    levels: readonly BuildingMassLevel[];
    slabThickness: number;
    metering: BuildingMeteringStrategy;
    specificWeights: {
        masonry: SpecificWeight;
        concrete: SpecificWeight;
        plaster: SpecificWeight;
    };
    includePlaster?: boolean;
    includeBondBeams?: boolean;
}

export interface BuildingLevelMassResult {
    id: string;
    index: number;
    wallHeight: number;
    effectiveVerticalHeight: number;
    result: FloorCenterOfMassResult;
}

export interface BuildingCenterOfMassResult {
    centerOfMass: { x: number; y: number };
    totalWeight: number;
    levels: BuildingLevelMassResult[];
    warnings: string[];
}
