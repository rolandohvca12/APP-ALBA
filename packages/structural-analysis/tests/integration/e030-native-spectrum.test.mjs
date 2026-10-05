import assert from 'node:assert/strict';
import test from 'node:test';
import {
  OpenSeesNativeSession,
  inspectNativeBackend,
} from 'openseesjs';
import { E030NativeModalSpectrumService } from '../../dist/index.js';

const availability = inspectNativeBackend();

test('runs an E.030:2026 native modal response-spectrum analysis', {
  skip: availability.available ? false : availability.reason,
}, () => {
  const session = new OpenSeesNativeSession();
  try {
    const weights = [350, 320, 290];
    const masses = weights.map(weight => weight / 980.665);
    session.ops
      .wipe()
      .model('basic', '-ndm', 1, '-ndf', 1)
      .node(1, 0).node(2, 0).node(3, 0).node(4, 0)
      .fix(1, 1)
      .mass(2, masses[0]).mass(3, masses[1]).mass(4, masses[2])
      .uniaxialMaterial('Elastic', 1, 680)
      .uniaxialMaterial('Elastic', 2, 650)
      .uniaxialMaterial('Elastic', 3, 560)
      .element('zeroLength', 1, 1, 2, '-mat', [1], '-dir', [1])
      .element('zeroLength', 2, 2, 3, '-mat', [2], '-dir', [1])
      .element('zeroLength', 3, 3, 4, '-mat', [3], '-dir', [1]);

    const result = new E030NativeModalSpectrumService(session).analyze({
      direction: 'x',
      zone: 4,
      soilProfile: 'S1',
      useFactor: 1,
      reductionFactor: 3,
      seismicWeight: { value: 960, unit: 'tf' },
      regular: true,
      predominantMaterial: 'masonry',
      numberOfModes: 3,
      eigenSolver: '-fullGenLapack',
      spectrumTag: 100,
      forceUnit: 'tf',
      lengthUnit: 'cm',
      accelerationUnit: 'cm/s2',
      stories: [
        { id: 'N1', nodeTag: 2, height: { value: 300, unit: 'cm' } },
        { id: 'N2', nodeTag: 3, height: { value: 300, unit: 'cm' } },
        { id: 'N3', nodeTag: 4, height: { value: 300, unit: 'cm' } },
      ],
      supportNodeTags: [1],
      elementTags: [1, 2, 3],
      combination: 'CQC',
      dampingRatio: 0.05,
    });

    assert.equal(result.modalMassCompliant, true);
    assert.ok(result.effectiveMassRatio >= 0.9);
    assert.ok(result.baseShear.dynamic > 0);
    assert.ok(result.baseShear.static > 0);
    assert.ok(result.baseShear.scaleFactor >= 1);
    assert.equal(result.stories.length, 3);
    assert.equal(result.designElementForces[1].length, 2);
  } finally {
    session.close();
  }
});
