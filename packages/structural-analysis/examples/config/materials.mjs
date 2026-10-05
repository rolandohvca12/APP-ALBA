// E and G use configured force/length2; specific weights use force/length3.
export const materials = {
  wall: { elasticModulus: 325_000, shearModulus: 130_000, poissonRatio: 0.25 },
  lintel: { elasticModulus: 150e3 * Math.sqrt(175), shearModulus: 150e3 * Math.sqrt(175) / 2.40, poissonRatio: 0.2 },
  specificWeights: { masonry: 1.8, concrete: 2.4, plaster: 2 },
};
