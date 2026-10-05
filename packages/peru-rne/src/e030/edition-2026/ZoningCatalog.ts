import type { E030SeismicZone } from './metadata.js';
import { E030_2026_ZONING } from './zoning-data.generated.js';

export type ZoningTuple = readonly [department: string, province: string, district: string, zone: E030SeismicZone];

export interface ZoningEntry {
  department: string;
  province: string;
  district: string;
  zone: E030SeismicZone;
}

function normalize(value: string): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase().replace(/[^A-Z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
}

function editDistance(left: string, right: string): number {
  const previous = Array.from({ length: right.length + 1 }, (_, index) => index);
  for (let leftIndex = 1; leftIndex <= left.length; leftIndex += 1) {
    const current = [leftIndex];
    for (let rightIndex = 1; rightIndex <= right.length; rightIndex += 1) {
      current[rightIndex] = Math.min(
        current[rightIndex - 1]! + 1,
        previous[rightIndex]! + 1,
        previous[rightIndex - 1]! + (left[leftIndex - 1] === right[rightIndex - 1] ? 0 : 1),
      );
    }
    previous.splice(0, previous.length, ...current);
  }
  return previous[right.length]!;
}

function score(query: string, candidate: string): number {
  if (query === candidate) return 0;
  return editDistance(query, candidate);
}

export class E030ZoningCatalog2026 {
  public readonly size = E030_2026_ZONING.length;

  public find(department: string, province: string, district: string): ZoningEntry {
    const query = [department, province, district].map(normalize);
    const ranked = E030_2026_ZONING.map((entry) => ({ entry, score: score(query[0]!, entry[0]) + score(query[1]!, entry[1]) + score(query[2]!, entry[2]) }))
      .sort((left, right) => left.score - right.score);
    const best = ranked[0];
    if (!best || best.score > 3) throw new RangeError(`District not found in E.030:2026 Annex II: ${department} / ${province} / ${district}.`);
    if (ranked[1]?.score === best.score) throw new RangeError(`Ambiguous district in E.030:2026 Annex II: ${department} / ${province} / ${district}.`);
    return { department: best.entry[0], province: best.entry[1], district: best.entry[2], zone: best.entry[3] };
  }

  public zone(department: string, province: string, district: string): E030SeismicZone {
    return this.find(department, province, district).zone;
  }
}
