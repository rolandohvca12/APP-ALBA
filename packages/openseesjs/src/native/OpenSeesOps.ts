import { OpenSeesNativeCommands, OpenSeesNativeSession } from './OpenSeesNativeSession.js';
import { OpenSeesNativeQueries } from './OpenSeesNativeQueries.js';
import type { OpenSeesNativeSessionOptions } from './types.js';
import { createVariantCommand } from '../openseespy/createVariantCommand.js';
import { OPEN_SEES_VARIANT_COMMANDS } from '../openseespy/generated/OpenSeesPyApi.generated.js';

const variantCommandNames = new Set<string>(OPEN_SEES_VARIANT_COMMANDS);

export type OpenSeesOps =
  & Omit<OpenSeesNativeCommands, keyof OpenSeesNativeQueries>
  & OpenSeesNativeQueries
  & { dispose(): void };

/**
 * Creates an OpenSeesPy-style facade. The native session is opened on the
 * first command and remains reusable until `dispose()` is called.
 */
export function createOpenSeesOps(options: OpenSeesNativeSessionOptions = {}): OpenSeesOps {
  let session: OpenSeesNativeSession | undefined;
  const getSession = () => session ??= new OpenSeesNativeSession(options);
  const methods = new Map<string, (...args: unknown[]) => unknown>();

  let facade: OpenSeesOps;
  facade = new Proxy({}, {
    get(_target, property) {
      if (property === 'dispose') {
        return () => {
          session?.close();
          session = undefined;
        };
      }
      if (typeof property !== 'string') return undefined;
      const cached = methods.get(property);
      if (cached !== undefined) return cached;
      const invoke = (args: readonly unknown[]) => {
        const current = getSession();
        const isQuery = property in OpenSeesNativeQueries.prototype;
        const owner = isQuery ? current.query : current.ops;
        const value = Reflect.get(owner, property);
        if (typeof value !== 'function') return value;
        const result = Reflect.apply(value, owner, args);
        return result === current.ops ? facade : result;
      };
      const method = variantCommandNames.has(property)
        ? createVariantCommand<unknown, unknown>(invoke)
        : (...args: unknown[]) => invoke(args);
      methods.set(property, method);
      return method;
    },
  }) as OpenSeesOps;
  return facade;
}

/** Default lazy facade. Most applications only need `import { ops }`. */
export const ops = createOpenSeesOps();

process.once('exit', () => ops.dispose());
