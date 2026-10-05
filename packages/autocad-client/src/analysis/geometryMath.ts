// src/analysis/geometryMath.ts
import { Polygon } from '@rolandohvca12/structural-lib';
import { type RawGeometry } from '../cad/AutoCadQueryClient.js';
import { type Ring } from './PolygonOps.js';

export interface BoundingBox { xMin: number; xMax: number; yMin: number; yMax: number }

/** Única pasada por el anillo: calcula los 4 límites a la vez (antes eran 6 recorridos separados). */
export function boundingBox(ring: Ring): BoundingBox {
    let xMin = Infinity, xMax = -Infinity, yMin = Infinity, yMax = -Infinity;
    for (let i = 0; i < ring.length; i++) {
        const p = ring[i];
        if (p.x < xMin) xMin = p.x;
        if (p.x > xMax) xMax = p.x;
        if (p.y < yMin) yMin = p.y;
        if (p.y > yMax) yMax = p.y;
    }
    return { xMin, xMax, yMin, yMax };
}

export interface AxisProtrusion { positive: number; negative: number }

/** Reutiliza boundingBox (una pasada por anillo) en vez de su propio project() con map+spread. */
export function axisProtrusion(reference: Ring, contact: Ring, axis: 'x' | 'y'): AxisProtrusion {
    const refBox = boundingBox(reference);
    const contactBox = boundingBox(contact);

    const refMin = axis === 'x' ? refBox.xMin : refBox.yMin;
    const refMax = axis === 'x' ? refBox.xMax : refBox.yMax;
    const cMin = axis === 'x' ? contactBox.xMin : contactBox.yMin;
    const cMax = axis === 'x' ? contactBox.xMax : contactBox.yMax;

    return {
        positive: Math.max(0, cMax - refMax),
        negative: Math.max(0, refMin - cMin),
    };
}

export function localAxis(ring: Ring): 'x' | 'y' {
    const box = boundingBox(ring);
    return box.xMax - box.xMin >= box.yMax - box.yMin ? 'x' : 'y';
}

export function toPolygon(geometry: RawGeometry): Polygon {
    return new Polygon(geometry.points.map((p) => ({ x: p.x, y: p.y })));
}

export function toRing(geometry: RawGeometry): Ring {
    return geometry.points.map((p) => ({ x: p.x, y: p.y }));
}

export function centroid(ring: Ring): { x: number; y: number } {
    const poly = new Polygon(ring);
    return { x: poly.Cx(), y: poly.Cy() };
}

export function distance(a: { x: number; y: number }, b: { x: number; y: number }): number {
    return Math.hypot(b.x - a.x, b.y - a.y);
}

export function ringArea(ring: Ring): number {
    if (ring.length < 3) return 0;
    return new Polygon(ring).A();
}

export interface Segment { p1: { x: number; y: number }; p2: { x: number; y: number } }

function pointToSegmentDistance(p: { x: number; y: number }, seg: Segment): number {
    const dx = seg.p2.x - seg.p1.x;
    const dy = seg.p2.y - seg.p1.y;
    const lengthSq = dx * dx + dy * dy;
    if (lengthSq === 0) return distance(p, seg.p1);
    let t = ((p.x - seg.p1.x) * dx + (p.y - seg.p1.y) * dy) / lengthSq;
    t = Math.max(0, Math.min(1, t));
    return distance(p, { x: seg.p1.x + t * dx, y: seg.p1.y + t * dy });
}

export function segmentDistance(a: Segment, b: Segment): number {
    return Math.min(
        pointToSegmentDistance(a.p1, b),
        pointToSegmentDistance(a.p2, b),
        pointToSegmentDistance(b.p1, a),
        pointToSegmentDistance(b.p2, a)
    );
}

export function toSegments(ring: Ring, closed = true): Segment[] {
    const n = closed ? ring.length : ring.length - 1;
    const segments: Segment[] = [];
    for (let i = 0; i < n; i++) {
        segments.push({ p1: ring[i], p2: ring[(i + 1) % ring.length] });
    }
    return segments;
}

export function ringDistance(a: Ring, b: Ring): number {
    let min = Infinity;
    for (const sa of toSegments(a)) {
        for (const sb of toSegments(b)) {
            const d = segmentDistance(sa, sb);
            if (d < min) min = d;
        }
    }
    return min;
}

export type ContactSide = 'left' | 'right' | 'top' | 'bottom';

