import type { AutoCadQueryClient, RawGeometry } from '../../cad/AutoCadQueryClient.js';
import type { GeometrySelector } from '../../cad/GeometrySelector.js';
import type { TributarySourceSelectors, TributarySupport, TributarySupportKind } from './types.js';

export interface TributaryGeometrySet {
    slabs: RawGeometry[];
    supports: TributarySupport[];
}

/** Loads geometry through the existing layer/tag selector abstraction. */
export class TributaryGeometrySource {
    static async load(
        query: AutoCadQueryClient,
        selectors: TributarySourceSelectors,
    ): Promise<TributaryGeometrySet> {
        const [slabs, wallsX, wallsY, lintels] = await Promise.all([
            resolveOptional(selectors.slabs, query),
            resolveOptional(selectors.wallsX, query),
            resolveOptional(selectors.wallsY, query),
            resolveOptional(selectors.lintels, query),
        ]);

        return {
            slabs: uniqueByHandle(slabs),
            supports: mergeSupports([
                ['wall-x', wallsX],
                ['wall-y', wallsY],
                ['lintel', lintels],
            ]),
        };
    }
}

function resolveOptional(
    selector: GeometrySelector | undefined,
    query: AutoCadQueryClient,
): Promise<RawGeometry[]> {
    return selector?.resolve(query) ?? Promise.resolve([]);
}

function mergeSupports(
    groups: Array<[TributarySupportKind, RawGeometry[]]>,
): TributarySupport[] {
    const supports = new Map<string, TributarySupport>();
    for (const [kind, geometries] of groups) {
        for (const geometry of geometries) {
            if (!supports.has(geometry.handle)) {
                supports.set(geometry.handle, { geometry, kind });
            }
        }
    }
    return [...supports.values()];
}

function uniqueByHandle(geometries: RawGeometry[]): RawGeometry[] {
    return [...new Map(geometries.map((geometry) => [geometry.handle, geometry])).values()];
}
