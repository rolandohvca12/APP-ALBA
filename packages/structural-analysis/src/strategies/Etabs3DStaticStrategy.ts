import {
  eDiaphragmOption,
  eItemTypeElm,
  eMatType,
  eTemperature,
  eUnits,
  type EtabsClient,
} from '@app-alba/etabs-bridge-client';
import type {
  ElasticMaterial,
  SpatialStaticAnalysisResult,
  SpatialStaticCaseResult,
  SpatialStructuralModel,
  WideColumnSection,
} from '../domain/types.js';
import type { SpatialStructuralAnalysisStrategy } from './SpatialStructuralAnalysisStrategy.js';
import { EtabsUserSeismicLoadWriter } from './etabs/EtabsUserSeismicLoadWriter.js';
import { etabsDisplayUnits } from './etabs/EtabsDisplayUnits.js';
import type { StructuralUnitSelection } from '../units/StructuralModelUnits.js';

export interface Etabs3DStaticStrategyOptions {
  savePath?: string;
  /** CSI integer color. Default: orange. */
  wallColor?: number;
  /** CSI integer color. Default: cyan. */
  lintelColor?: number;
  /** CSI integer color. Default: lime green. */
  rigidArmColor?: number;
  /** Requested ETABS UI units after analysis; inputs and raw results remain kN-m. */
  displayUnits?: StructuralUnitSelection;
}

export class Etabs3DStaticStrategy implements SpatialStructuralAnalysisStrategy {
  public readonly engine = 'etabs' as const;

  public constructor(
    private readonly client: EtabsClient,
    private readonly options: Etabs3DStaticStrategyOptions = {},
  ) {}

  public async analyze(model: SpatialStructuralModel): Promise<SpatialStaticAnalysisResult> {
    await etabsStage('initialize model', async () => {
      await this.client.sapModel.initializeNewModel(eUnits.kN_m_C);
      await this.client.file.newBlank();
      await this.client.sapModel.setPresentUnits(eUnits.kN_m_C);
    });
    await etabsStage('define stories', () => this.defineStories(model));
    const materialNames = await etabsStage('define materials', () => this.defineMaterials(model));
    const sectionNames = await etabsStage('define wall sections', () => this.defineWallSections(model, materialNames));
    const pointNames = await etabsStage('define points', () => this.definePoints(model));
    const frameNames = await etabsStage('define wall piers', () => this.definePiers(model, pointNames, sectionNames));
    await etabsStage('define lintels', () => this.defineLintels(model, pointNames, materialNames));
    const diaphragms = await etabsStage('assign diaphragms', () => this.assignDiaphragms(model, pointNames));
    await etabsStage('define Auto Seismic User Loads', () => new EtabsUserSeismicLoadWriter(this.client).define(model, diaphragms));
    await this.client.view.refreshView(0, true);
    await etabsStage('run analysis', () => this.runAnalysis(model));
    await this.client.sapModel.setPresentUnits(eUnits.kN_m_C);

    const cases: SpatialStaticCaseResult[] = [];
    for (const caseId of model.loadCaseIds) cases.push(await this.readCase(model, pointNames, frameNames, caseId));
    const display = this.options.displayUnits ? etabsDisplayUnits(this.options.displayUnits) : undefined;
    if (display) {
      await this.client.sapModel.setPresentUnits_2(display.force, display.length, eTemperature.C);
      if (this.options.savePath) await this.client.file.save(this.options.savePath);
    }
    await this.client.view.refreshView(0, true);
    return {
      engine: this.engine,
      modelId: model.id,
      cases,
      diagnostics: [
        '3D ETABS model with rigid UX/UY/RZ floor diaphragms.',
        'Wall frames retain a controlled residual out-of-plane stiffness.',
        'Base moments are reported about the ETABS global origin.',
        'Raw API results use kN-m; ETABS display units are set after extraction.',
        ...(display?.warning ? [display.warning] : []),
      ],
    };
  }

