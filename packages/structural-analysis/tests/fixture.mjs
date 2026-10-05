export const material = {
  elasticModulus: 2_500_000,
  shearModulus: 1_000_000,
  poissonRatio: 0.25,
};

export const rectangle = (x0, x1, y0 = 0, y1 = 0.2) => [
  { x: x0, y: y0 },
  { x: x1, y: y0 },
  { x: x1, y: y1 },
  { x: x0, y: y1 },
];

export function spatialSampleInput() {
  const levels = [
    { id: 'N1', elevation: 3, centerOfMass: { x: 3, y: 2 } },
    { id: 'N2', elevation: 6, centerOfMass: { x: 3, y: 2 } },
    { id: 'N3', elevation: 9, centerOfMass: { x: 3, y: 2 } },
  ];
  const walls = [
    { id: 'MX-S-1', direction: 'x', sectionPolygon: rectangle(0, 2, 0, 0.2), material },
    { id: 'MX-S-2', direction: 'x', sectionPolygon: rectangle(4, 6, 0, 0.2), material },
    { id: 'MX-N-1', direction: 'x', sectionPolygon: rectangle(0, 2, 3.8, 4), material },
    { id: 'MX-N-2', direction: 'x', sectionPolygon: rectangle(4, 6, 3.8, 4), material },
    { id: 'MY-W', direction: 'y', sectionPolygon: rectangle(0, 0.2, 0, 4), material },
    { id: 'MY-E', direction: 'y', sectionPolygon: rectangle(5.8, 6, 0, 4), material },
  ];
  const lintels = levels.flatMap(({ id: levelId }) => [
    { id: `D-S-${levelId}`, levelId, direction: 'x', wallAId: 'MX-S-1', wallBId: 'MX-S-2', width: 0.2, depth: 0.4, material },
    { id: `D-N-${levelId}`, levelId, direction: 'x', wallAId: 'MX-N-1', wallBId: 'MX-N-2', width: 0.2, depth: 0.4, material },
  ]);
  const distributed = (axis) => levels.map((level, index) => ({ levelId: level.id, fx: axis === 'x' ? 10 * (index + 1) : 0, fy: axis === 'y' ? 10 * (index + 1) : 0 }));
  return {
    id: 'three-story-spatial-wide-column',
    walls,
    lintels,
    levels,
    loadCases: [
      { id: 'SX', levelLoads: distributed('x') },
      { id: 'SY', levelLoads: distributed('y') },
      { id: 'ST', levelLoads: levels.map((level, index) => ({ levelId: level.id, fx: 0, fy: 0, mz: 5 * (index + 1) })) },
    ],
  };
}
