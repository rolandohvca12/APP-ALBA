import assert from 'node:assert/strict';
import test from 'node:test';
import {
  OpenSeesNativeSession,
  inspectNativeBackend,
} from '../../dist/native-index.js';

const availability = inspectNativeBackend();

test('runs OpenSees in-process and returns analysis values directly', {
  skip: availability.available ? false : availability.reason,
}, () => {
  const session = new OpenSeesNativeSession();
  try {
    session.ops
      .wipe()
      .model('basic', '-ndm', 2, '-ndf', 2)
      .node(1, 0, 0)
      .node(2, 1, 0)
      .fix(1, 1, 1)
      .fix(2, 0, 1)
      .uniaxialMaterial('Elastic', 1, 1000)
      .element('truss', 1, 1, 2, 1, 1)
      .timeSeries('Linear', 1)
      .pattern('Plain', 1, 1)
      .load(2, 10, 0)
      .system('BandGeneral')
      .numberer('RCM')
      .constraints('Plain')
      .integrator('LoadControl', 1)
      .algorithm('Linear')
      .analysis('Static');

    assert.equal(session.query.analyze(1), 0);
    assert.deepEqual(session.query.nodeDisp(2), [0.01, 0]);
    session.ops.reactions();
    assert.deepEqual(session.query.nodeReaction(1), [-10, 0]);
    assert.deepEqual(session.query.eleForce(1), [-10, 0, 10, 0]);
    assert.equal(session.query.version(), '3.8.0');
  } finally {
    session.close();
  }
});

test('models and queries contiguous packed data without changing results', {
  skip: availability.available ? false : availability.reason,
}, () => {
  const session = new OpenSeesNativeSession();
  try {
    session.ops.wipe().model('basic', '-ndm', 2, '-ndf', 2);
    session.ops.nodesPacked(
      new Int32Array([1, 2]),
      new Float64Array([0, 0, 1, 0]),
      2,
    );
    session.ops.fixesPacked(
      new Int32Array([1, 2]),
      new Int32Array([1, 1, 0, 1]),
      2,
    );
    session.ops
      .uniaxialMaterial('Elastic', 1, 1000)
      .element('truss', 1, 1, 2, 1, 1)
      .timeSeries('Linear', 1)
      .pattern('Plain', 1, 1);
    session.ops.loadsPacked(new Int32Array([2]), new Float64Array([10, 0]), 2);
    session.ops
      .system('BandGeneral')
      .numberer('RCM')
      .constraints('Plain')
      .integrator('LoadControl', 1)
      .algorithm('Linear')
      .analysis('Static');

    assert.equal(session.query.analyze(1), 0);
    assert.deepEqual(
      [...session.query.nodeDisplacementsPacked(new Int32Array([1, 2]), 2)],
      [0, 0, 0.01, 0],
    );
    session.ops.reactions();
    assert.deepEqual(
      [...session.query.nodeReactionsPacked(new Int32Array([1]), 2)],
      [-10, 0],
    );
    assert.deepEqual(
      [...session.query.elementForcesPacked(new Int32Array([1]), 4)],
      [-10, 0, 10, 0],
    );
  } finally {
    session.close();
  }
});

test('native backend keeps one active OpenSees domain per process', {
  skip: availability.available ? false : availability.reason,
}, () => {
  const first = new OpenSeesNativeSession();
  try {
    assert.throws(() => new OpenSeesNativeSession(), /one native session/i);
  } finally {
    first.close();
  }
});
