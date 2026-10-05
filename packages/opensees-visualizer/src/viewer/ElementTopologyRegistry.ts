export type ElementEdge = readonly [startNodeIndex: number, endNodeIndex: number];

export interface ElementTopologyProvider {
  supports(elementType: string, nodeCount: number): boolean;
  edges(elementType: string, nodeCount: number): readonly ElementEdge[];
}

export class ElementTopologyRegistry {
  private readonly providers: ElementTopologyProvider[] = [];

  constructor() {
    this.providers.push(solidTopology, lineAndSurfaceTopology);
  }

  register(provider: ElementTopologyProvider, priority = false): this {
    if (priority) this.providers.unshift(provider);
    else this.providers.push(provider);
    return this;
  }

  edges(elementType: string, nodeCount: number): readonly ElementEdge[] {
    const provider = this.providers.find(candidate => candidate.supports(elementType, nodeCount));
    return provider?.edges(elementType, nodeCount) ?? [];
  }
}

const solidTopology: ElementTopologyProvider = {
  supports: (type, count) =>
    (count === 4 && /tetra/i.test(type)) ||
    (count >= 8 && /(brick|bbarbrick|stdbrick|sspbrick|up)/i.test(type)),
  edges: (_type, count) => {
    if (count === 4) {
      return [[0, 1], [1, 2], [2, 0], [0, 3], [1, 3], [2, 3]];
    }
    return [
      [0, 1], [1, 2], [2, 3], [3, 0],
      [4, 5], [5, 6], [6, 7], [7, 4],
      [0, 4], [1, 5], [2, 6], [3, 7],
    ];
  },
};

const lineAndSurfaceTopology: ElementTopologyProvider = {
  supports: () => true,
  edges: (_type, count) => {
    if (count < 2) return [];
    if (count === 2) return [[0, 1]];
    return Array.from({ length: count }, (_, index) => [index, (index + 1) % count] as const);
  },
};
