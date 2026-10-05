import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { CSS2DObject, CSS2DRenderer } from "three/addons/renderers/CSS2DRenderer.js";
import { AnimationController } from "../core/AnimationController.js";
import {
  automaticDeformationScale,
  elementNodeTags,
  modelBounds,
  nodeIndex,
} from "../core/geometry.js";
import { validateModel } from "../core/model.js";
import type {
  DiagramQuantity,
  ModeShape,
  StandardView,
  ViewerSelection,
  VisualFrame,
  VisualModel,
  VisualResults,
} from "../core/types.js";
import { ElementTopologyRegistry } from "./ElementTopologyRegistry.js";

export interface OpenSeesViewerOptions {
  readonly background?: THREE.ColorRepresentation;
  readonly elementColor?: THREE.ColorRepresentation;
  readonly nodeColor?: THREE.ColorRepresentation;
  readonly deformedColor?: THREE.ColorRepresentation;
  readonly supportColor?: THREE.ColorRepresentation;
  readonly diagramColor?: THREE.ColorRepresentation;
  readonly antialias?: boolean;
  readonly labels?: "none" | "nodes" | "elements" | "all";
  readonly topologyRegistry?: ElementTopologyRegistry;
}

export interface DiagramDisplayOptions {
  readonly scale?: number | "auto";
  readonly color?: THREE.ColorRepresentation;
}

export interface DeformationAnimationOptions {
  readonly durationSeconds?: number;
  readonly loop?: boolean;
  readonly speed?: number;
}

export interface AnimationRecordingOptions {
  readonly durationSeconds?: number;
  readonly framesPerSecond?: number;
  readonly videoBitsPerSecond?: number;
}

interface LabelBinding {
  readonly object: CSS2DObject;
  readonly nodeIndices: readonly number[];
}

export class OpenSeesViewer {
  private readonly scene = new THREE.Scene();
  private readonly camera = new THREE.PerspectiveCamera(38, 1, 0.001, 1e9);
  private readonly renderer: THREE.WebGLRenderer;
  private readonly labelsRenderer = new CSS2DRenderer();
  private readonly controls: OrbitControls;
  private readonly modelGroup = new THREE.Group();
  private readonly resultGroup = new THREE.Group();
  private readonly overlayGroup = new THREE.Group();
  private readonly labelsGroup = new THREE.Group();
  private readonly raycaster = new THREE.Raycaster();
  private readonly pointer = new THREE.Vector2();
  private readonly animation = new AnimationController();
  private readonly resizeObserver: ResizeObserver;
  private readonly topology: ElementTopologyRegistry;
  private readonly colors: Required<Omit<OpenSeesViewerOptions, "antialias" | "labels" | "topologyRegistry">>;
  private model: VisualModel | undefined;
  private results: VisualResults | undefined;
  private nodeIndices = new Map<number, number>();
  private segmentElements: number[] = [];
  private elementObject: THREE.LineSegments | undefined;
  private nodeObject: THREE.InstancedMesh | undefined;
  private deformedObject: THREE.LineSegments | undefined;
  private segmentPositionIndices: readonly (readonly [number, number])[] = [];
  private labelBindings: LabelBinding[] = [];
  private activeFrameIndex = 0;
  private deformationScale: number | "auto" = "auto";
  private selectionListener: ((selection: ViewerSelection | undefined) => void) | undefined;

  constructor(
    private readonly container: HTMLElement,
    options: OpenSeesViewerOptions = {},
  ) {
    this.colors = {
      background: options.background ?? 0xf7f8f7,
      elementColor: options.elementColor ?? 0x263238,
      nodeColor: options.nodeColor ?? 0x087f8c,
      deformedColor: options.deformedColor ?? 0xd1495b,
      supportColor: options.supportColor ?? 0x2563a6,
      diagramColor: options.diagramColor ?? 0x7c3aed,
    };
    this.topology = options.topologyRegistry ?? new ElementTopologyRegistry();
    this.scene.background = new THREE.Color(this.colors.background);
    this.scene.add(this.modelGroup, this.resultGroup, this.overlayGroup, this.labelsGroup);

    if (getComputedStyle(container).position === "static") container.style.position = "relative";
    this.renderer = new THREE.WebGLRenderer({ antialias: options.antialias ?? true, preserveDrawingBuffer: true });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.domElement.style.display = "block";
    this.container.append(this.renderer.domElement);

    this.labelsRenderer.domElement.style.cssText = "position:absolute;inset:0;pointer-events:none;overflow:hidden";
    this.container.append(this.labelsRenderer.domElement);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.addEventListener("change", this.render);
    this.renderer.domElement.addEventListener("pointerdown", this.selectAtPointer);
    this.resizeObserver = new ResizeObserver(this.resize);
    this.resizeObserver.observe(container);
    this.camera.up.set(0, 0, 1);
    this.addEnvironment();
    this.resize();
  }

