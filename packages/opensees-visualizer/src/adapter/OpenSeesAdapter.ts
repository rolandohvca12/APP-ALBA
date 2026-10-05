import type {
  OpenSeesDomainSnapshot,
  OpenSeesResponseRecord,
} from "openseesjs";
import type {
  DiagramQuantity,
  ElementDiagram,
  ModeShape,
  NodalResponseSet,
  VisualFrame,
  VisualModel,
  VisualResults,
} from "../core/types.js";
import { validateModel } from "../core/model.js";

export interface OpenSeesVisualSource {
  domainSnapshot(): OpenSeesDomainSnapshot;
  getTime(): number;
  nodeDisplacements(nodeTags: readonly number[]): OpenSeesResponseRecord;
  nodeReactions(nodeTags: readonly number[]): OpenSeesResponseRecord;
  elementResponses(elementTags: readonly number[], response: readonly string[]): OpenSeesResponseRecord;
  nodeEigenvectors(nodeTags: readonly number[], mode: number): OpenSeesResponseRecord;
}

export interface CaptureFrameOptions {
  readonly includeReactions?: boolean;
  readonly diagrams?: readonly DiagramQuantity[];
}

export interface CaptureModesOptions {
  readonly modes: readonly number[];
  readonly eigenvalues?: readonly number[];
}

export class OpenSeesAdapter {
  public constructor(private readonly source: OpenSeesVisualSource) {}

  captureModel(): VisualModel {
    const snapshot = this.source.domainSnapshot();
    const model: VisualModel = {
      ndm: snapshot.ndm,
      nodeTags: snapshot.nodeTags.slice(),
      positions: snapshot.coordinates.slice(),
      elementTags: snapshot.elementTags.slice(),
      elementTypes: [...snapshot.elementTypes],
      connectivity: snapshot.connectivity.slice(),
      connectivityOffsets: snapshot.connectivityOffsets.slice(),
      fixedNodeTags: snapshot.fixedNodeTags.slice(),
      fixedDofs: snapshot.fixedDofs.slice(),
      fixedDofOffsets: snapshot.fixedDofOffsets.slice(),
    };
    validateModel(model);
    return model;
  }

  captureFrame(model: VisualModel, options: CaptureFrameOptions = {}): VisualFrame {
    const nodeTags = [...model.nodeTags];
    const displacementRecord = this.source.nodeDisplacements(nodeTags);
    const reactionRecord = options.includeReactions ? this.source.nodeReactions(nodeTags) : undefined;
    const displacements = packTranslations(model.ndm, model.nodeTags, displacementRecord);
    const reactions = reactionRecord ? packTranslations(model.ndm, model.nodeTags, reactionRecord) : undefined;
    const nodalDisplacements = packNodalResponses(model.nodeTags, displacementRecord);
    const nodalReactions = reactionRecord ? packNodalResponses(model.nodeTags, reactionRecord) : undefined;
    const diagrams = options.diagrams?.length
      ? buildDiagrams(
        model,
        this.source.elementResponses([...model.elementTags], ["localForce"]),
        options.diagrams,
      )
      : undefined;

    return {
      time: this.source.getTime(),
      displacements,
      nodalDisplacements,
      ...(reactions ? { reactions } : {}),
      ...(nodalReactions ? { nodalReactions } : {}),
      ...(diagrams ? { diagrams } : {}),
    };
  }

  captureModes(model: VisualModel, options: CaptureModesOptions): ModeShape[] {
    return options.modes.map((mode, index) => {
      const eigenvalue = options.eigenvalues?.[index];
      return {
        mode,
        ...(eigenvalue === undefined ? {} : {
          eigenvalue,
          frequency: eigenvalue >= 0 ? Math.sqrt(eigenvalue) / (2 * Math.PI) : Number.NaN,
        }),
        displacements: packTranslations(
          model.ndm,
          model.nodeTags,
          this.source.nodeEigenvectors([...model.nodeTags], mode),
        ),
      };
    });
  }

  captureResults(
    model: VisualModel,
    caseId: string,
    frames: readonly VisualFrame[],
    modes?: readonly ModeShape[],
  ): VisualResults {
    return {
      caseId,
      frames: [...frames],
      ...(modes ? { modes: [...modes] } : {}),
    };
  }
}

function packTranslations(
  ndm: 1 | 2 | 3,
  tags: Int32Array,
  values: OpenSeesResponseRecord,
): Float64Array {
  const packed = new Float64Array(tags.length * 3);
  tags.forEach((tag, index) => {
    const vector = values[tag] ?? [];
    packed[index * 3] = vector[0] ?? 0;
    if (ndm >= 2) packed[index * 3 + 1] = vector[1] ?? 0;
    if (ndm >= 3) packed[index * 3 + 2] = vector[2] ?? 0;
  });
  return packed;
}

function packNodalResponses(tags: Int32Array, responses: OpenSeesResponseRecord): NodalResponseSet {
  const offsets = new Int32Array(tags.length + 1);
  const rows = Array.from(tags, tag => responses[tag] ?? []);
  let length = 0;
  rows.forEach((row, index) => {
    length += row.length;
    offsets[index + 1] = length;
  });
  const values = new Float64Array(length);
  let cursor = 0;
  for (const row of rows) {
    values.set(row, cursor);
    cursor += row.length;
  }
  return { nodeTags: tags.slice(), values, offsets };
}

function buildDiagrams(
  model: VisualModel,
  forces: OpenSeesResponseRecord,
  quantities: readonly DiagramQuantity[],
): ElementDiagram[] {
  const definitions = quantities.map(quantity => ({
    quantity,
    tags: [] as number[],
    starts: [] as number[],
    ends: [] as number[],
  }));

  model.elementTags.forEach(tag => {
    const values = forces[tag];
    if (!values) return;
    const components = forceComponents(values);
    if (!components) return;
    for (const definition of definitions) {
      const pair = components[definition.quantity];
      if (!pair) continue;
      definition.tags.push(tag);
      definition.starts.push(pair[0]);
      definition.ends.push(pair[1]);
    }
  });

  return definitions
    .filter(definition => definition.tags.length > 0)
    .map(definition => ({
      quantity: definition.quantity,
      elementTags: Int32Array.from(definition.tags),
      startValues: Float64Array.from(definition.starts),
      endValues: Float64Array.from(definition.ends),
    }));
}

function forceComponents(
  values: readonly number[],
): Partial<Record<DiagramQuantity, readonly [number, number]>> | undefined {
  if (values.length >= 12) {
    return {
      N: [values[0]!, -values[6]!],
      V2: [values[1]!, -values[7]!],
      V3: [values[2]!, -values[8]!],
      T: [values[3]!, -values[9]!],
      M2: [values[4]!, -values[10]!],
      M3: [values[5]!, -values[11]!],
    };
  }
  if (values.length >= 6) {
    return {
      N: [values[0]!, -values[3]!],
      V2: [values[1]!, -values[4]!],
      M3: [values[2]!, -values[5]!],
    };
  }
  return undefined;
}
