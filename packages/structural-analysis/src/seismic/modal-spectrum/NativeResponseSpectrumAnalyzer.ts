import type { OpenSeesNativeSession } from 'openseesjs';
import { combineModalVectors } from './ModalResponseCombiner.js';
import type {
  CombinedSpectrumResponse,
  ModalCombinationOptions,
  ModalSpectrumResponse,
  NativeResponseSpectrumOptions,
  NativeResponseSpectrumResult,
  ResponseSpectrumDefinition,
} from './types.js';

type ResponseRecord = Readonly<Record<number, readonly number[]>>;

export class NativeResponseSpectrumAnalyzer {
  public constructor(private readonly session: OpenSeesNativeSession) { }

  public analyze(options: NativeResponseSpectrumOptions): NativeResponseSpectrumResult {
    validateOptions(options);
    const eigenvalues = options.eigenSolver === undefined
      ? this.session.query.eigen(options.numberOfModes)
      : this.session.query.eigen(options.eigenSolver, options.numberOfModes);
    const angularFrequencies = eigenvalues.map(Math.sqrt);
    const periods = angularFrequencies.map(omega => 2 * Math.PI / omega);
    const modalProperties = this.session.query.modalProperties();
    const spectrum = typeof options.spectrum === 'function'
      ? options.spectrum(periods)
      : options.spectrum;
    validateSpectrum(spectrum);
    this.session.ops.timeSeries('Path', spectrum.tag, [
      '-time', spectrum.periods,
      '-values', spectrum.accelerations,
    ]);
    const modes = eigenvalues.map((_, index) => this.captureMode(index + 1, options, spectrum.tag));
    const combination = options.combination ?? { method: 'SRSS' };
    return {
      eigenvalues,
      angularFrequencies,
      periods,
      modalProperties,
      modes,
      combined: combineResponses(modes, angularFrequencies, combination),
    };
  }

  private captureMode(
    mode: number,
    options: NativeResponseSpectrumOptions,
    spectrumTag: number,
  ): ModalSpectrumResponse {
    this.session.ops.responseSpectrumAnalysis(spectrumTag, options.direction, '-mode', mode);
    const reactionTags = options.reactionNodeTags ?? [];
    if (reactionTags.length > 0) this.session.ops.reactions();
    return {
      mode,
      nodeDisplacements: this.session.query.nodeDisplacements(options.nodeTags ?? []),
      nodeReactions: this.session.query.nodeReactions(reactionTags),
      elementForces: this.session.query.elementForces(options.elementTags ?? []),
    };
  }
}

function combineResponses(
  modes: readonly ModalSpectrumResponse[],
  angularFrequencies: readonly number[],
  options: ModalCombinationOptions,
): CombinedSpectrumResponse {
  return {
    method: options.method,
    nodeDisplacements: combineRecords(modes.map(mode => mode.nodeDisplacements), angularFrequencies, options),
    nodeReactions: combineRecords(modes.map(mode => mode.nodeReactions), angularFrequencies, options),
    elementForces: combineRecords(modes.map(mode => mode.elementForces), angularFrequencies, options),
  };
}

function combineRecords(
  records: readonly ResponseRecord[],
  angularFrequencies: readonly number[],
  options: ModalCombinationOptions,
): ResponseRecord {
  const tags = Object.keys(records[0] ?? {}).map(Number);
  return Object.fromEntries(tags.map(tag => [
    tag,
    combineModalVectors(records.map(record => record[tag]!), angularFrequencies, options),
  ]));
}

function validateOptions(options: NativeResponseSpectrumOptions): void {
  if (!Number.isInteger(options.numberOfModes) || options.numberOfModes < 1) {
    throw new Error('numberOfModes must be a positive integer.');
  }
  if (!Number.isInteger(options.direction) || options.direction < 1 || options.direction > 6) {
    throw new Error('direction must be an integer from 1 to 6.');
  }
  if (typeof options.spectrum !== 'function') validateSpectrum(options.spectrum);
}

function validateSpectrum(spectrum: ResponseSpectrumDefinition): void {
  const { periods, accelerations } = spectrum;
  if (periods.length < 2 || periods.length !== accelerations.length) {
    throw new Error('Spectrum periods and accelerations require equal lengths of at least two.');
  }
  if (periods.some((period, index) => period < 0 || (index > 0 && period <= periods[index - 1]!))) {
    throw new Error('Spectrum periods must be non-negative and strictly increasing.');
  }
  if (accelerations.some(value => !Number.isFinite(value))) {
    throw new Error('Spectrum accelerations must be finite numbers.');
  }
}
