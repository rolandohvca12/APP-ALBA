import {
  OpenSeesNativeSession,
  type OpenSeesNativeSessionOptions,
} from 'openseesjs';
import type {
  SpatialStaticAnalysisResult,
  SpatialStaticCaseResult,
  SpatialStructuralModel,
} from '../domain/types.js';
import type { SpatialStructuralAnalysisStrategy } from './SpatialStructuralAnalysisStrategy.js';

export interface OpenSees3DStaticArtifact {
  caseId: string;
  nodeTags: ReadonlyMap<string, number>;
  elementTags: ReadonlyMap<string, number>;
}

export class OpenSees3DStaticStrategy implements SpatialStructuralAnalysisStrategy {
  public readonly engine = 'opensees' as const;

  public constructor(private readonly options: OpenSeesNativeSessionOptions = {}) { }

  public build(model: SpatialStructuralModel, caseId: string): OpenSees3DStaticArtifact {
    if (!model.loadCaseIds.includes(caseId)) throw new Error(`Unknown load case ${caseId}.`);
    const nodeTags = new Map(model.nodes.map((node, index) => [node.id, index + 1]));
    const elementTags = new Map<string, number>();
    let nextElementTag = 1;
    for (const pier of model.wallPiers) elementTags.set(pier.id, nextElementTag++);
    for (const arm of model.rigidArms) elementTags.set(arm.id, nextElementTag++);
    for (const lintel of model.lintels) elementTags.set(lintel.id, nextElementTag++);
    const expectedElements = model.wallPiers.length + model.rigidArms.length + model.lintels.length;
    if (elementTags.size !== expectedElements) {
      throw new Error(`OpenSees element coverage mismatch: expected ${expectedElements}, mapped ${elementTags.size}. Check duplicate element ids.`);
    }
    return { caseId, nodeTags, elementTags };
  }

  public async analyze(model: SpatialStructuralModel): Promise<SpatialStaticAnalysisResult> {
    const cases: SpatialStaticCaseResult[] = [];
    const diagnostics: string[] = [];

    for (const caseId of model.loadCaseIds) {
      const artifact = this.build(model, caseId);
      const session = new OpenSeesNativeSession(this.options);
      try {
        assembleCase(session, model, artifact);
        const status = session.query.analyze(1);
        session.ops.reactions();

        const nodes = new Map(model.nodes.map(node => [node.id, node]));
        const supportTags = model.fixedNodeIds.map(id => artifact.nodeTags.get(id)!);
        const reactions = session.query.nodeReactions(supportTags);
        const appliedResultant = appliedResultantFor(model, caseId);
        const baseReaction = model.fixedNodeIds.reduce((sum, nodeId) => {
          const tag = artifact.nodeTags.get(nodeId)!;
          const node = nodes.get(nodeId)!;
          const reaction = reactions[tag] ?? [];
          const rx = reaction[0] ?? 0;
          const ry = reaction[1] ?? 0;
          const rmz = reaction[5] ?? 0;
          sum.fx -= rx;
          sum.fy -= ry;
          sum.mz -= rmz + node.x * ry - node.y * rx;
          return sum;
        }, { fx: 0, fy: 0, mz: 0 });
        const equilibriumError = resultantError(appliedResultant, baseReaction);

        const masterTags = model.floorConstraints.map(floor => artifact.nodeTags.get(floor.masterNodeId)!);
        const displacements = session.query.nodeDisplacements(masterTags);
        const levels = model.floorConstraints.map(floor => {
          const values = displacements[artifact.nodeTags.get(floor.masterNodeId)!] ?? [];
          return {
            levelId: floor.levelId,
            ux: values[0] ?? Number.NaN,
            uy: values[1] ?? Number.NaN,
            rz: values[5] ?? Number.NaN,
          };
        });
        const wallActions = model.wallPiers.map(pier => {
          const forces = session.query.eleResponse(artifact.elementTags.get(pier.id)!, ['localForce']);
          const shearIndex = pier.direction === 'x' ? 2 : 1;
          const momentIndex = pier.direction === 'x' ? 4 : 5;
          return {
            wallId: pier.wallId,
            levelId: pier.levelId,
            direction: pier.direction,
            axial: Math.abs(forces[0] ?? Number.NaN),
            shear: Math.abs(forces[shearIndex] ?? Number.NaN),
            moment: Math.abs(forces[momentIndex] ?? Number.NaN),
            station: 'bottom' as const,
          };
        });
        const converged = status === 0 && equilibriumError <= 1e-5
          && levels.every(level => [level.ux, level.uy, level.rz].every(Number.isFinite))
          && wallActions.every(action => [action.axial, action.shear, action.moment].every(Number.isFinite));

        cases.push({ caseId, appliedResultant, baseReaction, equilibriumError, converged, levels, wallActions });
        diagnostics.push(`${caseId}: native status=${status}, equilibrium=${equilibriumError}`);
      } finally {
        session.close();
      }
    }
    return { engine: this.engine, modelId: model.id, cases, diagnostics };
  }
}

