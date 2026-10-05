import type { VisualModel } from "./types.js";

export interface ModelBounds {
  readonly min: readonly [number, number, number];
  readonly max: readonly [number, number, number];
  readonly center: readonly [number, number, number];
  readonly diagonal: number;
}

export function modelBounds(model: VisualModel): ModelBounds {
  if (model.nodeTags.length === 0) {
    return { min: [0, 0, 0], max: [0, 0, 0], center: [0, 0, 0], diagonal: 1 };
  }
  const min = [Infinity, Infinity, Infinity];
  const max = [-Infinity, -Infinity, -Infinity];
  for (let index = 0; index < model.positions.length; index += 3) {
    for (let axis = 0; axis < 3; axis++) {
      const value = model.positions[index + axis]!;
      min[axis] = Math.min(min[axis]!, value);
      max[axis] = Math.max(max[axis]!, value);
    }
  }
  const center: [number, number, number] = [
    (min[0]! + max[0]!) / 2,
    (min[1]! + max[1]!) / 2,
    (min[2]! + max[2]!) / 2,
  ];
  return {
    min: min as [number, number, number],
    max: max as [number, number, number],
    center,
    diagonal: Math.max(Math.hypot(max[0]! - min[0]!, max[1]! - min[1]!, max[2]! - min[2]!), 1e-9),
  };
}

export function automaticDeformationScale(model: VisualModel, displacements: Float64Array, ratio = 0.15): number {
  if (displacements.length !== model.nodeTags.length * 3) {
    throw new RangeError("Displacements must contain three values per model node.");
  }
  let maximum = 0;
  for (let index = 0; index < displacements.length; index += 3) {
    maximum = Math.max(maximum, Math.hypot(
      displacements[index]!,
      displacements[index + 1]!,
      displacements[index + 2]!,
    ));
  }
  return maximum > 0 ? modelBounds(model).diagonal * ratio / maximum : 1;
}

export function nodeIndex(model: VisualModel): ReadonlyMap<number, number> {
  return new Map(Array.from(model.nodeTags, (tag, index) => [tag, index]));
}

export function elementNodeTags(model: VisualModel, elementIndex: number): Int32Array {
  const start = model.connectivityOffsets[elementIndex]!;
  const end = model.connectivityOffsets[elementIndex + 1]!;
  return model.connectivity.slice(start, end);
}
