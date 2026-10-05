import assert from 'node:assert/strict';
import test from 'node:test';

import { E070_2006, units } from '../dist/index.js';

const e070 = new E070_2006();

test('identifies the legally approved edition', () => {
  assert.equal(e070.source.edition, '2006');
  assert.equal(e070.source.legalInstrument, 'DS 011-2006-VIVIENDA');
});

test('keeps Table 1 classification separate from Table 9 masonry properties', () => {
  assert.deepEqual(e070.materials.unitClassLimits('Ladrillo IV'), {
    variationPercent: [4, 3, 2],
    warpageMm: 4,
    compressiveStrengthMpa: 12.7,
  });
  assert.deepEqual(e070.materials.table9Properties('clay-king-kong-industrial'), {
    id: 'clay-king-kong-industrial',
    rawMaterial: 'clay',
    denomination: 'King Kong Industrial',
    unitCompressiveStrengthMpa: 14.2,
    masonryCompressiveStrengthMpa: 6.4,
    masonryShearStrengthMpa: 0.8,
    reinforcedMasonryOnly: false,
  });
});

test('checks minimum wall thickness by seismic zone', () => {
  const pass = e070.minimumRequirements.checkWallThickness({
    seismicZone: 3,
    clearHeightM: 2.4,
    effectiveThicknessM: 0.13,
  });
  const fail = e070.minimumRequirements.checkWallThickness({
    seismicZone: 3,
    clearHeightM: 2.8,
    effectiveThicknessM: 0.13,
  });
  assert.equal(pass.status, 'pass');
  assert.equal(fail.status, 'fail');
  assert.ok(Math.abs(fail.limit.value - 0.14) < 1e-12);
});

test('accepts explicit units without changing the physical result', () => {
  const metric = e070.minimumRequirements.checkWallThickness({
    seismicZone: 3,
    clearHeightM: units.quantity(240, 'cm'),
    effectiveThicknessM: units.quantity(130, 'mm'),
  });
  assert.equal(metric.status, 'pass');
  assert.ok(Math.abs(metric.demand.value - 0.13) < 1e-12);

  const canonical = e070.analysis.crackingShear({
    material: 'clay', vmMpa: 0.5, wallThicknessM: 0.13, wallLengthM: 3,
    axialDeadLoadKN: 100, elasticShearKN: 30, elasticMomentKNm: 120,
  });
  const converted = e070.analysis.crackingShear({
    material: 'clay',
    vmMpa: units.quantity(units.convert(0.5, 'MPa', 'kgf/cm2'), 'kgf/cm2'),
    wallThicknessM: units.quantity(13, 'cm'),
    wallLengthM: units.quantity(3000, 'mm'),
    axialDeadLoadKN: units.quantity(units.convert(100, 'kN', 'tf'), 'tf'),
    elasticShearKN: units.quantity(units.convert(30, 'kN', 'tf'), 'tf'),
    elasticMomentKNm: units.quantity(units.convert(120, 'kN-m', 'tf-m'), 'tf-m'),
  });
  assert.ok(Math.abs(converted - canonical) < 1e-9);
});

test('computes masonry elastic properties and cracking shear', () => {
  assert.deepEqual(e070.analysis.elasticProperties('clay', 5), {
    elasticModulusMpa: 2500,
    shearModulusMpa: 1000,
  });
  const vm = e070.analysis.crackingShear({
    material: 'clay',
    vmMpa: 0.5,
    wallThicknessM: 0.13,
    wallLengthM: 3,
    axialDeadLoadKN: 100,
    elasticShearKN: 30,
    elasticMomentKNm: 120,
  });
  assert.ok(Math.abs(vm - 96.125) < 1e-9);
});

test('interpolates out-of-plane moment coefficients', () => {
  assert.equal(e070.outOfPlane.momentCoefficient(3, 2), 0.125);
  assert.ok(Math.abs(e070.outOfPlane.momentCoefficient(1, 1.1) - 0.0553) < 1e-10);
});

test('reports failures without hiding manual checks', () => {
  const report = e070.report([
    e070.analysis.checkStoryDrift(0.006),
    e070.construction.inspectionRequired(),
  ]);
  assert.equal(report.compliant, false);
  assert.equal(report.summary.fail, 1);
  assert.equal(report.summary.manual, 1);
});

test('designs a confined column using strength and geometric minima', () => {
  const result = e070.confinedMasonry.designColumn({
    shearKN: 20,
    tensionKN: 10,
    concreteStrengthMpa: 21,
    steelYieldMpa: 420,
    frictionCoefficient: 0.8,
    wallThicknessM: 0.13,
    providedConcreteAreaMm2: 20_000,
    providedSteelAreaMm2: 500,
  });
  assert.equal(result.requiredConcreteAreaMm2, 19_500);
  assert.equal(result.checks[0].status, 'pass');
});
