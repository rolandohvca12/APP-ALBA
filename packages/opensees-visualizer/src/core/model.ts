import type {
  SerializableVisualModel,
  SerializableVisualResults,
  VisualModel,
  VisualResults,
} from "./types.js";

export function validateModel(model: VisualModel): void {
  if (![1, 2, 3].includes(model.ndm)) throw new RangeError("Model ndm must be 1, 2, or 3.");
  if (model.positions.length !== model.nodeTags.length * 3) {
    throw new RangeError("Model positions must contain three coordinates per node.");
  }
  if (model.elementTypes.length !== model.elementTags.length) {
    throw new RangeError("Model elementTypes length must match elementTags.");
  }
  validateOffsets("connectivity", model.connectivityOffsets, model.elementTags.length, model.connectivity.length);
  validateOffsets("fixedDofs", model.fixedDofOffsets, model.fixedNodeTags.length, model.fixedDofs.length);

  const nodes = new Set(model.nodeTags);
  if (nodes.size !== model.nodeTags.length) throw new Error("Model contains duplicate node tags.");
  if (new Set(model.elementTags).size !== model.elementTags.length) throw new Error("Model contains duplicate element tags.");
  for (const node of model.connectivity) {
    if (!nodes.has(node)) throw new Error(`Element connectivity references unknown node ${node}.`);
  }
  for (const value of model.positions) {
    if (!Number.isFinite(value)) throw new Error("Model contains non-finite coordinates.");
  }
}

export function serializeModel(model: VisualModel): SerializableVisualModel {
  validateModel(model);
  return {
    ndm: model.ndm,
    nodeTags: [...model.nodeTags],
    positions: [...model.positions],
    elementTags: [...model.elementTags],
    elementTypes: [...model.elementTypes],
    connectivity: [...model.connectivity],
    connectivityOffsets: [...model.connectivityOffsets],
    fixedNodeTags: [...model.fixedNodeTags],
    fixedDofs: [...model.fixedDofs],
    fixedDofOffsets: [...model.fixedDofOffsets],
  };
}

export function deserializeModel(model: SerializableVisualModel): VisualModel {
  const result: VisualModel = {
    ndm: model.ndm,
    nodeTags: Int32Array.from(model.nodeTags),
    positions: Float64Array.from(model.positions),
    elementTags: Int32Array.from(model.elementTags),
    elementTypes: [...model.elementTypes],
    connectivity: Int32Array.from(model.connectivity),
    connectivityOffsets: Int32Array.from(model.connectivityOffsets),
    fixedNodeTags: Int32Array.from(model.fixedNodeTags),
    fixedDofs: Int32Array.from(model.fixedDofs),
    fixedDofOffsets: Int32Array.from(model.fixedDofOffsets),
  };
  validateModel(result);
  return result;
}

export function serializeResults(results: VisualResults): SerializableVisualResults {
  return {
    caseId: results.caseId,
    frames: results.frames.map(frame => ({
      time: frame.time,
      displacements: [...frame.displacements],
      ...(frame.reactions ? { reactions: [...frame.reactions] } : {}),
      ...(frame.nodalDisplacements ? { nodalDisplacements: serializeNodalResponses(frame.nodalDisplacements) } : {}),
      ...(frame.nodalReactions ? { nodalReactions: serializeNodalResponses(frame.nodalReactions) } : {}),
      ...(frame.diagrams ? {
        diagrams: frame.diagrams.map(diagram => ({
          quantity: diagram.quantity,
          elementTags: [...diagram.elementTags],
          startValues: [...diagram.startValues],
          endValues: [...diagram.endValues],
        })),
      } : {}),
    })),
    ...(results.modes ? {
      modes: results.modes.map(mode => ({
        mode: mode.mode,
        ...(mode.eigenvalue === undefined ? {} : { eigenvalue: mode.eigenvalue }),
        ...(mode.frequency === undefined ? {} : { frequency: mode.frequency }),
        displacements: [...mode.displacements],
      })),
    } : {}),
  };
}

export function deserializeResults(results: SerializableVisualResults): VisualResults {
  return {
    caseId: results.caseId,
    frames: results.frames.map(frame => ({
      time: frame.time,
      displacements: Float64Array.from(frame.displacements),
      ...(frame.reactions ? { reactions: Float64Array.from(frame.reactions) } : {}),
      ...(frame.nodalDisplacements ? { nodalDisplacements: deserializeNodalResponses(frame.nodalDisplacements) } : {}),
      ...(frame.nodalReactions ? { nodalReactions: deserializeNodalResponses(frame.nodalReactions) } : {}),
      ...(frame.diagrams ? {
        diagrams: frame.diagrams.map(diagram => ({
          quantity: diagram.quantity,
          elementTags: Int32Array.from(diagram.elementTags),
          startValues: Float64Array.from(diagram.startValues),
          endValues: Float64Array.from(diagram.endValues),
        })),
      } : {}),
    })),
    ...(results.modes ? {
      modes: results.modes.map(mode => ({
        mode: mode.mode,
        ...(mode.eigenvalue === undefined ? {} : { eigenvalue: mode.eigenvalue }),
        ...(mode.frequency === undefined ? {} : { frequency: mode.frequency }),
        displacements: Float64Array.from(mode.displacements),
      })),
    } : {}),
  };
}

function serializeNodalResponses(response: import("./types.js").NodalResponseSet) {
  return {
    nodeTags: [...response.nodeTags],
    values: [...response.values],
    offsets: [...response.offsets],
  };
}

function deserializeNodalResponses(response: import("./types.js").SerializableNodalResponseSet) {
  return {
    nodeTags: Int32Array.from(response.nodeTags),
    values: Float64Array.from(response.values),
    offsets: Int32Array.from(response.offsets),
  };
}

function validateOffsets(name: string, offsets: Int32Array, rows: number, values: number): void {
  if (offsets.length !== rows + 1 || offsets[0] !== 0 || offsets[offsets.length - 1] !== values) {
    throw new RangeError(`Invalid ${name} offsets.`);
  }
  for (let index = 1; index < offsets.length; index++) {
    if (offsets[index]! < offsets[index - 1]!) throw new RangeError(`${name} offsets must be monotonic.`);
  }
}
