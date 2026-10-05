import assert from "node:assert/strict";
import test from "node:test";
import { ops } from "openseesjs";
import { OpenSeesAdapter, launchOpenSeesViewer } from "../dist/index.js";

test("captures a real native OpenSees domain and serves it", async () => {
  ops.wipe();
  ops.model("basic", "-ndm", 2, "-ndf", 3);
  ops.node(1, 0, 0);
  ops.node(2, 0, 3);
  ops.node(3, 4, 3);
  ops.node(4, 4, 0);
  ops.fix(1, 1, 1, 1);
  ops.fix(4, 1, 1, 1);
  ops.geomTransf("Linear", 1);
  ops.element("elasticBeamColumn", 1, 1, 2, 0.25, 25e6, 0.005, 1);
  ops.element("elasticBeamColumn", 2, 2, 3, 0.2, 25e6, 0.003, 1);
  ops.element("elasticBeamColumn", 3, 3, 4, 0.25, 25e6, 0.005, 1);
  ops.timeSeries("Linear", 1);
  ops.pattern("Plain", 1, 1);
  ops.load(2, 25, 0, 0);
  ops.constraints("Transformation");
  ops.numberer("RCM");
  ops.system("BandGen");
  ops.test("NormDispIncr", 1e-9, 20);
  ops.algorithm("Newton");
  ops.integrator("LoadControl", 1);
  ops.analysis("Static");
  assert.equal(ops.analyze(1), 0);
  ops.reactions();

  const adapter = new OpenSeesAdapter(ops);
  const model = adapter.captureModel();
  assert.deepEqual([...model.nodeTags], [1, 2, 3, 4]);
  assert.deepEqual([...model.elementTags], [1, 2, 3]);
  assert.equal(model.elementTypes[0], "ElasticBeam2d");
  const frame = adapter.captureFrame(model, {
    includeReactions: true,
    diagrams: ["N", "V2", "M3"],
  });
  assert.ok(frame.displacements.every(Number.isFinite));
  assert.ok(frame.reactions.every(Number.isFinite));
  assert.equal(frame.diagrams.length, 3);
  const results = adapter.captureResults(model, "static", [frame]);

  const running = await launchOpenSeesViewer({ model, results, openBrowser: false });
  try {
    const response = await fetch(running.url);
    assert.equal(response.status, 200);
    assert.match(await response.text(), /OpenSeesJS Visualizer/);
  } finally {
    await running.close();
    ops.dispose();
  }
});
