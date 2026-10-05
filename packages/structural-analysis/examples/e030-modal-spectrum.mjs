import {
  OpenSeesNativeSession,
  inspectNativeBackend,
} from 'openseesjs';
import { E030NativeModalSpectrumService } from '../dist/index.js';

const availability = inspectNativeBackend();
if (!availability.available) throw new Error(availability.reason);

const weights = [350, 320, 290]; // tonf
const stiffness = [680, 650, 560]; // tonf/cm
const gravity = 980.665; // cm/s2
const session = new OpenSeesNativeSession();

try {
  const ops = session.ops;
  ops.wipe().model('basic', '-ndm', 1, '-ndf', 1).node(1, 0).fix(1, 1);
  for (let index = 0; index < weights.length; index++) {
    const tag = index + 1;
    ops.node(tag + 1, 0)
      .mass(tag + 1, weights[index] / gravity)
      .uniaxialMaterial('Elastic', tag, stiffness[index])
      .element('zeroLength', tag, tag, tag + 1, '-mat', [tag], '-dir', [1]);
  }

  const result = new E030NativeModalSpectrumService(session).analyze({
    direction: 'x',
    zone: 4,
    soilProfile: 'S1',
    useFactor: 1,
    reductionFactor: 3,
    seismicWeight: { value: weights.reduce((sum, weight) => sum + weight, 0), unit: 'tf' },
    regular: true,
    predominantMaterial: 'masonry',
    numberOfModes: 3,
    eigenSolver: '-fullGenLapack',
    spectrumTag: 100,
    forceUnit: 'tf',
    lengthUnit: 'cm',
    accelerationUnit: 'cm/s2',
    stories: weights.map((_, index) => ({
      id: `N${index + 1}`,
      nodeTag: index + 2,
      height: { value: 300, unit: 'cm' },
    })),
    supportNodeTags: [1],
    elementTags: stiffness.map((_, index) => index + 1),
    combination: "CQC",
    dampingRatio: 0.05,
  });
  console.table(result.spectrum.periods.map((period, index) => ({
    mode: index + 1,
    period,
  })));
  console.table(result.stories.map(story => ({
    story: story.storyId,
    drift: story.driftRatio,
    status: story.check.status,
  })));
  console.table({
    dynamic: result.baseShear.dynamic,
    static: result.baseShear.static,
    minimum: result.baseShear.requiredMinimum,
    scale: result.baseShear.scaleFactor,
  });
  console.log('Participación modal:', result.effectiveMassRatio);
  console.log('Cumple masa modal:', result.modalMassCompliant);
} finally {
  session.close();
}
