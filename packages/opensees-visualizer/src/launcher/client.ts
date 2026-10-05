import { deserializeModel, deserializeResults } from "../core/model.js";
import type {
  DiagramQuantity,
  NodalResponseSet,
  SerializableVisualModel,
  SerializableVisualResults,
  ViewerSelection,
  VisualFrame,
} from "../core/types.js";
import { OpenSeesViewer } from "../viewer/OpenSeesViewer.js";

interface ViewerPayload {
  readonly model: SerializableVisualModel;
  readonly results?: SerializableVisualResults;
  readonly labels: "none" | "nodes" | "elements" | "all";
  readonly deformationScale: number | "auto";
  readonly closeToken: string;
}

const response = await fetch("/viewer-data.json");
if (!response.ok) throw new Error(`Unable to load visualizer data: ${response.status}.`);
const payload = await response.json() as ViewerPayload;
const container = document.querySelector<HTMLElement>("#viewer");
if (!container) throw new Error("Viewer container was not found.");
const model = deserializeModel(payload.model);
const results = payload.results ? deserializeResults(payload.results) : undefined;

const viewer = new OpenSeesViewer(container)
  .setModel(model, payload.labels)
  .setView("iso");
if (results) {
  viewer
    .setResults(results)
    .setDeformationScale(payload.deformationScale)
    .showDeformed();
}

const timeline = required<HTMLInputElement>("#timeline");
const frameLabel = required<HTMLElement>("#frame");
const modeSelect = required<HTMLSelectElement>("#mode");
const diagramSelect = required<HTMLSelectElement>("#diagram");
const speed = required<HTMLInputElement>("#speed");
const speedValue = required<HTMLOutputElement>("#speed-value");
const selectionPanel = required<HTMLElement>("#selection");
const selectionTitle = required<HTMLElement>("#selection-title");
const selectionValues = required<HTMLElement>("#selection-values");
const stationControl = required<HTMLElement>("#station-control");
const station = required<HTMLInputElement>("#station");
const stationValue = required<HTMLOutputElement>("#station-value");
const modes = results?.modes ?? [];
const diagrams = [...new Set(
  results?.frames.flatMap(frame => frame.diagrams?.map(diagram => diagram.quantity) ?? []) ?? [],
)];
if ((payload.results?.frames.length ?? 0) <= 1) timeline.closest(".timeline")?.classList.add("hidden");
if (!modes.length) modeSelect.classList.add("hidden");
if (!diagrams.length) diagramSelect.classList.add("hidden");
for (const mode of modes) {
  const option = document.createElement("option");
  option.value = String(mode.mode);
  option.textContent = mode.frequency === undefined
    ? `Mode ${mode.mode}`
    : `Mode ${mode.mode} · ${mode.frequency.toFixed(2)} Hz`;
  modeSelect.append(option);
}
for (const quantity of diagrams) {
  const option = document.createElement("option");
  option.value = quantity;
  option.textContent = quantity;
  diagramSelect.append(option);
}

required<HTMLButtonElement>("#iso").onclick = () => void viewer.setView("iso");
required<HTMLButtonElement>("#top").onclick = () => void viewer.setView("top");
required<HTMLButtonElement>("#front").onclick = () => void viewer.setView("front");
required<HTMLButtonElement>("#fit").onclick = () => void viewer.fitView();
required<HTMLButtonElement>("#play").onclick = () => {
  if (modes.length) viewer.animateMode(Number(modeSelect.value));
  else viewer.playHistory();
};
required<HTMLButtonElement>("#pause").onclick = () => void viewer.pause();
const downloadButton = required<HTMLButtonElement>("#download");
const deformedButton = required<HTMLButtonElement>("#deformed");
const reactionsButton = required<HTMLButtonElement>("#reactions");
let deformedVisible = Boolean(payload.results);
let reactionsVisible = false;
setToggleState(deformedButton, deformedVisible);
deformedButton.onclick = () => {
  deformedVisible = !deformedVisible;
  viewer.showDeformed(deformedVisible);
  setToggleState(deformedButton, deformedVisible);
};
reactionsButton.onclick = () => {
  reactionsVisible = !reactionsVisible;
  if (reactionsVisible) {
    viewer.showReactions();
    diagramSelect.value = "none";
  } else {
    viewer.hideDiagram();
  }
  setToggleState(reactionsButton, reactionsVisible);
};
required<HTMLButtonElement>("#close").onclick = async () => {
  viewer.dispose();
  await fetch(`/close?token=${encodeURIComponent(payload.closeToken)}`, { method: "POST" });
  document.body.innerHTML = '<main class="closed">Viewer closed.</main>';
};
downloadButton.onclick = async () => {
  downloadButton.disabled = true;
  downloadButton.classList.add("active");
  try {
    if (modes.length) viewer.animateMode(Number(modeSelect.value));
    else viewer.playHistory();
    const blob = await viewer.recordAnimation({ durationSeconds: 5, framesPerSecond: 30 });
    downloadBlob(blob, `opensees-${modes.length ? `mode-${modeSelect.value}` : "animation"}.webm`);
  } finally {
    downloadButton.disabled = false;
    downloadButton.classList.remove("active");
  }
};

