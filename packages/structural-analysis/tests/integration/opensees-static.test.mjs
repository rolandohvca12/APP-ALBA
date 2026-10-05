import assert from 'node:assert/strict';
import test from 'node:test';
import { inspectNativeBackend } from 'openseesjs';
import {
  OpenSees3DStaticStrategy,
  SpatialWideColumnModelAssembler,
  WallActionAggregator,
} from '../../dist/index.js';
import { spatialSampleInput } from '../fixture.mjs';

const availability = inspectNativeBackend();

test('solves the complete 3D building response in X, Y and torsion', {
  skip: availability.available ? false : availability.reason,
}, async () => {
  const model = new SpatialWideColumnModelAssembler().assemble(spatialSampleInput());
  const result = await new OpenSees3DStaticStrategy().analyze(model);
  assert.equal(result.cases.length, 3);
  for (const item of result.cases) {
    assert.equal(item.converged, true, result.diagnostics.join('\n'));
    assert.ok(item.equilibriumError < 1e-8);
    assert.equal(item.levels.length, 3);
  }
  assert.ok(result.cases.find((item) => item.caseId === 'SX').levels.at(-1).ux > 0);
  assert.ok(result.cases.find((item) => item.caseId === 'SY').levels.at(-1).uy > 0);
  assert.ok(result.cases.find((item) => item.caseId === 'ST').levels.at(-1).rz > 0);
  const totals = WallActionAggregator.byLevelAndDirection(result);
  const sx = totals.filter((item) => item.caseId === 'SX' && item.direction === 'x');
  const sy = totals.filter((item) => item.caseId === 'SY' && item.direction === 'y');
  assert.deepEqual(sx.map((item) => Math.round(item.sumShear)), [60, 50, 30]);
  assert.deepEqual(sx.map((item) => Math.round(item.sumMoment)), [420, 240, 90]);
  assert.deepEqual(sy.map((item) => Math.round(item.sumShear)), [60, 50, 30]);
  assert.deepEqual(sy.map((item) => Math.round(item.sumMoment)), [420, 240, 90]);
  assert.ok(result.cases.every((item) => item.wallActions.length === 18));
  assert.ok(result.diagnostics.every((line) => !/singular|failed|nan/i.test(line)));
});
