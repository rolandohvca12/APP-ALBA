import { units } from '@app-alba/engineering-units';
import { e030_2026, forceKNValue, lengthM } from '@app-alba/peru-rne';
import type { OpenSeesNativeSession } from 'openseesjs';
import { NativeResponseSpectrumAnalyzer } from '../modal-spectrum/NativeResponseSpectrumAnalyzer.js';
import type { ModalSpectrumResponse } from '../modal-spectrum/types.js';
import type {
  E030BaseShearResult,
  E030ModalCombination,
  E030NativeSpectrumInput,
  E030NativeSpectrumResult,
  E030StorySpectrumResult,
} from './types.js';

type ResponseRecord = Readonly<Record<number, readonly number[]>>;

export class E030NativeModalSpectrumService {
  public constructor(private readonly session: OpenSeesNativeSession) { }

  public analyze(input: E030NativeSpectrumInput): E030NativeSpectrumResult {
    validateInput(input);
    const site = e030_2026.hazard.siteParameters(input.zone, input.soilProfile, input.vs30Mps);
    if (site.requiresSiteResponseAnalysis || site.soilFactor === null || site.tpSeconds === null || site.tlSeconds === null) {
      throw new Error('The selected E.030 site requires a site-specific response analysis.');
    }

    const zoneFactor = e030_2026.hazard.zoneFactor(input.zone);
    const dof = input.direction === 'x' ? 1 : 2;
    const nodeTags = input.stories.map(story => story.nodeTag);
    const spectrum = new NativeResponseSpectrumAnalyzer(this.session).analyze({
      numberOfModes: input.numberOfModes,
      ...(input.eigenSolver === undefined ? {} : { eigenSolver: input.eigenSolver }),
      direction: dof,
      spectrum: modalPeriods => exactSpectrum(
        modalPeriods,
        input.spectrumTag,
        zoneFactor,
        input.useFactor,
        site.soilFactor!,
        site.tpSeconds!,
        site.tlSeconds!,
        input.reductionFactor,
        input.accelerationUnit,
      ),
      nodeTags,
      reactionNodeTags: input.supportNodeTags,
      elementTags: input.elementTags ?? [],
      combination: { method: 'CQC', dampingRatio: input.dampingRatio ?? 0.05 },
    });

    const combination = input.combination ?? 'CQC';
    const dampingRatio = input.dampingRatio ?? 0.05;
    const effectiveMassRatio = cumulativeMassRatio(spectrum.modalProperties, input.direction);
    const baseShear = calculateBaseShear(
      spectrum.modes,
      spectrum.angularFrequencies,
      dof - 1,
      input,
      combination,
      dampingRatio,
      zoneFactor,
      site.soilFactor,
      site.tpSeconds,
      site.tlSeconds,
      spectrum.periods[0]!,
    );
    return {
      direction: input.direction,
      spectrum,
      effectiveMassRatio,
      modalMassCompliant: e030_2026.modalSpectral.checkModalMassParticipation(
        effectiveMassRatio,
        input.numberOfModes,
      ),
      baseShear,
      stories: calculateStoryDrifts(spectrum.modes, spectrum.angularFrequencies, input, dof - 1, combination, dampingRatio),
      designNodeReactions: scaleRecord(
        combineRecord(spectrum.modes.map(mode => mode.nodeReactions), spectrum.angularFrequencies, combination, dampingRatio),
        baseShear.scaleFactor,
      ),
      designElementForces: scaleRecord(
        combineRecord(spectrum.modes.map(mode => mode.elementForces), spectrum.angularFrequencies, combination, dampingRatio),
        baseShear.scaleFactor,
      ),
    };
  }
}

function exactSpectrum(
  modalPeriods: readonly number[],
  tag: number,
  zoneFactor: number,
  useFactor: number,
  soilFactor: number,
  tp: number,
  tl: number,
  reductionFactor: number,
  accelerationUnit: E030NativeSpectrumInput['accelerationUnit'],
) {
  const periods = [...new Set([0, ...modalPeriods])].sort((a, b) => a - b);
  return {
    tag,
    periods,
    accelerations: periods.map(period => {
      const c = e030_2026.hazard.amplificationFactor(period, tp, tl);
      const accelerationMps2 = e030_2026.modalSpectral.spectralAcceleration(
        zoneFactor,
        useFactor,
        c,
        soilFactor,
        reductionFactor,
      );
      return units.convert(accelerationMps2, 'm/s2', accelerationUnit);
    }),
  };
}

