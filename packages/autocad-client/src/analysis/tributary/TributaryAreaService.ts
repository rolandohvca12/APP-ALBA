import type { AutoCadQueryClient, RawGeometry } from '../../cad/AutoCadQueryClient.js';
import { ringArea, toRing } from '../geometryMath.js';
import { TributaryPartitioner } from '../TributaryPartitioner.js';
import { ImplicitSlabDetector } from './ImplicitSlabDetector.js';
import { PanoBoundaryResolver } from './PanoBoundaryResolver.js';
import { TributaryGeometrySource } from './TributaryGeometrySource.js';
import type { TributaryGeometrySet } from './TributaryGeometrySource.js';
import type {
    SlabLoadBehavior,
    SlabTributaryResult,
    TributaryAnalysisOptions,
    TributaryAnalysisResult,
    TributarySupportKind,
} from './types.js';

export type TributaryCalculationOptions = Omit<TributaryAnalysisOptions, 'sources'>;

/** Coordinates source resolution, boundary resolution and pure partitioning. */
export class TributaryAreaService {
    static async analyze(
        query: AutoCadQueryClient,
        options: TributaryAnalysisOptions,
    ): Promise<TributaryAnalysisResult> {
        const geometry = await TributaryGeometrySource.load(query, options.sources);
        const result = this.analyzeGeometry(geometry, options);
        await attachSupportTags(query, result.slabs);
        return result;
    }

    static analyzeGeometry(
        geometry: TributaryGeometrySet,
        options: TributaryCalculationOptions,
    ): TributaryAnalysisResult {
        const supportKinds = new Map(geometry.supports.map((support) => [support.geometry.handle, support.kind]));
        const warnings: string[] = [];
        const slabs: SlabTributaryResult[] = [];

        if (geometry.slabs.length > 0) {
            for (const slab of geometry.slabs) {
                if (!slab.closed || slab.points.length < 3) {
                    warnings.push(`Slab ${slab.handle} was ignored because it is not a closed polygon.`);
                    continue;
                }
                const edges = PanoBoundaryResolver.resolve(
                    slab,
                    geometry.supports,
                    options.contactTolerance ?? 0.02,
                );
                const result = this.analyzeResolvedSlab(
                    slab,
                    edges,
                    resolveBehavior(options.slabBehavior, slab),
                    options.areaTolerance ?? 1e-6,
                    supportKinds,
                );
                slabs.push(result);
                warnings.push(...result.warnings);
            }
        } else {
            const detected = ImplicitSlabDetector.detect(
                geometry.supports,
                options.closureTolerance ?? options.contactTolerance ?? 0.05,
            );
            warnings.push(...detected.warnings);
            for (const slab of detected.slabs) {
                const result = this.analyzeResolvedSlab(
                    slab.geometry,
                    slab.edges,
                    resolveBehavior(options.slabBehavior, slab.geometry),
                    options.areaTolerance ?? 1e-6,
                    supportKinds,
                );
                slabs.push(result);
                warnings.push(...result.warnings);
            }
        }

        return { slabs, warnings };
    }

    private static analyzeResolvedSlab(
        slab: RawGeometry,
        edges: ReturnType<typeof PanoBoundaryResolver.resolve>,
        behavior: SlabLoadBehavior,
        areaTolerance: number,
        supportKinds: Map<string, TributarySupportKind>,
    ): SlabTributaryResult {
        const slabPolygon = toRing(slab);
        const slabArea = ringArea(slabPolygon);
        const warnings: string[] = [];

        const partitions = behavior.type === 'bidirectional'
            ? TributaryPartitioner.partitionBidireccional(slabPolygon, edges)
            : TributaryPartitioner.partitionUnidireccional(
                slabPolygon,
                edges,
                behavior.spanDirection,
                behavior.thickness,
            );

        const structuralCount = new Set(partitions.map((partition) => partition.wallId)).size;
        if (structuralCount < 2) {
            warnings.push(`Slab ${slab.handle} has only ${structuralCount} resolved wall support(s).`);
        }

        const cells = partitions.map((partition) => ({
            supportTag: null,
            supportHandle: partition.wallId,
            supportKind: supportKinds.get(partition.wallId) ?? inferSupportKind(edges, partition.wallId),
            polygon: partition.polygon,
            area: ringArea(partition.polygon),
        }));
        const assignedArea = cells.reduce((sum, cell) => sum + cell.area, 0);
        const unassignedArea = Math.max(0, slabArea - assignedArea);
        const areaError = Math.abs(slabArea - assignedArea);

        if (areaError > Math.max(areaTolerance, slabArea * areaTolerance)) {
            warnings.push(
                `Slab ${slab.handle} area mismatch: slab=${slabArea.toFixed(6)}, assigned=${assignedArea.toFixed(6)}.`,
            );
        }

        return {
            slabHandle: slab.handle,
            slabPolygon,
            slabArea,
            cells,
            assignedArea,
            unassignedArea,
            warnings,
        };
    }
}

async function attachSupportTags(
    query: AutoCadQueryClient,
    slabs: SlabTributaryResult[],
): Promise<void> {
    const handles = [...new Set(slabs.flatMap((slab) =>
        slab.cells.map((cell) => cell.supportHandle),
    ))];
    if (handles.length === 0) return;

    let tags: Record<string, string | null>;
    try {
        tags = await query.getTagsByHandles(handles);
    } catch {
        // Keeps analysis compatible with older plugins and lightweight query mocks.
        tags = {};
    }
    for (const slab of slabs) {
        for (const cell of slab.cells) cell.supportTag = tags[cell.supportHandle] ?? null;
    }
}

function resolveBehavior(
    behavior: TributaryAnalysisOptions['slabBehavior'],
    slab: RawGeometry,
): SlabLoadBehavior {
    return typeof behavior === 'function' ? behavior(slab) : behavior;
}

function inferSupportKind(
    edges: ReturnType<typeof PanoBoundaryResolver.resolve>,
    handle: string,
): TributarySupportKind {
    return edges.find((edge) => edge.id === handle)?.supportKind ?? 'wall-x';
}
