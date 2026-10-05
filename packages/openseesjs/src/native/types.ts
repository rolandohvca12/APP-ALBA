import type { OpenSeesPyArgument } from '../openseespy/types.js';

export type OpenSeesNativeScalar = string | number | boolean | null;
export type OpenSeesPackedWidth = 1 | 2 | 3 | 4 | 5 | 6;
export type OpenSeesPackedValues = Float64Array | Int32Array;
export type OpenSeesNativeValue =
  | OpenSeesNativeScalar
  | readonly OpenSeesNativeValue[]
  | { readonly [key: string]: OpenSeesNativeValue };

export interface OpenSeesNativeBindingSession {
  invoke(command: string, args: readonly OpenSeesNativeScalar[]): OpenSeesNativeValue;
  /** Optional bulk entry point implemented by current native addons. */
  invokeMany?(
    command: string,
    args: readonly (readonly OpenSeesNativeScalar[])[],
  ): readonly OpenSeesNativeValue[];
  /** Optional write-only bulk entry point that avoids allocating discarded results. */
  invokeManyVoid?(
    command: string,
    args: readonly (readonly OpenSeesNativeScalar[])[],
  ): void;
  /** Optional zero-copy bulk entry point for homogeneous numeric commands. */
  invokePacked?(
    command: 'node' | 'mass' | 'fix' | 'load',
    tags: Int32Array,
    values: OpenSeesPackedValues,
    width: number,
  ): void;
  /** Optional contiguous Float64Array query entry point. */
  queryPacked?(
    command: string,
    tags: Int32Array,
    width: number,
    args: readonly OpenSeesNativeScalar[],
  ): Float64Array;
  close(): void;
}

export interface OpenSeesNativeBinding {
  readonly version?: string;
  createSession(): OpenSeesNativeBindingSession;
}

export interface OpenSeesNativeSessionOptions {
  /** Ruta explícita al addon `.node`. Si se omite se usa OPEN_SEES_NODE_BINDING o el prebuild del paquete. */
  readonly bindingPath?: string;
  /** Punto de extensión para pruebas o bindings compatibles. */
  readonly binding?: OpenSeesNativeBinding;
}

export type OpenSeesNativeCommandArgument = OpenSeesPyArgument;

export interface OpenSeesNativeAvailability {
  readonly available: boolean;
  readonly bindingPath: string;
  readonly reason?: string;
  readonly platform: NodeJS.Platform;
  readonly arch: string;
  readonly distribution: 'environment' | 'platform-package' | 'bundled' | 'explicit';
  readonly openSeesVersion?: string;
  readonly sourceRevision?: string;
  readonly nodeApi?: number;
}