  setModel(model: VisualModel, labels: OpenSeesViewerOptions["labels"] = "none"): this {
    validateModel(model);
    this.model = model;
    this.nodeIndices = new Map(Array.from(model.nodeTags, (tag, index) => [tag, index]));
    this.results = undefined;
    this.activeFrameIndex = 0;
    clearGroup(this.modelGroup);
    clearGroup(this.resultGroup);
    clearGroup(this.overlayGroup);
    clearGroup(this.labelsGroup);
    this.labelBindings = [];
    this.buildNodes();
    this.buildElements();
    this.buildSupports();
    this.buildLabels(labels);
    this.fitView();
    this.render();
    return this;
  }

  setResults(results: VisualResults): this {
    if (!this.model) throw new Error("Set a model before assigning results.");
    for (const frame of results.frames) this.validateFrame(frame);
    for (const mode of results.modes ?? []) this.validateDisplacements(mode.displacements);
    this.results = results;
    if (results.frames.length > 0) this.setFrame(0);
    return this;
  }

  setDeformationScale(scale: number | "auto"): this {
    if (scale !== "auto" && (!Number.isFinite(scale) || scale < 0)) {
      throw new RangeError("Deformation scale must be non-negative and finite.");
    }
    this.deformationScale = scale;
    if (this.results?.frames[this.activeFrameIndex]) this.applyDisplacements(
      this.results.frames[this.activeFrameIndex]!.displacements,
      scale,
    );
    return this;
  }

  setFrame(index: number): this {
    const frames = this.results?.frames;
    if (!frames?.length) return this;
    this.activeFrameIndex = Math.max(0, Math.min(Math.round(index), frames.length - 1));
    this.applyDisplacements(frames[this.activeFrameIndex]!.displacements, this.deformationScale);
    this.render();
    return this;
  }

  showUndeformed(visible = true): this {
    this.modelGroup.visible = visible;
    this.render();
    return this;
  }

  showDeformed(visible = true): this {
    this.resultGroup.visible = visible;
    const frame = this.results?.frames[this.activeFrameIndex];
    if (visible && frame) {
      this.applyDisplacements(frame.displacements, this.deformationScale);
    } else if (!visible) {
      this.updateLabelPositions();
    }
    this.render();
    return this;
  }

  showDiagram(quantity: DiagramQuantity, options: DiagramDisplayOptions = {}): this {
    clearGroup(this.overlayGroup);
    const model = this.model;
    const frame = this.results?.frames[this.activeFrameIndex];
    const diagram = frame?.diagrams?.find(item => item.quantity === quantity);
    if (!model || !diagram) return this;

    let maximum = 0;
    for (const value of diagram.startValues) maximum = Math.max(maximum, Math.abs(value));
    for (const value of diagram.endValues) maximum = Math.max(maximum, Math.abs(value));
    const factor = options.scale === "auto" || options.scale === undefined
      ? (maximum > 0 ? modelBounds(model).diagonal * 0.12 / maximum : 1)
      : options.scale;
    const elementIndices = new Map(Array.from(model.elementTags, (tag, index) => [tag, index]));
    const positions: number[] = [];

    diagram.elementTags.forEach((tag, resultIndex) => {
      const elementIndex = elementIndices.get(tag);
      if (elementIndex === undefined) return;
      const tags = elementNodeTags(model, elementIndex);
      if (tags.length !== 2) return;
      const start = this.nodePosition(tags[0]!);
      const end = this.nodePosition(tags[1]!);
      const axis = end.clone().sub(start).normalize();
      const normal = diagramNormal(axis, quantity);
      const offsetStart = start.clone().addScaledVector(normal, diagram.startValues[resultIndex]! * factor);
      const offsetEnd = end.clone().addScaledVector(normal, diagram.endValues[resultIndex]! * factor);
      pushSegment(positions, start, offsetStart);
      pushSegment(positions, offsetStart, offsetEnd);
      pushSegment(positions, offsetEnd, end);
    });

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    this.overlayGroup.add(new THREE.LineSegments(
      geometry,
      new THREE.LineBasicMaterial({ color: options.color ?? this.colors.diagramColor }),
    ));
    this.render();
    return this;
  }