  private async runAnalysis(model: SpatialStructuralModel): Promise<void> {
    await this.prepareAnalysis(model);
    try {
      await this.client.analyze.runAnalysis();
    } catch (firstError) {
      // ETABS can retain a locked analysis model after an interrupted bridge session.
      await this.client.sapModel.setModelIsLocked(false);
      await this.client.analyze.deleteResults('', true);
      await this.prepareAnalysis(model);
      try {
        await this.client.analyze.runAnalysis();
      } catch (retryError) {
        const flags = await this.client.analyze.getRunCaseFlag();
        const enabled = flags.caseName.filter((_, index) => flags.run[index]).join(', ') || 'none';
        const first = firstError instanceof Error ? firstError.message : String(firstError);
        const retry = retryError instanceof Error ? retryError.message : String(retryError);
        throw new Error(`RunAnalysis failed twice. Enabled cases: ${enabled}. First: ${first}. Retry: ${retry}`, { cause: retryError });
      }
    }
  }

  private async prepareAnalysis(model: SpatialStructuralModel): Promise<void> {
    if (await this.client.sapModel.getModelIsLocked()) {
      await this.client.sapModel.setModelIsLocked(false);
    }
    await this.client.analyze.setRunCaseFlag('', false, true);
    for (const caseId of model.loadCaseIds) await this.client.analyze.setRunCaseFlag(caseId, true);
    const flags = await this.client.analyze.getRunCaseFlag();
    const enabled = new Set(flags.caseName.filter((_, index) => flags.run[index]));
    const missing = model.loadCaseIds.filter((caseId) => !enabled.has(caseId));
    if (missing.length > 0) throw new Error(`ETABS did not enable analysis cases: ${missing.join(', ')}.`);
    if (this.options.savePath) await this.client.file.save(this.options.savePath);
  }

  private async readCase(
    model: SpatialStructuralModel,
    points: ReadonlyMap<string, string>,
    frames: ReadonlyMap<string, string>,
    caseId: string,
  ): Promise<SpatialStaticCaseResult> {
    await this.client.analysisResultsSetup.deselectAllCasesAndCombosForOutput();
    await this.client.analysisResultsSetup.setCaseSelectedForOutput(caseId, true);
    const base = await this.client.analysisResults.baseReact();
    const index = base.loadCase.findIndex((name) => name === caseId);
    if (index < 0) throw new Error(`ETABS returned no base reaction for ${caseId}.`);
    const baseReaction = { fx: -base.fX[index]!, fy: -base.fY[index]!, mz: -base.mZ[index]! };
    const levels = [];
    for (const floor of model.floorConstraints) {
      const response = await this.client.analysisResults.jointDispl(points.get(floor.masterNodeId)!, eItemTypeElm.ObjectElm);
      const resultIndex = response.loadCase.findIndex((name) => name === caseId);
      if (resultIndex < 0) throw new Error(`ETABS returned no ${caseId} displacement for ${floor.levelId}.`);
      levels.push({ levelId: floor.levelId, ux: response.u1[resultIndex]!, uy: response.u2[resultIndex]!, rz: response.r3[resultIndex]! });
    }
    const wallActions = [];
    for (const pier of model.wallPiers) {
      const response = await this.client.analysisResults.frameForce(frames.get(pier.id)!, eItemTypeElm.ObjectElm);
      const candidates = response.loadCase
        .map((name, resultIndex) => ({ name, resultIndex }))
        .filter((item) => item.name === caseId)
        .sort((a, b) => response.objSta[a.resultIndex]! - response.objSta[b.resultIndex]!);
      const resultIndex = candidates[0]?.resultIndex;
      if (resultIndex === undefined) throw new Error(`ETABS returned no ${caseId} force for wall pier ${pier.id}.`);
      wallActions.push({
        wallId: pier.wallId,
        levelId: pier.levelId,
        direction: pier.direction,
        axial: Math.abs(response.p[resultIndex]!),
        shear: Math.abs((pier.direction === 'x' ? response.v2 : response.v3)[resultIndex]!),
        moment: Math.abs((pier.direction === 'x' ? response.m3 : response.m2)[resultIndex]!),
        station: 'bottom' as const,
      });
    }
    const appliedResultant = appliedResultantFor(model, caseId);
    const equilibriumError = resultantError(appliedResultant, baseReaction);
    return {
      caseId,
      appliedResultant,
      baseReaction,
      equilibriumError,
      converged: equilibriumError <= 1e-5
        && levels.every((level) => [level.ux, level.uy, level.rz].every(Number.isFinite))
        && wallActions.every((action) => [action.axial, action.shear, action.moment].every(Number.isFinite)),
      levels,
      wallActions,
    };
  }

