import type { OpenSeesPyArgument } from '../openseespy/types.js';
import { flattenNativeArguments } from './flattenArguments.js';
import { invokeNative } from './OpenSeesCommandError.js';
import type { OpenSeesNativeBindingSession, OpenSeesNativeScalar, OpenSeesNativeValue, OpenSeesPackedWidth } from './types.js';

export type OpenSeesEigenSolver =
  | '-genBandArpack'
  | '-symmBandLapack'
  | '-fullGenLapack';

export type OpenSeesModalProperties = Readonly<Record<string, number | readonly number[]>>;
export type OpenSeesResponseRecord = Readonly<Record<number, readonly number[]>>;

export interface OpenSeesElementEndForces2D {
  readonly axial: number;
  readonly shear: number;
  readonly moment: number;
}

export interface OpenSeesElementLocalForces2D {
  readonly i: OpenSeesElementEndForces2D;
  readonly j: OpenSeesElementEndForces2D;
  readonly raw: readonly number[];
}

export interface OpenSeesModalResult {
  readonly mode: number;
  readonly eigenvalue: number;
  readonly omega: number;
  readonly frequency: number;
  readonly period: number;
}

export interface OpenSeesDomainSnapshot {
  readonly ndm: 1 | 2 | 3;
  readonly nodeTags: Int32Array;
  /** XYZ coordinates packed as three values per node. */
  readonly coordinates: Float64Array;
  readonly elementTags: Int32Array;
  readonly elementTypes: readonly string[];
  /** CSR-style connectivity. Element i occupies offsets[i]..offsets[i + 1]. */
  readonly connectivity: Int32Array;
  readonly connectivityOffsets: Int32Array;
  readonly fixedNodeTags: Int32Array;
  /** CSR-style restrained DOFs corresponding to fixedNodeTags. */
  readonly fixedDofs: Int32Array;
  readonly fixedDofOffsets: Int32Array;
}

export class OpenSeesNativeQueries {
  public constructor(private readonly session: OpenSeesNativeBindingSession) { }

  analyze(numIncr = 1, dt?: number, dtMin?: number, dtMax?: number, jd?: number): number {
    return this.number('analyze', numIncr, dt, dtMin, dtMax, jd);
  }