  hideDiagram(): this {
    clearGroup(this.overlayGroup);
    this.render();
    return this;
  }

  showReactions(scale: number | "auto" = "auto"): this {
    clearGroup(this.overlayGroup);
    const model = this.model;
    const reactions = this.results?.frames[this.activeFrameIndex]?.reactions;
    if (!model || !reactions) return this;
    let maximum = 0;
    for (let index = 0; index < reactions.length; index += 3) {
      maximum = Math.max(maximum, Math.hypot(reactions[index]!, reactions[index + 1]!, reactions[index + 2]!));
    }
    const extent = modelBounds(model).diagonal;
    model.nodeTags.forEach((tag, index) => {
      const vector = new THREE.Vector3(
        reactions[index * 3]!,
        reactions[index * 3 + 1]!,
        reactions[index * 3 + 2]!,
      );
      const magnitude = vector.length();
      if (magnitude === 0) return;
      const length = scale === "auto" ? extent * 0.15 * magnitude / maximum : magnitude * scale;
      this.overlayGroup.add(new THREE.ArrowHelper(
        vector.normalize(),
        this.nodePosition(tag),
        length,
        this.colors.supportColor,
        length * 0.22,
        length * 0.1,
      ));
    });
    this.render();
    return this;
  }

  colorByDisplacement(): this {
    const frame = this.results?.frames[this.activeFrameIndex];
    const geometry = this.deformedObject?.geometry;
    if (!frame || !geometry) return this;
    const magnitudes = new Float64Array(this.model!.nodeTags.length);
    let maximum = 0;
    for (let index = 0; index < magnitudes.length; index++) {
      magnitudes[index] = Math.hypot(
        frame.displacements[index * 3]!,
        frame.displacements[index * 3 + 1]!,
        frame.displacements[index * 3 + 2]!,
      );
      maximum = Math.max(maximum, magnitudes[index]!);
    }
    const colors: number[] = [];
    const low = new THREE.Color(0x2463eb);
    const high = new THREE.Color(0xdc2626);
    for (const [a, b] of this.segmentPositionIndices) {
      for (const index of [a, b]) {
        const color = low.clone().lerp(high, maximum > 0 ? magnitudes[index]! / maximum : 0);
        colors.push(color.r, color.g, color.b);
      }
    }
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    (this.deformedObject!.material as THREE.LineBasicMaterial).vertexColors = true;
    (this.deformedObject!.material as THREE.LineBasicMaterial).needsUpdate = true;
    this.render();
    return this;
  }

  animateMode(modeNumber: number, options: { readonly scale?: number | "auto"; readonly periodSeconds?: number } = {}): this {
    const mode = this.results?.modes?.find(candidate => candidate.mode === modeNumber);
    if (!mode) throw new Error(`Mode ${modeNumber} is not available.`);
    const scale = options.scale === "auto" || options.scale === undefined
      ? automaticDeformationScale(this.model!, mode.displacements)
      : options.scale;
    const period = options.periodSeconds ?? (mode.frequency && mode.frequency > 0 ? 1 / mode.frequency : 1);
    this.animation.configure(period, state => {
      this.applyDisplacements(mode.displacements, scale * Math.sin(state.progress * Math.PI * 2));
    }).setLoop(true).play();
    return this;
  }

  animateDeformation(options: DeformationAnimationOptions = {}): this {
    const frame = this.results?.frames[this.activeFrameIndex];
    if (!frame) throw new Error("No analysis frame is available.");
    const scale = this.resolveDeformationScale(frame.displacements, this.deformationScale);
    this.resultGroup.visible = true;
    this.animation
      .configure(options.durationSeconds ?? 2, state => {
        const phaseScale = scale * (0.5 - 0.5 * Math.cos(state.progress * Math.PI * 2));
        this.applyDisplacements(frame.displacements, phaseScale);
      })
      .setLoop(options.loop ?? true);
    if (options.speed !== undefined) this.animation.setSpeed(options.speed);
    this.animation.play();
    return this;
  }

