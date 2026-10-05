import type { AutoCadQueryClient, RawGeometry } from '../../cad/AutoCadQueryClient.js';
import { ImplicitSlabDetector } from '../tributary/ImplicitSlabDetector.js';
import { TributaryGeometrySource, type TributaryGeometrySet } from '../tributary/TributaryGeometrySource.js';
import type {
    FloorMassGeometry,
    FloorMassSourceSelectors,
    TaggedFloorGeometry,
} from './types.js';

export interface FloorMassGeometryLoadResult {
    geometry: FloorMassGeometry;
    sourceGeometry: TributaryGeometrySet;
    warnings: string[];
}

/** Loads tagged plan geometry and infers slab panels when they are not drawn. */
export class FloorMassGeometrySource {
    static async load(
        query: AutoCadQueryClient,
        selectors: FloorMassSourceSelectors,
        closureTolerance = 0.05,
    ): Promise<FloorMassGeometryLoadResult> {
        const sourceGeometry = await TributaryGeometrySource.load(query, selectors);
        const walls = sourceGeometry.supports
            .filter((support) => support.kind !== 'lintel')
            .map((support) => support.geometry);
        const lintels = sourceGeometry.supports
            .filter((support) => support.kind === 'lintel')
            .map((support) => support.geometry);
        const detection = sourceGeometry.slabs.length === 0
            ? ImplicitSlabDetector.detect(sourceGeometry.supports, closureTolerance)
            : undefined;
        const slabs = sourceGeometry.slabs.length > 0
            ? sourceGeometry.slabs
            : detection?.slabs.map((slab) => slab.geometry) ?? [];
        const tags = await loadTags(query, [...walls, ...lintels, ...sourceGeometry.slabs]);

        return {
            sourceGeometry,
            geometry: {
                walls: tagged(walls, tags),
                lintels: tagged(lintels, tags),
                slabs: tagged(slabs, tags),
            },
            warnings: detection?.warnings ?? [],
        };
    }
}

async function loadTags(
    query: AutoCadQueryClient,
    geometries: RawGeometry[],
): Promise<Record<string, string | null>> {
    const handles = [...new Set(geometries.map((geometry) => geometry.handle))];
    if (handles.length === 0) return {};
    try {
        return await query.getTagsByHandles(handles);
    } catch {
        return {};
    }
}

function tagged(
    geometries: RawGeometry[],
    tags: Record<string, string | null>,
): TaggedFloorGeometry[] {
    return geometries.map((geometry) => ({ geometry, tag: tags[geometry.handle] ?? null }));
}
