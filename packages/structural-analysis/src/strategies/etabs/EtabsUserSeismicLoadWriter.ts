import { eLoadPatternType, type EtabsClient } from '@app-alba/etabs-bridge-client';
import type { SpatialStructuralModel } from '../../domain/types.js';

const TABLE_KEY = 'Load Pattern Definitions - Auto Seismic - User Loads';
const TABLE_VERSION = 1;
const FIELDS = [
  'Name', 'NumberSets', 'SetNumber', 'LoadAtCM', 'EccRatio', 'Story',
  'Diaphragm', 'Fx', 'Fy', 'Mz', 'X', 'Y',
] as const;

/** Writes ETABS Auto Lateral Load = User Loads through its editable database table. */
export class EtabsUserSeismicLoadWriter {
  public constructor(private readonly client: EtabsClient) {}

  public async define(model: SpatialStructuralModel, diaphragmNames: ReadonlyMap<string, string>): Promise<void> {
    const nodes = new Map(model.nodes.map((node) => [node.id, node]));
    for (const caseId of model.loadCaseIds) {
      await this.client.loadPatterns.add(caseId, eLoadPatternType.Quake, 0, true);
    }
    const rows = model.loadCaseIds.flatMap((caseId) => {
      const loads = model.loads.filter((load) => load.caseId === caseId);
      return loads.map((load, index) => {
        const diaphragm = diaphragmNames.get(load.levelId);
        if (!diaphragm) throw new Error(`No ETABS diaphragm exists for level ${load.levelId}.`);
        const applicationPoint = nodes.get(load.nodeId);
        if (!applicationPoint) throw new Error(`No ETABS load application point exists for node ${load.nodeId}.`);
        return [
          caseId,
          index === 0 ? '1' : '',
          '1',
          'No',
          '0',
          load.levelId,
          diaphragm,
          numberText(load.fx),
          numberText(load.fy),
          numberText(load.mz),
          numberText(applicationPoint.x),
          numberText(applicationPoint.y),
        ];
      });
    });
    await this.client.databaseTables.setTableForEditingArray(
      TABLE_KEY,
      TABLE_VERSION,
      [...FIELDS],
      rows.length,
      rows.flat(),
    );
    const applied = await this.client.databaseTables.applyEditedTables(true);
    if (applied.numFatalErrors > 0 || applied.numErrorMsgs > 0) {
      throw new Error(`ETABS rejected User Loads: ${applied.importLog || `${applied.numFatalErrors} fatal, ${applied.numErrorMsgs} errors`}`);
    }
    for (const caseId of model.loadCaseIds) {
      const code = await this.client.loadPatterns.getAutoSeismicCode(caseId);
      if (normalize(code.codeName) !== 'userloads') {
        throw new Error(`ETABS load pattern ${caseId} was created as '${code.codeName}', expected 'User Loads'.`);
      }
    }
  }
}

function numberText(value: number): string {
  if (!Number.isFinite(value)) throw new RangeError('ETABS User Loads require finite values.');
  return String(value);
}

function normalize(value: string): string { return value.toLowerCase().replace(/[^a-z]/g, ''); }
