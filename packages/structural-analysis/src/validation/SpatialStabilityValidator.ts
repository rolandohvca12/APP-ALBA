import type { SpatialRigidSoleraArm, SpatialStructuralModel } from '../domain/types.js';

export class SpatialStabilityValidator {
  public assertStable(model: SpatialStructuralModel, tolerance = 1e-8): void {
    const nodes = new Map(model.nodes.map((node) => [node.id, node]));
    const arms = new Map(model.rigidArms.map((arm) => [arm.id, arm]));
    const lintels = new Map(model.lintels.map((lintel) => [lintel.id, lintel]));
    if (nodes.size !== model.nodes.length) throw new Error('The spatial model contains duplicate node ids.');
    if (arms.size !== model.rigidArms.length) throw new Error('The spatial model contains duplicate rigid-arm ids.');
    if (lintels.size !== model.lintels.length) throw new Error('The spatial model contains duplicate lintel ids.');
    for (const id of model.fixedNodeIds) if (!nodes.has(id)) throw new Error(`Fixed node ${id} does not exist.`);
    const connected = new Set<string>();
    for (const pier of model.wallPiers) {
      requireNodes(nodes, pier.id, pier.startNodeId, pier.endNodeId);
      connected.add(pier.startNodeId); connected.add(pier.endNodeId);
      if (!(pier.section.area > 0 && pier.section.bendingInertia > 0 && pier.section.effectiveShearArea > 0)) throw new Error(`Pier ${pier.id} has invalid stiffness.`);
    }
    for (const lintel of model.lintels) {
      requireNodes(nodes, lintel.id, lintel.startNodeId, lintel.endNodeId);
      connected.add(lintel.startNodeId); connected.add(lintel.endNodeId);
      if (!(lintel.clearLength > tolerance) || !lintel.releases.inPlaneMomentStart || !lintel.releases.inPlaneMomentEnd) throw new Error(`Lintel ${lintel.id} has invalid length or releases.`);
      const startArm = arms.get(lintel.startArmId); const endArm = arms.get(lintel.endArmId);
      if (!startArm || !endArm) throw new Error(`Lintel ${lintel.id} references a missing rigid arm.`);
      if (startArm.faceNodeId !== lintel.startNodeId || endArm.faceNodeId !== lintel.endNodeId) {
        throw new Error(`Lintel ${lintel.id} is not connected to its rigid-arm tap nodes.`);
      }
      if (!startArm.lintelIds.includes(lintel.id) || !endArm.lintelIds.includes(lintel.id)) {
        throw new Error(`Lintel ${lintel.id} is missing from its rigid-arm connection registry.`);
      }
    }
    for (const arm of model.rigidArms) {
      requireNodes(nodes, arm.id, arm.centerNodeId, arm.faceNodeId);
      connected.add(arm.centerNodeId); connected.add(arm.faceNodeId);
      if (!(arm.length > tolerance && arm.stiffnessFactor > 1)) throw new Error(`Rigid arm ${arm.id} has invalid geometry or stiffness.`);
      for (const lintelId of arm.lintelIds) if (!lintels.has(lintelId)) throw new Error(`Rigid arm ${arm.id} references missing lintel ${lintelId}.`);
    }
    for (const floor of model.floorConstraints) {
      requireNodes(nodes, floor.levelId, floor.masterNodeId, ...floor.constrainedNodeIds);
      if (floor.constrainedNodeIds.length === 0) throw new Error(`Floor ${floor.levelId} has no constrained wall nodes.`);
      connected.add(floor.masterNodeId);
    }
    for (const node of model.nodes) if (!connected.has(node.id)) throw new Error(`Node ${node.id} is disconnected.`);
    for (const load of model.loads) if (!nodes.has(load.nodeId)) throw new Error(`Load ${load.caseId}:${load.levelId} references a missing node.`);
    assertRigidArmsDoNotOverlap(model.rigidArms, tolerance);
    assertTorsionalResistance(model, nodes, tolerance);
  }
}

function requireNodes(nodes: ReadonlyMap<string, unknown>, owner: string, ...ids: readonly string[]): void {
  for (const id of ids) if (!nodes.has(id)) throw new Error(`${owner} references missing node ${id}.`);
}

function assertRigidArmsDoNotOverlap(arms: readonly SpatialRigidSoleraArm[], tolerance: number): void {
  for (let i = 0; i < arms.length; i++) for (let j = i + 1; j < arms.length; j++) {
    const a = arms[i]!; const b = arms[j]!;
    if (a.levelId !== b.levelId || a.direction !== b.direction || a.wallId === b.wallId) continue;
    const axis = a.direction === 'x' ? 'x' : 'y';
    const perpendicular = a.direction === 'x' ? 'y' : 'x';
    if (Math.abs(a.center[perpendicular] - b.center[perpendicular]) > tolerance) continue;
    const overlap = Math.min(Math.max(a.center[axis], a.face[axis]), Math.max(b.center[axis], b.face[axis]))
      - Math.max(Math.min(a.center[axis], a.face[axis]), Math.min(b.center[axis], b.face[axis]));
    if (overlap > tolerance) throw new Error(`Rigid arms ${a.id} and ${b.id} overlap.`);
  }
}

function assertTorsionalResistance(model: SpatialStructuralModel, nodes: ReadonlyMap<string, { x: number; y: number }>, tolerance: number): void {
  for (const floor of model.floorConstraints) {
    const master = nodes.get(floor.masterNodeId)!;
    const piers = model.wallPiers.filter((pier) => pier.levelId === floor.levelId);
    const lever = piers.reduce((sum, pier) => {
      const node = nodes.get(pier.endNodeId)!;
      const offset = pier.direction === 'x' ? node.y - master.y : node.x - master.x;
      return sum + offset * offset;
    }, 0);
    if (!(lever > tolerance * tolerance)) throw new Error(`Floor ${floor.levelId} has no geometric lever arm for torsional resistance.`);
  }
}