modeSelect.onchange = () => void viewer.animateMode(Number(modeSelect.value));
diagramSelect.onchange = () => {
  reactionsVisible = false;
  setToggleState(reactionsButton, false);
  const quantity = diagramSelect.value;
  if (quantity === "none") viewer.hideDiagram();
  else viewer.showDiagram(quantity as DiagramQuantity, { scale: "auto" });
};
speed.oninput = () => {
  const multiplier = Number(speed.value);
  viewer.setAnimationSpeed(multiplier);
  speedValue.value = `${multiplier.toFixed(1)}×`;
};

timeline.oninput = () => {
  const progress = Number(timeline.value) / Number(timeline.max);
  viewer.seek(progress);
  const index = Math.round(progress * ((payload.results?.frames.length ?? 1) - 1));
  activeFrameIndex = index;
  frameLabel.textContent = String(index);
  renderSelection();
};

let activeFrameIndex = 0;
let activeSelection: ViewerSelection | undefined;
viewer.onSelection(selection => {
  activeSelection = selection;
  renderSelection();
});
station.oninput = () => {
  stationValue.value = Number(station.value).toFixed(2);
  renderSelection();
};

Object.assign(globalThis, { openSeesViewer: viewer });
if (modes.length) viewer.animateMode(modes[0]!.mode);

function required<T extends Element>(selector: string): T {
  const element = document.querySelector<T>(selector);
  if (!element) throw new Error(`Missing viewer control ${selector}.`);
  return element;
}

function setToggleState(button: HTMLButtonElement, active: boolean): void {
  button.classList.toggle("active", active);
  button.setAttribute("aria-pressed", String(active));
}

function renderSelection(): void {
  const selection = activeSelection;
  selectionPanel.classList.toggle("hidden", !selection);
  if (!selection) return;
  selectionTitle.textContent = `${selection.kind === "node" ? "Node" : "Element"} ${selection.tag}${selection.type ? ` · ${selection.type}` : ""}`;
  const frame = results?.frames[activeFrameIndex];
  if (selection.kind === "node") {
    stationControl.classList.add("hidden");
    selectionValues.innerHTML = nodeResultHtml(selection.tag, frame);
  } else {
    stationControl.classList.remove("hidden");
    selectionValues.innerHTML = elementResultHtml(selection.tag, frame, Number(station.value));
  }
}

function nodeResultHtml(tag: number, frame: VisualFrame | undefined): string {
  if (!frame) {
    const mode = modes.find(candidate => candidate.mode === Number(modeSelect.value));
    const nodeIndex = [...model.nodeTags].indexOf(tag);
    if (!mode || nodeIndex < 0) return "";
    const values = Array.from(mode.displacements.slice(nodeIndex * 3, nodeIndex * 3 + model.ndm));
    return resultTable(dofLabels(model.ndm, values.length), values, "Mode shape");
  }
  const displacement = responseRow(frame.nodalDisplacements, tag);
  const reaction = responseRow(frame.nodalReactions, tag);
  return [
    displacement.length ? resultTable(dofLabels(model.ndm, displacement.length), displacement, "Displacement") : "",
    reaction.length ? resultTable(dofLabels(model.ndm, reaction.length), reaction, "Reaction") : "",
  ].join("");
}

function elementResultHtml(tag: number, frame: VisualFrame | undefined, xi: number): string {
  const rows = frame?.diagrams?.flatMap(diagram => {
    const index = [...diagram.elementTags].indexOf(tag);
    if (index < 0) return [];
    const start = diagram.startValues[index]!;
    const end = diagram.endValues[index]!;
    return [[diagram.quantity, start + (end - start) * xi] as const];
  }) ?? [];
  return rows.length
    ? resultTable(rows.map(row => row[0]), rows.map(row => row[1]), `ξ = ${xi.toFixed(2)} · I/J`)
    : "";
}

function responseRow(response: NodalResponseSet | undefined, tag: number): number[] {
  if (!response) return [];
  const index = [...response.nodeTags].indexOf(tag);
  if (index < 0) return [];
  return Array.from(response.values.slice(response.offsets[index], response.offsets[index + 1]));
}

function dofLabels(ndm: 1 | 2 | 3, count: number): string[] {
  const known = ndm === 1
    ? ["UX"]
    : ndm === 2
      ? ["UX", "UY", "RZ"]
      : ["UX", "UY", "UZ", "RX", "RY", "RZ"];
  return Array.from({ length: count }, (_, index) => known[index] ?? `DOF${index + 1}`);
}

function resultTable(labels: readonly string[], values: readonly number[], heading: string): string {
  const rows = labels.map((label, index) => `<tr><th>${label}</th><td>${formatValue(values[index] ?? 0)}</td></tr>`).join("");
  return `<div class="result-heading">${heading}</div><table>${rows}</table>`;
}

function formatValue(value: number): string {
  if (!Number.isFinite(value)) return String(value);
  const magnitude = Math.abs(value);
  return magnitude !== 0 && (magnitude < 1e-3 || magnitude >= 1e5)
    ? value.toExponential(4)
    : value.toFixed(5);
}

function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 0);
}
