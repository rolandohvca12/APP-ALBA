import { ByLayer, ByTag, CombinedSelector, type GeometrySelector } from '@app-alba/autocad-client';
import type { AutoCadSelectorInput } from './types.js';

export function createGeometrySelector(input: AutoCadSelectorInput): GeometrySelector {
  const values = input.values.map((value) => value.trim()).filter(Boolean);
  if (values.length === 0) throw new RangeError(`AutoCAD ${input.type} selector requires at least one value.`);
  const selectors = values.map((value) => input.type === 'layer' ? new ByLayer(value) : new ByTag(value));
  return selectors.length === 1 ? selectors[0]! : new CombinedSelector(selectors);
}