function calculateBaseShear(
  modes: readonly ModalSpectrumResponse[],
  omegas: readonly number[],
  dofIndex: number,
  input: E030NativeSpectrumInput,
  combination: E030ModalCombination,
  dampingRatio: number,
  zoneFactor: number,
  soilFactor: number,
  tp: number,
  tl: number,
  fundamentalPeriod: number,
): E030BaseShearResult {
  const modalValues = modes.map(mode => input.supportNodeTags.reduce(
    (sum, tag) => sum + mode.nodeReactions[tag]![dofIndex]!,
    0,
  ));
  const dynamic = combine(modalValues, omegas, combination, dampingRatio);
  const c = e030_2026.hazard.staticAmplificationFactor(fundamentalPeriod, tp, tl);
  const staticKN = e030_2026.staticAnalysis.baseShear({
    zoneFactor,
    useFactor: input.useFactor,
    amplificationFactor: c,
    soilFactor,
    reductionFactor: input.reductionFactor,
    seismicWeight: input.seismicWeight,
  }).baseShearKN;
  const staticValue = units.convert(staticKN, 'kN', input.forceUnit);
  const requiredMinimum = (input.regular ? 0.8 : 0.9) * staticValue;
  const scaleFactor = e030_2026.modalSpectral.minimumBaseShearScale(
    { value: dynamic, unit: input.forceUnit },
    { value: staticKN, unit: 'kN' },
    input.regular,
  );
  return { modalValues, dynamic, static: staticValue, requiredMinimum, scaleFactor, unit: input.forceUnit };
}

function calculateStoryDrifts(
  modes: readonly ModalSpectrumResponse[],
  omegas: readonly number[],
  input: E030NativeSpectrumInput,
  dofIndex: number,
  combination: E030ModalCombination,
  dampingRatio: number,
): E030StorySpectrumResult[] {
  const amplification = (input.regular ? 0.75 : 0.85) * input.reductionFactor;
  return input.stories.map((story, storyIndex) => {
    const lowerTag = input.stories[storyIndex - 1]?.nodeTag;
    const modalDrifts = modes.map(mode => {
      const upper = mode.nodeDisplacements[story.nodeTag]![dofIndex]!;
      const lower = lowerTag === undefined ? 0 : mode.nodeDisplacements[lowerTag]![dofIndex]!;
      return upper - lower;
    });
    const elasticDrift = combine(modalDrifts, omegas, combination, dampingRatio);
    const amplifiedDrift = elasticDrift * amplification;
    const driftM = units.convert(amplifiedDrift, input.lengthUnit, 'm');
    const driftRatio = driftM / lengthM(story.height);
    return {
      storyId: story.id,
      elasticDrift,
      amplifiedDrift,
      driftRatio,
      check: e030_2026.driftAndSeparation.checkDrift(driftRatio, input.predominantMaterial),
    };
  });
}

function cumulativeMassRatio(
  properties: Readonly<Record<string, number | readonly number[]>>,
  direction: 'x' | 'y',
): number {
  const key = direction === 'x' ? 'partiMassRatiosCumuMX' : 'partiMassRatiosCumuMY';
  const values = properties[key];
  if (!Array.isArray(values) || values.length === 0) {
    throw new Error(`OpenSees modal properties did not provide ${key}.`);
  }
  return values[values.length - 1]! / 100;
}

function combine(
  responses: readonly number[],
  omegas: readonly number[],
  method: E030ModalCombination,
  dampingRatio: number,
): number {
  return method === 'CQC'
    ? e030_2026.modalSpectral.completeQuadraticCombination(
      responses.map((response, index) => ({ response, angularFrequency: omegas[index]! })),
      dampingRatio,
    )
    : e030_2026.modalSpectral.alternativeCombination(responses);
}

function combineRecord(
  records: readonly ResponseRecord[],
  omegas: readonly number[],
  method: E030ModalCombination,
  dampingRatio: number,
): ResponseRecord {
  const tags = Object.keys(records[0] ?? {}).map(Number);
  return Object.fromEntries(tags.map(tag => {
    const size = records[0]![tag]!.length;
    return [tag, Array.from({ length: size }, (_, index) => combine(
      records.map(record => record[tag]![index]!),
      omegas,
      method,
      dampingRatio,
    ))];
  }));
}

function scaleRecord(record: ResponseRecord, factor: number): ResponseRecord {
  return Object.fromEntries(Object.entries(record).map(([tag, values]) => [
    Number(tag),
    values.map(value => value * factor),
  ]));
}

function validateInput(input: E030NativeSpectrumInput): void {
  if (input.stories.length === 0) throw new Error('At least one story is required.');
  if (input.supportNodeTags.length === 0) throw new Error('At least one support node is required.');
  if (!(input.useFactor > 0) || !(input.reductionFactor > 0)) {
    throw new Error('E.030 use and reduction factors must be greater than zero.');
  }
  if (new Set(input.stories.map(story => story.nodeTag)).size !== input.stories.length) {
    throw new Error('Story node tags must be unique.');
  }
  if (forceKNValue(input.seismicWeight) <= 0) throw new Error('Seismic weight must be greater than zero.');
}
