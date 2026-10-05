import assert from 'node:assert/strict';
import test from 'node:test';
import {
  ByLayer,
  ImplicitSlabDetector,
  PanoBoundaryResolver,
  TributaryAreaDrawer,
  TributaryAreaService,
  TributaryPartitioner,
  ringArea,
} from '../dist/index.js';

const slabRing = [
  { x: 0, y: 0 },
  { x: 10, y: 0 },
  { x: 10, y: 4 },
  { x: 0, y: 4 },
];

const boundaryEdges = [
  { id: 'bottom', p1: { x: 0, y: 0 }, p2: { x: 10, y: 0 } },
  { id: 'right', p1: { x: 10, y: 0 }, p2: { x: 10, y: 4 } },
  { id: 'top', p1: { x: 10, y: 4 }, p2: { x: 0, y: 4 } },
  { id: 'left', p1: { x: 0, y: 4 }, p2: { x: 0, y: 0 } },
];

test('bidirectional envelope partitions a rectangle at 45 degrees', () => {
  const cells = TributaryPartitioner.partitionBidireccional(slabRing, boundaryEdges);
  const areas = new Map(cells.map((cell) => [cell.wallId, ringArea(cell.polygon)]));

  assert.equal(cells.length, 4);
  assert.ok(Math.abs([...areas.values()].reduce((sum, area) => sum + area, 0) - 40) < 1e-9);
  assert.ok(Math.abs(areas.get('top') - 16) < 1e-9);
  assert.ok(Math.abs(areas.get('bottom') - 16) < 1e-9);
  assert.ok(Math.abs(areas.get('left') - 4) < 1e-9);
  assert.ok(Math.abs(areas.get('right') - 4) < 1e-9);
});

test('bidirectional clipping remains stable with translated decimal coordinates', () => {
  const ring = [
    { x: 0.145806, y: 9.491251 },
    { x: 6.445818, y: 9.491251 },
    { x: 6.445818, y: 13.691239 },
    { x: 0.145806, y: 13.691239 },
  ];
  const edges = [
    { id: 'bottom', p1: ring[0], p2: ring[1] },
    { id: 'right', p1: ring[1], p2: ring[2] },
    { id: 'top', p1: ring[2], p2: ring[3] },
    { id: 'left', p1: ring[3], p2: ring[0] },
  ];

  const cells = TributaryPartitioner.partitionBidireccional(ring, edges);
  const assignedArea = cells.reduce((sum, cell) => sum + ringArea(cell.polygon), 0);

  assert.equal(cells.length, 4);
  assert.ok(Math.abs(assignedArea - 6.300012 * 4.199988) < 1e-8);
});

test('unidirectional strips use max(4e, 0.8) and 45-degree corner cuts', () => {
  const cells = TributaryPartitioner.partitionUnidireccional(slabRing, boundaryEdges, 'x', 0.1);
  const areas = sumAreasByWall(cells);
  const bottom = cells.find((cell) => cell.wallId === 'bottom');

  assert.ok(Math.abs(areas.get('top') - 7.36) < 1e-9);
  assert.ok(Math.abs(areas.get('bottom') - 7.36) < 1e-9);
  assert.ok(bottom.polygon.some((point) => Math.abs(point.x - 0.8) < 1e-9 && Math.abs(point.y - 0.8) < 1e-9));
  assert.ok(bottom.polygon.some((point) => Math.abs(point.x - 9.2) < 1e-9 && Math.abs(point.y - 0.8) < 1e-9));
  assert.ok(Math.abs(cells.reduce((sum, cell) => sum + ringArea(cell.polygon), 0) - 40) < 1e-9);
});

test('unidirectional lintel projection ends at the 45-degree partition and leaves no lintel area', () => {
  const edges = [
    { id: 'bottom-left', p1: { x: 0, y: 0 }, p2: { x: 4, y: 0 } },
    { id: 'lintel', p1: { x: 4, y: 0 }, p2: { x: 6, y: 0 }, isDintel: true },
    { id: 'bottom-right', p1: { x: 6, y: 0 }, p2: { x: 10, y: 0 } },
    ...boundaryEdges.slice(1),
  ];

  const cells = TributaryPartitioner.partitionUnidireccional(slabRing, edges, 'x', 0.1);
  const assignedArea = cells.reduce((sum, cell) => sum + ringArea(cell.polygon), 0);

  assert.equal(cells.some((cell) => cell.wallId === 'lintel'), false);
  assert.ok(Math.abs(assignedArea - 40) < 1e-9);
});

