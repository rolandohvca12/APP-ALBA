# @app-alba/peru-rne

Implementación tipada, versionada y auditable de reglas estructurales del Reglamento Nacional de Edificaciones del Perú.

Las ediciones disponibles son `RNE E.070:2006` y `RNE E.030:2026`. La edición forma parte del nombre público (`E070_2006`, `E030_2026`) para impedir que una actualización normativa cambie resultados silenciosamente.

```ts
import { E070_2006 } from '@app-alba/peru-rne';

const e070 = new E070_2006();
const checks = [
  e070.minimumRequirements.checkWallThickness({
    seismicZone: 3,
    clearHeightM: 2.4,
    effectiveThicknessM: 0.13,
  }),
  e070.analysis.checkStoryDrift(0.004),
];

const report = e070.report(checks);
console.log(report.compliant, report.results);
```

Los números simples mantienen las unidades canónicas indicadas por el nombre del campo. También puede proporcionarse una magnitud explícita en cualquier unidad compatible:

```ts
import { E070_2006, units } from '@app-alba/peru-rne';

const e070 = new E070_2006();
const result = e070.minimumRequirements.checkWallThickness({
  seismicZone: 3,
  clearHeightM: units.quantity(240, 'cm'),
  effectiveThicknessM: units.quantity(130, 'mm'),
});
```

## Criterios de diseño

- SI canónico interno: `m`, `kN`, `MPa`, `mm2` para acero; las fronteras aceptan magnitudes explícitas convertibles.
- Resultados con artículo, demanda, límite y estado.
- Las inspecciones no inferibles se reportan como `manual`.
- E.020, E.030 y E.060 se mantienen como dependencias normativas externas; no se sustituyen por valores implícitos.
- La zona sísmica es explícitamente la zonificación de 2006 (`1 | 2 | 3`). La futura implementación E.030 proporcionará la adaptación versionada.

Este paquete ayuda a verificar y documentar el diseño; no reemplaza el juicio ni la responsabilidad del ingeniero estructural.

## E.030:2026

```ts
import { E030_2026, units } from '@app-alba/peru-rne';

const e030 = new E030_2026();
const zone = e030.zoning.zone('Lima', 'Lima', 'Miraflores');
const z = e030.hazard.zoneFactor(zone);
const site = e030.hazard.siteParameters(zone, 'S2', 450);
if (site.requiresSiteResponseAnalysis || site.soilFactor === null || site.tpSeconds === null || site.tlSeconds === null) {
  throw new Error('Se requiere análisis de respuesta de sitio');
}
const c = e030.hazard.staticAmplificationFactor(0.4, site.tpSeconds, site.tlSeconds);
const r = e030.buildings.reductionFactor('masonry', [], []);

const shear = e030.staticAnalysis.baseShear({
  zoneFactor: z,
  useFactor: 1,
  amplificationFactor: c,
  soilFactor: site.soilFactor,
  reductionFactor: r,
  seismicWeight: units.quantity(100, 'tf'),
});
```

La zonificación del Anexo II se distribuye como catálogo estático versionado; no requiere conexión ni base de datos.
