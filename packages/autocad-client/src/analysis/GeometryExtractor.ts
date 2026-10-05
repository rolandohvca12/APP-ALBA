import { type RawGeometry } from '../cad/AutoCadQueryClient.js';
import { type IGeometryInterpreter } from './IGeometryInterpreter.js';

/**
 * GeometryExtractor
 * -----------------
 * Única responsabilidad: aplicar un IGeometryInterpreter<T> sobre una lista
 * de geometrías crudas, delegando polimórficamente en canInterpret/interpret.
 * No conoce ningún tipo de elemento estructural concreto.
 */
export class GeometryExtractor {
    static extract<T>(geometries: RawGeometry[], interpreter: IGeometryInterpreter<T>): T[] {
        return geometries
            .filter((g) => interpreter.canInterpret(g))
            .map((g) => interpreter.interpret(g));
    }
}