test('lintel masks an overlapping wall span and removes the lower 45-degree segment', () => {
  const edges = [
    { id: 'bottom', p1: { x: 0, y: 0 }, p2: { x: 10, y: 0 } },
    { id: 'lintel', p1: { x: 7, y: 0 }, p2: { x: 10, y: 0 }, isDintel: true },
    ...boundaryEdges.slice(1),
  ];

  const cells = TributaryPartitioner.partitionUnidireccional(slabRing, edges, 'x', 0.1);
  const rightCells = cells.filter((cell) => cell.wallId === 'right');

  assert.equal(cells.some((cell) => cell.wallId === 'lintel'), false);
  assert.equal(hasSegment(rightCells, { x: 9.2, y: 0.8 }, { x: 10, y: 0 }), false);
  assert.ok(Math.abs(cells.reduce((sum, cell) => sum + ringArea(cell.polygon), 0) - 40) < 1e-9);
});

test('splits end lintels at their midpoint like the reference envelope diagram', () => {
  const ring = [
    { x: 0, y: 0 }, { x: 4.5, y: 0 }, { x: 4.5, y: 4 }, { x: 0, y: 4 },
  ];
  const edges = [
    { id: 'bottom', p1: { x: 0, y: 0 }, p2: { x: 4.5, y: 0 } },
    { id: 'right', p1: { x: 4.5, y: 0 }, p2: { x: 4.5, y: 4 } },
    { id: 'lintel-right', p1: { x: 4.5, y: 4 }, p2: { x: 3.5, y: 4 }, isDintel: true },
    { id: 'top', p1: { x: 3.5, y: 4 }, p2: { x: 1, y: 4 } },
    { id: 'lintel-left', p1: { x: 1, y: 4 }, p2: { x: 0, y: 4 }, isDintel: true },
    { id: 'left', p1: { x: 0, y: 4 }, p2: { x: 0, y: 0 } },
  ];

  const cells = TributaryPartitioner.partitionBidireccional(ring, edges);
  const topCells = cells.filter((cell) => cell.wallId === 'top');

  assert.equal(cells.some((cell) => cell.wallId.startsWith('lintel')), false);
  assert.equal(hasSegment(topCells, { x: 0.5, y: 4 }, { x: 0.5, y: 3.5 }), true);
  assert.equal(hasSegment(topCells, { x: 4, y: 3.5 }, { x: 4, y: 4 }), true);
  assert.ok(Math.abs(cells.reduce((sum, cell) => sum + ringArea(cell.polygon), 0) - 18) < 1e-9);
});

test('assigns a three-lintel panel entirely to its only structural wall', () => {
  const ring = [
    { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 2 }, { x: 0, y: 2 },
  ];
  const edges = [
    { id: 'bottom-lintel', p1: ring[0], p2: ring[1], isDintel: true, startWallId: 'left', endWallId: 'right' },
    { id: 'right', p1: ring[1], p2: ring[2] },
    { id: 'top-lintel', p1: ring[2], p2: ring[3], isDintel: true, startWallId: 'right', endWallId: 'left' },
    { id: 'left-lintel', p1: ring[3], p2: ring[0], isDintel: true, startWallId: 'left', endWallId: 'left' },
  ];

  const cells = TributaryPartitioner.partitionBidireccional(ring, edges);
  const areas = sumAreasByWall(cells);

  assert.deepEqual(new Set(areas.keys()), new Set(['right']));
  assert.ok(Math.abs(areas.get('right') - 2) < 1e-9);
});