  playHistory(options: { readonly durationSeconds?: number; readonly loop?: boolean; readonly speed?: number } = {}): this {
    const frames = this.results?.frames;
    if (!frames?.length) throw new Error("No analysis frames are available.");
    if (frames.length === 1) return this.animateDeformation(options);
    this.animation
      .configure(options.durationSeconds ?? Math.max(frames.length / 30, 1), state => {
        this.setFrame(state.progress * (frames.length - 1));
      })
      .setLoop(options.loop ?? true);
    if (options.speed !== undefined) this.animation.setSpeed(options.speed);
    this.animation.play();
    return this;
  }

  setAnimationSpeed(speed: number): this {
    this.animation.setSpeed(speed);
    return this;
  }

  async recordAnimation(options: AnimationRecordingOptions = {}): Promise<Blob> {
    const durationSeconds = options.durationSeconds ?? 5;
    const framesPerSecond = options.framesPerSecond ?? 30;
    if (!(durationSeconds > 0) || !Number.isFinite(durationSeconds)) {
      throw new RangeError("Recording duration must be finite and greater than zero.");
    }
    if (!(framesPerSecond > 0) || !Number.isFinite(framesPerSecond)) {
      throw new RangeError("Recording frame rate must be finite and greater than zero.");
    }
    if (typeof MediaRecorder === "undefined" || !("captureStream" in this.renderer.domElement)) {
      throw new Error("This browser does not support canvas animation recording.");
    }

    const canvas = this.renderer.domElement as HTMLCanvasElement & {
      captureStream(frameRate?: number): MediaStream;
    };
    const stream = canvas.captureStream(0);
    const videoTrack = stream.getVideoTracks()[0] as MediaStreamTrack & { requestFrame?: () => void };
    const mimeType = ["video/webm;codecs=vp8", "video/webm", "video/webm;codecs=vp9"]
      .find(candidate => MediaRecorder.isTypeSupported(candidate));
    const chunks: Blob[] = [];
    const recorder = new MediaRecorder(stream, {
      ...(mimeType ? { mimeType } : {}),
      videoBitsPerSecond: options.videoBitsPerSecond ?? 6_000_000,
    });
    const completed = new Promise<Blob>((resolvePromise, rejectPromise) => {
      recorder.ondataavailable = event => {
        if (event.data.size > 0) chunks.push(event.data);
      };
      recorder.onerror = () => rejectPromise(new Error("Animation recording failed."));
      recorder.onstop = () => resolvePromise(new Blob(chunks, { type: recorder.mimeType || "video/webm" }));
    });
    let frameRequest: number | undefined;
    let lastFrame = Number.NEGATIVE_INFINITY;
    const drawFrame = (time: number): void => {
      if (time - lastFrame >= 1000 / framesPerSecond) {
        this.render();
        videoTrack.requestFrame?.();
        lastFrame = time;
      }
      frameRequest = requestAnimationFrame(drawFrame);
    };

    try {
      recorder.start(250);
      frameRequest = requestAnimationFrame(drawFrame);
      await new Promise(resolvePromise => setTimeout(resolvePromise, durationSeconds * 1000));
      recorder.stop();
      return await completed;
    } finally {
      if (frameRequest !== undefined) cancelAnimationFrame(frameRequest);
      stream.getTracks().forEach(track => track.stop());
    }
  }

  pause(): this {
    this.animation.pause();
    return this;
  }

  seek(progress: number): this {
    this.animation.seek(progress);
    const frames = this.results?.frames;
    if (frames?.length) this.setFrame(progress * (frames.length - 1));
    return this;
  }

  setView(view: StandardView): this {
    const bounds = modelBounds(this.model!);
    const direction = view === "top"
      ? new THREE.Vector3(0, 0, 1)
      : view === "front"
        ? new THREE.Vector3(0, -1, 0)
        : view === "right"
          ? new THREE.Vector3(1, 0, 0)
          : new THREE.Vector3(1, -1.2, 0.85);
    this.controls.target.set(...bounds.center);
    this.camera.position.copy(direction.normalize().multiplyScalar(bounds.diagonal * 1.8).add(this.controls.target));
    this.camera.up.set(0, 0, 1);
    this.controls.update();
    this.render();
    return this;
  }

