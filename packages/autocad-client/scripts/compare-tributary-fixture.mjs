import { readFile } from 'node:fs/promises';
import {
  ImplicitSlabDetector,
  PolygonOps,
  TributaryAreaService,
  ringArea,
} from '../dist/index.js';

const fixtureUrl = new URL('../tests/fixtures/tributary-bidirectional-real.json', import.meta.url);
const fixture = JSON.parse(await readFile(fixtureUrl, 'utf8'));
const supports = [
  ...fixture.sources.wallsX.map((geometry) => ({ geometry, kind: 'wall-x' })),
  ...fixture.sources.wallsY.map((geometry) => ({ geometry, kind: 'wall-y' })),
  ...fixture.sources.lintels.map((geometry) => ({ geometry, kind: 'lintel' })),
];
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
const detected = ImplicitSlabDetector.detect(supports, 0.25);
const expected = fixture.expected.areas.map((geometry) => geometry.points.map(({ x, y }) => ({ x, y })));

const rows = result.slabs.map((slab, index) => {
  const references = expected
    .map((polygon, referenceIndex) => ({
      referenceIndex,
      polygon,
      overlap: intersectionArea(polygon, slab.slabPolygon),
    }))
    .filter(({ polygon, overlap }) => overlap > ringArea(polygon) * 0.5);
  const scores = references.map(({ polygon }) => bestIou(polygon, slab.cells.map((cell) => cell.polygon)));
  const box = bbox(slab.slabPolygon);
  return {
    slab: index + 1,
    box: `${fixed(box.xMin)},${fixed(box.yMin)} -> ${fixed(box.xMax)},${fixed(box.yMax)}`,
    expected: references.length,
    actual: slab.cells.length,
    exact: scores.filter((score) => score > 0.999).length,
    meanIou: fixed(scores.reduce((sum, score) => sum + score, 0) / Math.max(1, scores.length)),
    referenceIds: references.map(({ referenceIndex }) => referenceIndex),
    edges: detected.slabs[index]?.edges.map((edge) => ({
      id: edge.id,
      kind: edge.supportKind,
      lintel: Boolean(edge.isDintel),
      from: [fixed(edge.p1.x), fixed(edge.p1.y)],
      to: [fixed(edge.p2.x), fixed(edge.p2.y)],
      owners: [edge.startWallId, edge.endWallId].filter(Boolean),
    })),
  };
});

console.table(rows.map(({ referenceIds, edges, ...row }) => row));
for (const row of rows.filter((item) => item.exact !== item.expected)) {
  console.log(`\nSlab ${row.slab} ${row.box}; refs=${row.referenceIds.join(',')}`);
  console.dir(row.edges, { depth: null });
  for (const referenceIndex of row.referenceIds) {
    console.log(`ref ${referenceIndex}:`, expected[referenceIndex].map((point) => [fixed(point.x), fixed(point.y)]));
  }
  for (const cell of result.slabs[row.slab - 1].cells) {
    console.log(`actual ${cell.supportHandle}:`, cell.polygon.map((point) => [fixed(point.x), fixed(point.y)]));
  }
}

function bestIou(expectedPolygon, actualPolygons) {
  return actualPolygons.reduce((best, polygon) => {
    const intersection = intersectionArea(expectedPolygon, polygon);
    const union = ringArea(expectedPolygon) + ringArea(polygon) - intersection;
    return Math.max(best, union > 0 ? intersection / union : 0);
  }, 0);
}

function intersectionArea(a, b) {
  return PolygonOps.intersection(a, b).reduce((sum, polygon) => sum + ringArea(polygon), 0);
}

function bbox(points) {
  return points.reduce((box, point) => ({
    xMin: Math.min(box.xMin, point.x), xMax: Math.max(box.xMax, point.x),
    yMin: Math.min(box.yMin, point.y), yMax: Math.max(box.yMax, point.y),
  }), { xMin: Infinity, xMax: -Infinity, yMin: Infinity, yMax: -Infinity });
}

function fixed(value) { return Number(value.toFixed(4)); }
