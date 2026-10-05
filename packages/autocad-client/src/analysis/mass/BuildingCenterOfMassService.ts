import type { AutoCadQueryClient } from '../../cad/AutoCadQueryClient.js';
import { FloorCenterOfMassService } from './FloorCenterOfMassService.js';
import { BuildingWeightStrategyFactory } from './BuildingWeightStrategyFactory.js';
import type {
    BuildingCenterOfMassOptions,
    BuildingCenterOfMassResult,
    BuildingLevelMassResult,
} from './buildingTypes.js';

/** Calculates each floor independently and combines their plan first moments. */
export class BuildingCenterOfMassService {
    static async calculate(
        query: AutoCadQueryClient,
        options: BuildingCenterOfMassOptions,
    ): Promise<BuildingCenterOfMassResult> {
        validateBuilding(options);
        const levels: BuildingLevelMassResult[] = [];

        for (let index = 0; index < options.levels.length; index++) {
            const level = options.levels[index];
            const strategy = BuildingWeightStrategyFactory.create(options, index);
            const slab = level.slab.type === 'bidirectional'
                ? { type: 'bidirectional' as const, thickness: options.slabThickness }
                : {
                    type: 'unidirectional' as const,
                    thickness: options.slabThickness,
                    selfWeightPerArea: level.slab.selfWeightPerArea,
                    spanDirection: level.slab.spanDirection,
                };
            let result;
            try {
                result = await FloorCenterOfMassService.calculate(query, {
                    sources: level.sources,
                    strategy,
                    liveLoadPerArea: level.liveLoadPerArea,
                    lintelHeight: level.lintelHeight,
                    plasterThickness: level.plasterThickness,
                    slab,
                    specificWeights: options.specificWeights,
                    ...(options.includePlaster !== undefined
                        ? { includePlaster: options.includePlaster }
                        : {}),
                    ...(options.includeBondBeams !== undefined
                        ? { includeBondBeams: options.includeBondBeams }
                        : {}),
                    ...(level.closureTolerance !== undefined
                        ? { closureTolerance: level.closureTolerance }
                        : {}),
                });
            } catch (error) {
                const detail = error instanceof Error ? error.message : String(error);
                throw new Error(
                    `Unable to calculate building level "${level.id}": ${detail} Check its geometry selectors.`,
                );
            }
            levels.push({
                id: level.id,
                index,
                wallHeight: level.wallHeight,
                effectiveVerticalHeight: strategy.verticalElementHeight,
                result,
            });
        }

        const totalWeight = levels.reduce((sum, level) => sum + level.result.totalWeight, 0);
        const momentX = levels.reduce((sum, level) =>
            sum + level.result.centerOfMass.x * level.result.totalWeight, 0,
        );
        const momentY = levels.reduce((sum, level) =>
            sum + level.result.centerOfMass.y * level.result.totalWeight, 0,
        );
        return {
            centerOfMass: { x: momentX / totalWeight, y: momentY / totalWeight },
            totalWeight,
            levels,
            warnings: levels.flatMap((level) =>
                level.result.warnings.map((warning) => `[${level.id}] ${warning}`),
            ),
        };
    }
}

function validateBuilding(options: BuildingCenterOfMassOptions): void {
    if (options.levels.length === 0) throw new RangeError('At least one building level is required.');
    if (!Number.isFinite(options.slabThickness) || options.slabThickness <= 0) {
        throw new RangeError('slabThickness must be a finite positive number.');
    }
    const ids = new Set<string>();
    for (const level of options.levels) {
        if (!level.id.trim()) throw new RangeError('Every building level requires a non-empty id.');
        if (ids.has(level.id)) throw new RangeError(`Duplicate building level id: ${level.id}.`);
        ids.add(level.id);
        if (!Number.isFinite(level.wallHeight) || level.wallHeight <= 0) {
            throw new RangeError(`wallHeight for level ${level.id} must be a finite positive number.`);
        }
    }
}
