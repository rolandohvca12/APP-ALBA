import { type RawGeometry } from '../cad/AutoCadQueryClient.js';
import {
    toRing,
    boundingBox,
    thicknessOf,
    computeLocalFrame,
    toLocalBox,
    type LocalFrame,
    type BoundingBox,
} from './geometryMath.js';

export type WallEnd = 'start' | 'end' | 'intermediate';

export interface EndElementMatch {
    element: RawGeometry;
    end: WallEnd;
    thickness: number;
    alongWallLength: number;
    localXMin: number;
    localXMax: number;
}

interface PreparedElement {
    element: RawGeometry;
    thickness: number;
    box: BoundingBox;
    alongWallLength: number;
    yOverlaps: boolean;
}

export class EndElementDetector {
    private static prepare(
        reference: RawGeometry,
        endElements: RawGeometry[],
        frame?: LocalFrame
    ): { frame: LocalFrame; prepared: PreparedElement[] } {
        const f = frame ?? computeLocalFrame(reference);

        const prepared = endElements.map((el) => {
            const ring = toRing(el);
            const thickness = thicknessOf(ring);
            const box = toLocalBox(f, ring);
            const alongWallLength = box.xMax - box.xMin;
            const yOverlaps = box.yMax > f.refBox.yMin && box.yMin < f.refBox.yMax;
            return { element: el, thickness, box, alongWallLength, yOverlaps };
        });

        return { frame: f, prepared };
    }

    static findAtEnds(
        reference: RawGeometry,
        endElements: RawGeometry[],
        tolerance = 0.02,
        frame?: LocalFrame
    ): EndElementMatch[] {
        const { frame: f, prepared } = this.prepare(reference, endElements, frame);
        const refBox = f.refBox;
        const matches: EndElementMatch[] = [];

        for (const { element, thickness, box, alongWallLength, yOverlaps } of prepared) {
            if (!yOverlaps) continue;

            const touchesStart =
                Math.abs(box.xMin - refBox.xMin) <= tolerance ||
                Math.abs(box.xMax - refBox.xMin) <= tolerance;

            const touchesEnd =
                Math.abs(box.xMax - refBox.xMax) <= tolerance ||
                Math.abs(box.xMin - refBox.xMax) <= tolerance;

            if (touchesStart) {
                matches.push({
                    element, end: 'start', thickness, alongWallLength,
                    localXMin: box.xMin, localXMax: box.xMax,
                });
            } else if (touchesEnd) {
                matches.push({
                    element, end: 'end', thickness, alongWallLength,
                    localXMin: box.xMin, localXMax: box.xMax,
                });
            }
        }

        return matches;
    }

    static findInterior(
        reference: RawGeometry,
        endElements: RawGeometry[],
        tolerance = 0.02,
        frame?: LocalFrame
    ): EndElementMatch[] {
        const { frame: f, prepared } = this.prepare(reference, endElements, frame);
        const refBox = f.refBox;
        const matches: EndElementMatch[] = [];

        for (const { element, thickness, box, alongWallLength, yOverlaps } of prepared) {
            const isInterior =
                yOverlaps &&
                box.xMin > refBox.xMin + tolerance &&
                box.xMax < refBox.xMax - tolerance;

            if (isInterior) {
                matches.push({
                    element, end: 'intermediate', thickness, alongWallLength,
                    localXMin: box.xMin, localXMax: box.xMax,
                });
            }
        }

        return matches;
    }
}

export { type BoundingBox };