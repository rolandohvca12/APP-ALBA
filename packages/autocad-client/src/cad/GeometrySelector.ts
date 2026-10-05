import { type AutoCadQueryClient, type RawGeometry } from './AutoCadQueryClient.js';

/**
 * GeometrySelector
 * ----------------
 * Única responsabilidad: saber CÓMO obtener un conjunto de RawGeometry
 * desde AutoCAD (por layer, por tag, por lo que sea en el futuro), sin
 * que el código que orquesta la consulta (el script, WallFusionService)
 * conozca el mecanismo concreto. Es el mismo contrato que ya usas en
 * IGeometryInterpreter: polimorfismo por interfaz, cero if/else de tipo.
 */
export interface GeometrySelector {
    resolve(client: AutoCadQueryClient): Promise<RawGeometry[]>;
    describe(): string;
    /** Handle -> etiqueta de origen (tag o layer) que produjo ese elemento. */
    resolveLabels(client: AutoCadQueryClient): Promise<Map<string, string>>;
}

export class ByLayer implements GeometrySelector {
    constructor(private readonly layer: string) { }

    resolve(client: AutoCadQueryClient): Promise<RawGeometry[]> {
        return client.getGeometryByLayer(this.layer);
    }

    async resolveLabels(client: AutoCadQueryClient): Promise<Map<string, string>> {
        const geometries = await this.resolve(client);
        return new Map(geometries.map((g) => [g.handle, this.layer]));
    }

    describe(): string {
        return `layer:${this.layer}`;
    }
}

export class ByTag implements GeometrySelector {
    constructor(private readonly tag: string) { }

    resolve(client: AutoCadQueryClient): Promise<RawGeometry[]> {
        return client.getGeometryByTag(this.tag);
    }

    async resolveLabels(client: AutoCadQueryClient): Promise<Map<string, string>> {
        const geometries = await this.resolve(client);
        return new Map(geometries.map((g) => [g.handle, this.tag]));
    }

    describe(): string {
        return `tag:${this.tag}`;
    }
}

export class CombinedSelector implements GeometrySelector {
    constructor(private readonly selectors: GeometrySelector[]) { }

    async resolve(client: AutoCadQueryClient): Promise<RawGeometry[]> {
        const groups = await Promise.all(this.selectors.map((s) => s.resolve(client)));
        const seen = new Set<string>();
        const merged: RawGeometry[] = [];
        for (const group of groups) {
            for (const geometry of group) {
                if (seen.has(geometry.handle)) continue;
                seen.add(geometry.handle);
                merged.push(geometry);
            }
        }
        return merged;
    }

    async resolveLabels(client: AutoCadQueryClient): Promise<Map<string, string>> {
        const maps = await Promise.all(this.selectors.map((s) => s.resolveLabels(client)));
        const combined = new Map<string, string>();
        for (const m of maps) {
            for (const [handle, label] of m) {
                if (!combined.has(handle)) combined.set(handle, label);
            }
        }
        return combined;
    }

    describe(): string {
        return `combined(${this.selectors.map((s) => s.describe()).join(', ')})`;
    }
}

export function byTags(...tags: string[]): GeometrySelector {
    return new CombinedSelector(tags.map((t) => new ByTag(t)));
}

export function byLayers(...layers: string[]): GeometrySelector {
    return new CombinedSelector(layers.map((l) => new ByLayer(l)));
}