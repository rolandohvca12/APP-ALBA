import type { NormativeSource } from '../../core/types.js';

export const E070_2006_SOURCE: NormativeSource = Object.freeze({
  code: 'RNE-E.070',
  edition: '2006',
  status: 'inForce',
  legalInstrument: 'DS 011-2006-VIVIENDA',
  officialRegistryUrl:
    'https://www.gob.pe/institucion/sencico/informes-publicaciones/887225normas-del-reglamento-nacional-de-edificaciones-rne',
  publicationSha256: '2310F847BAB9F70CBD266F7F25BBFCBDBC97B43D7B9B693F3D0C047736F9AD08',
});

export type E070SeismicZone2006 = 1 | 2 | 3;

export const E070_2006_UNITS = Object.freeze({
  policy: 'canonical-internal-units',
  length: 'm',
  area: 'm2',
  force: 'kN',
  stress: 'MPa',
  moment: 'kN-m',
  reinforcementArea: 'mm2',
});
