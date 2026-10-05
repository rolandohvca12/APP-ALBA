import { type RawGeometry } from '../cad/AutoCadQueryClient.js';
import { type Ring } from './PolygonOps.js';
import { PolygonOps } from './PolygonOps.js';
import { toRing, boundingBox, rotateRing, computeLocalFrame, toLocalBox, type LocalFrame } from './geometryMath.js';
import { ContactDetector } from './ContactDetector.js';
import { GeometryFuser, type FusionContactSpec } from './GeometryFuser.js';
import { EndElementDetector, type EndElementMatch } from './EndElementDetector.js';
import { TransformedSectionBuilder, type AdjacentTransverse } from './TransformedSectionBuilder.js';

export interface WallFusionResult {
    reference: RawGeometry;
    contactCount: number;
    polygons: Ring[];
}

export class WallFusionService {
    static fuseAll(
        mainWalls: RawGeometry[],
        transverseWalls: RawGeometry[],
        lengthLimiter: (thickness: number, availableLength: number) => number,
        contactTolerance = 0.02,
        extraDelimiters: RawGeometry[] = []
    ): WallFusionResult[] {
        const allWalls = [...mainWalls, ...transverseWalls, ...extraDelimiters];

        return mainWalls.map((reference) => {
            const contacts = ContactDetector.findContacts(reference, transverseWalls, contactTolerance);

            const specs: FusionContactSpec[] = contacts.map((contact) => ({
                geometry: contact.candidate,
                lengthLimiter,
            }));

            const polygons = GeometryFuser.fuseAtContactPoint(reference, specs, allWalls);

            return { reference, contactCount: contacts.length, polygons };
        });
    }

    static fuseAllWithEndSections(
        mainWalls: RawGeometry[],
        transverseWalls: RawGeometry[],
        endElements: RawGeometry[],
        eligibleHandles: Set<string>,
        lengthLimiter: (thickness: number, availableLength: number) => number,
        transformationFactor: number,
        contactTolerance = 0.02,
        endTolerance = 0.02
    ): WallFusionResult[] {
        const eligible = endElements.filter((e) => eligibleHandles.has(e.handle));

        const fusionResults = this.fuseAll(mainWalls, transverseWalls, lengthLimiter, contactTolerance, endElements);
        return fusionResults.map((result) => {
            // Frame local calculado UNA vez por muro y reusado en todas
            // las llamadas de detección/construcción para este resultado.
            const frame: LocalFrame = computeLocalFrame(result.reference);

            const matches = [
                ...EndElementDetector.findAtEnds(result.reference, eligible, endTolerance, frame),
                ...EndElementDetector.findInterior(result.reference, eligible, endTolerance, frame),
            ];
            if (matches.length === 0) return result;

            let polygons = result.polygons;
            const transformedPolygons: Ring[] = [];

            for (const match of matches) {
                const nearbyTransverse = this.findTransverseAt(
                    result.reference,
                    transverseWalls,
                    match,
                    contactTolerance,
                    frame
                );

                let adjacency: AdjacentTransverse;
                let occupiedSide: 'positive' | 'negative' | undefined;

                if (nearbyTransverse.length === 0) {
                    adjacency = 'none';
                } else if (nearbyTransverse.length === 1) {
                    adjacency = 'oneSide';
                    occupiedSide = TransformedSectionBuilder.resolveOccupiedSide(
                        result.reference,
                        nearbyTransverse[0],
                        frame
                    );
                } else {
                    adjacency = 'bothSides';
                }

                const { polygon } = TransformedSectionBuilder.build(
                    result.reference,
                    match,
                    adjacency,
                    occupiedSide,
                    { transformationFactor },
                    frame
                );

                transformedPolygons.push(polygon);
            }

            if (transformedPolygons.length > 0) {
                polygons = PolygonOps.unionAll([
                    ...polygons,
                    ...transformedPolygons
                ]);
            }

            return { ...result, polygons };
        });
    }

    private static findTransverseAt(
        reference: RawGeometry,
        transverseWalls: RawGeometry[],
        match: EndElementMatch,
        tolerance: number,
        frame?: LocalFrame
    ): RawGeometry[] {
        const contacts = ContactDetector.findContacts(reference, transverseWalls, tolerance);
        const f = frame ?? computeLocalFrame(reference);
        const refBox = f.refBox;

        const isIntermediate = match.end === 'intermediate';
        const edgeX = match.end === 'start' ? refBox.xMin : refBox.xMax;

        return contacts
            .map((c) => c.candidate)
            .filter((candidate) => {
                const box = toLocalBox(f, candidate);

                if (isIntermediate) {
                    return box.xMax >= match.localXMin - tolerance
                        && box.xMin <= match.localXMax + tolerance;
                }

                const candidateEdge = match.end === 'start' ? box.xMin : box.xMax;
                return Math.abs(candidateEdge - edgeX) <= match.thickness + tolerance;
            });
    }
}