function assembleCase(
  session: OpenSeesNativeSession,
  model: SpatialStructuralModel,
  artifact: OpenSees3DStaticArtifact,
): void {
  const ops = session.ops;
  const nodes = new Map(model.nodes.map(node => [node.id, node]));
  let nextTransformTag = 2;

  ops.wipe();
  ops.model('basic', '-ndm', 3, '-ndf', 6);
  ops.nodes(model.nodes.map((node) => [artifact.nodeTags.get(node.id)!, node.x, node.y, node.z]));
  for (const nodeId of model.fixedNodeIds) ops.fix(artifact.nodeTags.get(nodeId)!, 1, 1, 1, 1, 1, 1);
  for (const floor of model.floorConstraints) ops.fix(artifact.nodeTags.get(floor.masterNodeId)!, 0, 0, 1, 1, 1, 0);
  ops.geomTransf('Linear', 1, [1, 0, 0]);

  for (const pier of model.wallPiers) {
    const ratio = pier.outOfPlaneStiffnessRatio;
    const inPlaneI = pier.section.bendingInertia;
    const inPlaneAv = pier.section.effectiveShearArea;
    const iy = pier.direction === 'x' ? inPlaneI : inPlaneI * ratio;
    const iz = pier.direction === 'y' ? inPlaneI : inPlaneI * ratio;
    const avy = pier.direction === 'y' ? inPlaneAv : inPlaneAv * ratio;
    const avz = pier.direction === 'x' ? inPlaneAv : inPlaneAv * ratio;
    ops.element(
      'ElasticTimoshenkoBeam', artifact.elementTags.get(pier.id)!,
      [artifact.nodeTags.get(pier.startNodeId)!, artifact.nodeTags.get(pier.endNodeId)!],
      pier.section.material.elasticModulus, pier.section.material.shearModulus,
      pier.section.area, Math.max(inPlaneI * ratio, 1e-14), iy, iz, avy, avz, 1,
    );
  }

  for (const arm of model.rigidArms) {
    const transformTag = nextTransformTag++;
    const vector = horizontalOrientation(nodes.get(arm.centerNodeId)!, nodes.get(arm.faceNodeId)!);
    ops.geomTransf('Linear', transformTag, vector);
    const area = arm.width * arm.depth;
    const iy = arm.depth * arm.width ** 3 / 12;
    const iz = arm.width * arm.depth ** 3 / 12;
    ops.element(
      'elasticBeamColumn', artifact.elementTags.get(arm.id)!,
      artifact.nodeTags.get(arm.centerNodeId)!, artifact.nodeTags.get(arm.faceNodeId)!,
      area, arm.material.elasticModulus * arm.stiffnessFactor,
      arm.material.shearModulus * arm.stiffnessFactor,
      rectangularTorsion(arm.width, arm.depth), iy, iz, transformTag,
    );
  }

  for (const lintel of model.lintels) {
    const transformTag = nextTransformTag++;
    const vector = horizontalOrientation(nodes.get(lintel.startNodeId)!, nodes.get(lintel.endNodeId)!);
    ops.geomTransf('Linear', transformTag, vector);
    const iy = lintel.depth * lintel.width ** 3 / 12;
    ops.element(
      'elasticBeamColumn', artifact.elementTags.get(lintel.id)!,
      artifact.nodeTags.get(lintel.startNodeId)!, artifact.nodeTags.get(lintel.endNodeId)!,
      lintel.area, lintel.material.elasticModulus, lintel.material.shearModulus,
      rectangularTorsion(lintel.width, lintel.depth), iy, lintel.bendingInertia,
      transformTag, ['-releasez', 3],
    );
  }

  for (const floor of model.floorConstraints) {
    ops.rigidDiaphragm(
      3,
      artifact.nodeTags.get(floor.masterNodeId)!,
      floor.constrainedNodeIds.map(id => artifact.nodeTags.get(id)!),
    );
  }
  ops.timeSeries('Linear', 1);
  ops.pattern('Plain', 1, 1);
  ops.loads(model.loads
    .filter(item => item.caseId === artifact.caseId)
    .map(load => [artifact.nodeTags.get(load.nodeId)!, load.fx, load.fy, 0, 0, 0, load.mz]));
  ops.system('BandGen');
  ops.numberer('RCM');
  ops.constraints('Transformation');
  ops.integrator('LoadControl', 1);
  ops.algorithm('Linear');
  ops.analysis('Static');
}

function appliedResultantFor(model: SpatialStructuralModel, caseId: string): { fx: number; fy: number; mz: number } {
  const nodes = new Map(model.nodes.map(node => [node.id, node]));
  return model.loads.filter(load => load.caseId === caseId).reduce((sum, load) => {
    const node = nodes.get(load.nodeId)!;
    sum.fx += load.fx;
    sum.fy += load.fy;
    sum.mz += load.mz + node.x * load.fy - node.y * load.fx;
    return sum;
  }, { fx: 0, fy: 0, mz: 0 });
}

function resultantError(applied: { fx: number; fy: number; mz: number }, reaction: { fx: number; fy: number; mz: number }): number {
  return Math.max(
    Math.abs(applied.fx - reaction.fx) / Math.max(Math.abs(applied.fx), 1),
    Math.abs(applied.fy - reaction.fy) / Math.max(Math.abs(applied.fy), 1),
    Math.abs(applied.mz - reaction.mz) / Math.max(Math.abs(applied.mz), 1),
  );
}

function rectangularTorsion(width: number, depth: number): number {
  const a = Math.max(width, depth);
  const b = Math.min(width, depth);
  const ratio = b / a;
  return Math.max(a * b ** 3 * (1 / 3 - 0.21 * ratio * (1 - ratio ** 4 / 12)), 1e-14);
}

function horizontalOrientation(start: { x: number; y: number }, end: { x: number; y: number }): [number, number, number] {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const length = Math.hypot(dx, dy);
  if (!(length > 0)) throw new Error('Horizontal frame element has coincident endpoints.');
  return [dy / length, -dx / length, 0];
}
