import assert from 'node:assert/strict';
import test from 'node:test';
import { DistinctGeometrySelector, ScaledGeometrySelector, StructuralModelUnits, StructuralResultUnits } from '../dist/index.js';
import { wallActionsCsv } from '../examples/report/wall-actions-csv.mjs';
import { e030_2026 } from '../../peru-rne/dist/index.js';

test('derives force, stress, specific weight and moment from tf-m', () => {
  const units = new StructuralModelUnits({ force: 'tf', length: 'm' });
  assert.equal(units.force(1), 9.80665);
  assert.equal(units.forcePerArea(325_000), 3_187_161.25);
  assert.ok(Math.abs(units.forcePerVolume(1.8) - 17.65197) < 1e-12);
  assert.equal(units.fromForce(units.force(3)), 3);
  assert.equal(units.fromMoment(9.80665), 1);
  assert.equal(units.labels.stress, 'tf/m2');
});

test('supports another force-length combination without hardcoded conversion factors', () => {
  const units = new StructuralModelUnits({ force: 'kip', length: 'ft' });
  assert.equal(units.length(1), 0.3048);
  assert.ok(Math.abs(units.fromForce(units.force(2)) - 2) < 1e-12);
  assert.ok(Math.abs(units.fromLength(units.length(2)) - 2) < 1e-12);
  assert.ok(Math.abs(units.forcePerArea(1) - units.force(1) / units.length(1) ** 2) < 1e-12);
  assert.ok(Math.abs(units.forcePerVolume(1) - units.force(1) / units.length(1) ** 3) < 1e-12);
});

test('feeds E.030 in kN and reports seismic forces back in tf', () => {
  const units = new StructuralModelUnits({ force: 'tf', length: 'm' });
  const base = e030_2026.staticAnalysis.baseShear({
    zoneFactor: 0.45, useFactor: 1, soilFactor: 1, amplificationFactor: 2.5,
    reductionFactor: 3, seismicWeight: units.force(100),
  });
  assert.ok(Math.abs(units.fromForce(base.baseShearKN) - 37.5) < 1e-12);
  const floors = e030_2026.staticAnalysis.distributeByHeight(base.baseShearKN, [
    { level: 'N1', weight: units.force(60), height: units.length(3) },
    { level: 'N2', weight: units.force(40), height: units.length(6) },
  ], 0.2);
  assert.ok(Math.abs(units.fromForce(floors.reduce((sum, floor) => sum + floor.forceKN, 0)) - 37.5) < 1e-12);
});

test('scales AutoCAD drawing geometry before it reaches mass and model services', async () => {
  const raw = { handle: 'A', type: 'Polyline', closed: true, length: 2000, area: 100000, points: [
    { x: 0, y: 0, z: 0 }, { x: 2000, y: 0, z: 0 }, { x: 2000, y: 50, z: 0 }, { x: 0, y: 50, z: 0 },
  ] };
  const source = { resolve: async () => [raw], resolveLabels: async () => new Map([['A', 'MUROS_X']]), describe: () => 'layer:MUROS_X' };
  const selector = new ScaledGeometrySelector(source, 'mm');
  const [wall] = await selector.resolve({});
  assert.equal(wall.points[1].x, 2);
  assert.equal(wall.points[2].y, 0.05);
  assert.ok(Math.abs(wall.area - 0.1) < 1e-12);
  assert.equal(wall.length, 2);
  assert.equal(raw.points[1].x, 2000);
});

test('removes coincident AutoCAD geometry regardless of ring start and direction', async () => {
  const geometry = (handle, points) => ({
    handle, type: 'Polyline', closed: true, length: 8, area: 4, points,
  });
  const points = [
    { x: 0, y: 0, z: 0 }, { x: 2, y: 0, z: 0 },
    { x: 2, y: 2, z: 0 }, { x: 0, y: 2, z: 0 },
  ];
  const source = {
    resolve: async () => [
      geometry('4BD', points),
      geometry('4C7', [points[2], points[1], points[0], points[3]]),
      geometry('OTHER', points.map((point) => ({ ...point, x: point.x + 3 }))),
    ],
    resolveLabels: async () => new Map(),
    describe: () => 'test',
  };
  const duplicates = [];
  const selector = new DistinctGeometrySelector(source, 1e-6, (item) => duplicates.push(item));

  const resolved = await selector.resolve({});

  assert.deepEqual(resolved.map((item) => item.handle), ['4BD', 'OTHER']);
  assert.deepEqual(duplicates, [{ keptHandle: '4BD', duplicateHandle: '4C7' }]);
});

test('converts solver results to selected output units without mutating raw results', () => {
  const units = new StructuralResultUnits(new StructuralModelUnits({ force: 'tf', length: 'm' }));
  const raw = { engine: 'opensees', modelId: 'M', diagnostics: [], cases: [{
    caseId: 'SX', appliedResultant: { fx: 9.80665, fy: 0, mz: 9.80665 },
    baseReaction: { fx: 9.80665, fy: 0, mz: 9.80665 },
    equilibriumError: 0, converged: true,
    levels: [{ levelId: 'N1', ux: 0.01, uy: 0, rz: 0 }],
    wallActions: [{ wallId: 'M1X', levelId: 'N1', direction: 'x', axial: 9.80665, shear: 9.80665, moment: 9.80665, station: 'bottom' }],
  }] };
  const report = units.analysis(raw);
  assert.equal(report.cases[0].wallActions[0].shear, 1);
  assert.equal(report.cases[0].wallActions[0].moment, 1);
  assert.equal(report.cases[0].appliedResultant.fx, 1);
  assert.equal(raw.cases[0].wallActions[0].shear, 9.80665);
  const csv = wallActionsCsv({ openSees: report, etabs: null }, ['N1'], new StructuralModelUnits({ force: 'tf', length: 'm' }).labels);
  assert.match(csv, /V22: tf, M33: tf-m/);
  assert.match(csv, /M1X,1\.000,1\.000/);
});