  private async defineMaterials(model: SpatialStructuralModel): Promise<Map<string, string>> {
    const all = [
      ...model.wallPiers.map((pier) => ({ role: 'wall' as const, material: pier.section.material })),
      ...model.lintels.map((lintel) => ({ role: 'lintel' as const, material: lintel.material })),
    ];
    const names = new Map<string, string>();
    for (const item of all) {
      const key = roleMaterialKey(item.role, item.material);
      if (names.has(key)) continue;
      const sameRoleCount = [...names.keys()].filter((existing) => existing.startsWith(`${item.role}:`)).length;
      const baseName = item.role === 'wall' ? 'ALBANILERIA' : 'CONCRETO_DINTEL';
      const name = sameRoleCount === 0 ? baseName : `${baseName}_${sameRoleCount + 1}`;
      const poisson = item.material.poissonRatio ?? item.material.elasticModulus / (2 * item.material.shearModulus) - 1;
      const color = item.role === 'wall' ? this.wallColor : this.lintelColor;
      await this.client.propMaterial.setMaterial(name, eMatType.NoDesign, color);
      await this.client.propMaterial.setMPIsotropic(name, item.material.elasticModulus, poisson, item.material.thermalCoefficient ?? 0);
      if (item.material.weightPerVolume !== undefined) {
        await this.client.propMaterial.setWeightAndMass(name, 1, item.material.weightPerVolume);
      }
      names.set(key, name);
    }
    return names;
  }

  private async defineStories(model: SpatialStructuralModel): Promise<void> {
    const levels = [...model.floorConstraints].map((floor) => {
      const master = model.nodes.find((node) => node.id === floor.masterNodeId)!;
      return { id: floor.levelId, elevation: master.z };
    }).sort((a, b) => a.elevation - b.elevation);
    let previous = model.baseElevation;
    const heights = levels.map((level) => {
      const height = level.elevation - previous;
      previous = level.elevation;
      return height;
    });
    await this.client.story.setStories_2(
      model.baseElevation,
      levels.length,
      levels.map((level) => level.id),
      heights,
      levels.map(() => false),
      levels.map(() => ''),
      levels.map(() => false),
      levels.map(() => 0),
      levels.map(() => csiColor(180, 180, 180)),
    );
  }

  private async defineWallSections(model: SpatialStructuralModel, materials: ReadonlyMap<string, string>): Promise<Map<string, string>> {
    const names = new Map<string, string>();
    for (const pier of model.wallPiers) {
      if (names.has(pier.wallId)) continue;
      const name = `ALBA_3D_WALL_${safeName(pier.wallId)}`;
      await defineWallSection(this.client, name, materials.get(roleMaterialKey('wall', pier.section.material))!, pier.section, pier.direction, pier.outOfPlaneStiffnessRatio, this.wallColor, pier.wallId);
      names.set(pier.wallId, name);
    }
    return names;
  }

  private async definePoints(model: SpatialStructuralModel): Promise<Map<string, string>> {
    const names = new Map<string, string>(); const fixed = new Set(model.fixedNodeIds);
    for (const node of model.nodes) {
      const result = await this.client.pointObj.addCartesian(node.x, node.y, node.z, safeName(node.id), 'Global', true);
      names.set(node.id, result.name);
      const restraint = fixed.has(node.id)
        ? [true, true, true, true, true, true]
        : node.role === 'diaphragm-master' ? [false, false, true, true, true, false] : [false, false, false, false, false, false];
      await this.client.pointObj.setRestraint(result.name, restraint);
    }
    return names;
  }