  fitView(): this {
    if (!this.model) return this;
    const bounds = modelBounds(this.model);
    this.controls.target.set(...bounds.center);
    this.camera.near = Math.max(bounds.diagonal / 10_000, 0.0001);
    this.camera.far = Math.max(bounds.diagonal * 1000, 100);
    this.camera.position.copy(new THREE.Vector3(1, -1.2, 0.85)
      .normalize()
      .multiplyScalar(bounds.diagonal * 1.8 / Math.min(this.camera.aspect, 1))
      .add(this.controls.target));
    this.camera.updateProjectionMatrix();
    this.controls.update();
    this.render();
    return this;
  }

  onSelection(listener: (selection: ViewerSelection | undefined) => void): () => void {
    this.selectionListener = listener;
    return () => {
      if (this.selectionListener === listener) this.selectionListener = undefined;
    };
  }

  screenshot(type: "image/png" | "image/jpeg" = "image/png", quality?: number): string {
    this.render();
    return this.renderer.domElement.toDataURL(type, quality);
  }

  dispose(): void {
    this.animation.dispose();
    this.resizeObserver.disconnect();
    this.controls.dispose();
    this.renderer.domElement.removeEventListener("pointerdown", this.selectAtPointer);
    clearGroup(this.modelGroup);
    clearGroup(this.resultGroup);
    clearGroup(this.overlayGroup);
    clearGroup(this.labelsGroup);
    this.labelBindings = [];
    this.renderer.dispose();
    this.renderer.domElement.remove();
    this.labelsRenderer.domElement.remove();
  }

  private buildNodes(): void {
    const model = this.model!;
    const radius = Math.max(modelBounds(model).diagonal / 220, 0.002);
    const geometry = new THREE.SphereGeometry(radius, 10, 8);
    const material = new THREE.MeshStandardMaterial({ color: this.colors.nodeColor });
    const nodes = new THREE.InstancedMesh(geometry, material, model.nodeTags.length);
    const matrix = new THREE.Matrix4();
    model.nodeTags.forEach((tag, index) => {
      matrix.makeTranslation(...this.nodePosition(tag).toArray());
      nodes.setMatrixAt(index, matrix);
    });
    nodes.userData.kind = "nodes";
    nodes.instanceMatrix.needsUpdate = true;
    this.nodeObject = nodes;
    this.modelGroup.add(nodes);
  }

  private buildElements(): void {
    const model = this.model!;
    const positions: number[] = [];
    const segmentNodes: [number, number][] = [];
    this.segmentElements = [];

    model.elementTags.forEach((_tag, elementIndex) => {
      const tags = elementNodeTags(model, elementIndex);
      const nodeIndices = [...tags].map(tag => this.nodeIndices.get(tag)!);
      for (const [localA, localB] of this.topology.edges(model.elementTypes[elementIndex]!, tags.length)) {
        const a = nodeIndices[localA];
        const b = nodeIndices[localB];
        if (a === undefined || b === undefined) continue;
        pushPositionByIndex(positions, model.positions, a);
        pushPositionByIndex(positions, model.positions, b);
        segmentNodes.push([a, b]);
        this.segmentElements.push(elementIndex);
      }
    });
    this.segmentPositionIndices = segmentNodes;

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    this.elementObject = new THREE.LineSegments(
      geometry,
      new THREE.LineBasicMaterial({ color: this.colors.elementColor }),
    );
    this.elementObject.userData.kind = "elements";
    this.modelGroup.add(this.elementObject);

    const deformedGeometry = geometry.clone();
    this.deformedObject = new THREE.LineSegments(
      deformedGeometry,
      new THREE.LineBasicMaterial({ color: this.colors.deformedColor }),
    );
    this.deformedObject.visible = false;
    this.resultGroup.add(this.deformedObject);
  }

