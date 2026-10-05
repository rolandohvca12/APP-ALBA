export type FloorWeightStrategyKind = 'seismic' | 'axial';

export interface FloorWeightStrategy {
    readonly kind: FloorWeightStrategyKind;
    readonly verticalElementHeight: number;
    readonly liveLoadFactor: number;
    liveLoadWeight(tributaryArea: number, liveLoadPerArea: number): number;
}

abstract class BaseFloorWeightStrategy implements FloorWeightStrategy {
    abstract readonly kind: FloorWeightStrategyKind;
    abstract readonly verticalElementHeight: number;
    abstract readonly liveLoadFactor: number;

    liveLoadWeight(tributaryArea: number, liveLoadPerArea: number): number {
        assertNonNegative(tributaryArea, 'tributaryArea');
        assertNonNegative(liveLoadPerArea, 'liveLoadPerArea');
        return tributaryArea * liveLoadPerArea * this.liveLoadFactor;
    }
}

export interface AdjacentLevelDimensions {
    wallHeight: number;
    slabThickness: number;
}

export interface SeismicFloorWeightOptions {
    levelBelow: AdjacentLevelDimensions;
    /** Omit at the roof when there is no tributary vertical segment above. */
    levelAbove?: AdjacentLevelDimensions;
    /** Fraction of live load participating in the seismic mass, from 0 to 1. */
    alpha: number;
}

export class SeismicFloorWeightStrategy extends BaseFloorWeightStrategy {
    readonly kind = 'seismic' as const;
    readonly verticalElementHeight: number;
    readonly liveLoadFactor: number;

    constructor(options: SeismicFloorWeightOptions) {
        super();
        const levelBelowHeight = totalLevelHeight(options.levelBelow, 'levelBelow');
        const levelAboveHeight = options.levelAbove
            ? totalLevelHeight(options.levelAbove, 'levelAbove')
            : 0;
        if (!Number.isFinite(options.alpha) || options.alpha < 0 || options.alpha > 1) {
            throw new RangeError('alpha must be a finite number between 0 and 1.');
        }
        this.verticalElementHeight = (levelBelowHeight + levelAboveHeight) / 2;
        this.liveLoadFactor = options.alpha;
    }
}

function totalLevelHeight(level: AdjacentLevelDimensions, name: string): number {
    assertPositive(level.wallHeight, `${name}.wallHeight`);
    assertPositive(level.slabThickness, `${name}.slabThickness`);
    return level.wallHeight + level.slabThickness;
}

export interface AxialFloorWeightOptions {
    totalLevelHeight: number;
}

export class AxialFloorWeightStrategy extends BaseFloorWeightStrategy {
    readonly kind = 'axial' as const;
    readonly liveLoadFactor = 1;
    readonly verticalElementHeight: number;

    constructor(options: AxialFloorWeightOptions) {
        super();
        assertPositive(options.totalLevelHeight, 'totalLevelHeight');
        this.verticalElementHeight = options.totalLevelHeight;
    }
}

function assertPositive(value: number, name: string): void {
    if (!Number.isFinite(value) || value <= 0) throw new RangeError(`${name} must be a finite positive number.`);
}

function assertNonNegative(value: number, name: string): void {
    if (!Number.isFinite(value) || value < 0) throw new RangeError(`${name} must be a finite non-negative number.`);
}
