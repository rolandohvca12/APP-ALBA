import { type RawGeometry } from '../cad/AutoCadQueryClient.js';

/**
 * IGeometryInterpreter
 * --------------------
 * Contrato polimórfico: cada intérprete concreto decide CÓMO convertir
 * geometría cruda (RawGeometry[]) en un resultado de dominio (T), sin que
 * el código que orquesta la extracción conozca la forma concreta de T.
 */
export interface IGeometryInterpreter<T> {
    /** Filtra qué geometrías puede interpretar (p. ej. solo polilíneas cerradas de 4 vértices). */
    canInterpret(geometry: RawGeometry): boolean;

    /** Convierte UNA geometría ya filtrada en un resultado de dominio. */
    interpret(geometry: RawGeometry): T;
}