test('splits a lintel cell perpendicularly and transfers both halves to its end walls', () => {
  const edges = [
    { id: 'bottom-left', p1: { x: 0, y: 0 }, p2: { x: 4, y: 0 } },
    { id: 'lintel', p1: { x: 4, y: 0 }, p2: { x: 6, y: 0 }, isDintel: true },
    { id: 'bottom-right', p1: { x: 6, y: 0 }, p2: { x: 10, y: 0 } },
    ...boundaryEdges.slice(1),
  ];

  const cells = TributaryPartitioner.partitionBidireccional(slabRing, edges);
  const areas = new Map(cells.map((cell) => [cell.wallId, ringArea(cell.polygon)]));

  assert.equal(areas.has('lintel'), false);
  assert.ok(Math.abs(areas.get('bottom-left') - 8) < 1e-9);
  assert.ok(Math.abs(areas.get('bottom-right') - 8) < 1e-9);
  assert.ok(Math.abs([...areas.values()].reduce((sum, area) => sum + area, 0) - 40) < 1e-9);
});

test('panel corner geometry overrides stale equal lintel owner hints', () => {
  const edges = [
    { id: 'bottom', p1: { x: 0, y: 0 }, p2: { x: 4, y: 0 } },
    {
      id: 'lintel', p1: { x: 4, y: 0 }, p2: { x: 10, y: 0 }, isDintel: true,
      startWallId: 'bottom', endWallId: 'bottom',
    },
    ...boundaryEdges.slice(1),
  ];

  const cells = TributaryPartitioner.partitionBidireccional(slabRing, edges);
  const rightArea = cells
    .filter((cell) => cell.wallId === 'right')
    .reduce((sum, cell) => sum + ringArea(cell.polygon), 0);

  assert.ok(rightArea > 4);
  assert.equal(cells.some((cell) => cell.wallId === 'lintel'), false);
  assert.ok(Math.abs(cells.reduce((sum, cell) => sum + ringArea(cell.polygon), 0) - 40) < 1e-9);
});

test('assigns lintel regions only to walls even when their inner faces have gaps', () => {
  const edges = [
    { id: 'bottom-left', p1: { x: 0, y: 0 }, p2: { x: 3.8, y: 0 } },
    { id: 'lintel', p1: { x: 4, y: 0 }, p2: { x: 6, y: 0 }, isDintel: true },
    { id: 'bottom-right', p1: { x: 6.2, y: 0 }, p2: { x: 10, y: 0 } },
    ...boundaryEdges.slice(1),
  ];

  const cells = TributaryPartitioner.partitionBidireccional(slabRing, edges);
  const assignedArea = cells.reduce((sum, cell) => sum + ringArea(cell.polygon), 0);

  assert.equal(cells.some((cell) => cell.wallId === 'lintel'), false);
  assert.equal(cells.some((cell) => cell.wallId === 'bottom-left'), true);
  assert.equal(cells.some((cell) => cell.wallId === 'bottom-right'), true);
  assert.ok(Math.abs(assignedArea - 40) < 1e-9);
});

test('resolves the inner faces of wall polylines touching a slab', () => {
  const slab = geometry('slab', slabRing, true);
  const supports = [
    support('bottom', 'wall-x', [[-0.2, -0.3], [10.2, -0.3], [10.2, 0], [-0.2, 0]]),
    support('top', 'wall-x', [[-0.2, 4], [10.2, 4], [10.2, 4.3], [-0.2, 4.3]]),
    support('left', 'wall-y', [[-0.3, 0], [0, 0], [0, 4], [-0.3, 4]]),
    support('right', 'wall-y', [[10, 0], [10.3, 0], [10.3, 4], [10, 4]]),
    support('far', 'wall-x', [[20, 20], [22, 20], [22, 20.2], [20, 20.2]]),
  ];

  const edges = PanoBoundaryResolver.resolve(slab, supports, 0.001);

  assert.deepEqual(new Set(edges.map((edge) => edge.id)), new Set(['bottom', 'top', 'left', 'right']));
});

test('infers minimal slab panels from walls without explicit slab geometry', () => {
  const supports = rectangleSupports();
  supports.push(support('middle', 'wall-y', [[4.9, -0.2], [5.1, -0.2], [5.1, 4.2], [4.9, 4.2]]));

  const detected = ImplicitSlabDetector.detect(supports, 0.25);

  assert.equal(detected.slabs.length, 2);
  for (const slab of detected.slabs) {
    assert.ok(Math.abs(slab.geometry.area - 19.6) < 1e-9);
  }
});

