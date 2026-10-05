import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { PolygonOps, TributaryAreaService, ringArea } from '../dist/index.js';

const fixtureUrl = new URL('./fixtures/tributary-bidirectional-real.json', import.meta.url);

test('real bidirectional model matches the AutoCAD reference partition', async () => {
  const fixture = JSON.parse(await readFile(fixtureUrl, 'utf8'));
  const layers = new Map([
    [fixture.layers.wallsX, fixture.sources.wallsX],
    [fixture.layers.wallsY, fixture.sources.wallsY],
    [fixture.layers.lintels, fixture.sources.lintels],
  ]);
  const query = { getGeometryByLayer: async (layer) => layers.get(layer) ?? [] };
  const selector = (layer) => ({ resolve: (client) => client.getGeometryByLayer(layer) });
  const result = await TributaryAreaService.analyze(query, {
    sources: {
      wallsX: selector(fixture.layers.wallsX),
      wallsY: selector(fixture.layers.wallsY),
      lintels: selector(fixture.layers.lintels),
    },
    slabBehavior: { type: 'bidirectional' },
    closureTolerance: 0.25,
  });
  const actual = result.slabs.flatMap((slab) => slab.cells.map((cell) => cell.polygon));
  const expected = fixture.expected.areas.map((geometry) =>
    geometry.points.map(({ x, y }) => ({ x, y })),
  );

  assert.equal(result.slabs.length, 16);
  assert.equal(actual.length, expected.length);
  for (const reference of expected) {
    assert.ok(bestIou(reference, actual) >= 0.995);
  }
  assert.ok(Math.abs(totalArea(actual) - totalArea(expected)) < 0.002);
});

function bestIou(expected, candidates) {
  return candidates.reduce((best, candidate) => {
    const intersection = PolygonOps.intersection(expected, candidate)
      .reduce((sum, polygon) => sum + ringArea(polygon), 0);
    const union = ringArea(expected) + ringArea(candidate) - intersection;
    return Math.max(best, union > 0 ? intersection / union : 0);
  }, 0);
}

function totalArea(polygons) {
  return polygons.reduce((sum, polygon) => sum + ringArea(polygon), 0);
}