  getTime(): number { return this.number('getTime'); }
  getLoadFactor(patternTag: number): number { return this.number('getLoadFactor', patternTag); }
  getNodeTags(meshTag?: number): number[] { return this.numbers('getNodeTags', meshTag === undefined ? undefined : { mesh: meshTag }); }
  getEleTags(meshTag?: number): number[] { return this.numbers('getEleTags', meshTag === undefined ? undefined : { mesh: meshTag }); }
  eleNodes(eleTag: number): number[] { return this.numericArray('eleNodes', eleTag); }
  eleType(eleTag: number): string {
    const value = this.call('eleType', [eleTag]);
    if (typeof value !== 'string') throw resultTypeError('eleType', 'string', value);
    return value;
  }
  getFixedNodes(): number[] { return this.numericArray('getFixedNodes'); }
  getFixedDOFs(nodeTag: number): number[] { return this.numericArray('getFixedDOFs', nodeTag); }
  nodeCoord(nodeTag: number): number[];
  nodeCoord(nodeTag: number, dimension: number): number;
  nodeCoord(nodeTag: number, dimension?: number): number | number[] {
    return dimension === undefined ? this.numbers('nodeCoord', nodeTag) : this.number('nodeCoord', nodeTag, dimension);
  }
  nodeDisp(nodeTag: number): number[];
  nodeDisp(nodeTag: number, dof: number): number;
  nodeDisp(nodeTag: number, dof?: number): number | number[] {
    return dof === undefined ? this.numbers('nodeDisp', nodeTag) : this.number('nodeDisp', nodeTag, dof);
  }
  nodeVel(nodeTag: number): number[];
  nodeVel(nodeTag: number, dof: number): number;
  nodeVel(nodeTag: number, dof?: number): number | number[] {
    return dof === undefined ? this.numbers('nodeVel', nodeTag) : this.number('nodeVel', nodeTag, dof);
  }
  nodeAccel(nodeTag: number): number[];
  nodeAccel(nodeTag: number, dof: number): number;
  nodeAccel(nodeTag: number, dof?: number): number | number[] {
    return dof === undefined ? this.numbers('nodeAccel', nodeTag) : this.number('nodeAccel', nodeTag, dof);
  }
  nodeReaction(nodeTag: number): number[];
  nodeReaction(nodeTag: number, dof: number): number;
  nodeReaction(nodeTag: number, dof?: number): number | number[] {
    return dof === undefined ? this.numbers('nodeReaction', nodeTag) : this.number('nodeReaction', nodeTag, dof);
  }
  nodeDisplacements(nodeTags: readonly number[]): OpenSeesResponseRecord {
    return this.vectorRecord('nodeDisp', nodeTags);
  }
  nodeReactions(nodeTags: readonly number[]): OpenSeesResponseRecord {
    return this.vectorRecord('nodeReaction', nodeTags);
  }
  nodeDisplacementsPacked(nodeTags: Int32Array, dofs: OpenSeesPackedWidth): Float64Array {
    return this.packedVector('nodeDisp', nodeTags, dofs);
  }
  nodeVelocitiesPacked(nodeTags: Int32Array, dofs: OpenSeesPackedWidth): Float64Array {
    return this.packedVector('nodeVel', nodeTags, dofs);
  }
  nodeAccelerationsPacked(nodeTags: Int32Array, dofs: OpenSeesPackedWidth): Float64Array {
    return this.packedVector('nodeAccel', nodeTags, dofs);
  }
  nodeReactionsPacked(nodeTags: Int32Array, dofs: OpenSeesPackedWidth): Float64Array {
    return this.packedVector('nodeReaction', nodeTags, dofs);
  }
  eleResponse(eleTag: number, response: readonly OpenSeesPyArgument[]): number[] {
    return this.numbers('eleResponse', eleTag, response);
  }
  eleForce(eleTag: number): number[];
  eleForce(eleTag: number, dof: number): number;
  eleForce(eleTag: number, dof?: number): number | number[] {
    return dof === undefined ? this.numbers('eleForce', eleTag) : this.number('eleForce', eleTag, dof);
  }
  elementForces(elementTags: readonly number[]): OpenSeesResponseRecord {
    return this.vectorRecord('eleForce', elementTags);
  }
  elementForcesPacked(elementTags: Int32Array, components: number): Float64Array {
    return this.packedVector('eleForce', elementTags, components);
  }
  elementResponsesPacked(
    elementTags: Int32Array,
    components: number,
    response: readonly OpenSeesPyArgument[],
  ): Float64Array {
    return this.packedVector('eleResponse', elementTags, components, flattenNativeArguments(response));
  }
  elementResponses(
    elementTags: readonly number[],
    response: readonly OpenSeesPyArgument[],
  ): OpenSeesResponseRecord {
    const flattened = flattenNativeArguments(response);
    const values = this.invokeRows('eleResponse', elementTags.map(tag => [tag, ...flattened]));
    const result: Record<number, readonly number[]> = {};
    values.forEach((value, index) => {
      result[elementTags[index]!] = asNumericArray('eleResponse', value);
    });
    return result;
  }
  printA(): number;
  printA(fileFlag: '-file', filename: string): number;
  printA(retFlag: '-ret'): number[];
  printA(fileFlag: '-file', filename: string, retFlag: '-ret'): number[];
  printA(...args: [] | ['-ret'] | ['-file', string] | ['-file', string, '-ret']): number | number[] {
    return args.some(argument => argument === '-ret')
      ? this.numbers('printA', ...args)
      : this.number('printA', ...args);
  }
  printB(): number;
  printB(fileFlag: '-file', filename: string): number;
  printB(retFlag: '-ret'): number[];
  printB(fileFlag: '-file', filename: string, retFlag: '-ret'): number[];
  printB(...args: [] | ['-ret'] | ['-file', string] | ['-file', string, '-ret']): number | number[] {
    return args.some(argument => argument === '-ret')
      ? this.numbers('printB', ...args)
      : this.number('printB', ...args);
  }
  elementLocalForces2D(eleTag: number): OpenSeesElementLocalForces2D {
    const raw = this.eleResponse(eleTag, ['localForce']);
    if (raw.length < 6) throw resultTypeError('eleResponse localForce', 'at least six values', raw);
    return {
      i: { axial: raw[0]!, shear: raw[1]!, moment: raw[2]! },
      j: { axial: raw[3]!, shear: raw[4]!, moment: raw[5]! },
      raw,
    };
  }
  eigen(numModes: number): number[];
  eigen(solver: OpenSeesEigenSolver, numModes: number): number[];
  eigen(solverOrModes: OpenSeesEigenSolver | number, numModes?: number): number[] {
    return typeof solverOrModes === 'number'
      ? this.numbers('eigen', solverOrModes)
      : this.numbers('eigen', solverOrModes, numModes);
  }
  modalResults(numModes: number, solver: OpenSeesEigenSolver = '-genBandArpack'): OpenSeesModalResult[] {
    return this.eigen(solver, numModes).map((eigenvalue, index) => {
      const omega = Math.sqrt(eigenvalue);
      const frequency = omega / (2 * Math.PI);
      return {
        mode: index + 1,
        eigenvalue,
        omega,
        frequency,
        period: frequency === 0 ? Number.POSITIVE_INFINITY : 1 / frequency,
      };
    });
  }
  nodeEigenvector(nodeTag: number, mode: number): number[];
  nodeEigenvector(nodeTag: number, mode: number, dof: number): number;
  nodeEigenvector(nodeTag: number, mode: number, dof?: number): number | number[] {
    return dof === undefined
      ? this.numbers('nodeEigenvector', nodeTag, mode)
      : this.number('nodeEigenvector', nodeTag, mode, dof);
  }
  nodeEigenvectors(nodeTags: readonly number[], mode: number): OpenSeesResponseRecord {
    const values = this.invokeRows('nodeEigenvector', nodeTags.map(tag => [tag, mode]));
    const result: Record<number, readonly number[]> = {};
    values.forEach((value, index) => {
      result[nodeTags[index]!] = asNumericArray('nodeEigenvector', value);
    });
    return result;
  }
  domainSnapshot(): OpenSeesDomainSnapshot {
    const nodeTags = this.getNodeTags();
    const elementTags = this.getEleTags();
    const coordinateRows = this.invokeRows('nodeCoord', nodeTags.map(tag => [tag]));
    const connectivityRows = this.invokeRows('eleNodes', elementTags.map(tag => [tag]));
    const typeRows = this.invokeRows('eleType', elementTags.map(tag => [tag]));
    const fixedNodeTags = this.getFixedNodes();
    const fixedRows = this.invokeRows('getFixedDOFs', fixedNodeTags.map(tag => [tag]));

    let ndm: 1 | 2 | 3 = 1;
    const coordinates = new Float64Array(nodeTags.length * 3);
    coordinateRows.forEach((value, index) => {
      const row = asNumericArray('nodeCoord', value);
      ndm = Math.max(ndm, Math.min(row.length, 3)) as 1 | 2 | 3;
      coordinates.set(row.slice(0, 3), index * 3);
    });

    const connectivity = packIntegerRows('eleNodes', connectivityRows);
    const fixed = packIntegerRows('getFixedDOFs', fixedRows);
    const elementTypes = typeRows.map(value => {
      if (typeof value !== 'string') throw resultTypeError('eleType', 'string', value);
      return value;
    });

    return {
      ndm,
      nodeTags: Int32Array.from(nodeTags),
      coordinates,
      elementTags: Int32Array.from(elementTags),
      elementTypes,
      connectivity: connectivity.values,
      connectivityOffsets: connectivity.offsets,
      fixedNodeTags: Int32Array.from(fixedNodeTags),
      fixedDofs: fixed.values,
      fixedDofOffsets: fixed.offsets,
    };
  }
  modalProperties(): OpenSeesModalProperties;
  modalProperties(printFlag: '-print'): OpenSeesModalProperties;
  modalProperties(fileFlag: '-file', reportFileName: string): OpenSeesModalProperties;
  modalProperties(unormFlag: '-unorm'): OpenSeesModalProperties;
  modalProperties(fileFlag: '-file', reportFileName: string, unormFlag: '-unorm'): OpenSeesModalProperties;
  modalProperties(printFlag: '-print', fileFlag: '-file', reportFileName: string, unormFlag?: '-unorm'): OpenSeesModalProperties;
  modalProperties(...flags: OpenSeesPyArgument[]): OpenSeesModalProperties {
    const value = this.call('modalProperties', [...flags, '-return']);
    if (!Array.isArray(value) || value.length % 2 !== 0) {
      throw resultTypeError('modalProperties', 'Tcl dictionary', value);
    }

    const properties: Record<string, number | readonly number[]> = {};
    for (let index = 0; index < value.length; index += 2) {
      const key = value[index];
      const entry = value[index + 1];
      if (typeof key !== 'string' || !isNumericValue(entry)) {
        throw resultTypeError('modalProperties', 'numeric Tcl dictionary', value);
      }
      properties[key] = entry;
    }
    return properties;
  }
  version(): string {
    const value = this.call('version');
    if (typeof value !== 'string') throw resultTypeError('version', 'string', value);
    return value;
  }

