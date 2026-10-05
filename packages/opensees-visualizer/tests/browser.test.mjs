import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { chromium } from "playwright";
import { launchOpenSeesViewer } from "../dist/index.js";

const model = {
  ndm: 3,
  nodeTags: Int32Array.from([1, 2, 3, 4, 5, 6, 7, 8]),
  positions: Float64Array.from([
    0, 0, 0, 5, 0, 0, 5, 4, 0, 0, 4, 0,
    0, 0, 3, 5, 0, 3, 5, 4, 3, 0, 4, 3,
  ]),
  elementTags: Int32Array.from([1, 2, 3, 4, 5, 6, 7, 8]),
  elementTypes: Array(8).fill("elasticBeamColumn"),
  connectivity: Int32Array.from([
    1, 5, 2, 6, 3, 7, 4, 8,
    5, 6, 6, 7, 7, 8, 8, 5,
  ]),
  connectivityOffsets: Int32Array.from([0, 2, 4, 6, 8, 10, 12, 14, 16]),
  fixedNodeTags: Int32Array.from([1, 2, 3, 4]),
  fixedDofs: Int32Array.from([
    1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6,
    1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6,
  ]),
  fixedDofOffsets: Int32Array.from([0, 6, 12, 18, 24]),
};
const results = {
  caseId: "demo",
  frames: [{
    time: 1,
    displacements: Float64Array.from([
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0.08, 0, 0, 0.08, 0, 0, 0.08, 0, 0, 0.08, 0, 0,
    ]),
    reactions: new Float64Array(24),
    nodalDisplacements: {
      nodeTags: model.nodeTags,
      offsets: Int32Array.from([0, 6, 12, 18, 24, 30, 36, 42, 48]),
      values: Float64Array.from(Array.from({ length: 8 }, (_, index) => [
        index * 0.01, index * 0.02, index * 0.03,
        index * 0.001, index * 0.002, index * 0.003,
      ]).flat()),
    },
    nodalReactions: {
      nodeTags: model.nodeTags,
      offsets: Int32Array.from([0, 6, 12, 18, 24, 30, 36, 42, 48]),
      values: Float64Array.from(Array.from({ length: 48 }, (_, index) => index * 0.5)),
    },
    diagrams: [{
      quantity: "M3",
      elementTags: model.elementTags,
      startValues: Float64Array.from([10, 12, 9, 11, 8, 7, 6, 5]),
      endValues: Float64Array.from([-8, -9, -7, -8, -6, -5, -4, -3]),
    }],
  }],
};

const artifacts = resolve("tests/artifacts");
await mkdir(artifacts, { recursive: true });
const running = await launchOpenSeesViewer({
  model,
  results,
  openBrowser: false,
  labels: "elements",
  deformationScale: "auto",
});
const browser = await chromium.launch({ channel: "msedge", headless: true });