  private buildSupports(): void {
    const model = this.model!;
    const radius = Math.max(modelBounds(model).diagonal / 170, 0.003);
    const geometry = new THREE.ConeGeometry(radius, radius * 1.8, 4);
    const material = new THREE.MeshStandardMaterial({ color: this.colors.supportColor });
    model.fixedNodeTags.forEach(tag => {
      const support = new THREE.Mesh(geometry, material);
      support.position.copy(this.nodePosition(tag)).add(new THREE.Vector3(0, 0, -radius));
      support.rotation.z = Math.PI / 4;
      this.modelGroup.add(support);
    });
  }

  private buildLabels(mode: OpenSeesViewerOptions["labels"]): void {
    if (!mode || mode === "none") return;
    const model = this.model!;
    if (mode === "nodes" || mode === "all") {
      model.nodeTags.forEach((tag, index) => this.addLabel(String(tag), [index]));
    }
    if (mode === "elements" || mode === "all") {
      model.elementTags.forEach((tag, elementIndex) => {
        const tags = elementNodeTags(model, elementIndex);
        if (!tags.length) return;
        const indices = [...tags].map(nodeTag => this.nodeIndices.get(nodeTag)!);
        this.addLabel(String(tag), indices);
      });
    }
  }

  private addLabel(text: string, nodeIndices: readonly number[]): void {
    const element = document.createElement("span");
    element.textContent = text;
    element.style.cssText = "font:600 11px/1.2 Segoe UI,Arial,sans-serif;color:#263238;text-shadow:-1px -1px 0 #fff,1px -1px 0 #fff,-1px 1px 0 #fff,1px 1px 0 #fff;user-select:none";
    const label = new CSS2DObject(element);
    const binding = { object: label, nodeIndices } satisfies LabelBinding;
    this.labelBindings.push(binding);
    this.updateLabelPosition(binding);
    this.labelsGroup.add(label);
  }

  private applyDisplacements(displacements: Float64Array, requestedScale: number | "auto"): void {
    const model = this.model;
    const object = this.deformedObject;
    if (!model || !object) return;
    this.validateDisplacements(displacements);
    const scale = this.resolveDeformationScale(displacements, requestedScale);
    const position = object.geometry.getAttribute("position") as THREE.BufferAttribute;
    this.segmentPositionIndices.forEach(([a, b], segment) => {
      setDeformedPosition(position, segment * 2, model.positions, displacements, a, scale);
      setDeformedPosition(position, segment * 2 + 1, model.positions, displacements, b, scale);
    });
    position.needsUpdate = true;
    object.geometry.computeBoundingSphere();
    object.visible = true;
    this.updateLabelPositions(displacements, scale);
    this.render();
  }

  private resolveDeformationScale(displacements: Float64Array, requestedScale: number | "auto"): number {
    return requestedScale === "auto"
      ? automaticDeformationScale(this.model!, displacements)
      : requestedScale;
  }

  private updateLabelPositions(displacements?: Float64Array, scale = 0): void {
    for (const binding of this.labelBindings) this.updateLabelPosition(binding, displacements, scale);
  }

  private updateLabelPosition(binding: LabelBinding, displacements?: Float64Array, scale = 0): void {
    const positions = this.model!.positions;
    const center = new THREE.Vector3();
    for (const index of binding.nodeIndices) {
      center.x += positions[index * 3]! + (displacements?.[index * 3] ?? 0) * scale;
      center.y += positions[index * 3 + 1]! + (displacements?.[index * 3 + 1] ?? 0) * scale;
      center.z += positions[index * 3 + 2]! + (displacements?.[index * 3 + 2] ?? 0) * scale;
    }
    center.multiplyScalar(1 / binding.nodeIndices.length);
    binding.object.position.copy(center);
  }

  private validateFrame(frame: VisualFrame): void {
    this.validateDisplacements(frame.displacements);
    if (frame.reactions) this.validateDisplacements(frame.reactions);
  }

  private validateDisplacements(values: Float64Array): void {
    if (!this.model || values.length !== this.model.nodeTags.length * 3) {
      throw new RangeError("Nodal result must contain three values per model node.");
    }
  }

  private nodePosition(tag: number): THREE.Vector3 {
    const index = this.nodeIndices.get(tag);
    if (index === undefined) throw new Error(`Unknown node ${tag}.`);
    return new THREE.Vector3(
      this.model!.positions[index * 3]!,
      this.model!.positions[index * 3 + 1]!,
      this.model!.positions[index * 3 + 2]!,
    );
  }

