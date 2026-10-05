import assert from "node:assert/strict";
import test from "node:test";
import {
  OpenSeesAdapter,
  automaticDeformationScale,
  deserializeModel,
  deserializeResults,
  exportModelSvg,
  serializeModel,
  serializeResults,
  validateModel,
} from "../dist/index.js";

const domain = {
  ndm: 2,
  nodeTags: Int32Array.from([1, 2]),
  coordinates: Float64Array.from([0, 0, 0, 4, 0, 0]),
  elementTags: Int32Array.from([10]),
  elementTypes: ["ElasticBeam2d"],
  connectivity: Int32Array.from([1, 2]),
  connectivityOffsets: Int32Array.from([0, 2]),
  fixedNodeTags: Int32Array.from([1]),
  fixedDofs: Int32Array.from([1, 2, 3]),
  fixedDofOffsets: Int32Array.from([0, 3]),
};

test("captures model and structured frame from an OpenSees source", () => {
  const source = {
    domainSnapshot: () => domain,
    getTime: () => 1,
    nodeDisplacements: () => ({ 1: [0, 0, 0], 2: [0, -0.02, 0.01] }),
    nodeReactions: () => ({ 1: [0, 12, 4], 2: [0, 0, 0] }),
    elementResponses: () => ({ 10: [0, 12, 4, 0, -12, 44] }),
    nodeEigenvectors: () => ({ 1: [0, 0, 0], 2: [1, 0, 0] }),
  };
  const adapter = new OpenSeesAdapter(source);
  const model = adapter.captureModel();
  const frame = adapter.captureFrame(model, {
    includeReactions: true,
    diagrams: ["N", "V2", "M3"],
  });

  assert.deepEqual([...model.elementTags], [10]);
  assert.deepEqual([...frame.displacements], [0, 0, 0, 0, -0.02, 0]);
  assert.deepEqual([...frame.reactions], [0, 12, 0, 0, 0, 0]);
  assert.deepEqual([...frame.nodalDisplacements.values], [0, 0, 0, 0, -0.02, 0.01]);
  assert.deepEqual([...frame.nodalDisplacements.offsets], [0, 3, 6]);
  assert.deepEqual([...frame.nodalReactions.values], [0, 12, 4, 0, 0, 0]);
  assert.deepEqual([...frame.diagrams.find(item => item.quantity === "M3").startValues], [4]);
  assert.deepEqual([...frame.diagrams.find(item => item.quantity === "M3").endValues], [-44]);

  const restored = deserializeResults(serializeResults(adapter.captureResults(model, "static", [frame])));
  assert.deepEqual([...restored.frames[0].nodalDisplacements.values], [0, 0, 0, 0, -0.02, 0.01]);
});

test("serializes typed-array models without losing topology", () => {
  const model = new OpenSeesAdapter({
    domainSnapshot: () => domain,
    getTime: () => 0,
    nodeDisplacements: () => ({}),
    nodeReactions: () => ({}),
    elementResponses: () => ({}),
    nodeEigenvectors: () => ({}),
  }).captureModel();
  const restored = deserializeModel(serializeModel(model));
  validateModel(restored);
  assert.deepEqual([...restored.connectivity], [1, 2]);
});

test("computes automatic scale and exports non-empty SVG", () => {
  const model = {
    ndm: 2,
    nodeTags: domain.nodeTags,
    positions: domain.coordinates,
    elementTags: domain.elementTags,
    elementTypes: domain.elementTypes,
    connectivity: domain.connectivity,
    connectivityOffsets: domain.connectivityOffsets,
    fixedNodeTags: domain.fixedNodeTags,
    fixedDofs: domain.fixedDofs,
    fixedDofOffsets: domain.fixedDofOffsets,
  };
  assert.ok(Math.abs(automaticDeformationScale(model, Float64Array.from([0, 0, 0, 0, 0.1, 0])) - 6) < 1e-12);
  const svg = exportModelSvg(model);
  assert.match(svg, /<line /);
  assert.match(svg, /<circle /);
});

test("rejects unknown connectivity", () => {
  assert.throws(() => validateModel({
    ndm: 2,
    nodeTags: Int32Array.from([1]),
    positions: Float64Array.from([0, 0, 0]),
    elementTags: Int32Array.from([1]),
    elementTypes: ["bad"],
    connectivity: Int32Array.from([1, 2]),
    connectivityOffsets: Int32Array.from([0, 2]),
    fixedNodeTags: new Int32Array(),
    fixedDofs: new Int32Array(),
    fixedDofOffsets: Int32Array.from([0]),
  }), /unknown node 2/);
});
