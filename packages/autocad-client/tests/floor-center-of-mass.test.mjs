import assert from 'node:assert/strict';
import test from 'node:test';
import {
  AxialFloorWeightStrategy,
  BuildingCenterOfMassService,
  BuildingWeightStrategyFactory,
  FloorCenterOfMassService,
  FloorMassCalculator,
  SeismicFloorWeightStrategy,
} from '../dist/index.js';

test('computes floor center of mass from walls, lintels, slab, plaster and bond beams', () => {
  const geometry = {
    walls: [tagged('wall', 'M-01', [[0, 0], [1, 0], [1, 0.2], [0, 0.2]])],
    lintels: [tagged('lintel', 'D-01', [[4, 0], [6, 0], [6, 0.2], [4, 0.2]])],
    slabs: [tagged('slab', 'L-01', [[0, 0], [10, 0], [10, 4], [0, 4]])],
  };
  const result = FloorMassCalculator.calculate(geometry, {
    strategy: new AxialFloorWeightStrategy({ totalLevelHeight: 3 }),
    liveLoadPerArea: 0,
    lintelHeight: 0.4,
    plasterThickness: 0.01,
    slab: { type: 'unidirectional', thickness: 0.2, selfWeightPerArea: 3, spanDirection: 'x' },
    specificWeights: {
      masonry: ({ tag }) => tag === 'M-01' ? 10 : 8,
      concrete: 24,
      plaster: 5,
    },
  });

  assert.deepEqual(result.contributions.map((item) => item.kind), [
    'wall', 'plaster', 'bond-beam', 'lintel', 'slab',
  ]);
  assert.ok(Math.abs(result.totalWeight - 131.1) < 1e-9);
  assert.ok(Math.abs(result.centerOfMass.x - 622.83 / 131.1) < 1e-9);
  assert.ok(Math.abs(result.centerOfMass.y - 241.11 / 131.1) < 1e-9);
});

test('uses reinforced-concrete volume for bidirectional slabs', () => {
  const slab = tagged('slab', null, [[0, 0], [10, 0], [10, 4], [0, 4]]);
  const result = FloorMassCalculator.calculate(
    { walls: [], lintels: [], slabs: [slab] },
    {
      strategy: new AxialFloorWeightStrategy({ totalLevelHeight: 3 }),
      liveLoadPerArea: 0,
      lintelHeight: 0.4,
      plasterThickness: 0,
      slab: { type: 'bidirectional', thickness: 0.2 },
      specificWeights: { masonry: 10, concrete: 24, plaster: 5 },
    },
  );

  assert.equal(result.totalWeight, 192);
  assert.deepEqual(result.centerOfMass, { x: 5, y: 2 });
  assert.equal(result.contributions[0].specificWeight, 24);
  assert.equal(result.contributions[0].volume, 8);
});

test('can exclude implicit finish and bond-beam contributions', () => {
  const wall = tagged('wall', 'M-01', [[0, 0], [1, 0], [1, 0.2], [0, 0.2]]);
  const result = FloorMassCalculator.calculate(
    { walls: [wall], lintels: [], slabs: [] },
    {
      strategy: new AxialFloorWeightStrategy({ totalLevelHeight: 3 }),
      liveLoadPerArea: 0,
      lintelHeight: 0.4,
      plasterThickness: 0.01,
      slab: { type: 'bidirectional', thickness: 0.2 },
      specificWeights: { masonry: 10, concrete: 24, plaster: 5 },
      includePlaster: false,
      includeBondBeams: false,
    },
  );

  assert.equal(result.contributions.length, 1);
  assert.equal(result.contributions[0].kind, 'wall');
  assert.ok(Math.abs(result.totalWeight - 6) < 1e-9);
});

