import assert from 'node:assert/strict';
import test from 'node:test';
import { AutoCadBuildingVerificationService } from '../dist/index.js';

const layers = new Map([
  ['MUROS_X', [
    rectangle('bottom', -0.2, -0.2, 10.2, 0),
    rectangle('top', -0.2, 4, 10.2, 4.2),
  ]],
  ['MUROS_Y', [
    rectangle('left', -0.2, -0.2, 0, 4.2),
    rectangle('right', 10, -0.2, 10.2, 4.2),
  ]],
  ['DINTELES', []],
]);
const tags = { bottom: 'M1X', top: 'M2X', left: 'M1Y', right: 'M2Y' };
const reads = new Map();
const query = {
  getGeometryByLayer: async (layer) => {
    reads.set(layer, (reads.get(layer) ?? 0) + 1);
    return layers.get(layer) ?? [];
  },
  getGeometryByTag: async () => [],
  getTagsByHandles: async (handles) => Object.fromEntries(handles.map((handle) => [handle, tags[handle] ?? null])),
};

test('extracts tags and geometry from AutoCAD for E.070 checks', async () => {
  const result = await AutoCadBuildingVerificationService.calculate(query, {
    levels: [{ id: 'N1', wallHeight: 2.6 }, { id: 'N2', wallHeight: 2.8 }],
    typicalFloor: {
      sources: {
        wallsX: { type: 'layer', values: ['MUROS_X'] },
        wallsY: { type: 'layer', values: ['MUROS_Y'] },
        lintels: { type: 'layer', values: ['DINTELES'] },
      },
      liveLoadPerArea: 2,
      lintelHeight: 0.2,
      plasterThickness: 0.015,
      slab: { type: 'bidirectional' },
      closureTolerance: 0.25,
    },
    slabThickness: 0.2,
    seismicLiveLoadFactor: 0.25,
    specificWeights: { masonry: 18, concrete: 24, plaster: 20 },
    masonryUnit: { unitClass: 'Ladrillo IV', table9Unit: 'clay-king-kong-industrial', material: 'clay', geometry: 'solid', production: 'industrial', grout: 'none' },
    seismicParameters: { zone: 4, soilProfile: 'S1', category: 'C' },
  });

  assert.equal(result.source, 'autocad');
  assert.equal(result.levels.length, 2);
  assert.equal(result.axial.length, 4);
  assert.deepEqual(result.axial.map((wall) => wall.tag), ['M1X', 'M1Y', 'M2X', 'M2Y']);
  assert.ok(result.axial.every((wall) => wall.serviceDeadLoad > 0 && wall.serviceLiveLoad > 0));
  assert.ok(result.axial.every((wall) => wall.tributaryAreaPerFloor > 0 && Math.abs(wall.accumulatedTributaryArea - 2 * wall.tributaryAreaPerFloor) < 1e-9));
  assert.ok(Math.abs(result.axial.reduce((sum, wall) => sum + wall.serviceLiveLoad, 0) - 160) < 1e-9);
  assert.equal(result.density.length, 2);
  assert.deepEqual(result.seismicParameters, { zone: 4, soilProfile: 'S1', category: 'C', zoneFactor: 0.45, useFactor: 1, soilFactor: 1 });
  assert.equal(result.masonryProperties.masonryCompressiveStrengthMpa, 6.4);
  assert.ok(result.levels[0].seismicWeight < result.levels[0].totalServiceWeight);
  assert.deepEqual(Object.fromEntries(reads), { MUROS_X: 1, MUROS_Y: 1, DINTELES: 1 });
});

function rectangle(handle, x1, y1, x2, y2) {
  return {
    handle,
    type: 'Polyline',
    points: [[x1, y1], [x2, y1], [x2, y2], [x1, y2]].map(([x, y]) => ({ x, y, z: 0 })),
    length: 2 * (Math.abs(x2 - x1) + Math.abs(y2 - y1)),
    closed: true,
    area: Math.abs((x2 - x1) * (y2 - y1)),
  };
}
