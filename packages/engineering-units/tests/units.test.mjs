import assert from 'node:assert/strict';
import test from 'node:test';
import { UnitSystems, units } from '../dist/index.js';

test('converts metric engineering units', () => {
  assert.equal(units.convert(13, 'cm', 'm'), 0.13);
  assert.ok(Math.abs(units.convert(1, 'tf', 'kN') - 9.80665) < 1e-12);
  assert.ok(Math.abs(units.convert(1, 'MPa', 'kgf/cm2') - 10.197162129779) < 1e-9);
  assert.equal(units.convert(1, 'MPa', 'N/mm2'), 1);
  assert.equal(units.convert(1, 'N/mm', 'kN/m'), 1);
  assert.equal(units.convert(1, 'g', 'm/s2'), 9.80665);
});

test('converts imperial engineering units', () => {
  assert.ok(Math.abs(units.convert(1, 'kip', 'kN') - 4.4482216152605) < 1e-12);
  assert.ok(Math.abs(units.convert(1, 'ft', 'm') - 0.3048) < 1e-12);
});

test('unit systems read bare and explicit quantities', () => {
  assert.equal(UnitSystems.tf_m.read(1, 'force'), 9806.65);
  assert.equal(UnitSystems.kN_m.read(units.quantity(1000, 'mm'), 'length'), 1);
});

test('rejects incompatible dimensions at runtime', () => {
  assert.throws(() => units.convert(1, 'm', 'kN'), /not a length unit/);
  assert.throws(() => UnitSystems.kN_m.read({ value: 1, unit: 'kN' }, 'length'), /not a length unit/);
});
