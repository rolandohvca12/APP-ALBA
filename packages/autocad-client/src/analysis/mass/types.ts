import type { RawGeometry } from '../../cad/AutoCadQueryClient.js';
import type { GeometrySelector } from '../../cad/GeometrySelector.js';
import type { Ring } from '../PolygonOps.js';
import type { FloorWeightStrategy, FloorWeightStrategyKind } from './FloorWeightStrategy.js';

export interface FloorMassSourceSelectors {
    slabs?: GeometrySelector;
    wallsX?: GeometrySelector;
    wallsY?: GeometrySelector;
    lintels?: GeometrySelector;
}

export type FloorMassElementKind = 'wall' | 'lintel' | 'slab' | 'plaster' | 'bond-beam' | 'live-load';

export interface WeightElementContext {
    kind: FloorMassElementKind;
    geometry: RawGeometry;
    tag: string | null;
}

export type SpecificWeight = number | ((element: WeightElementContext) => number);

export type SlabMassBehavior =
    | {
        type: 'unidirectional';
        thickness: number;
        selfWeightPerArea: number;
        spanDirection: 'x' | 'y';
    }
    | { type: 'bidirectional'; thickness: number };

export interface FloorCenterOfMassOptions {
    sources: FloorMassSourceSelectors;
    strategy: FloorWeightStrategy;
    /** Unreduced live load in force/area units. */
    liveLoadPerArea: number;
    lintelHeight: number;
    plasterThickness: number;
    slab: SlabMassBehavior;
    specificWeights: {
        masonry: SpecificWeight;
        concrete: SpecificWeight;
        plaster: SpecificWeight;
    };
    includePlaster?: boolean;
    includeBondBeams?: boolean;
    closureTolerance?: number;
}

export interface FloorMassContribution {
    kind: FloorMassElementKind;
    sourceHandle: string;
    sourceTag: string | null;
    centroid: { x: number; y: number };
    planArea: number;
    volume?: number;
    loadPerArea?: number;
    specificWeight?: number;
    weight: number;
}

export interface FloorCenterOfMassResult {
    strategy: FloorWeightStrategyKind;
    liveLoadFactor: number;
    centerOfMass: { x: number; y: number };
    totalWeight: number;
    momentX: number;
    momentY: number;
    contributions: FloorMassContribution[];
    warnings: string[];
}

export interface TaggedFloorGeometry {
    geometry: RawGeometry;
    tag: string | null;
}

export interface FloorMassGeometry {
    walls: TaggedFloorGeometry[];
    lintels: TaggedFloorGeometry[];
    slabs: TaggedFloorGeometry[];
    tributaryAreas?: WallTributaryLoadArea[];
}

export interface WallTributaryLoadArea {
    wallHandle: string;
    wallTag: string | null;
    polygon: Ring;
    area: number;
}
