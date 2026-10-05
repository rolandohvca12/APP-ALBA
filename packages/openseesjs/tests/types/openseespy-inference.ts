import { OpenSeesNativeSession, createOpenSeesOps, ops as globalOps } from '../../dist/native-index.js';
import type { OpenSeesNativeBinding, OpenSeesOps } from '../../dist/native-index.js';

const ops: OpenSeesOps = globalOps;

ops.model('basic', '-ndm', 2);
ops.model('Basic', '-ndm', 2, '-ndf', 3);
ops.model('BasicBuilder', '-ndm', 3, '-ndf', 6);
ops.node(1, 0, 0, '-ndf', 3);
ops.node(2, 1, 2, '-mass', [10, 10, 0]);
ops.node(3, 1, 2, 3, '-disp', [0, 0, 0], '-vel', [0, 0, 0], '-accel', [0, 0, 0]);
ops.fix(1, 1, 1, 1);
ops.nodeDisp(1, 2);

ops.algorithm('Newton', false, false, true);
ops.integrator('DisplacementControl', 2, 1, 0.001, 10, 0.0001, 0.01);
ops.section('Elastic', 1, 200_000_000, 0.25, 0.005);
ops.uniaxialMaterial('Concrete01', 1, -28_000, -0.002, -5_000, -0.006);
ops.uniaxialMaterial('Steel02', 2, 420_000, 200_000_000, 0.01, 18, 0.925, 0.15);
ops.uniaxialMaterial('Steel01', 4, 420_000, 200_000_000, 0.01);
ops.uniaxialMaterial('Steel01', 5, 420_000, 200_000_000, 0.01, 0.01, 1, 0.01, 1);
ops.nDMaterial('ElasticIsotropic', 3, 25_000_000, 0.2, 2.4);
ops.element('BeamContact2D', 1, 1, 2, 3, 4, 1, 0.3, 1e-8, 1e-8, 0);
ops.element('Truss', 2, 1, 2, 0.01, 2);
ops.element('zeroLength', 3, 2, 3, '-mat', [1, 2], '-dir', [1, 2]);
ops.element('elasticBeamColumn', 4, 1, 2, 0.30, 25_000_000, 0.002, 1);
ops.element.elasticBeamColumn(7, 1, 2, 0.30, 25_000_000, 0.002, 1);
ops.element.Truss(8, 1, 2, 0.01, 2);
ops.element['20NodeBrick'](9, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20], 3, 0, 0, -9.81, 2.4);
ops.uniaxialMaterial.Steel01(10, 420_000, 200_000_000, 0.01);
ops.nDMaterial.ElasticIsotropic(11, 25_000_000, 0.2, 2.4);
ops.section.Elastic(12, 25_000_000, 0.25, 0.005);
ops.beamIntegration.Lobatto(13, 12, 5);
ops.recorder.Node('-file', 'disp.out', '-node', [1, 2], '-dof', [1], 'disp');
ops.algorithm.Newton();
ops.analysis.Static();
ops.constraints.Transformation();
ops.geomTransf.Linear(2);
ops.integrator.LoadControl(0.1);
ops.numberer.RCM();
ops.system.BandGen();
ops.test.NormDispIncr(1e-8, 20);
ops.timeSeries.Linear(2);
ops.element('elasticBeamColumn', 5, 1, 2, 10, 1, ['-mass', 2.4, '-cMass']);
ops.element(
  'elasticBeamColumn',
  6, 1, 2,
  0.30, 25_000_000, 10_000_000, 0.001, 0.002, 0.003, 1,
  ['-releasez', 3, '-releasey', 1],
);
ops.eleLoad('-ele', [1], '-type', '-beamUniform', [0, 0, 0.5, 1, -5, 0]);
ops.eleLoad('-ele', [1], '-type', '-beamUniform', [0, 0, 0, 0.5, 1, -5, 0, 0]);
ops.timeSeries('Linear', 1, '-factor', 2);
ops.analyze(10, 0.01);
ops.command('externalPackageCommand', [1, 2, 3]);

