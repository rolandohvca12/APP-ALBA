export type Vector3Tuple = readonly [x: number, y: number, z: number];
export type VisualDof = 1 | 2 | 3 | 4 | 5 | 6;
export type DiagramQuantity = "N" | "V2" | "V3" | "T" | "M2" | "M3";
export type StandardView = "iso" | "top" | "front" | "right";

export interface VisualModel {
  readonly ndm: 1 | 2 | 3;
  readonly nodeTags: Int32Array;
  readonly positions: Float64Array;
  readonly elementTags: Int32Array;
  readonly elementTypes: readonly string[];
  readonly connectivity: Int32Array;
  readonly connectivityOffsets: Int32Array;
  readonly fixedNodeTags: Int32Array;
  readonly fixedDofs: Int32Array;
  readonly fixedDofOffsets: Int32Array;
}

export interface ElementDiagram {
  readonly quantity: DiagramQuantity;
  readonly elementTags: Int32Array;
  readonly startValues: Float64Array;
  readonly endValues: Float64Array;
}

export interface NodalResponseSet {
  readonly nodeTags: Int32Array;
  readonly values: Float64Array;
  /** CSR offsets: node i occupies offsets[i]..offsets[i + 1]. */
  readonly offsets: Int32Array;
}

export interface VisualFrame {
  readonly time: number;
  /** XYZ displacements in model node order. */
  readonly displacements: Float64Array;
  /** XYZ reactions in model node order. */
  readonly reactions?: Float64Array;
  /** Complete nodal displacement vectors, preserving every model DOF. */
  readonly nodalDisplacements?: NodalResponseSet;
  /** Complete nodal reaction vectors, preserving every model DOF. */
  readonly nodalReactions?: NodalResponseSet;
  readonly diagrams?: readonly ElementDiagram[];
}

export interface ModeShape {
  readonly mode: number;
  readonly eigenvalue?: number;
  readonly frequency?: number;
  readonly displacements: Float64Array;
}

export interface VisualResults {
  readonly caseId: string;
  readonly frames: readonly VisualFrame[];
  readonly modes?: readonly ModeShape[];
}

export interface ViewerSelection {
  readonly kind: "node" | "element";
  readonly tag: number;
  readonly type?: string;
  readonly position?: Vector3Tuple;
}

export interface SerializableVisualModel {
  readonly ndm: 1 | 2 | 3;
  readonly nodeTags: number[];
  readonly positions: number[];
  readonly elementTags: number[];
  readonly elementTypes: readonly string[];
  readonly connectivity: number[];
  readonly connectivityOffsets: number[];
  readonly fixedNodeTags: number[];
  readonly fixedDofs: number[];
  readonly fixedDofOffsets: number[];
}

export interface SerializableElementDiagram {
  readonly quantity: DiagramQuantity;
  readonly elementTags: number[];
  readonly startValues: number[];
  readonly endValues: number[];
}

export interface SerializableNodalResponseSet {
  readonly nodeTags: number[];
  readonly values: number[];
  readonly offsets: number[];
}

export interface SerializableVisualFrame {
  readonly time: number;
  readonly displacements: number[];
  readonly reactions?: number[];
  readonly nodalDisplacements?: SerializableNodalResponseSet;
  readonly nodalReactions?: SerializableNodalResponseSet;
  readonly diagrams?: readonly SerializableElementDiagram[];
}

export interface SerializableModeShape {
  readonly mode: number;
  readonly eigenvalue?: number;
  readonly frequency?: number;
  readonly displacements: number[];
}

export interface SerializableVisualResults {
  readonly caseId: string;
  readonly frames: readonly SerializableVisualFrame[];
  readonly modes?: readonly SerializableModeShape[];
}
