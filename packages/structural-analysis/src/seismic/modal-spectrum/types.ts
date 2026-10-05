import type { OpenSeesEigenSolver, OpenSeesModalProperties } from 'openseesjs';

export interface ResponseSpectrumDefinition {
  readonly tag: number;
  readonly periods: readonly number[];
  readonly accelerations: readonly number[];
}

export type ResponseSpectrumFactory = (
  modalPeriods: readonly number[],
) => ResponseSpectrumDefinition;

export type ModalCombinationOptions =
  | { readonly method: 'SRSS' }
  | { readonly method: 'CQC'; readonly dampingRatio: number };

export interface NativeResponseSpectrumOptions {
  readonly numberOfModes: number;
  readonly eigenSolver?: OpenSeesEigenSolver;
  readonly direction: number;
  readonly spectrum: ResponseSpectrumDefinition | ResponseSpectrumFactory;
  readonly nodeTags?: readonly number[];
  readonly reactionNodeTags?: readonly number[];
  readonly elementTags?: readonly number[];
  readonly combination?: ModalCombinationOptions;
}

export interface ModalSpectrumResponse {
  readonly mode: number;
  readonly nodeDisplacements: Readonly<Record<number, readonly number[]>>;
  readonly nodeReactions: Readonly<Record<number, readonly number[]>>;
  readonly elementForces: Readonly<Record<number, readonly number[]>>;
}

export interface CombinedSpectrumResponse {
  readonly method: ModalCombinationOptions['method'];
  readonly nodeDisplacements: Readonly<Record<number, readonly number[]>>;
  readonly nodeReactions: Readonly<Record<number, readonly number[]>>;
  readonly elementForces: Readonly<Record<number, readonly number[]>>;
}

export interface NativeResponseSpectrumResult {
  readonly eigenvalues: readonly number[];
  readonly angularFrequencies: readonly number[];
  readonly periods: readonly number[];
  readonly modalProperties: OpenSeesModalProperties;
  readonly modes: readonly ModalSpectrumResponse[];
  readonly combined: CombinedSpectrumResponse;
}
