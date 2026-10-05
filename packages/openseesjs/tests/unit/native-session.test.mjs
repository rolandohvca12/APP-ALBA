import assert from 'node:assert/strict';
import test from 'node:test';
import {
  OPEN_SEES_PY_COMMANDS,
  OpenSeesNativeSession,
  createOpenSeesOps,
  inspectNativeBackend,
} from '../../dist/native-index.js';

function fakeBinding() {
  const calls = [];
  const bulkCalls = [];
  const bulkVoidCalls = [];
  const packedCalls = [];
  const packedQueryCalls = [];
  let closed = false;
  return {
    calls,
    bulkCalls,
    bulkVoidCalls,
    packedCalls,
    packedQueryCalls,
    get closed() { return closed; },
    binding: {
      version: 'test',
      createSession() {
        return {
          invoke(command, args) {
            calls.push({ command, args });
            if (command === 'analyze') return 0;
            if (command === 'getTime') return 1.5;
            if (command === 'getNodeTags') return [1, 2];
            if (command === 'nodeDisp') return args.length === 2 ? 0.125 : [0.125, 0];
            if (command === 'nodeReaction') return [-10, 20, 3];
            if (command === 'eleResponse') return [1, 2, 3, 4, 5, 6];
            if (command === 'eleForce') return [-5, 0, 5, 0];
            if (command === 'printA') return args.includes('-ret') ? [10, 0, 0, 20] : 0;
            if (command === 'printB') return args.includes('-ret') ? [5, 6] : 0;
            if (command === 'modalProperties') return ['domainSize', [2, 3], 'totalMass', [10, 20]];
            if (command === 'version') return '3.8.0';
            return null;
          },
          invokeMany(command, argumentRows) {
            bulkCalls.push({ command, argumentRows });
            return argumentRows.map(args => {
              if (command === 'nodeDisp') return [args[0] * 0.1, 0];
              if (command === 'nodeReaction') return [-args[0], 0];
              if (command === 'eleForce') return [-args[0], args[0]];
              return null;
            });
          },
          invokeManyVoid(command, argumentRows) {
            bulkVoidCalls.push({ command, argumentRows });
          },
          invokePacked(command, tags, values, width) {
            packedCalls.push({ command, tags: [...tags], values: [...values], width });
          },
          queryPacked(command, tags, width, args) {
            packedQueryCalls.push({ command, tags: [...tags], width, args });
            return Float64Array.from(tags, tag => command === 'nodeReaction' ? -tag : tag * 0.1);
          },
          close() { closed = true; },
        };
      },
    },
  };
}

test('native ops preserves the complete typed command surface', () => {
  const fake = fakeBinding();
  const session = new OpenSeesNativeSession({ binding: fake.binding });

  for (const command of OPEN_SEES_PY_COMMANDS) assert.equal(typeof session.ops[command], 'function', command);
  assert.equal(session.ops.node, session.ops.node);
  session.ops.model('basic', '-ndm', 2, '-ndf', 3).node(1, 0, 0).fix(1, 1, 1, 1);

  assert.deepEqual(fake.calls.slice(0, 3), [
    { command: 'model', args: ['basic', '-ndm', 2, '-ndf', 3] },
    { command: 'node', args: [1, 0, 0] },
    { command: 'fix', args: [1, 1, 1, 1] },
  ]);
});

test('bulk model commands use the allocation-free native entry point', () => {
  const fake = fakeBinding();
  const session = new OpenSeesNativeSession({ binding: fake.binding });

  session.ops.nodes([[1, 0, 0], [2, 1, 0]]);
  session.ops.elements([['truss', 1, 1, 2, 1, 1]]);
  session.ops.loads([[1, 10, 0], [2, 20, 0]]);

  assert.deepEqual(fake.bulkVoidCalls, [
    { command: 'node', argumentRows: [[1, 0, 0], [2, 1, 0]] },
    { command: 'element', argumentRows: [['truss', 1, 1, 2, 1, 1]] },
    { command: 'load', argumentRows: [[1, 10, 0], [2, 20, 0]] },
  ]);
  assert.equal(fake.bulkCalls.length, 0);
});

test('packed model and query APIs preserve contiguous typed data', () => {
  const fake = fakeBinding();
  const session = new OpenSeesNativeSession({ binding: fake.binding });

  session.ops.nodesPacked(new Int32Array([1, 2]), new Float64Array([0, 0, 2, 0]), 2);
  session.ops.massesPacked(new Int32Array([1, 2]), new Float64Array([1, 2, 3, 4]), 2);
  session.ops.fixesPacked(new Int32Array([1]), new Int32Array([1, 1]), 2);
  session.ops.loadsPacked(new Int32Array([2]), new Float64Array([10, 0]), 2);
  const reactions = session.query.nodeReactionsPacked(new Int32Array([1, 2]), 1);

  assert.deepEqual(fake.packedCalls, [
    { command: 'node', tags: [1, 2], values: [0, 0, 2, 0], width: 2 },
    { command: 'mass', tags: [1, 2], values: [1, 2, 3, 4], width: 2 },
    { command: 'fix', tags: [1], values: [1, 1], width: 2 },
    { command: 'load', tags: [2], values: [10, 0], width: 2 },
  ]);
  assert.deepEqual([...reactions], [-1, -2]);
  assert.deepEqual(fake.packedQueryCalls, [
    { command: 'nodeReaction', tags: [1, 2], width: 1, args: [] },
  ]);
});

