import { e030_2026 } from '@app-alba/peru-rne';
import type {
  E030BidirectionalCombination,
  E030DirectionEnvelope,
  E030HorizontalDirection,
  E030NativeSpectrumResult,
} from './types.js';

type ResponseRecord = Readonly<Record<number, readonly number[]>>;

export class E030SpectrumPostProcessor {
  public envelope(cases: readonly E030NativeSpectrumResult[]): E030DirectionEnvelope {
    if (cases.length === 0) throw new Error('At least one spectrum case is required.');
    const direction = cases[0]!.direction;
    if (cases.some(result => result.direction !== direction)) {
      throw new Error('An accidental-eccentricity envelope can contain only one direction.');
    }

    return {
      direction,
      cases,
      storyDriftRatios: envelopeStories(cases),
      nodeReactions: envelopeRecords(cases.map(result => result.designNodeReactions)),
      elementForces: envelopeRecords(cases.map(result => result.designElementForces)),
    };
  }

  public combineDirections(
    xCases: readonly E030NativeSpectrumResult[],
    yCases: readonly E030NativeSpectrumResult[],
  ): E030BidirectionalCombination {
    const xEnvelope = this.envelope(assertDirection(xCases, 'x'));
    const yEnvelope = this.envelope(assertDirection(yCases, 'y'));
    return {
      xEnvelope,
      yEnvelope,
      storyDriftRatios: combineStoryDirections(
        xEnvelope.storyDriftRatios,
        yEnvelope.storyDriftRatios,
      ),
      nodeReactions: combineRecordDirections(xEnvelope.nodeReactions, yEnvelope.nodeReactions),
      elementForces: combineRecordDirections(xEnvelope.elementForces, yEnvelope.elementForces),
    };
  }
}

function assertDirection(
  cases: readonly E030NativeSpectrumResult[],
  direction: E030HorizontalDirection,
): readonly E030NativeSpectrumResult[] {
  if (cases.length === 0 || cases.some(result => result.direction !== direction)) {
    throw new Error(`Expected at least one ${direction.toUpperCase()} spectrum case.`);
  }
  return cases;
}

function envelopeStories(
  cases: readonly E030NativeSpectrumResult[],
): Readonly<Record<string, number>> {
  const ids = cases[0]!.stories.map(story => story.storyId);
  return Object.fromEntries(ids.map(id => [id, Math.max(...cases.map(result => {
    const story = result.stories.find(candidate => candidate.storyId === id);
    if (!story) throw new Error(`Spectrum case is missing story ${id}.`);
    return story.driftRatio;
  }))]));
}

function envelopeRecords(records: readonly ResponseRecord[]): ResponseRecord {
  return mapMatchingRecords(records, values => Math.max(...values.map(Math.abs)));
}

function combineRecordDirections(x: ResponseRecord, y: ResponseRecord): ResponseRecord {
  assertMatchingRecordShapes([x, y]);
  return Object.fromEntries(Object.keys(x).map(key => {
    const tag = Number(key);
    return [tag, x[tag]!.map((xValue, index) => directionalEnvelope(xValue, y[tag]![index]!))];
  }));
}

function combineStoryDirections(
  x: Readonly<Record<string, number>>,
  y: Readonly<Record<string, number>>,
): Readonly<Record<string, number>> {
  const xKeys = Object.keys(x);
  if (xKeys.length !== Object.keys(y).length || xKeys.some(key => !(key in y))) {
    throw new Error('X and Y spectrum cases must contain the same stories.');
  }
  return Object.fromEntries(xKeys.map(key => [key, directionalEnvelope(x[key]!, y[key]!) ]));
}

function directionalEnvelope(x: number, y: number): number {
  return Math.max(
    e030_2026.modalSpectral.directionalCombination(x, y),
    e030_2026.modalSpectral.directionalCombination(y, x),
  );
}

function mapMatchingRecords(
  records: readonly ResponseRecord[],
  mapper: (values: readonly number[]) => number,
): ResponseRecord {
  assertMatchingRecordShapes(records);
  const first = records[0]!;
  return Object.fromEntries(Object.keys(first).map(key => {
    const tag = Number(key);
    return [tag, first[tag]!.map((_, index) => mapper(records.map(record => record[tag]![index]!)))];
  }));
}

function assertMatchingRecordShapes(records: readonly ResponseRecord[]): void {
  if (records.length === 0) throw new Error('At least one response record is required.');
  const first = records[0]!;
  const keys = Object.keys(first);
  for (const record of records.slice(1)) {
    if (keys.length !== Object.keys(record).length
      || keys.some(key => !(key in record) || record[Number(key)]!.length !== first[Number(key)]!.length)) {
      throw new Error('Spectrum response records must contain matching tags and components.');
    }
  }
}