  /** Escape hatch tipado para resultados todavía no especializados. */
  call(command: string, args: readonly OpenSeesPyArgument[] = []): OpenSeesNativeValue {
    const flattened = flattenNativeArguments(args);
    return invokeNative(() => this.session.invoke(command, flattened), command, flattened) as OpenSeesNativeValue;
  }

  private number(command: string, ...args: OpenSeesPyArgument[]): number {
    const value = this.call(command, args);
    if (typeof value !== 'number') throw resultTypeError(command, 'number', value);
    return value;
  }

  private numbers(command: string, ...args: OpenSeesPyArgument[]): number[] {
    const value = this.call(command, args);
    if (!Array.isArray(value) || !value.every((item) => typeof item === 'number')) {
      throw resultTypeError(command, 'number[]', value);
    }
    return value as number[];
  }

  private numericArray(command: string, ...args: OpenSeesPyArgument[]): number[] {
    return asNumericArray(command, this.call(command, args));
  }

  private invokeRows(
    command: string,
    rows: readonly (readonly OpenSeesNativeScalar[])[],
  ): readonly OpenSeesNativeValue[] {
    if (this.session.invokeMany) {
      return invokeNative(() => this.session.invokeMany!(command, rows), command, []) as readonly OpenSeesNativeValue[];
    }
    return rows.map((row, index) =>
      invokeNative(() => this.session.invoke(command, row), command, row, index) as OpenSeesNativeValue);
  }

