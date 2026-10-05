import type { RawGeometry } from '../../cad/AutoCadQueryClient.js';
import type { GeometrySelector } from '../../cad/GeometrySelector.js';
import type { Ring } from '../PolygonOps.js';

export type SlabLoadBehavior =
    | { type: 'bidirectional' }
    | { type: 'unidirectional'; spanDirection: 'x' | 'y'; thickness: number };

export interface TributarySourceSelectors {
    /** Optional explicit slab polygons. When omitted, closed panels are inferred from supports. */
    slabs?: GeometrySelector;
    wallsX?: GeometrySelector;
    wallsY?: GeometrySelector;
    lintels?: GeometrySelector;
}

export interface TributaryAnalysisOptions {
    sources: TributarySourceSelectors;
    slabBehavior: SlabLoadBehavior | ((slab: RawGeometry) => SlabLoadBehavior);
    contactTolerance?: number;
    /** Maximum gap accepted between collinear support segments when closing an implicit panel. */
    closureTolerance?: number;
    areaTolerance?: number;
}

export type TributarySupportKind = 'wall-x' | 'wall-y' | 'lintel';

export interface TributarySupport {
    geometry: RawGeometry;
    kind: TributarySupportKind;
}

export interface TributaryCell {
    /** Stable domain identifier assigned with TAGENTITY; null when the support is not tagged. */
    supportTag: string | null;
    /** AutoCAD entity handle retained for drawing and exact entity lookup. */
    supportHandle: string;
    supportKind: TributarySupportKind;
    polygon: Ring;
    area: number;
}

export interface SlabTributaryResult {
    slabHandle: string;
    slabPolygon: Ring;
    slabArea: number;
    cells: TributaryCell[];
    assignedArea: number;
    unassignedArea: number;
    warnings: string[];
}

export interface TributaryAnalysisResult {
    slabs: SlabTributaryResult[];
    warnings: string[];
}
