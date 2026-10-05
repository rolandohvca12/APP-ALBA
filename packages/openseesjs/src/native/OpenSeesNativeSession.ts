import {
  OPEN_SEES_PY_COMMANDS,
  OPEN_SEES_VARIANT_COMMANDS,
  type OpenSeesPyCommandMethods,
  type OpenSeesPyCommandName,
} from '../openseespy/generated/OpenSeesPyApi.generated.js';
import type { OpenSeesPyArgument } from '../openseespy/types.js';
import { createVariantCommand } from '../openseespy/createVariantCommand.js';
import { flattenNativeArguments } from './flattenArguments.js';
import { invokeNative } from './OpenSeesCommandError.js';
import { loadNativeBinding } from './OpenSeesNativeBindingLoader.js';
import { OpenSeesNativeQueries } from './OpenSeesNativeQueries.js';
import type {
  OpenSeesNativeBindingSession,
  OpenSeesNativeSessionOptions,
  OpenSeesNativeValue,
  OpenSeesPackedValues,
  OpenSeesPackedWidth,
} from './types.js';

const commandNames = new Set<string>(OPEN_SEES_PY_COMMANDS);
const variantCommandNames = new Set<string>(OPEN_SEES_VARIANT_COMMANDS);

export interface OpenSeesNativeCommands extends OpenSeesPyCommandMethods { }

export class OpenSeesNativeCommands {
  private readonly methods = new Map<string, (...args: OpenSeesPyArgument[]) => OpenSeesNativeCommands>();

  public constructor(private readonly session: OpenSeesNativeBindingSession) {
    return new Proxy(this, {
      get: (target, property, receiver) => {
        if (typeof property === 'string' && commandNames.has(property) && !(property in target)) {
          const cached = target.methods.get(property);
          if (cached !== undefined) return cached;
          const invoke = (args: readonly OpenSeesPyArgument[]) => {
            target.command(property as OpenSeesPyCommandName, args);
            return receiver;
          };
          const method = variantCommandNames.has(property)
            ? createVariantCommand<OpenSeesPyArgument, OpenSeesNativeCommands>(invoke)
            : (...args: OpenSeesPyArgument[]) => invoke(args);
          target.methods.set(property, method);
          return method;
        }
        return Reflect.get(target, property, receiver) as unknown;
      },
    });
  }

  command(name: OpenSeesPyCommandName | (string & {}), args: readonly OpenSeesPyArgument[] = []): this {
    const flattened = flattenNativeArguments(args);
    invokeNative(() => this.session.invoke(name, flattened), name, flattened);
    return this;
  }

  many(
    name: OpenSeesPyCommandName | (string & {}),
    argumentRows: readonly (readonly OpenSeesPyArgument[])[],
  ): this {
    const rows = argumentRows.map(row => flattenNativeArguments(row));
    if (this.session.invokeManyVoid) {
      invokeNative(() => this.session.invokeManyVoid!(name, rows), name, [], undefined);
    } else if (this.session.invokeMany) {
      invokeNative(() => this.session.invokeMany!(name, rows), name, [], undefined);
    } else {
      rows.forEach((row, index) =>
        invokeNative(() => this.session.invoke(name, row), name, row, index));
    }
    return this;
  }

  nodes(rows: readonly (readonly OpenSeesPyArgument[])[]): this {
    return this.many('node', rows);
  }

  elements(rows: readonly (readonly OpenSeesPyArgument[])[]): this {
    return this.many('element', rows);
  }

  loads(rows: readonly (readonly OpenSeesPyArgument[])[]): this {
    return this.many('load', rows);
  }

  /** Coordinates are row-major: `[x1, y1, x2, y2, ...]`. */
  nodesPacked(tags: Int32Array, coordinates: Float64Array, dimensions: 1 | 2 | 3): this {
    return this.packed('node', tags, coordinates, dimensions);
  }