export function rotatePoint(p: { x: number; y: number }, angleRad: number, pivot: { x: number; y: number }): { x: number; y: number } {
    const dx = p.x - pivot.x;
    const dy = p.y - pivot.y;
    const cos = Math.cos(angleRad);
    const sin = Math.sin(angleRad);
    return { x: pivot.x + dx * cos - dy * sin, y: pivot.y + dx * sin + dy * cos };
}

export function rotateRing(ring: Ring, angleRad: number, pivot: { x: number; y: number }): Ring {
    return ring.map((p) => rotatePoint(p, angleRad, pivot));
}

/** Ángulo (rad) del lado más largo del anillo. */
export function mainAxisAngle(ring: Ring): number {
    let maxLen = -Infinity;
    let angle = 0;
    const n = ring.length;
    for (let i = 0; i < n; i++) {
        const p1 = ring[i];
        const p2 = ring[(i + 1) % n];
        const len = Math.hypot(p2.x - p1.x, p2.y - p1.y);
        if (len > maxLen) { maxLen = len; angle = Math.atan2(p2.y - p1.y, p2.x - p1.x); }
    }
    return angle;
}

export function minWidth(ring: Ring): number {
    let min = Infinity;
    for (let i = 0; i < ring.length; i++) {
        const a = ring[i];
        const b = ring[(i + 1) % ring.length];
        const length = Math.hypot(b.x - a.x, b.y - a.y);
        if (length < min) min = length;
    }
    return min;
}

export function maxWidth(ring: Ring): number {
    let max = -Infinity;
    for (let i = 0; i < ring.length; i++) {
        const a = ring[i];
        const b = ring[(i + 1) % ring.length];
        const length = Math.hypot(b.x - a.x, b.y - a.y);
        if (length > max) max = length;
    }
    return max;
}

/**
 * Distancia al primer delimitador que cruza el ancho de `contact`, a lo
 * largo de `axis`, en la dirección indicada desde `fromValue`.
 * Antes: 2 map() + 4 spreads por delimitador (8 recorridos). Ahora:
 * 1 boundingBox por delimitador (1 recorrido), reutilizando la misma
 * función ya optimizada.
 */
export function firstDelimiterDistance(
    contact: Ring,
    delimiters: Ring[],
    axis: 'x' | 'y',
    direction: 'positive' | 'negative',
    fromValue: number,
    minGap = 0   // <-- nuevo
): number {
    const contactBox = boundingBox(contact);
    const contactPerpMin = axis === 'x' ? contactBox.yMin : contactBox.xMin;
    const contactPerpMax = axis === 'x' ? contactBox.yMax : contactBox.xMax;

    let nearest = Infinity;

    for (const d of delimiters) {
        const box = boundingBox(d);
        const dPerpMin = axis === 'x' ? box.yMin : box.xMin;
        const dPerpMax = axis === 'x' ? box.yMax : box.xMax;

        const crosses = dPerpMax > contactPerpMin && dPerpMin < contactPerpMax;
        if (!crosses) continue;

        const dMin = axis === 'x' ? box.xMin : box.yMin;
        const dMax = axis === 'x' ? box.xMax : box.yMax;

        if (direction === 'positive' && dMin > fromValue + minGap) {
            const dist = dMin - fromValue;
            if (dist < nearest) nearest = dist;
        } else if (direction === 'negative' && dMax < fromValue - minGap) {
            const dist = fromValue - dMax;
            if (dist < nearest) nearest = dist;
        }
    }

    return nearest;
}

export interface LocalFrame {
    angle: number;
    pivot: { x: number; y: number };
    refBox: BoundingBox;
}

export function computeLocalFrame(reference: RawGeometry): LocalFrame {
    const refRing = toRing(reference);
    const angle = mainAxisAngle(refRing);
    const pivot = centroid(refRing);
    const refBox = boundingBox(rotateRing(refRing, -angle, pivot));
    return { angle, pivot, refBox };
}

export function toLocalBox(frame: LocalFrame, geometry: RawGeometry | Ring): BoundingBox {
    const ring = Array.isArray(geometry) ? geometry : toRing(geometry);
    return boundingBox(rotateRing(ring, -frame.angle, frame.pivot));
}

export function thicknessOf(ring: Ring): number {
    const box = boundingBox(ring);
    return Math.min(box.xMax - box.xMin, box.yMax - box.yMin);
}

export function epsilonFor(box: BoundingBox): number {
    return Math.max(box.xMax - box.xMin, box.yMax - box.yMin) * 1e-4;
}
