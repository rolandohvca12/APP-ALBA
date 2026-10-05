import type { Ring } from '../../PolygonOps.js';

export interface Point2D { x: number; y: number }

export interface PanoWallEdge {
    id: string;
    p1: Point2D;
    p2: Point2D;
    isDintel?: boolean;
    /** Wall connected to each lintel endpoint, resolved before clipping it to a panel. */
    startWallId?: string;
    endWallId?: string;
}

export interface WallTributaryArea { wallId: string; polygon: Ring }
export interface InwardLine { a: number; b: number; c: number }
export interface OwnedBoundarySpan { ownerId: string; p1: Point2D; p2: Point2D }
export interface BoundaryLineGroup { line: InwardLine; spans: OwnedBoundarySpan[] }
