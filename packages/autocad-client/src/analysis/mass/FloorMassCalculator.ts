import { Polygon } from '@rolandohvca12/structural-lib';
import { maxWidth, toRing } from '../geometryMath.js';
import type {
    FloorCenterOfMassOptions,
    FloorCenterOfMassResult,
    FloorMassContribution,
    FloorMassElementKind,
    FloorMassGeometry,
    SpecificWeight,
    TaggedFloorGeometry,
} from './types.js';

export type FloorMassCalculationOptions = Omit<FloorCenterOfMassOptions, 'sources' | 'closureTolerance'>;

/** Pure weight and first-moment calculation over already resolved plan geometry. */
export class FloorMassCalculator {
    static calculate(
        geometry: FloorMassGeometry,
        options: FloorMassCalculationOptions,
        sourceWarnings: string[] = [],
    ): FloorCenterOfMassResult {
        validateOptions(options);
        const warnings = [...sourceWarnings];
        const contributions: FloorMassContribution[] = [];
        const wallMetrics = new Map<string, PolygonMetrics>();

        for (const wall of geometry.walls) {
            const metrics = polygonMetrics(wall, warnings);
            if (!metrics) continue;
            wallMetrics.set(wall.geometry.handle, metrics);
            const masonryWeight = resolveSpecificWeight(options.specificWeights.masonry, 'wall', wall);
            contributions.push(volumeContribution(
                'wall',
                wall,
                metrics,
                metrics.area * options.strategy.verticalElementHeight,
                masonryWeight,
            ));

            if (options.includePlaster !== false && options.plasterThickness > 0) {
                const plasterWeight = resolveSpecificWeight(options.specificWeights.plaster, 'plaster', wall);
                const volume = maxWidth(toRing(wall.geometry))
                    * options.strategy.verticalElementHeight
                    * 2
                    * options.plasterThickness;
                contributions.push(volumeContribution('plaster', wall, metrics, volume, plasterWeight));
            }

            if (options.includeBondBeams !== false) {
                const concreteWeight = resolveSpecificWeight(options.specificWeights.concrete, 'bond-beam', wall);
                const volume = metrics.area * options.slab.thickness;
                contributions.push(volumeContribution('bond-beam', wall, metrics, volume, concreteWeight));
            }
        }

        for (const loadArea of geometry.tributaryAreas ?? []) {
            const wall = geometry.walls.find((item) => item.geometry.handle === loadArea.wallHandle);
            const metrics = wallMetrics.get(loadArea.wallHandle);
            if (!wall || !metrics) {
                warnings.push(`Live load for wall ${loadArea.wallHandle} was ignored because its wall geometry was not found.`);
                continue;
            }
            contributions.push({
                kind: 'live-load',
                sourceHandle: wall.geometry.handle,
                sourceTag: loadArea.wallTag ?? wall.tag,
                centroid: metrics.centroid,
                planArea: loadArea.area,
                loadPerArea: options.liveLoadPerArea,
                weight: options.strategy.liveLoadWeight(loadArea.area, options.liveLoadPerArea),
            });
        }

        for (const lintel of geometry.lintels) {
            const metrics = polygonMetrics(lintel, warnings);
            if (!metrics) continue;
            const concreteWeight = resolveSpecificWeight(options.specificWeights.concrete, 'lintel', lintel);
            contributions.push(volumeContribution(
                'lintel',
                lintel,
                metrics,
                metrics.area * options.lintelHeight,
                concreteWeight,
            ));
        }

        for (const slab of geometry.slabs) {
            const metrics = polygonMetrics(slab, warnings);
            if (!metrics) continue;
            if (options.slab.type === 'unidirectional') {
                contributions.push({
                    kind: 'slab',
                    sourceHandle: slab.geometry.handle,
                    sourceTag: slab.tag,
                    centroid: metrics.centroid,
                    planArea: metrics.area,
                    loadPerArea: options.slab.selfWeightPerArea,
                    weight: metrics.area * options.slab.selfWeightPerArea,
                });
            } else {
                const concreteWeight = resolveSpecificWeight(options.specificWeights.concrete, 'slab', slab);
                contributions.push(volumeContribution(
                    'slab',
                    slab,
                    metrics,
                    metrics.area * options.slab.thickness,
                    concreteWeight,
                ));
            }
        }

        const totalWeight = contributions.reduce((sum, item) => sum + item.weight, 0);
        if (!(totalWeight > 0)) throw new Error('The floor total weight must be greater than zero.');
        const momentX = contributions.reduce((sum, item) => sum + item.weight * item.centroid.x, 0);
        const momentY = contributions.reduce((sum, item) => sum + item.weight * item.centroid.y, 0);
        return {
            strategy: options.strategy.kind,
            liveLoadFactor: options.strategy.liveLoadFactor,
            centerOfMass: { x: momentX / totalWeight, y: momentY / totalWeight },
            totalWeight,
            momentX,
            momentY,
            contributions,
            warnings,
        };
    }
}

interface PolygonMetrics {
    area: number;
    centroid: { x: number; y: number };
}

function polygonMetrics(element: TaggedFloorGeometry, warnings: string[]): PolygonMetrics | undefined {
    const ring = toRing(element.geometry);
    if (!element.geometry.closed || ring.length < 3) {
        warnings.push(`Geometry ${element.geometry.handle} was ignored because it is not a closed polygon.`);
        return undefined;
    }
    const polygon = new Polygon(ring);
    const area = polygon.A();
    if (!(area > 0)) {
        warnings.push(`Geometry ${element.geometry.handle} was ignored because its area is zero.`);
        return undefined;
    }
    return { area, centroid: { x: polygon.Cx(), y: polygon.Cy() } };
}

function volumeContribution(
    kind: FloorMassElementKind,
    element: TaggedFloorGeometry,
    metrics: PolygonMetrics,
    volume: number,
    specificWeight: number,
): FloorMassContribution {
    return {
        kind,
        sourceHandle: element.geometry.handle,
        sourceTag: element.tag,
        centroid: metrics.centroid,
        planArea: metrics.area,
        volume,
        specificWeight,
        weight: volume * specificWeight,
    };
}

function resolveSpecificWeight(
    value: SpecificWeight,
    kind: FloorMassElementKind,
    element: TaggedFloorGeometry,
): number {
    const resolved = typeof value === 'function'
        ? value({ kind, geometry: element.geometry, tag: element.tag })
        : value;
    assertPositive(resolved, `specific weight for ${kind}`);
    return resolved;
}

function validateOptions(options: FloorMassCalculationOptions): void {
    assertNonNegative(options.liveLoadPerArea, 'liveLoadPerArea');
    assertPositive(options.lintelHeight, 'lintelHeight');
    assertNonNegative(options.plasterThickness, 'plasterThickness');
    assertPositive(options.slab.thickness, 'slab.thickness');
    if (options.slab.type === 'unidirectional') {
        assertPositive(options.slab.selfWeightPerArea, 'slab.selfWeightPerArea');
    }
}

function assertPositive(value: number, name: string): void {
    if (!Number.isFinite(value) || value <= 0) throw new RangeError(`${name} must be a finite positive number.`);
}

function assertNonNegative(value: number, name: string): void {
    if (!Number.isFinite(value) || value < 0) throw new RangeError(`${name} must be a finite non-negative number.`);
}
