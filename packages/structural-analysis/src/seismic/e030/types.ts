import type { UnitFor } from '@app-alba/engineering-units';
import type {
  E030SeismicZone,
  E030SoilProfile,
  Measure,
  PredominantMaterial,
  RuleResult,
} from '@app-alba/peru-rne';
import type { OpenSeesEigenSolver } from 'openseesjs';
import type { NativeResponseSpectrumResult } from '../modal-spectrum/types.js';

export type E030HorizontalDirection = 'x' | 'y';
export type E030ModalCombination = 'CQC' | 'ALTERNATIVE';

export interface E030SpectrumStory {
  readonly id: string;
  readonly nodeTag: number;
  readonly height: Measure<'length'>;
}

export interface E030NativeSpectrumInput {
  readonly direction: E030HorizontalDirection;
  readonly zone: E030SeismicZone;
  readonly soilProfile: E030SoilProfile;
  readonly vs30Mps?: number;
  readonly useFactor: number;
  readonly reductionFactor: number;
  readonly seismicWeight: Measure<'force'>;
  readonly regular: boolean;
  readonly predominantMaterial: PredominantMaterial;
  readonly numberOfModes: number;
  readonly eigenSolver?: OpenSeesEigenSolver;
  readonly spectrumTag: number;
  readonly forceUnit: UnitFor<'force'>;
  readonly lengthUnit: UnitFor<'length'>;
  readonly accelerationUnit: UnitFor<'acceleration'>;
  readonly stories: readonly E030SpectrumStory[];
  readonly supportNodeTags: readonly number[];
  readonly elementTags?: readonly number[];
  readonly combination?: E030ModalCombination;
  readonly dampingRatio?: number;
}

export interface E030StorySpectrumResult {
  readonly storyId: string;
  readonly elasticDrift: number;
  readonly amplifiedDrift: number;
  readonly driftRatio: number;
  readonly check: RuleResult;
}

export interface E030BaseShearResult {
  readonly modalValues: readonly number[];
  readonly dynamic: number;
  readonly static: number;
  readonly requiredMinimum: number;
  readonly scaleFactor: number;
  readonly unit: UnitFor<'force'>;
}

export interface E030NativeSpectrumResult {
  readonly direction: E030HorizontalDirection;
  readonly spectrum: NativeResponseSpectrumResult;
  readonly effectiveMassRatio: number;
  readonly modalMassCompliant: boolean;
  readonly baseShear: E030BaseShearResult;
  readonly stories: readonly E030StorySpectrumResult[];
  readonly designNodeReactions: Readonly<Record<number, readonly number[]>>;
  readonly designElementForces: Readonly<Record<number, readonly number[]>>;
}

export interface E030DirectionEnvelope {
  readonly direction: E030HorizontalDirection;
  readonly cases: readonly E030NativeSpectrumResult[];
  readonly storyDriftRatios: Readonly<Record<string, number>>;
  readonly nodeReactions: Readonly<Record<number, readonly number[]>>;
  readonly elementForces: Readonly<Record<number, readonly number[]>>;
}

export interface E030BidirectionalCombination {
  readonly xEnvelope: E030DirectionEnvelope;
  readonly yEnvelope: E030DirectionEnvelope;
  readonly storyDriftRatios: Readonly<Record<string, number>>;
  readonly nodeReactions: Readonly<Record<number, readonly number[]>>;
  readonly elementForces: Readonly<Record<number, readonly number[]>>;
}
