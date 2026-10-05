export type SortDirection = 'asc' | 'desc';

export function sortRows<T, K extends keyof T>(
    rows: T[],
    key: K,
    direction: SortDirection = 'asc'
): T[] {
    const factor = direction === 'asc' ? 1 : -1;

    return [...rows].sort((a, b) => {
        const va = a[key];
        const vb = b[key];

        if (typeof va === 'string' && typeof vb === 'string') {
            return va.localeCompare(vb, undefined, { numeric: true, sensitivity: 'base' }) * factor;
        }
        if (typeof va === 'number' && typeof vb === 'number') {
            return (va - vb) * factor;
        }
        return 0;
    });
}