test('switches between seismic and axial metering strategies including tributary live load', () => {
  const left = tagged('left', 'M-LEFT', [[0, 0], [1, 0], [1, 0.2], [0, 0.2]]);
  const right = tagged('right', 'M-RIGHT', [[9, 0], [10, 0], [10, 0.2], [9, 0.2]]);
  const geometry = {
    walls: [left, right],
    lintels: [],
    slabs: [],
    tributaryAreas: [
      { wallHandle: 'left', wallTag: 'M-LEFT', polygon: [], area: 10 },
      { wallHandle: 'right', wallTag: 'M-RIGHT', polygon: [], area: 30 },
    ],
  };
  const common = {
    liveLoadPerArea: 2,
    lintelHeight: 0.4,
    plasterThickness: 0,
    slab: { type: 'bidirectional', thickness: 0.2 },
    specificWeights: { masonry: 10, concrete: 24, plaster: 5 },
    includePlaster: false,
    includeBondBeams: false,
  };
  const seismic = FloorMassCalculator.calculate(geometry, {
    ...common,
    strategy: new SeismicFloorWeightStrategy({
      levelBelow: { wallHeight: 1.8, slabThickness: 0.2 },
      levelAbove: { wallHeight: 2.8, slabThickness: 0.2 },
      alpha: 0.25,
    }),
  });
  const axial = FloorMassCalculator.calculate(geometry, {
    ...common,
    strategy: new AxialFloorWeightStrategy({ totalLevelHeight: 3 }),
  });

  assert.equal(seismic.strategy, 'seismic');
  assert.equal(seismic.liveLoadFactor, 0.25);
  assert.equal(seismic.totalWeight, 30);
  assert.ok(Math.abs(seismic.centerOfMass.x - 6.5) < 1e-9);
  assert.equal(axial.strategy, 'axial');
  assert.equal(axial.liveLoadFactor, 1);
  assert.equal(axial.totalWeight, 92);
  assert.ok(Math.abs(axial.centerOfMass.x - 640 / 92) < 1e-9);
});

test('distributes reduced seismic live load by wall tributary area with one geometry read', async () => {
  const groups = {
    wallsX: [
      tagged('bottom', 'M-B', [[-0.2, -0.2], [10.2, -0.2], [10.2, 0], [-0.2, 0]]).geometry,
      tagged('top', 'M-T', [[-0.2, 4], [10.2, 4], [10.2, 4.2], [-0.2, 4.2]]).geometry,
    ],
    wallsY: [
      tagged('left', 'M-L', [[-0.2, -0.2], [0, -0.2], [0, 4.2], [-0.2, 4.2]]).geometry,
      tagged('right', 'M-R', [[10, -0.2], [10.2, -0.2], [10.2, 4.2], [10, 4.2]]).geometry,
    ],
    lintels: [],
  };
  const reads = { wallsX: 0, wallsY: 0, lintels: 0 };
  const selector = (name) => ({
    resolve: async () => {
      reads[name]++;
      return groups[name];
    },
  });
  const tags = { bottom: 'M-B', top: 'M-T', left: 'M-L', right: 'M-R' };
  const query = {
    getTagsByHandles: async (handles) => Object.fromEntries(handles.map((handle) => [handle, tags[handle] ?? null])),
  };
  const result = await FloorCenterOfMassService.calculate(query, {
    sources: {
      wallsX: selector('wallsX'),
      wallsY: selector('wallsY'),
      lintels: selector('lintels'),
    },
    strategy: new SeismicFloorWeightStrategy({
      levelBelow: { wallHeight: 2.8, slabThickness: 0.2 },
      levelAbove: { wallHeight: 2.8, slabThickness: 0.2 },
      alpha: 0.25,
    }),
    liveLoadPerArea: 2,
    lintelHeight: 0.2,
    plasterThickness: 0.015,
    slab: { type: 'bidirectional', thickness: 0.2 },
    specificWeights: { masonry: 18, concrete: 24, plaster: 20 },
    closureTolerance: 0.25,
  });
  const liveLoad = result.contributions
    .filter((item) => item.kind === 'live-load')
    .reduce((sum, item) => sum + item.weight, 0);

  assert.deepEqual(reads, { wallsX: 1, wallsY: 1, lintels: 1 });
  assert.ok(Math.abs(liveLoad - 20) < 1e-9);
  assert.ok(result.contributions
    .filter((item) => item.kind === 'live-load')
    .every((item) => item.sourceTag?.startsWith('M-')));
});

