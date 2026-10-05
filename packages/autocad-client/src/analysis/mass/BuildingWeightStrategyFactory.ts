import {
    AxialFloorWeightStrategy,
    SeismicFloorWeightStrategy,
    type AdjacentLevelDimensions,
    type FloorWeightStrategy,
} from './FloorWeightStrategy.js';
import type { BuildingCenterOfMassOptions } from './buildingTypes.js';

/** Creates the floor strategy from the ordered building-level definition. */
export class BuildingWeightStrategyFactory {
    static create(
        options: BuildingCenterOfMassOptions,
        levelIndex: number,
    ): FloorWeightStrategy {
        const level = options.levels[levelIndex];
        if (!level) throw new RangeError(`No building level exists at index ${levelIndex}.`);
        const current = dimensions(level.wallHeight, options.slabThickness);

        if (options.metering.type === 'axial') {
            return new AxialFloorWeightStrategy({
                totalLevelHeight: current.wallHeight + current.slabThickness,
            });
        }

        const next = options.levels[levelIndex + 1];
        const levelAbove = next
            ? dimensions(next.wallHeight, options.slabThickness)
            : options.metering.topAdjacentLevel;
        return new SeismicFloorWeightStrategy({
            levelBelow: current,
            ...(levelAbove ? { levelAbove } : {}),
            alpha: options.metering.alpha,
        });
    }
}

function dimensions(wallHeight: number, slabThickness: number): AdjacentLevelDimensions {
    return { wallHeight, slabThickness };
}
