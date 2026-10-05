import type { NormativeSource } from '../../core/types.js';
import { NormRuleEngine } from '../../core/rules.js';

export const E030_2026_SOURCE: NormativeSource = Object.freeze({
  code: 'RNE-E.030',
  edition: '2026',
  status: 'inForce',
  legalInstrument: 'RM 183-2026-VIVIENDA',
  amendedBy: ['RM 217-2026-VIVIENDA'],
  officialRegistryUrl: 'https://www.gob.pe/institucion/vivienda/normas-legales/8081915-183-2026-vivienda',
  publicationSha256: '229B1D6929F5DAD92FD850968E1325AB5696305521E8A5C987035AA1259B271F',
});

export const e030Rules = new NormRuleEngine({
  code: 'RNE-E.030',
  edition: '2026',
  legallyApprovedBy: 'RM 183-2026-VIVIENDA',
});

export type E030SeismicZone = 1 | 2 | 3 | 4;
export type E030SoilProfile = 'S0' | 'S1' | 'S2' | 'S3' | 'S4' | 'S5';
