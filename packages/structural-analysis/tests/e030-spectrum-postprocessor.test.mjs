import assert from 'node:assert/strict';
import test from 'node:test';
import { E030SpectrumPostProcessor } from '../dist/index.js';

function result(direction, drift, reaction, force) {
  return {
    direction,
    stories: [{ storyId: 'N1', driftRatio: drift }],
    designNodeReactions: { 1: [reaction] },
    designElementForces: { 1: [force, -force] },
  };
}

test('envelopes accidental eccentricity and combines X/Y at 100/30', () => {
  const processor = new E030SpectrumPostProcessor();
  const combined = processor.combineDirections(
    [result('x', 0.003, 10, 8), result('x', 0.004, -12, 9)],
    [result('y', 0.005, 20, 15), result('y', 0.0045, -18, 16)],
  );

  assert.equal(combined.xEnvelope.nodeReactions[1][0], 12);
  assert.equal(combined.yEnvelope.elementForces[1][0], 16);
  assert.ok(Math.abs(combined.nodeReactions[1][0] - Math.hypot(20, 0.3 * 12)) < 1e-12);
  assert.ok(Math.abs(combined.storyDriftRatios.N1 - Math.hypot(0.005, 0.3 * 0.004)) < 1e-12);
});