  private addEnvironment(): void {
    this.scene.add(new THREE.HemisphereLight(0xffffff, 0x53605c, 2));
    const light = new THREE.DirectionalLight(0xffffff, 2.2);
    light.position.set(5, -7, 10);
    this.scene.add(light);
    const grid = new THREE.GridHelper(20, 20, 0x98a5a0, 0xdde2df);
    grid.rotation.x = Math.PI / 2;
    this.scene.add(grid);
  }

  private readonly resize = (): void => {
    const width = Math.max(this.container.clientWidth, 1);
    const height = Math.max(this.container.clientHeight, 1);
    this.renderer.setSize(width, height, false);
    this.labelsRenderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.render();
  };

  private readonly render = (): void => {
    this.renderer.render(this.scene, this.camera);
    this.labelsRenderer.render(this.scene, this.camera);
  };

  private readonly selectAtPointer = (event: PointerEvent): void => {
    if (!this.model) return;
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.pointer.set(
      (event.clientX - rect.left) / rect.width * 2 - 1,
      -(event.clientY - rect.top) / rect.height * 2 + 1,
    );
    this.raycaster.params.Line = { threshold: Math.max(modelBounds(this.model).diagonal / 180, 0.01) };
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const hits = this.raycaster.intersectObjects(
      [this.nodeObject!, this.elementObject!].filter(Boolean),
      false,
    );
    const hit = hits[0];
    if (!hit) {
      this.selectionListener?.(undefined);
      return;
    }
    if (hit.object === this.nodeObject && hit.instanceId !== undefined) {
      const index = hit.instanceId;
      this.selectionListener?.({
        kind: "node",
        tag: this.model.nodeTags[index]!,
        position: [
          this.model.positions[index * 3]!,
          this.model.positions[index * 3 + 1]!,
          this.model.positions[index * 3 + 2]!,
        ],
      });
      return;
    }
    const segment = Math.floor((hit.index ?? 0) / 2);
    const elementIndex = this.segmentElements[segment];
    if (elementIndex !== undefined) {
      this.selectionListener?.({
        kind: "element",
        tag: this.model.elementTags[elementIndex]!,
        type: this.model.elementTypes[elementIndex]!,
      });
    }
  };
}

function pushPositionByIndex(target: number[], positions: Float64Array, index: number): void {
  target.push(positions[index * 3]!, positions[index * 3 + 1]!, positions[index * 3 + 2]!);
}

function pushSegment(target: number[], a: THREE.Vector3, b: THREE.Vector3): void {
  target.push(a.x, a.y, a.z, b.x, b.y, b.z);
}

function setDeformedPosition(
  target: THREE.BufferAttribute,
  targetIndex: number,
  positions: Float64Array,
  displacements: Float64Array,
  nodeIndex: number,
  scale: number,
): void {
  target.setXYZ(
    targetIndex,
    positions[nodeIndex * 3]! + displacements[nodeIndex * 3]! * scale,
    positions[nodeIndex * 3 + 1]! + displacements[nodeIndex * 3 + 1]! * scale,
    positions[nodeIndex * 3 + 2]! + displacements[nodeIndex * 3 + 2]! * scale,
  );
}

function diagramNormal(axis: THREE.Vector3, quantity: DiagramQuantity): THREE.Vector3 {
  const reference = Math.abs(axis.z) < 0.9
    ? new THREE.Vector3(0, 0, 1)
    : new THREE.Vector3(1, 0, 0);
  const first = new THREE.Vector3().crossVectors(reference, axis).normalize();
  return quantity === "V3" || quantity === "M2"
    ? new THREE.Vector3().crossVectors(axis, first).normalize()
    : first;
}

function clearGroup(group: THREE.Group): void {
  for (const child of [...group.children]) {
    group.remove(child);
    child.traverse(object => {
      const renderable = object as THREE.Mesh;
      renderable.geometry?.dispose();
      const materials = Array.isArray(renderable.material)
        ? renderable.material
        : renderable.material
          ? [renderable.material]
          : [];
      materials.forEach(material => material.dispose());
      if (object instanceof CSS2DObject) object.element.remove();
    });
  }
}
