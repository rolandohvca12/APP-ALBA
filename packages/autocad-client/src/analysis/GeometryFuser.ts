import { type RawGeometry } from '../cad/AutoCadQueryClient.js';
import { PolygonOps, type Ring } from './PolygonOps.js';
import {
    toRing,
    boundingBox,
    mainAxisAngle,
    centroid,
    rotateRing,
    axisProtrusion,
    localAxis,
    firstDelimiterDistance,
    thicknessOf,
    epsilonFor,
} from './geometryMath.js';

export interface FusionContactSpec {
    geometry: RawGeometry;
    lengthLimiter: (thickness: number, availableLength: number) => number;
}

type Side = 'left' | 'right' | 'top' | 'bottom';

interface SideSpec {
    side: Side;
    available: number;
    border: number;
    direction: 'positive' | 'negative';
}

/**
 * GeometryFuser
 * -------------
 * Única responsabilidad: fusionar una referencia con N contactos.
 * `delimiters` limita cada contacto por el primer delimitador que lo
 * cruce, medido desde el punto de contacto hacia afuera.
 */
export class GeometryFuser {
    static fuseAtContactPoint(
        reference: RawGeometry,
        contacts: FusionContactSpec[],
        delimiters: RawGeometry[] = []
    ): Ring[] {
        const refRing = toRing(reference);
        const angle = mainAxisAngle(refRing);
        const pivot = centroid(refRing);

        const localRef = rotateRing(refRing, -angle, pivot);
        const localRefBox = boundingBox(localRef);

        // Se rota una sola vez y se excluye la referencia una sola vez
        // (antes esa comparación se repetía dentro del filtro de cada
        // contacto, aunque el resultado nunca cambia entre contactos).
        const referenceHandle = reference.handle;
        const delimiterEntries = delimiters
            .filter((d) => d.handle !== referenceHandle)
            .map((d) => ({ handle: d.handle, ring: rotateRing(toRing(d), -angle, pivot) }));

        // Se recolectan todas las piezas de todos los contactos y se
        // unen en UNA sola llamada a PolygonOps.unionAll al final, en
        // vez de ir uniendo pieza por pieza contra `result` (que puede
        // tener más de un ring intermedio y dejarlos solapados en vez
        // de fusionados — ver el comentario en PolygonOps.unionAll).
        const pieces: Ring[] = [];

        for (const spec of contacts) {
            const contactRingGlobal = toRing(spec.geometry);
            const thickness = thicknessOf(contactRingGlobal);

            const localContact = rotateRing(contactRingGlobal, -angle, pivot);
            const axis = localAxis(localContact);
            const protrusion = axisProtrusion(localRef, localContact, axis);

            const ownDelimiters = delimiterEntries
                .filter((e) => e.handle !== spec.geometry.handle)
                .map((e) => e.ring);

            const sides: SideSpec[] = [];
            if (axis === 'x') {
                if (protrusion.positive > 1e-9) sides.push({ side: 'right', available: protrusion.positive, border: localRefBox.xMax, direction: 'positive' });
                if (protrusion.negative > 1e-9) sides.push({ side: 'left', available: protrusion.negative, border: localRefBox.xMin, direction: 'negative' });
            } else {
                if (protrusion.positive > 1e-9) sides.push({ side: 'top', available: protrusion.positive, border: localRefBox.yMax, direction: 'positive' });
                if (protrusion.negative > 1e-9) sides.push({ side: 'bottom', available: protrusion.negative, border: localRefBox.yMin, direction: 'negative' });
            }

            for (const { side, available, border, direction } of sides) {
                const minGap = epsilonFor(localRefBox);
                const delimiterDistance = firstDelimiterDistance(localContact, ownDelimiters, axis, direction, border, minGap);
                const cappedAvailable = Math.min(available, delimiterDistance);

                console.log(
                    `  [debug] handle=${spec.geometry.handle} side=${side} available=${available.toFixed(3)} delimitador_a=${delimiterDistance === Infinity ? '∞' : delimiterDistance.toFixed(3)} -> usado=${cappedAvailable.toFixed(3)}`
                );

                const extraLength = spec.lengthLimiter(thickness, cappedAvailable);
                const clipped = clipBySide(localContact, side, localRefBox, extraLength);

                pieces.push(...clipped);
            }
        }

        const result = pieces.length > 0
            ? PolygonOps.unionAll([localRef, ...pieces])
            : [localRef];

        return result.map((ring) => rotateRing(ring, angle, pivot));
    }
}

function clipBySide(ring: Ring, side: Side, box: ReturnType<typeof boundingBox>, extraLength: number): Ring[] {
    const epsilon = epsilonFor(box);

    switch (side) {
        case 'right': return PolygonOps.clipToBand(ring, 'x', box.xMax - epsilon, box.xMax + extraLength);
        case 'left': return PolygonOps.clipToBand(ring, 'x', box.xMin - extraLength, box.xMin + epsilon);
        case 'top': return PolygonOps.clipToBand(ring, 'y', box.yMax - epsilon, box.yMax + extraLength);
        case 'bottom': return PolygonOps.clipToBand(ring, 'y', box.yMin - extraLength, box.yMin + epsilon);
    }
}