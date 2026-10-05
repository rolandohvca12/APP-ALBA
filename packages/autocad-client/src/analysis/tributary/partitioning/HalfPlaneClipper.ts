import type { Ring } from '../../PolygonOps.js';

/** Convex clipping against a*x + b*y >= c. */
export function clipToHalfPlane(ring: Ring, a: number, b: number, c: number): Ring[] {
    if (Math.hypot(a, b) <= 1e-12) return [normalizeRing(ring)];
    const input = normalizeRing(ring);
    if (input.length < 3) return [];
    const output: Ring = [];
    const epsilon = 1e-9;

    for (let index = 0; index < input.length; index++) {
        const start = input[index];
        const end = input[(index + 1) % input.length];
        const startValue = a * start.x + b * start.y - c;
        const endValue = a * end.x + b * end.y - c;
        const startInside = startValue >= -epsilon;
        const endInside = endValue >= -epsilon;

        if (startInside && endInside) appendUnique(output, end);
        else if (startInside) appendUnique(output, intersection(start, end, startValue, endValue));
        else if (endInside) {
            appendUnique(output, intersection(start, end, startValue, endValue));
            appendUnique(output, end);
        }
    }

    const cleaned = normalizeRing(output);
    return cleaned.length >= 3 ? [cleaned] : [];
}

function intersection(start: Ring[number], end: Ring[number], startValue: number, endValue: number): Ring[number] {
    const denominator = startValue - endValue;
    const t = Math.abs(denominator) <= 1e-15 ? 0 : startValue / denominator;
    return { x: start.x + (end.x - start.x) * t, y: start.y + (end.y - start.y) * t };
}

function appendUnique(ring: Ring, point: Ring[number]): void {
    const previous = ring[ring.length - 1];
    if (!previous || Math.hypot(point.x - previous.x, point.y - previous.y) > 1e-9) ring.push(point);
}

function normalizeRing(ring: Ring): Ring {
    if (ring.length < 2) return [...ring];
    const result = [...ring];
    const last = result[result.length - 1];
    if (Math.hypot(result[0].x - last.x, result[0].y - last.y) <= 1e-9) result.pop();
    return result;
}