  private async definePiers(model: SpatialStructuralModel, points: ReadonlyMap<string, string>, sections: ReadonlyMap<string, string>): Promise<Map<string, string>> {
    const names = new Map<string, string>();
    const nodes = new Map(model.nodes.map((node) => [node.id, node]));
    for (const wallId of new Set(model.wallPiers.map((pier) => pier.wallId))) await this.client.pierLabel.setPier(wallId);
    for (const pier of model.wallPiers) {
      const startPoint = points.get(pier.startNodeId)!;
      const endPoint = points.get(pier.endNodeId)!;
      const section = sections.get(pier.wallId)!;
      let frame;
      try {
        frame = await this.client.frameObj.addByPoint(startPoint, endPoint, section, safeName(pier.id));
      } catch (error) {
        const start = nodes.get(pier.startNodeId)!;
        const end = nodes.get(pier.endNodeId)!;
        const message = error instanceof Error ? error.message : String(error);
        throw new Error(
          `Wall pier ${pier.id} (${pier.wallId}, ${pier.levelId}) could not be created: `
          + `${startPoint} [${start.x}, ${start.y}, ${start.z}] -> ${endPoint} [${end.x}, ${end.y}, ${end.z}], `
          + `section=${section}. ${message}`,
          { cause: error },
        );
      }
      await this.client.frameObj.setPier(frame.name, pier.wallId);
      names.set(pier.id, frame.name);
    }
    return names;
  }

  private async defineLintels(model: SpatialStructuralModel, points: ReadonlyMap<string, string>, materials: ReadonlyMap<string, string>): Promise<void> {
    const arms = new Map(model.rigidArms.map((arm) => [arm.id, arm]));
    const lintelSections = new Map<string, string>();
    const armSections = new Map<string, string>();

    for (const lintel of model.lintels) {
      const key = horizontalSectionKey(lintel.width, lintel.depth, lintel.material);
      if (!lintelSections.has(key)) {
        const sectionName = `ALBA_3D_LINTEL_${lintelSections.size + 1}`;
        await defineHorizontalSection(this.client, sectionName, materials.get(roleMaterialKey('lintel', lintel.material))!, lintel.width, lintel.depth, this.lintelColor, 'Dintel');
        lintelSections.set(key, sectionName);
      }
    }
    for (const arm of model.rigidArms) {
      const key = `${horizontalSectionKey(arm.width, arm.depth, arm.material)}|${arm.stiffnessFactor}`;
      if (!armSections.has(key)) {
        const sectionName = `ALBA_3D_RIGID_ARM_${armSections.size + 1}`;
        await defineHorizontalSection(this.client, sectionName, materials.get(roleMaterialKey('lintel', arm.material))!, arm.width, arm.depth, this.rigidArmColor, 'Brazo rigido de solera');
        await this.client.propFrame.setModifiers(sectionName, [
          arm.stiffnessFactor, arm.stiffnessFactor, arm.stiffnessFactor,
          arm.stiffnessFactor, arm.stiffnessFactor, arm.stiffnessFactor, 1, 1,
        ]);
        armSections.set(key, sectionName);
      }
    }
    for (const arm of model.rigidArms) {
      const key = `${horizontalSectionKey(arm.width, arm.depth, arm.material)}|${arm.stiffnessFactor}`;
      const frame = await this.client.frameObj.addByPoint(points.get(arm.centerNodeId)!, points.get(arm.faceNodeId)!, armSections.get(key), safeName(arm.id));
      await this.client.frameObj.setLocalAxes(frame.name, 0);
    }
    for (const lintel of model.lintels) {
      const sectionName = lintelSections.get(horizontalSectionKey(lintel.width, lintel.depth, lintel.material))!;
      const frame = await this.client.frameObj.addByPoint(points.get(lintel.startNodeId)!, points.get(lintel.endNodeId)!, sectionName, safeName(`LINTEL:${lintel.id}`));
      await this.client.frameObj.setLocalAxes(frame.name, 0);
      if (!arms.has(lintel.startArmId) || !arms.has(lintel.endArmId)) throw new Error(`Lintel ${lintel.id} references a missing rigid arm.`);
      const releaseM3 = [false, false, false, false, false, true]; const zero = [0, 0, 0, 0, 0, 0];
      await this.client.frameObj.setReleases(frame.name, releaseM3, releaseM3, zero, zero);
    }
  }

  private async assignDiaphragms(model: SpatialStructuralModel, points: ReadonlyMap<string, string>): Promise<Map<string, string>> {
    const names = new Map<string, string>();
    for (const floor of model.floorConstraints) {
      const name = safeName(`ALBA_3D_D_${floor.levelId}`);
      await this.client.diaphragm.setDiaphragm(name, false);
      for (const nodeId of [floor.masterNodeId, ...floor.constrainedNodeIds]) {
        await this.client.pointObj.setDiaphragm(points.get(nodeId)!, eDiaphragmOption.DefinedDiaphragm, name);
      }
      names.set(floor.levelId, name);
    }
    return names;
  }

