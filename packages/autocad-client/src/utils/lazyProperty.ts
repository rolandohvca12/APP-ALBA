/**
 * defineLazyProperty
 * -------------------
 * Define una propiedad de solo lectura en `target` que se calcula la
 * PRIMERA vez que se accede a ella (no al crear el objeto), y queda
 * memoizada para lecturas posteriores. Útil para campos costosos
 * (ej. rx/ry, que involucran raíz cuadrada u otros cálculos) que no
 * siempre se necesitan — por ejemplo, si una fila nunca se imprime ni
 * se usa para ordenar por ese campo, el cálculo nunca se ejecuta.
 */
export function defineLazyProperty<T extends object, K extends PropertyKey, V>(
    target: T,
    key: K,
    compute: () => V
): T & Record<K, V> {
    let cached: V | undefined;
    let computed = false;

    Object.defineProperty(target, key, {
        enumerable: true,
        configurable: true,
        get(): V {
            if (!computed) {
                cached = compute();
                computed = true;
            }
            return cached as V;
        },
    });

    return target as T & Record<K, V>;
}