test('packed APIs fall back to row batches with older native runtimes', () => {
  const fake = fakeBinding();
  const legacySession = fake.binding.createSession();
  delete legacySession.invokePacked;
  delete legacySession.queryPacked;
  const session = new OpenSeesNativeSession({
    binding: { createSession: () => legacySession },
  });

  session.ops.nodesPacked(new Int32Array([1, 2]), new Float64Array([0, 0, 1, 0]), 2);
  const displacements = session.query.nodeDisplacementsPacked(new Int32Array([1, 2]), 2);

  assert.deepEqual(fake.bulkVoidCalls, [
    { command: 'node', argumentRows: [[1, 0, 0], [2, 1, 0]] },
  ]);
  assert.deepEqual([...displacements], [0.1, 0, 0.2, 0]);
  assert.deepEqual(fake.bulkCalls, [
    { command: 'nodeDisp', argumentRows: [[1], [2]] },
  ]);
});

test('minimal ops facade is lazy, returns query values and disposes cleanly', () => {
  const fake = fakeBinding();
  const ops = createOpenSeesOps({ binding: fake.binding });

  assert.equal(fake.calls.length, 0);
  ops.wipe().node(1, 0, 0);
  assert.equal(ops.analyze(1), 0);
  assert.deepEqual(ops.nodeReaction(1), [-10, 20, 3]);
  ops.dispose();
  assert.equal(fake.closed, true);
});

test('native queries return values directly with runtime shape validation', () => {
  const fake = fakeBinding();
  const session = new OpenSeesNativeSession({ binding: fake.binding });

  assert.equal(session.query.analyze(1), 0);
  assert.equal(session.query.getTime(), 1.5);
  assert.deepEqual(session.query.getNodeTags(), [1, 2]);
  assert.equal(session.query.nodeDisp(2, 1), 0.125);
  assert.deepEqual(session.query.nodeDisp(2), [0.125, 0]);
  assert.deepEqual(session.query.nodeReaction(1), [-10, 20, 3]);
  assert.deepEqual(session.query.eleResponse(4, ['localForce']), [1, 2, 3, 4, 5, 6]);
  assert.equal(session.query.version(), '3.8.0');
  assert.deepEqual(session.query.nodeDisplacements([1, 2]), {
    1: [0.1, 0],
    2: [0.2, 0],
  });
  assert.deepEqual(session.query.nodeReactions([1, 2]), {
    1: [-1, 0],
    2: [-2, 0],
  });
  assert.deepEqual(session.query.elementForces([4]), { 4: [-4, 4] });
  assert.deepEqual(session.query.elementLocalForces2D(4), {
    i: { axial: 1, shear: 2, moment: 3 },
    j: { axial: 4, shear: 5, moment: 6 },
    raw: [1, 2, 3, 4, 5, 6],
  });
  assert.deepEqual(session.query.printA('-ret'), [10, 0, 0, 20]);
  assert.equal(session.query.printA('-file', 'matrix.txt'), 0);
  assert.deepEqual(session.query.printB('-ret'), [5, 6]);
  assert.deepEqual(session.query.modalProperties('-file', 'modal.txt'), {
    domainSize: [2, 3],
    totalMass: [10, 20],
  });
  assert.equal(fake.bulkCalls.length, 3);

  session.close();
  session.close();
  assert.equal(fake.closed, true);
});

test('native commands preserve Tcl flags and flatten list arguments', () => {
  const fake = fakeBinding();
  const session = new OpenSeesNativeSession({ binding: fake.binding });

  session.ops.geomTransf('Linear', 1, '-jntOffset', [0, 0, 0, 0]);
  assert.deepEqual(fake.calls[0], {
    command: 'geomTransf',
    args: ['Linear', 1, '-jntOffset', 0, 0, 0, 0],
  });

  session.ops.eleLoad('-ele', [1], '-type', '-beamUniform', [0, 0, 0.5, 1, -5, 0]);
  assert.deepEqual(fake.calls[1], {
    command: 'eleLoad',
    args: ['-ele', 1, '-type', '-beamUniform', 0, 0, 0.5, 1, -5, 0],
  });

  session.ops.node(2, 1, 2, '-mass', [10, 10, 0], '-disp', [0, 0, 0]);
  assert.deepEqual(fake.calls[2], {
    command: 'node',
    args: [2, 1, 2, '-mass', 10, 10, 0, '-disp', 0, 0, 0],
  });
});

test('native sessions and the minimal facade expose typed variant methods', () => {
  const directFake = fakeBinding();
  const session = new OpenSeesNativeSession({ binding: directFake.binding });

  session.ops.element.elasticBeamColumn(1, 1, 2, 0.3, 25_000_000, 0.002, 1);
  session.ops.uniaxialMaterial.Steel01(2, 420, 200_000, 0.01);
  assert.deepEqual(directFake.calls, [
    {
      command: 'element',
      args: ['elasticBeamColumn', 1, 1, 2, 0.3, 25_000_000, 0.002, 1],
    },
    {
      command: 'uniaxialMaterial',
      args: ['Steel01', 2, 420, 200_000, 0.01],
    },
  ]);

  const facadeFake = fakeBinding();
  const ops = createOpenSeesOps({ binding: facadeFake.binding });
  ops.element.Truss(2, 1, 2, 0.01, 3).algorithm.Newton().wipe();
  assert.deepEqual(facadeFake.calls, [
    { command: 'element', args: ['Truss', 2, 1, 2, 0.01, 3] },
    { command: 'algorithm', args: ['Newton'] },
    { command: 'wipe', args: [] },
  ]);
  ops.dispose();
});

test('reports a missing addon without corrupting the native API state', () => {
  const status = inspectNativeBackend('Z:/missing/opensees.node');
  assert.equal(status.available, false);
  assert.match(status.reason, /no native OpenSees runtime/i);
});