test('analyzes implicit slabs loaded through existing layer selectors', async () => {
  const supports = rectangleSupports();
  const layers = new Map([
    ['MUROS_X', supports.filter((item) => item.kind === 'wall-x').map((item) => item.geometry)],
    ['MUROS_Y', supports.filter((item) => item.kind === 'wall-y').map((item) => item.geometry)],
    ['DINTELES', []],
  ]);
  const query = {
    getGeometryByLayer: async (layer) => layers.get(layer) ?? [],
    getTagsByHandles: async (handles) => Object.fromEntries(handles.map((handle) => [handle, `TAG-${handle}`])),
  };

  const result = await TributaryAreaService.analyze(query, {
    sources: {
      wallsX: new ByLayer('MUROS_X'),
      wallsY: new ByLayer('MUROS_Y'),
      lintels: new ByLayer('DINTELES'),
    },
    slabBehavior: { type: 'bidirectional' },
    closureTolerance: 0.25,
  });

  assert.equal(result.slabs.length, 1);
  assert.ok(Math.abs(result.slabs[0].slabArea - 40) < 1e-9);
  assert.ok(Math.abs(result.slabs[0].assignedArea - 40) < 1e-9);
  assert.ok(result.slabs[0].cells.every((cell) => cell.supportTag === `TAG-${cell.supportHandle}`));
});

test('tributary drawing reuses the AutoCAD polygon API', async () => {
  const calls = [];
  const drawing = {
    createLayer: async (...args) => calls.push(['createLayer', ...args]),
    polyline: async (...args) => {
      calls.push(['polyline', ...args]);
      return { handle: 'result' };
    },
  };
  const result = {
    slabs: [{
      slabHandle: 'slab', slabPolygon: slabRing, slabArea: 40,
      cells: [{ supportHandle: 'top', supportKind: 'wall-x', polygon: slabRing, area: 40 }],
      assignedArea: 40, unassignedArea: 0, warnings: [],
    }],
    warnings: [],
  };

  await TributaryAreaDrawer.draw(drawing, result, { layer: 'AREAS_TRIBUTARIAS', layerColorIndex: 1 });

  assert.equal(calls[0][0], 'createLayer');
  assert.equal(calls[1][0], 'polyline');
  assert.equal(calls[1][2], true);
  assert.deepEqual(calls[1][3], { layer: 'AREAS_TRIBUTARIAS' });
});

function support(handle, kind, coordinates) {
  return {
    kind,
    geometry: geometry(handle, coordinates.map(([x, y]) => ({ x, y })), true),
  };
}

function rectangleSupports() {
  return [
    support('bottom', 'wall-x', [[-0.2, -0.2], [10.2, -0.2], [10.2, 0], [-0.2, 0]]),
    support('top', 'wall-x', [[-0.2, 4], [10.2, 4], [10.2, 4.2], [-0.2, 4.2]]),
    support('left', 'wall-y', [[-0.2, -0.2], [0, -0.2], [0, 4.2], [-0.2, 4.2]]),
    support('right', 'wall-y', [[10, -0.2], [10.2, -0.2], [10.2, 4.2], [10, 4.2]]),
  ];
}

function geometry(handle, points, closed) {
  return {
    handle,
    type: 'Polyline',
    points: points.map(({ x, y }) => ({ x, y, z: 0 })),
    length: 0,
    closed,
    area: 0,
  };
}

function sumAreasByWall(cells) {
  const areas = new Map();
  for (const cell of cells) {
    areas.set(cell.wallId, (areas.get(cell.wallId) ?? 0) + ringArea(cell.polygon));
  }
  return areas;
}

function hasSegment(cells, expectedStart, expectedEnd, tolerance = 1e-9) {
  return cells.some(({ polygon }) => polygon.some((start, index) => {
    const end = polygon[(index + 1) % polygon.length];
    return (samePoint(start, expectedStart, tolerance) && samePoint(end, expectedEnd, tolerance))
      || (samePoint(start, expectedEnd, tolerance) && samePoint(end, expectedStart, tolerance));
  }));
}

function samePoint(a, b, tolerance) {
  return Math.hypot(a.x - b.x, a.y - b.y) <= tolerance;
}