test('creates seismic and axial strategies for N levels with different wall heights', () => {
  const levels = [2.6, 3.0, 2.4].map((wallHeight, index) => ({
    id: `N${index + 1}`,
    wallHeight,
    sources: {},
    liveLoadPerArea: 2,
    lintelHeight: 0.2,
    plasterThickness: 0.015,
    slab: { type: 'bidirectional' },
  }));
  const common = {
    levels,
    slabThickness: 0.2,
    specificWeights: { masonry: 18, concrete: 24, plaster: 20 },
  };
  const seismic = levels.map((_, index) => BuildingWeightStrategyFactory.create({
    ...common,
    metering: { type: 'seismic', alpha: 0.25 },
  }, index));
  const axial = levels.map((_, index) => BuildingWeightStrategyFactory.create({
    ...common,
    metering: { type: 'axial' },
  }, index));

  assertApproxArray(seismic.map((item) => item.verticalElementHeight), [3.0, 2.9, 1.3]);
  assertApproxArray(axial.map((item) => item.verticalElementHeight), [2.8, 3.2, 2.6]);
});

test('calculates and aggregates multiple floor centers of mass', async () => {
  const geometry = rectangleGeometry('N');
  const source = (items) => ({ resolve: async () => items });
  const level = (id, wallHeight) => ({
    id,
    wallHeight,
    sources: {
      wallsX: source(geometry.wallsX),
      wallsY: source(geometry.wallsY),
      lintels: source([]),
    },
    liveLoadPerArea: 2,
    lintelHeight: 0.2,
    plasterThickness: 0.015,
    slab: { type: 'bidirectional' },
    closureTolerance: 0.25,
  });
  const result = await BuildingCenterOfMassService.calculate(
    { getTagsByHandles: async () => ({}) },
    {
      levels: [level('N1', 2.6), level('N2', 3.0), level('N3', 2.4)],
      slabThickness: 0.2,
      metering: { type: 'seismic', alpha: 0.25 },
      specificWeights: { masonry: 18, concrete: 24, plaster: 20 },
    },
  );

  assert.equal(result.levels.length, 3);
  assertApproxArray(result.levels.map((item) => item.effectiveVerticalHeight), [3.0, 2.9, 1.3]);
  assert.ok(Math.abs(result.centerOfMass.x - 5) < 1e-9);
  assert.ok(Math.abs(result.centerOfMass.y - 2) < 1e-9);
  assert.ok(Math.abs(result.totalWeight
    - result.levels.reduce((sum, item) => sum + item.result.totalWeight, 0)) < 1e-9);
});

function tagged(handle, tag, coordinates) {
  const points = coordinates.map(([x, y]) => ({ x, y, z: 0 }));
  return {
    tag,
    geometry: {
      handle,
      type: 'Polyline',
      points,
      length: 0,
      closed: true,
      area: 0,
    },
  };
}

function rectangleGeometry(prefix) {
  return {
    wallsX: [
      tagged(`${prefix}-bottom`, null, [[-0.2, -0.2], [10.2, -0.2], [10.2, 0], [-0.2, 0]]).geometry,
      tagged(`${prefix}-top`, null, [[-0.2, 4], [10.2, 4], [10.2, 4.2], [-0.2, 4.2]]).geometry,
    ],
    wallsY: [
      tagged(`${prefix}-left`, null, [[-0.2, -0.2], [0, -0.2], [0, 4.2], [-0.2, 4.2]]).geometry,
      tagged(`${prefix}-right`, null, [[10, -0.2], [10.2, -0.2], [10.2, 4.2], [10, 4.2]]).geometry,
    ],
  };
}

function assertApproxArray(actual, expected, tolerance = 1e-12) {
  assert.equal(actual.length, expected.length);
  actual.forEach((value, index) => assert.ok(Math.abs(value - expected[index]) <= tolerance));
}