  private vectorRecord(command: string, tags: readonly number[]): OpenSeesResponseRecord {
    const rows = tags.map(tag => [tag] as const);
    const values = this.session.invokeMany === undefined
      ? rows.map((row, index) => invokeNative(() => this.session.invoke(command, row), command, row, index) as OpenSeesNativeValue)
      : invokeNative(() => this.session.invokeMany!(command, rows), command, []) as readonly OpenSeesNativeValue[];
    const record: Record<number, readonly number[]> = {};
    for (let index = 0; index < tags.length; index++) {
      const value = values[index];
      if (!Array.isArray(value) || !value.every(item => typeof item === 'number')) {
        throw resultTypeError(command, 'number[]', value);
      }
      record[tags[index]!] = value as readonly number[];
    }
    return record;
  }

  private packedVector(
    command: string,
    tags: Int32Array,
    width: number,
    args: readonly OpenSeesNativeScalar[] = [],
  ): Float64Array {
    if (!(tags instanceof Int32Array)) throw new TypeError(`${command} packed tags must be an Int32Array.`);
    if (!Number.isInteger(width) || width <= 0) {
      throw new RangeError(`${command} packed result width must be a positive integer.`);
    }
    if (this.session.queryPacked) {
      return invokeNative(
        () => this.session.queryPacked!(command, tags, width, args),
        command,
        args,
      ) as Float64Array;
    }

    const rows = Array.from(tags, tag => [tag, ...args] as const);
    const values = this.session.invokeMany === undefined
      ? rows.map((row, index) => invokeNative(() => this.session.invoke(command, row), command, row, index) as OpenSeesNativeValue)
      : invokeNative(() => this.session.invokeMany!(command, rows), command, []) as readonly OpenSeesNativeValue[];
    const result = new Float64Array(tags.length * width);
    for (let row = 0; row < values.length; row++) {
      const value = values[row];
      if (!Array.isArray(value) || value.length !== width || !value.every(item => typeof item === 'number')) {
        throw resultTypeError(command, `number[${width}]`, value!);
      }
      result.set(value as readonly number[], row * width);
    }
    return result;
  }
}

function asNumericArray(command: string, value: OpenSeesNativeValue): number[] {
  if (typeof value === 'number') return [value];
  if (Array.isArray(value) && value.every(item => typeof item === 'number')) return value as number[];
  if (value === null) return [];
  throw resultTypeError(command, 'number[]', value);
}

function packIntegerRows(
  command: string,
  rows: readonly OpenSeesNativeValue[],
): { readonly values: Int32Array; readonly offsets: Int32Array } {
  const normalized = rows.map(value => asNumericArray(command, value));
  const offsets = new Int32Array(normalized.length + 1);
  let size = 0;
  normalized.forEach((row, index) => {
    size += row.length;
    offsets[index + 1] = size;
  });
  const values = new Int32Array(size);
  let cursor = 0;
  for (const row of normalized) {
    values.set(row, cursor);
    cursor += row.length;
  }
  return { values, offsets };
}

function isNumericValue(value: OpenSeesNativeValue): value is number | readonly number[] {
  return typeof value === 'number'
    || (Array.isArray(value) && value.every(item => typeof item === 'number'));
}

function resultTypeError(command: string, expected: string, actual: OpenSeesNativeValue): TypeError {
  return new TypeError(`${command} returned ${JSON.stringify(actual)}; expected ${expected}.`);
}
