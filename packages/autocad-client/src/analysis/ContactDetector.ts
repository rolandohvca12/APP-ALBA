import { type RawGeometry } from '../cad/AutoCadQueryClient.js';
import { toRing, ringDistance } from './geometryMath.js';

export interface ContactResult {
    candidate: RawGeometry;
    distance: number;
}

export class ContactDetector {
    static findContacts(reference: RawGeometry, candidates: RawGeometry[], tolerance = 0.01): ContactResult[] {
        const refRing = toRing(reference);
        return candidates
            .filter((c) => c.handle !== reference.handle)
            .map((c) => ({ candidate: c, distance: ringDistance(refRing, toRing(c)) }))
            .filter((r) => r.distance <= tolerance)
            .sort((a, b) => a.distance - b.distance);
    }
}