  /** Mass values are row-major with `dofs` entries per node. */
  massesPacked(tags: Int32Array, masses: Float64Array, dofs: OpenSeesPackedWidth): this {
    return this.packed('mass', tags, masses, dofs);
  }

  /** Constraint values are row-major with `dofs` entries per node. */
  fixesPacked(tags: Int32Array, constraints: Int32Array, dofs: OpenSeesPackedWidth): this {
    return this.packed('fix', tags, constraints, dofs);
  }

  /** Load values are row-major with `dofs` entries per node. */
  loadsPacked(tags: Int32Array, loads: Float64Array, dofs: OpenSeesPackedWidth): this {
    return this.packed('load', tags, loads, dofs);
  }

  private packed(
    name: 'node' | 'mass' | 'fix' | 'load',
    tags: Int32Array,
    values: OpenSeesPackedValues,
    width: number,
  ): this {
    assertPackedShape(name, tags, values, width);
    if (this.session.invokePacked) {
      invokeNative(() => this.session.invokePacked!(name, tags, values, width), name, [], undefined);
      return this;
    }
    const rows: OpenSeesPyArgument[][] = new Array(tags.length);
    for (let row = 0; row < tags.length; row++) {
      const args: OpenSeesPyArgument[] = [tags[row]!];
      const offset = row * width;
      for (let column = 0; column < width; column++) args.push(values[offset + column]!);
      rows[row] = args;
    }
    return this.many(name, rows);
  }
}

function assertPackedShape(
  command: string,
  tags: Int32Array,
  values: OpenSeesPackedValues,
  width: number,
): void {
  if (!(tags instanceof Int32Array)) throw new TypeError(`${command} packed tags must be an Int32Array.`);
  if (!(values instanceof Float64Array) && !(values instanceof Int32Array)) {
    throw new TypeError(`${command} packed values must be a Float64Array or Int32Array.`);
  }
  if (!Number.isInteger(width) || width <= 0 || values.length !== tags.length * width) {
    throw new RangeError(`${command} packed values length must equal tags.length * width.`);
  }
}

/**
 * Sesión en proceso para el futuro addon OpenSees C++.
 * `ops` conserva las 233 firmas actuales; `query` devuelve resultados a TypeScript.
 */
export class OpenSeesNativeSession {
  private readonly bindingSession: OpenSeesNativeBindingSession;
  private closed = false;

  public readonly ops: OpenSeesNativeCommands;
  public readonly query: OpenSeesNativeQueries;

  public constructor(options: OpenSeesNativeSessionOptions = {}) {
    const binding = options.binding ?? loadNativeBinding(options.bindingPath);
    this.bindingSession = binding.createSession();
    this.ops = new OpenSeesNativeCommands(this.bindingSession);
    this.query = new OpenSeesNativeQueries(this.bindingSession);
  }

  invoke(command: string, args: readonly OpenSeesPyArgument[] = []): OpenSeesNativeValue {
    this.assertOpen();
    const flattened = flattenNativeArguments(args);
    return invokeNative(
      () => this.bindingSession.invoke(command, flattened),
      command,
      flattened,
    ) as OpenSeesNativeValue;
  }

  invokeMany(command: string, argumentRows: readonly (readonly OpenSeesPyArgument[])[]): readonly OpenSeesNativeValue[] {
    this.assertOpen();
    const rows = argumentRows.map(row => flattenNativeArguments(row));
    if (this.bindingSession.invokeMany) {
      return invokeNative(
        () => this.bindingSession.invokeMany!(command, rows),
        command,
        [],
      ) as readonly OpenSeesNativeValue[];
    }
    return rows.map((row, index) => invokeNative(
      () => this.bindingSession.invoke(command, row),
      command,
      row,
      index,
    ) as OpenSeesNativeValue);
  }

  close(): void {
    if (this.closed) return;
    this.bindingSession.close();
    this.closed = true;
  }

  [Symbol.dispose](): void {
    this.close();
  }

  private assertOpen(): void {
    if (this.closed) throw new Error('The OpenSees native session is closed.');
  }
}
