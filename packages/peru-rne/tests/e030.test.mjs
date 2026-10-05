import assert from 'node:assert/strict';
import test from 'node:test';

import { E030_2026, units } from '../dist/index.js';

const e030 = new E030_2026();

test('identifies the approved 2026 edition and its amendment', () => {
  assert.equal(e030.source.legalInstrument, 'RM 183-2026-VIVIENDA');
  assert.deepEqual(e030.source.amendedBy, ['RM 217-2026-VIVIENDA']);
});

test('contains the complete Annex II district zoning catalog', () => {
  assert.equal(e030.zoning.size, 1892);
  assert.equal(e030.zoning.zone('Amazonas', 'Chachapoyas', 'Asunción'), 2);
  assert.equal(e030.zoning.zone('Lima', 'Lima', 'Miraflores'), 4);
  assert.equal(e030.zoning.zone('Cusco', 'Cusco', 'Cusco'), 2);
});

test('classifies soil and interpolates 2026 site parameters', () => {
  assert.equal(e030.hazard.classifySoil({ vs30Mps: 450 }), 'S2');
  assert.equal(e030.hazard.classifySoil({ correctedN60: 20 }), 'S3');
  const site = e030.hazard.siteParameters(4, 'S2', 450);
  assert.ok(Math.abs(site.soilFactor - 1.05) < 1e-12);
  assert.ok(Math.abs(site.tpSeconds - 0.5) < 1e-12);
  assert.ok(Math.abs(site.tlSeconds - 2.25) < 1e-12);
  assert.equal(e030.hazard.siteParameters(4, 'S4').requiresSiteResponseAnalysis, true);
});

test('uses the new short-period spectrum and static plateau', () => {
  assert.equal(e030.hazard.amplificationFactor(0, 0.6, 2), 1);
  assert.equal(e030.hazard.amplificationFactor(0.1, 0.6, 2), 2.25);
  assert.equal(e030.hazard.staticAmplificationFactor(0.1, 0.6, 2), 2.5);
});

test('calculates category, structural system and reduction factors', () => {
  assert.equal(e030.buildings.useFactor({ category: 'B', seismicZone: 4 }), 1.3);
  assert.equal(e030.buildings.basicReductionFactor('masonry'), 3);
  assert.equal(e030.buildings.reductionFactor('concrete-dual', ['mass'], ['reentrantCorner']), 5.67);
  assert.equal(e030.buildings.classifyConcreteSystem(0.5), 'concrete-dual');
});

test('calculates seismic weight and static base shear with explicit units', () => {
  const weight = e030.seismicWeight.calculate({
    permanentLoad: units.quantity(100, 'tf'),
    liveLoad: units.quantity(20, 'tf'),
    category: 'C',
  });
  assert.ok(Math.abs(weight - units.convert(105, 'tf', 'kN')) < 1e-9);
  const shear = e030.staticAnalysis.baseShear({ zoneFactor: 0.45, useFactor: 1, amplificationFactor: 2.5, soilFactor: 1, reductionFactor: 3, seismicWeight: 1000 });
  assert.equal(shear.baseShearKN, 375);
});

test('distributes static force and evaluates modal minimum shear', () => {
  const forces = e030.staticAnalysis.distributeByHeight(300, [
    { level: 1, weight: 100, height: 3 },
    { level: 2, weight: 100, height: 6 },
  ], 0.4);
  assert.ok(Math.abs(forces.reduce((sum, item) => sum + item.forceKN, 0) - 300) < 1e-12);
  assert.equal(e030.modalSpectral.minimumBaseShearScale(70, 100, true), 80 / 70);
});

test('checks drift, separation and instrumentation', () => {
  assert.equal(e030.driftAndSeparation.checkDrift(0.004, 'masonry').status, 'pass');
  assert.equal(e030.driftAndSeparation.checkDrift(0.006, 'masonry').status, 'fail');
  assert.ok(Math.abs(e030.driftAndSeparation.minimumBuildingSeparation(0.45, 1, 10) - 0.09) < 1e-12);
  assert.deepEqual(e030.instrumentation.requiredStations({ coveredArea: 12_000, category: 'C', stories: 5, hasBaseIsolation: false, hasEnergyDissipation: false }), { baseStations: 1, roofStations: 0, total: 1 });
});

test('builds E.030 reports without affecting E.070 metadata', () => {
  const report = e030.report([e030.driftAndSeparation.checkDrift(0.004, 'masonry')]);
  assert.equal(report.code, 'RNE-E.030');
  assert.equal(report.edition, '2026');
  assert.equal(report.compliant, true);
});