try {
  for (const viewport of [
    { name: "desktop", width: 1440, height: 900 },
    { name: "mobile", width: 390, height: 844 },
  ]) {
    const page = await browser.newPage({ viewport });
    page.on("console", message => console.log(`[${viewport.name}:console] ${message.type()}: ${message.text()}`));
    page.on("pageerror", error => console.error(`[${viewport.name}:pageerror] ${error.message}`));
    page.on("response", response => {
      if (response.status() >= 400) console.error(`[${viewport.name}:http] ${response.status()} ${response.url()}`);
    });
    await page.goto(running.url);
    await page.waitForFunction(() => {
      const canvas = document.querySelector("canvas");
      return canvas && canvas.width > 10 && canvas.height > 10;
    });
    await page.waitForTimeout(250);
    const pixels = await page.locator("canvas").evaluate(canvas => {
      const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
      if (!gl) return { total: 0, visible: 0 };
      const data = new Uint8Array(canvas.width * canvas.height * 4);
      gl.readPixels(0, 0, canvas.width, canvas.height, gl.RGBA, gl.UNSIGNED_BYTE, data);
      let visible = 0;
      for (let index = 0; index < data.length; index += 16) {
        const difference = Math.abs(data[index] - 247)
          + Math.abs(data[index + 1] - 248)
          + Math.abs(data[index + 2] - 247);
        if (data[index + 3] > 0 && difference > 20) visible++;
      }
      return { total: data.length / 16, visible };
    });
    if (pixels.visible < 50) throw new Error(`${viewport.name} canvas appears blank: ${JSON.stringify(pixels)}`);

    await page.locator("#deformed").click();
    const hiddenDeformation = await page.evaluate(() => ({
      visible: globalThis.openSeesViewer.resultGroup.visible,
      pressed: document.querySelector("#deformed").getAttribute("aria-pressed"),
    }));
    if (hiddenDeformation.visible || hiddenDeformation.pressed !== "false") {
      throw new Error(`${viewport.name} deformed-shape toggle did not hide its result.`);
    }
    await page.locator("#deformed").click();

    await page.selectOption("#diagram", "M3");
    const diagramObjects = await page.evaluate(() => globalThis.openSeesViewer.overlayGroup.children.length);
    if (diagramObjects === 0) throw new Error(`${viewport.name} M3 diagram was not rendered.`);
    await page.selectOption("#diagram", "none");
    const clearedDiagramObjects = await page.evaluate(() => globalThis.openSeesViewer.overlayGroup.children.length);
    if (clearedDiagramObjects !== 0) throw new Error(`${viewport.name} diagram was not cleared.`);

    await page.evaluate(() => globalThis.openSeesViewer.selectionListener({ kind: "node", tag: 5 }));
    const nodeInspector = await page.locator("#selection").textContent();
    for (const label of ["UX", "UY", "UZ", "RX", "RY", "RZ"]) {
      if (!nodeInspector.includes(label)) throw new Error(`${viewport.name} node inspector omitted ${label}.`);
    }
    await page.evaluate(() => globalThis.openSeesViewer.selectionListener({
      kind: "element",
      tag: 1,
      type: "elasticBeamColumn",
    }));
    await page.locator("#station").evaluate(input => {
      input.value = "0.25";
      input.dispatchEvent(new Event("input", { bubbles: true }));
    });
    const elementInspector = await page.locator("#selection").textContent();
    if (!elementInspector.includes("M3") || !elementInspector.includes("5.50000")) {
      throw new Error(`${viewport.name} station force inspector is incomplete.`);
    }

    const animationStart = await page.evaluate(() => {
      const viewer = globalThis.openSeesViewer;
      const positions = viewer.deformedObject.geometry.getAttribute("position").array;
      return Array.from(positions.slice(0, 6));
    });
    await page.locator("#speed").evaluate(input => {
      input.value = "0.3";
      input.dispatchEvent(new Event("input", { bubbles: true }));
    });
    const speedState = await page.evaluate(() => ({
      speed: globalThis.openSeesViewer.animation.snapshot().speed,
      label: document.querySelector("#speed-value").value,
    }));
    if (speedState.speed !== 0.3 || speedState.label !== "0.3×") {
      throw new Error(`${viewport.name} animation speed control is not synchronized.`);
    }
    await page.locator("#play").click();
    await page.waitForTimeout(350);
    const animationState = await page.evaluate(() => {
      const viewer = globalThis.openSeesViewer;
      const positions = viewer.deformedObject.geometry.getAttribute("position").array;
      const firstSegment = Array.from(positions.slice(0, 6));
      const label = viewer.labelBindings[0].object.position;
      const midpoint = {
        x: (firstSegment[0] + firstSegment[3]) / 2,
        y: (firstSegment[1] + firstSegment[4]) / 2,
        z: (firstSegment[2] + firstSegment[5]) / 2,
      };
      return {
        firstSegment,
        labelError: Math.hypot(label.x - midpoint.x, label.y - midpoint.y, label.z - midpoint.z),
      };
    });
    const movement = animationState.firstSegment.reduce(
      (sum, value, index) => sum + Math.abs(value - animationStart[index]),
      0,
    );
    if (movement < 1e-5) throw new Error(`${viewport.name} static deformation did not animate.`);
    if (animationState.labelError > 1e-5) {
      throw new Error(`${viewport.name} element label is detached from its deformed element.`);
    }
    const recording = await page.evaluate(async () => {
      const blob = await globalThis.openSeesViewer.recordAnimation({
        durationSeconds: 1.2,
        framesPerSecond: 15,
      });
      return { size: blob.size, type: blob.type };
    });
    if (recording.size === 0 || !recording.type.startsWith("video/webm")) {
      throw new Error(`${viewport.name} animation recording is invalid: ${JSON.stringify(recording)}.`);
    }
    await page.locator("#pause").click();
    await page.screenshot({ path: resolve(artifacts, `${viewport.name}.png`), fullPage: true });
    await page.close();
  }
} finally {
  await browser.close();
  await running.close();
}
