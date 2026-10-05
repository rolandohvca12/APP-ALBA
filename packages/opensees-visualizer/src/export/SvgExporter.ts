import { elementNodeTags, modelBounds, nodeIndex } from "../core/geometry.js";
import type { DiagramQuantity, VisualFrame, VisualModel } from "../core/types.js";

export interface SvgExportOptions {
  readonly width?: number;
  readonly height?: number;
  readonly padding?: number;
  readonly frame?: VisualFrame;
  readonly deformationScale?: number;
  readonly diagram?: DiagramQuantity;
  readonly diagramScale?: number;
}

export function exportModelSvg(model: VisualModel, options: SvgExportOptions = {}): string {
  const width = options.width ?? 1200;
  const height = options.height ?? 800;
  const padding = options.padding ?? 40;
  const bounds = modelBounds(model);
  const scale = Math.min(
    (width - padding * 2) / Math.max(bounds.max[0] - bounds.min[0], 1e-9),
    (height - padding * 2) / Math.max(bounds.max[1] - bounds.min[1], 1e-9),
  );
  const nodes = nodeIndex(model);
  const deformationScale = options.deformationScale ?? 0;
  const point = (nodeTag: number): readonly [number, number] => {
    const index = nodes.get(nodeTag);
    if (index === undefined) throw new Error(`Unknown node ${nodeTag}.`);
    const dx = options.frame?.displacements[index * 3] ?? 0;
    const dy = options.frame?.displacements[index * 3 + 1] ?? 0;
    return [
      padding + (model.positions[index * 3]! + dx * deformationScale - bounds.min[0]) * scale,
      height - padding - (model.positions[index * 3 + 1]! + dy * deformationScale - bounds.min[1]) * scale,
    ];
  };

  const lines: string[] = [];
  model.elementTags.forEach((_tag, elementIndex) => {
    const tags = elementNodeTags(model, elementIndex);
    for (const [a, b] of elementEdges(tags.length)) {
      const start = point(tags[a]!);
      const end = point(tags[b]!);
      lines.push(`<line x1="${n(start[0])}" y1="${n(start[1])}" x2="${n(end[0])}" y2="${n(end[1])}"/>`);
    }
  });

  const circles = [...model.nodeTags].map(tag => {
    const position = point(tag);
    return `<circle cx="${n(position[0])}" cy="${n(position[1])}" r="2.5"/>`;
  });

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">`,
    '<rect width="100%" height="100%" fill="white"/>',
    '<g fill="none" stroke="#27313a" stroke-width="1.5" stroke-linecap="round">',
    ...lines,
    '</g><g fill="#087f8c">',
    ...circles,
    "</g></svg>",
  ].join("");
}

function elementEdges(count: number): readonly (readonly [number, number])[] {
  if (count <= 1) return [];
  if (count === 2) return [[0, 1]];
  return Array.from({ length: count }, (_, index) => [index, (index + 1) % count] as const);
}

function n(value: number): string {
  return Number(value.toFixed(4)).toString();
}
