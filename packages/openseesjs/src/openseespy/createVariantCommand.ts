/**
 * Adds discoverable variant methods to a Tcl-style command without changing
 * its callable form. A property call simply prepends its name as argument 1.
 */
export function createVariantCommand<TArgument, TReturn>(
  invoke: (args: readonly TArgument[]) => TReturn,
): (...args: TArgument[]) => TReturn {
  const variants = new Map<string, (...args: TArgument[]) => TReturn>();
  const command = (...args: TArgument[]) => invoke(args);

  return new Proxy(command, {
    get(target, property, receiver) {
      if (typeof property !== 'string' || property in target) {
        return Reflect.get(target, property, receiver) as unknown;
      }
      const cached = variants.get(property);
      if (cached !== undefined) return cached;
      const variant = (...args: TArgument[]) => invoke([property as TArgument, ...args]);
      variants.set(property, variant);
      return variant;
    },
  });
}