  private get wallColor(): number { return this.options.wallColor ?? csiColor(255, 165, 0); }
  private get lintelColor(): number { return this.options.lintelColor ?? csiColor(0, 200, 220); }
  private get rigidArmColor(): number { return this.options.rigidArmColor ?? csiColor(150, 220, 50); }
}

async function defineWallSection(client: EtabsClient, name: string, materialName: string, section: WideColumnSection, direction: 'x' | 'y', ratio: number, color: number, wallTag: string): Promise<void> {
  // ETABS T3 is displayed along local 2; T2 is displayed along local 3.
  const t3 = direction === 'x' ? section.displayLength : section.displayThickness;
  const t2 = direction === 'x' ? section.displayThickness : section.displayLength;
  const i22 = direction === 'y' ? section.bendingInertia : section.bendingInertia * ratio;
  const i33 = direction === 'x' ? section.bendingInertia : section.bendingInertia * ratio;
  const as2 = direction === 'x' ? section.effectiveShearArea : section.effectiveShearArea * ratio;
  const as3 = direction === 'y' ? section.effectiveShearArea : section.effectiveShearArea * ratio;
  await client.propFrame.setGeneral(name, materialName, t3, t2, section.area, as2, as3,
    Math.max(section.bendingInertia * ratio, 1e-14), i22, i33, 0, 0, 0, 0,
    Math.sqrt(i22 / section.area), Math.sqrt(i33 / section.area), color, `Muro de albanileria ${wallTag}`);
}

function appliedResultantFor(model: SpatialStructuralModel, caseId: string): { fx: number; fy: number; mz: number } {
  const nodes = new Map(model.nodes.map((node) => [node.id, node]));
  return model.loads.filter((load) => load.caseId === caseId).reduce((sum, load) => {
    const node = nodes.get(load.nodeId)!; sum.fx += load.fx; sum.fy += load.fy; sum.mz += load.mz + node.x * load.fy - node.y * load.fx; return sum;
  }, { fx: 0, fy: 0, mz: 0 });
}
function resultantError(a: { fx: number; fy: number; mz: number }, b: { fx: number; fy: number; mz: number }): number {
  return Math.max(Math.abs(a.fx - b.fx) / Math.max(Math.abs(a.fx), 1), Math.abs(a.fy - b.fy) / Math.max(Math.abs(a.fy), 1), Math.abs(a.mz - b.mz) / Math.max(Math.abs(a.mz), 1));
}
function rectangularTorsion(width: number, depth: number): number { const a = Math.max(width, depth); const b = Math.min(width, depth); const r = b / a; return Math.max(a * b ** 3 * (1 / 3 - 0.21 * r * (1 - r ** 4 / 12)), 1e-14); }
async function defineHorizontalSection(client: EtabsClient, name: string, materialName: string, width: number, depth: number, color: number, notes: string): Promise<void> {
  const area = width * depth;
  const iy = depth * width ** 3 / 12;
  const iz = width * depth ** 3 / 12;
  await client.propFrame.setGeneral(name, materialName, depth, width,
    area, 5 / 6 * area, 5 / 6 * area, rectangularTorsion(width, depth), iy, iz,
    0, 0, 0, 0, Math.sqrt(iy / area), Math.sqrt(iz / area), color, notes);
}
function materialKey(material: ElasticMaterial): string { return `${material.elasticModulus}|${material.shearModulus}|${material.poissonRatio ?? ''}|${material.thermalCoefficient ?? ''}|${material.weightPerVolume ?? ''}`; }
function horizontalSectionKey(width: number, depth: number, material: ElasticMaterial): string { return `${width}|${depth}|${materialKey(material)}`; }
function roleMaterialKey(role: 'wall' | 'lintel', material: ElasticMaterial): string { return `${role}:${materialKey(material)}`; }
function csiColor(red: number, green: number, blue: number): number { return red + 256 * green + 65536 * blue; }
function safeName(value: string): string { return value.replace(/[^A-Za-z0-9_-]+/g, '_').slice(0, 64); }

async function etabsStage<T>(name: string, operation: () => Promise<T>): Promise<T> {
  try { return await operation(); }
  catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`ETABS stage '${name}' failed: ${message}`, { cause: error });
  }
}