declare const nativeBinding: OpenSeesNativeBinding;
const native = new OpenSeesNativeSession({ binding: nativeBinding });
native.ops.node(1, 0, 0);
native.ops.element.elasticBeamColumn(1, 1, 2, 0.30, 25_000_000, 0.002, 1);
const displacement: number = native.query.nodeDisp(1, 1);
const displacementVector: number[] = native.query.nodeDisp(1);
const reactions: number[] = native.query.nodeReaction(1);
const displacementRecord: Readonly<Record<number, readonly number[]>> = native.query.nodeDisplacements([1, 2]);
const reactionRecord: Readonly<Record<number, readonly number[]>> = native.query.nodeReactions([1, 2]);
const forceRecord: Readonly<Record<number, readonly number[]>> = native.query.elementForces([1, 2]);
const analysisCode: number = native.query.analyze(1);
globalOps.wipe().model('basic', '-ndm', 2, '-ndf', 3).node(1, 0, 0);
globalOps.element.elasticBeamColumn(1, 1, 2, 0.30, 25_000_000, 0.002, 1);
const globalAnalysisCode: number = globalOps.analyze(1);
const globalReaction: number = globalOps.nodeReaction(1, 2);
const systemMatrix: number[] = globalOps.printA('-ret');
const printStatus: number = globalOps.printA('-file', 'matrix.txt');
const modalReport = globalOps.modalProperties('-file', 'modal.txt', '-unorm');
const isolatedOps = createOpenSeesOps({ binding: nativeBinding });
isolatedOps.nodes([[1, 0, 0], [2, 1, 0]]).loads([[2, 10, 0]]);
isolatedOps.dispose();

// Required arguments must remain visible to TypeScript callers.
// @ts-expect-error nodeTag and at least one coordinate are required.
ops.node();
// @ts-expect-error only aliases of the Basic Model Builder are supported.
ops.model('CustomBuilder', '-ndm', 2);
// @ts-expect-error at least one coordinate is required.
ops.node(1);
// @ts-expect-error unsupported node flag.
ops.node(1, 0, 0, '-temperature', 20);
// @ts-expect-error nodeTag and at least one constraint are required.
ops.fix();
// @ts-expect-error the Concrete01 material parameters are required.
ops.uniaxialMaterial('Concrete01', 1);
// @ts-expect-error Steel01 isotropic hardening requires all four optional coefficients.
ops.uniaxialMaterial('Steel01', 4, 420_000, 200_000_000, 0.01, 0.01);
// @ts-expect-error BeamContact2D requires its nodes, material and tolerances.
ops.element('BeamContact2D', 1);
// @ts-expect-error Truss requires both nodes, area and material.
ops.element('Truss', 1);
// @ts-expect-error elasticBeamColumn requires its tag, nodes, section properties and transformation.
ops.element('elasticBeamColumn', 1, 1, 2);
// @ts-expect-error the discoverable variant keeps the same required arguments.
ops.element.elasticBeamColumn(1, 1, 2);
// @ts-expect-error variant material methods preserve required constitutive parameters.
ops.uniaxialMaterial.Steel01(1, 420_000);
// @ts-expect-error recorder Node requires destination, selection, dofs and response.
ops.recorder.Node('-file', 'disp.out');
// @ts-expect-error Lobatto requires integration tag, section tag and point count.
ops.beamIntegration.Lobatto(1, 2);
// @ts-expect-error elasticBeamColumn only accepts documented option flags.
ops.element('elasticBeamColumn', 4, 1, 2, 0.30, 25_000_000, 0.002, 1, ['-unknown']);
// @ts-expect-error a partial trapezoidal 2D load requires six values.
ops.eleLoad('-ele', [1], '-type', '-beamUniform', [0, -5, 0.5, 1]);
