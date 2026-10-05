export const geometry = {
  drawingLengthUnit: 'm', // AutoCAD coordinates can use a different unit than input dimensions.
  layers: { wallsX: 'MUROS_X', wallsY: 'MUROS_Y', lintels: 'DINTELES', columns: 'COLS' },
  levels: [
    { id: 'N1', wallHeight: 2.8 },
    { id: 'N2', wallHeight: 2.8 },
    { id: 'N3', wallHeight: 2.8 },
    { id: 'N4', wallHeight: 2.8 },
  ],
  slab: { type: 'bidirectional', thickness: 0.2 },
  plasterThickness: 0.010,
  lintelDepth: 0.20,
  lintelWidthTolerance: 0.01,
  // null uses the calculated center of mass of each level.
  centerOfMass: null,
};
