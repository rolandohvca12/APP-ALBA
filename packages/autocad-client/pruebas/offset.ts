import ClipperLib from "clipper-lib";

export interface IPoint2 {
    x: number;
    y: number;
}

export type OffsetDirection = "inside" | "outside";

export async function offset(
    points: IPoint2[],
    length: number,
    direction: OffsetDirection
): Promise<IPoint2[]> {

    const SCALE = 1e6;
    const EPS = 1e-10;

    if (!Number.isFinite(length) || length < 0) {
        throw new RangeError("Invalid offset distance");
    }

    if (points.length < 3) {
        return [];
    }

    const same = (a: IPoint2, b: IPoint2): boolean => {

        return Math.hypot(
            a.x - b.x,
            a.y - b.y
        ) <= EPS;

    };

    // Eliminar puntos consecutivos duplicados

    const polygon: IPoint2[] = [];

    for (const point of points) {

        if (
            !Number.isFinite(point.x) ||
            !Number.isFinite(point.y)
        ) {
            throw new RangeError(
                "Invalid polygon coordinates"
            );
        }

        const previous = polygon[polygon.length - 1];

        if (previous && same(previous, point)) {
            continue;
        }

        polygon.push({ ...point });
    }

    // Eliminar el último punto si repite el primero

    if (
        polygon.length > 1 &&
        same(polygon[0], polygon[polygon.length - 1])
    ) {
        polygon.pop();
    }

    if (polygon.length < 3) {
        return [];
    }

    // Offset cero: devolver geometría original

    if (length === 0) {
        return polygon;
    }

    // Convertir coordenadas a enteros para Clipper

    const path: ClipperLib.Path = polygon.map(point => {

        const X = Math.round(point.x * SCALE);
        const Y = Math.round(point.y * SCALE);

        if (
            !Number.isSafeInteger(X) ||
            !Number.isSafeInteger(Y)
        ) {
            throw new RangeError(
                "Coordinates exceed safe integer precision"
            );
        }

        return { X, Y };

    });

    // Eliminar segmentos que colapsan al redondear

    const cleanPath: ClipperLib.Path = [];

    for (const point of path) {

        const previous = cleanPath[cleanPath.length - 1];

        if (
            previous &&
            previous.X === point.X &&
            previous.Y === point.Y
        ) {
            continue;
        }

        cleanPath.push(point);
    }

    if (
        cleanPath.length > 1 &&
        cleanPath[0].X === cleanPath[cleanPath.length - 1].X &&
        cleanPath[0].Y === cleanPath[cleanPath.length - 1].Y
    ) {
        cleanPath.pop();
    }

    if (cleanPath.length < 3) {
        return [];
    }

    // Verificar área inicial

    const initialArea = Math.abs(
        ClipperLib.Clipper.Area(cleanPath)
    );

    if (initialArea <= 1) {
        return [];
    }

    // Normalizar orientación del polígono

    if (!ClipperLib.Clipper.Orientation(cleanPath)) {
        cleanPath.reverse();
    }

    // Exterior positivo, interior negativo

    const delta = (
        direction === "outside"
            ? length
            : -length
    ) * SCALE;

    // Crear algoritmo de offset

    const clipper = new ClipperLib.ClipperOffset(
        2.0,
        0.25 * SCALE
    );

    clipper.AddPath(
        cleanPath,
        ClipperLib.JoinType.jtMiter,
        ClipperLib.EndType.etClosedPolygon
    );

    // Ejecutar offset

    const solution: ClipperLib.Paths = [];

    clipper.Execute(solution, delta);

    // Geometría colapsada

    if (solution.length === 0) {
        return [];
    }

    // Seleccionar el polígono de mayor área

    let largest: ClipperLib.Path | null = null;

    let maxArea = 0;

    for (const candidate of solution) {

        if (candidate.length < 3) {
            continue;
        }

        const area = Math.abs(
            ClipperLib.Clipper.Area(candidate)
        );

        if (area > maxArea) {

            maxArea = area;

            largest = candidate;

        }
    }

    if (!largest || maxArea <= 1) {
        return [];
    }

    // Convertir a coordenadas originales

    const result: IPoint2[] = largest.map(point => ({
        x: point.X / SCALE,
        y: point.Y / SCALE
    }));
    return new Promise<IPoint2[]>((resolve, reject) => {
        resolve(result);
    });
}