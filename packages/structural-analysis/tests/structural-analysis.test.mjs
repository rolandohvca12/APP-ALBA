import assert from 'node:assert/strict';
import test from 'node:test';
import {
  Etabs3DStaticStrategy,
  AutoCadSpatialModelSource,
  StructuralEngineComparator,
  OpenSees3DStaticStrategy,
  SpatialWideColumnModelAssembler,
  WideColumnSectionFactory,
} from '../dist/index.js';
import { EtabsClient } from '@app-alba/etabs-bridge-client';
import { material, rectangle, spatialSampleInput } from './fixture.mjs';

test('selects Cy-yMin, Ix and ky for analysis in Y', () => {
  const section = new WideColumnSectionFactory().create({
    id: 'M1Y',
    sectionPolygon: [
      { x: 10, y: 20 },
      { x: 10.3, y: 20 },
      { x: 10.3, y: 23 },
      { x: 10, y: 23 },
    ],
    material: { elasticModulus: 2_500_000, shearModulus: 1_000_000 },
  }, 'y');

  assert.ok(Math.abs(section.localCentroid - 1.5) < 1e-12);
  assert.ok(Math.abs(section.bendingInertia - 0.3 * 3 ** 3 / 12) < 1e-12);
  assert.ok(Math.abs(section.shearCorrection - 5 / 6) < 1e-12);
  assert.ok(Math.abs(section.effectiveShearArea - section.area * section.shearCorrection) < 1e-12);
});

test('assembles one 3D model with X/Y walls, master nodes and torsional diaphragms', () => {
  const model = new SpatialWideColumnModelAssembler().assemble(spatialSampleInput());
  assert.equal(model.wallPiers.length, 18);
  assert.equal(model.rigidArms.length, 12);
  assert.equal(model.nodes.filter((node) => node.role === 'rigid-arm-face').length, 12);
  assert.ok(model.lintels.every((lintel) => lintel.startNodeId.includes(':FACE') && lintel.endNodeId.includes(':FACE')));
  assert.equal(model.floorConstraints.length, 3);
  assert.ok(model.floorConstraints.every((floor) => floor.coupledDofs.join(',') === 'ux,uy,rz'));
  assert.deepEqual(model.loadCaseIds, ['SX', 'SY', 'ST']);
  const artifact = new OpenSees3DStaticStrategy().build(model, 'SX');
  assert.equal(artifact.caseId, 'SX');
  assert.equal(artifact.nodeTags.size, model.nodes.length);
  assert.equal(
    artifact.elementTags.size,
    model.wallPiers.length + model.rigidArms.length + model.lintels.length,
  );
});

test('shares one rigid arm when two lintels meet the same side of a perpendicular wall', () => {
  const input = {
    id: 'perpendicular-lintel-joint',
    walls: [
      { id: 'LEFT', direction: 'x', sectionPolygon: rectangle(0, 2, 0, 0.2), material },
      { id: 'RIGHT', direction: 'x', sectionPolygon: rectangle(4, 6, 0, 0.2), material },
      { id: 'CENTER', direction: 'y', sectionPolygon: rectangle(2.9, 3.1, 0, 3), material },
    ],
    lintels: [
      { id: 'DL', levelId: 'N1', direction: 'x', wallAId: 'LEFT', wallBId: 'CENTER', startFace: { x: 2, y: 0.1 }, endFace: { x: 2.9, y: 0.1 }, width: 0.2, depth: 0.4, material },
      { id: 'DR', levelId: 'N1', direction: 'x', wallAId: 'CENTER', wallBId: 'RIGHT', startFace: { x: 3.1, y: 0.1 }, endFace: { x: 4, y: 0.1 }, width: 0.2, depth: 0.4, material },
    ],
    levels: [{ id: 'N1', elevation: 3, centerOfMass: { x: 3, y: 1 } }],
    loadCases: [{ id: 'SX', levelLoads: [{ levelId: 'N1', fx: 10, fy: 0 }] }],
  };
  const model = new SpatialWideColumnModelAssembler().assemble(input);
  const shared = model.rigidArms.find((arm) => arm.wallId === 'CENTER');
  assert.deepEqual(shared.lintelIds, ['DL', 'DR']);
  assert.equal(model.lintels[0].endArmId, shared.id);
  assert.equal(model.lintels[1].startArmId, shared.id);
  const first = model.nodes.find((node) => node.id === model.lintels[0].startNodeId);
  const joint = model.nodes.find((node) => node.id === shared.faceNodeId);
  const lintelVector = { x: joint.x - first.x, y: joint.y - first.y };
  const armVector = { x: shared.face.x - shared.center.x, y: shared.face.y - shared.center.y };
  assert.ok(Math.abs(lintelVector.x * armVector.x + lintelVector.y * armVector.y) < 1e-12);
});

test('splits a rigid arm at two distinct lintel taps on one wall side', () => {
  const input = {
    id: 'two-lintel-taps',
    walls: [
      { id: 'M1Y', direction: 'y', sectionPolygon: rectangle(0, 0.2, 0, 4), material },
      { id: 'M1X', direction: 'x', sectionPolygon: rectangle(2, 4, 0, 0.2), material },
      { id: 'M2X', direction: 'x', sectionPolygon: rectangle(2, 4, 1, 1.2), material },
    ],
    lintels: [
      { id: 'D1', levelId: 'N1', direction: 'x', wallAId: 'M1Y', wallBId: 'M1X', startFace: { x: 0.2, y: 0.1 }, endFace: { x: 2, y: 0.1 }, width: 0.2, depth: 0.4, material },
      { id: 'D2', levelId: 'N1', direction: 'x', wallAId: 'M1Y', wallBId: 'M2X', startFace: { x: 0.2, y: 1.1 }, endFace: { x: 2, y: 1.1 }, width: 0.2, depth: 0.4, material },
    ],
    levels: [{ id: 'N1', elevation: 3, centerOfMass: { x: 2, y: 2 } }],
    loadCases: [{ id: 'SX', levelLoads: [{ levelId: 'N1', fx: 10, fy: 0 }] }],
  };
  const model = new SpatialWideColumnModelAssembler().assemble(input);
  const arms = model.rigidArms.filter((arm) => arm.wallId === 'M1Y');
  assert.equal(arms.length, 2);
  assert.equal(arms[1].centerNodeId, arms[0].faceNodeId);
  assert.equal(model.lintels.find((lintel) => lintel.id === 'D2').startNodeId, arms[0].faceNodeId);
  assert.equal(model.lintels.find((lintel) => lintel.id === 'D1').startNodeId, arms[1].faceNodeId);
  assert.ok(arms.every((arm) => arm.length > 0));
});

test('merges submillimeter lintel taps without creating a near-zero rigid arm', () => {
  const input = {
    id: 'near-coincident-taps',
    walls: [
      { id: 'CENTER', direction: 'y', sectionPolygon: rectangle(0, 0.2, 0, 4), material },
      { id: 'RIGHT1', direction: 'x', sectionPolygon: rectangle(2, 4, 0, 0.2), material },
      { id: 'RIGHT2', direction: 'x', sectionPolygon: rectangle(2, 4, 0.000074, 0.200074), material },
    ],
    lintels: [
      { id: 'D1', levelId: 'N1', direction: 'x', wallAId: 'CENTER', wallBId: 'RIGHT1', startFace: { x: 0.2, y: 0.1 }, endFace: { x: 2, y: 0.1 }, width: 0.2, depth: 0.4, material },
      { id: 'D2', levelId: 'N1', direction: 'x', wallAId: 'CENTER', wallBId: 'RIGHT2', startFace: { x: 0.2, y: 0.100074 }, endFace: { x: 2, y: 0.100074 }, width: 0.2, depth: 0.4, material },
    ],
    levels: [{ id: 'N1', elevation: 3, centerOfMass: { x: 2, y: 2 } }],
    loadCases: [{ id: 'SX', levelLoads: [{ levelId: 'N1', fx: 10, fy: 0 }] }],
  };
  const model = new SpatialWideColumnModelAssembler().assemble(input);
  const centerArms = model.rigidArms.filter((arm) => arm.wallId === 'CENTER');
  assert.equal(centerArms.length, 1);
  assert.deepEqual(centerArms[0].lintelIds, ['D1', 'D2']);
  assert.equal(model.lintels[0].startNodeId, model.lintels[1].startNodeId);
  assert.ok(model.rigidArms.every((arm) => arm.length >= 1e-3));
});

test('ETABS 3D strategy creates diaphragms, six-component loads and all result cases', async () => {
  const requests = [];
  let selectedCase = 'SX';
  const runFlags = new Map();
  const resultants = {
    SX: { fx: -60, fy: 0, mz: 120 },
    SY: { fx: 0, fy: -60, mz: -180 },
    ST: { fx: 0, fy: 0, mz: -30 },
  };
  const transport = { async request(message) {
    requests.push(message);
    if (message.method === 'AddCartesian') return { name: message.parameters.UserName };
    if (message.api === 'cFrameObj' && message.method === 'AddByPoint') return { name: message.parameters.UserName };
    if (message.method === 'SetCaseSelectedForOutput') { selectedCase = message.parameters.Name; return undefined; }
    if (message.api === 'cSapModel' && message.method === 'GetModelIsLocked') return false;
    if (message.api === 'cAnalyze' && message.method === 'SetRunCaseFlag') {
      if (message.parameters.All) runFlags.clear();
      else runFlags.set(message.parameters.Name, message.parameters.Run);
      return undefined;
    }
    if (message.api === 'cAnalyze' && message.method === 'GetRunCaseFlag') {
      return { numberItems: runFlags.size, caseName: [...runFlags.keys()], run: [...runFlags.values()] };
    }
    if (message.api === 'cDatabaseTables' && message.method === 'ApplyEditedTables') return { numFatalErrors: 0, numErrorMsgs: 0, numWarnMsgs: 0, numInfoMsgs: 0, importLog: '' };
    if (message.api === 'cLoadPatterns' && message.method === 'GetAutoSeismicCode') return { codeName: 'User Loads' };
    if (message.api === 'cAnalysisResults' && message.method === 'BaseReact') {
      const r = resultants[selectedCase];
      return { numberResults: 1, loadCase: [selectedCase], stepType: [''], stepNum: [0], fX: [r.fx], fY: [r.fy], fZ: [0], mX: [0], paramMy: [0], mZ: [r.mz], gX: 0, gY: 0, gZ: 0 };
    }
    if (message.api === 'cAnalysisResults' && message.method === 'JointDispl') {
      return { numberResults: 1, obj: [''], elm: [''], loadCase: [selectedCase], stepType: [''], stepNum: [0], u1: [0.001], u2: [0.002], u3: [0], r1: [0], r2: [0], r3: [0.0001] };
    }
    if (message.api === 'cAnalysisResults' && message.method === 'FrameForce') {
      return { numberResults: 1, obj: [message.parameters.Name], objSta: [0], elm: [message.parameters.Name], elmSta: [0], loadCase: [selectedCase], stepType: [''], stepNum: [0], p: [1], v2: [2], v3: [3], t: [0], m2: [4], m3: [5] };
    }
    return undefined;
  } };
  const input = spatialSampleInput();
  input.walls = input.walls.map((wall) => ({ ...wall, material: { ...wall.material, weightPerVolume: 18 } }));
  input.lintels = input.lintels.map((lintel) => ({ ...lintel, material: { ...lintel.material, weightPerVolume: 24 } }));
  const model = new SpatialWideColumnModelAssembler().assemble(input);
  const result = await new Etabs3DStaticStrategy(new EtabsClient(transport), {
    displayUnits: { force: 'tf', length: 'm' },
  }).analyze(model);
  assert.equal(result.cases.length, 3);
  assert.equal(requests.find((item) => item.method === 'InitializeNewModel').parameters.Units, 'kN_m_C');
  const displayUnits = requests.findIndex((item) => item.method === 'SetPresentUnits_2');
  const lastFrameForce = requests.findLastIndex((item) => item.method === 'FrameForce');
  assert.ok(displayUnits > lastFrameForce);
  assert.equal(requests[displayUnits].parameters.forceUnits, 'tonf');
  assert.equal(requests[displayUnits].parameters.lengthUnits, 'm');
  assert.ok(result.cases.every((item) => item.converged));
  assert.equal(requests.filter((item) => item.method === 'SetDiaphragm' && item.api === 'cPointObj').length, 21);
  assert.equal(requests.some((item) => item.method === 'SetLoadForce'), false);
  const userLoads = requests.find((item) => item.api === 'cDatabaseTables' && item.method === 'SetTableForEditingArray');
  assert.equal(userLoads.parameters.TableKey, 'Load Pattern Definitions - Auto Seismic - User Loads');
  assert.equal(userLoads.parameters.NumberRecords, 9);
  assert.ok(userLoads.parameters.TableData.includes('5'));
  assert.deepEqual(userLoads.parameters.TableData.slice(0, 3), ['SX', '1', '1']);
  assert.deepEqual(userLoads.parameters.TableData.slice(12, 15), ['SX', '', '1']);
  assert.deepEqual(userLoads.parameters.TableData.slice(24, 27), ['SX', '', '1']);
  assert.deepEqual(userLoads.parameters.TableData.slice(36, 39), ['SY', '1', '1']);
  assert.equal(requests.filter((item) => item.api === 'cCaseStaticLinear' && item.method === 'SetLoads').length, 0);
  assert.ok(requests.some((item) => item.api === 'cStory' && item.method === 'SetStories_2'));
  assert.equal(requests.filter((item) => item.method === 'SetReleases').length, 6);
  assert.equal(requests.filter((item) => item.api === 'cFrameObj' && item.method === 'AddByPoint').length, 36);
  assert.equal(
    requests.filter((item) => item.api === 'cFrameObj' && item.method === 'AddByPoint'
      && String(item.parameters.UserName).startsWith('LINTEL_')).length,
    model.lintels.length,
  );
  assert.equal(requests.some((item) => item.method === 'SetEndLengthOffset'), false);
  assert.ok(result.cases.every((item) => item.wallActions.length === 18));
  const sections = requests.filter((item) => item.api === 'cPropFrame' && item.method === 'SetGeneral');
  const wallX = sections.find((item) => item.parameters.Name === 'ALBA_3D_WALL_MX-S-1');
  const wallY = sections.find((item) => item.parameters.Name === 'ALBA_3D_WALL_MY-W');
  const rigidArmSection = sections.find((item) => item.parameters.Name.startsWith('ALBA_3D_RIGID_ARM_'));
  assert.equal(sections.filter((item) => item.parameters.Name.startsWith('ALBA_3D_LINTEL_')).length, 1);
  assert.equal(sections.filter((item) => item.parameters.Name.startsWith('ALBA_3D_RIGID_ARM_')).length, 1);
  assert.equal(rigidArmSection.parameters.Color, 0x32dc96);
  assert.equal(requests.filter((item) => item.api === 'cPropFrame' && item.method === 'SetModifiers').length, 1);
  assert.equal(wallX.parameters.T3, 2);
  assert.ok(Math.abs(wallX.parameters.T2 - 0.2) < 1e-12);
  assert.ok(Math.abs(wallY.parameters.T3 - 0.2) < 1e-12);
  assert.equal(wallY.parameters.T2, 4);
  assert.equal(wallX.parameters.Color, 42_495);
  assert.ok(requests.some((item) => item.api === 'cPropMaterial' && item.method === 'SetMaterial' && item.parameters.Name === 'ALBANILERIA' && item.parameters.Color === 42_495));
  const weights = requests.filter((item) => item.api === 'cPropMaterial' && item.method === 'SetWeightAndMass');
  assert.deepEqual(weights.map((item) => [item.parameters.Name, item.parameters.MyOption, item.parameters.Value]), [
    ['ALBANILERIA', 1, 18], ['CONCRETO_DINTEL', 1, 24],
  ]);
  assert.equal(requests.filter((item) => item.api === 'cPierLabel' && item.method === 'SetPier').length, 6);
  assert.equal(requests.filter((item) => item.api === 'cFrameObj' && item.method === 'SetPier').length, 18);
});

test('loads tagged AutoCAD walls into the solver-neutral spatial input', async () => {
  const geometry = (handle, x0, x1, y0, y1) => ({ handle, type: 'Polyline', closed: true, length: 0, area: (x1 - x0) * (y1 - y0), points: [
    { x: x0, y: y0, z: 0 }, { x: x1, y: y0, z: 0 }, { x: x1, y: y1, z: 0 }, { x: x0, y: y1, z: 0 },
  ] });
  const xWalls = [geometry('HX1', 0, 2, 0, 0.2), geometry('HX2', 4, 6, 3.8, 4)];
  const yWalls = [geometry('HY1', 0, 0.2, 0, 4), geometry('HY2', 5.8, 6, 0, 4)];
  const selector = (items) => ({ resolve: async () => items, resolveLabels: async () => new Map(), describe: () => 'test' });
  const query = { getTagsByHandles: async () => ({ HX1: 'M1X', HX2: 'M2X', HY1: 'M1Y', HY2: 'M2Y' }) };
  const loaded = await AutoCadSpatialModelSource.load(query, {
    id: 'cad-model', sources: { wallsX: selector(xWalls), wallsY: selector(yWalls) },
    levels: spatialSampleInput().levels, loadCases: spatialSampleInput().loadCases,
    wallMaterial: { elasticModulus: 2_500_000, shearModulus: 1_000_000 },
    lintelMaterial: { elasticModulus: 20_000_000, shearModulus: 8_000_000 }, lintelDepth: 0.4,
  });
  assert.deepEqual(loaded.input.walls.map((wall) => wall.id), ['M1X', 'M2X', 'M1Y', 'M2Y']);
  assert.ok(loaded.input.walls.every((wall) => wall.sectionPolygon.length >= 4));
  assert.equal(loaded.warnings.length, 0);
});

test('uses nominal lintel widths for lintels and rigid arms', async () => {
  const geometry = (handle, x0, x1, y0, y1) => ({ handle, type: 'Polyline', closed: true, length: 0, area: (x1 - x0) * (y1 - y0), points: [
    { x: x0, y: y0, z: 0 }, { x: x1, y: y0, z: 0 }, { x: x1, y: y1, z: 0 }, { x: x0, y: y1, z: 0 },
  ] });
  const selector = (items) => ({ resolve: async () => items });
  const query = { getTagsByHandles: async () => ({}) };
  const loaded = await AutoCadSpatialModelSource.load(query, {
    id: 'nominal-lintels',
    sources: {
      wallsX: selector([geometry('X1', 0, 2, 0, 0.2), geometry('X2', 4, 6, 0, 0.2)]),
      wallsY: selector([geometry('Y1', 0, 0.2, 0, 4), geometry('Y2', 5.8, 6, 0, 4)]),
      lintels: selector([geometry('D1', 2, 4, 0.035, 0.164338)]),
    },
    levels: [{ id: 'N1', elevation: 3, centerOfMass: { x: 3, y: 2 } }],
    loadCases: [{ id: 'SX', levelLoads: [{ levelId: 'N1', fx: 10, fy: 0 }] }],
    wallMaterial: material,
    lintelMaterial: material,
    lintelWidthTolerance: 0.01,
    lintelDepth: 0.2,
  });
  const model = new SpatialWideColumnModelAssembler().assemble(loaded.input);
  assert.deepEqual(model.lintels.map((lintel) => lintel.width), [0.13]);
  assert.ok(model.rigidArms.every((arm) => arm.width === 0.13));
});

test('preserves every AutoCAD lintel on every typical level', async () => {
  const geometry = (handle, x0, x1, y0, y1) => ({ handle, type: 'Polyline', closed: true, length: 0, area: (x1 - x0) * (y1 - y0), points: [
    { x: x0, y: y0, z: 0 }, { x: x1, y: y0, z: 0 }, { x: x1, y: y1, z: 0 }, { x: x0, y: y1, z: 0 },
  ] });
  const selector = (items) => ({ resolve: async () => items });
  const wallsX = [
    geometry('XB1', 0, 2, 0, 0.2), geometry('XB2', 4, 6, 0, 0.2),
    geometry('XT1', 0, 2, 3.8, 4), geometry('XT2', 4, 6, 3.8, 4),
  ];
  const wallsY = [geometry('YL', 0, 0.2, 0, 4), geometry('YR', 5.8, 6, 0, 4)];
  const lintels = [geometry('D1', 2, 4, 0.05, 0.15), geometry('D2', 2, 4, 3.85, 3.95)];
  const tags = Object.fromEntries([
    ...wallsX.map((item, index) => [item.handle, `MX${index + 1}`]),
    ...wallsY.map((item, index) => [item.handle, `MY${index + 1}`]),
    ['D1', 'DL1'], ['D2', 'DL2'],
  ]);
  const levels = [
    { id: 'N1', elevation: 3, centerOfMass: { x: 3, y: 2 } },
    { id: 'N2', elevation: 6, centerOfMass: { x: 3, y: 2 } },
  ];
  const loaded = await AutoCadSpatialModelSource.load({ getTagsByHandles: async () => tags }, {
    id: 'complete-lintel-coverage',
    sources: { wallsX: selector(wallsX), wallsY: selector(wallsY), lintels: selector(lintels) },
    levels,
    loadCases: [{ id: 'SX', levelLoads: levels.map((level) => ({ levelId: level.id, fx: 10, fy: 0 })) }],
    wallMaterial: material,
    lintelMaterial: material,
    lintelDepth: 0.2,
  });
  assert.deepEqual(loaded.coverage, {
    sourceWallCount: 6,
    sourceLintelCount: 2,
    analyticalWallCount: 6,
    analyticalLintelCount: 4,
  });
  const model = new SpatialWideColumnModelAssembler().assemble(loaded.input);
  assert.equal(model.lintels.length, 4);
  assert.deepEqual(new Set(model.lintels.map((lintel) => lintel.id)), new Set(['DL1:N1', 'DL1:N2', 'DL2:N1', 'DL2:N2']));
  const artifact = new OpenSees3DStaticStrategy().build(model, 'SX');
  assert.ok(model.lintels.every((lintel) => artifact.elementTags.has(lintel.id)));
});

test('rejects duplicate AutoCAD lintel tags instead of overwriting elements', async () => {
  const geometry = (handle, x0, x1, y0, y1) => ({ handle, type: 'Polyline', closed: true, length: 0, area: (x1 - x0) * (y1 - y0), points: [
    { x: x0, y: y0, z: 0 }, { x: x1, y: y0, z: 0 }, { x: x1, y: y1, z: 0 }, { x: x0, y: y1, z: 0 },
  ] });
  const selector = (items) => ({ resolve: async () => items });
  await assert.rejects(() => AutoCadSpatialModelSource.load({ getTagsByHandles: async () => ({ D1: 'DUP', D2: 'DUP' }) }, {
    id: 'duplicate-lintel-tags',
    sources: {
      wallsX: selector([geometry('X1', 0, 2, 0, 0.2), geometry('X2', 4, 6, 0, 0.2)]),
      wallsY: selector([geometry('Y1', 0, 0.2, 0, 4), geometry('Y2', 5.8, 6, 0, 4)]),
      lintels: selector([geometry('D1', 2, 4, 0.05, 0.15), geometry('D2', 2, 4, 0.05, 0.15)]),
    },
    levels: [{ id: 'N1', elevation: 3, centerOfMass: { x: 3, y: 2 } }],
    loadCases: [{ id: 'SX', levelLoads: [{ levelId: 'N1', fx: 10, fy: 0 }] }],
    wallMaterial: material,
    lintelMaterial: material,
    lintelDepth: 0.2,
  }), /AutoCAD lintel tag DUP is not unique/);
});

test('connects a lintel through an end column included in the transformed wall section', async () => {
  const geometry = (handle, x0, x1, y0, y1) => ({ handle, type: 'Polyline', closed: true, length: 0, area: (x1 - x0) * (y1 - y0), points: [
    { x: x0, y: y0, z: 0 }, { x: x1, y: y0, z: 0 }, { x: x1, y: y1, z: 0 }, { x: x0, y: y1, z: 0 },
  ] });
  const selector = (items) => ({ resolve: async () => items });
  const loaded = await AutoCadSpatialModelSource.load({ getTagsByHandles: async () => ({ X1: 'M1X', X2: 'M2X', Y1: 'M1Y', Y2: 'M2Y', D1: 'DL1' }) }, {
    id: 'lintel-on-transformed-column',
    sources: {
      wallsX: selector([geometry('X1', 0, 2, 0, 0.2), geometry('X2', 4, 6, 0, 0.2)]),
      wallsY: selector([geometry('Y1', 0, 0.2, 0, 4), geometry('Y2', 5.8, 6, 0, 4)]),
      columns: selector([geometry('C1', 1.9, 2.5, -0.2, 0.4)]),
      lintels: selector([geometry('D1', 2.45, 4, 0.05, 0.15)]),
    },
    levels: [{ id: 'N1', elevation: 3, centerOfMass: { x: 3, y: 2 } }],
    loadCases: [{ id: 'SX', levelLoads: [{ levelId: 'N1', fx: 10, fy: 0 }] }],
    wallMaterial: material,
    lintelMaterial: material,
    lintelDepth: 0.2,
  });
  assert.equal(loaded.input.lintels.length, 1);
  assert.equal(loaded.input.lintels[0].wallAId, 'M1X');
  assert.equal(loaded.input.lintels[0].wallBId, 'M2X');
  const model = new SpatialWideColumnModelAssembler().assemble(loaded.input);
  assert.equal(model.lintels.length, 1);
  assert.equal(model.lintels[0].id, 'DL1:N1');
});

test('prefers physical supports over a remote transformed-wall overlap', async () => {
  const geometry = (handle, x0, x1, y0, y1) => ({ handle, type: 'Polyline', closed: true, length: 0, area: (x1 - x0) * (y1 - y0), points: [
    { x: x0, y: y0, z: 0 }, { x: x1, y: y0, z: 0 }, { x: x1, y: y1, z: 0 }, { x: x0, y: y1, z: 0 },
  ] });
  const selector = (items) => ({ resolve: async () => items });
  const tags = { XT: 'TOP', XB: 'BOTTOM', YL: 'LEFT', YR: 'RIGHT', D1: 'DL1' };
  const loaded = await AutoCadSpatialModelSource.load({ getTagsByHandles: async () => tags }, {
    id: 'physical-support-priority',
    sources: {
      // The remote top wall is intentionally first to expose order-dependent capture.
      wallsX: selector([geometry('XT', 0, 1.2, 0.5, 0.6), geometry('XB', 0, 1.2, 0, 0.1)]),
      wallsY: selector([geometry('YL', 0, 0.1, 0, 0.6), geometry('YR', 1.1, 1.2, 0, 0.6)]),
      lintels: selector([geometry('D1', 0.035, 0.065, 0.1, 0.5)]),
    },
    levels: [{ id: 'N1', elevation: 3, centerOfMass: { x: 0.6, y: 0.3 } }],
    loadCases: [{ id: 'SY', levelLoads: [{ levelId: 'N1', fx: 0, fy: 10 }] }],
    wallMaterial: material,
    lintelMaterial: material,
    lintelDepth: 0.2,
  });
  const lintel = loaded.input.lintels[0];
  assert.equal(lintel.wallAId, 'BOTTOM');
  assert.equal(lintel.wallBId, 'TOP');
  assert.ok(new SpatialWideColumnModelAssembler().assemble(loaded.input).lintels[0].clearLength > 0);
});

test('groups nearby lintel widths without merging distinct section sizes', async () => {
  const geometry = (handle, x0, x1, y0, y1) => ({ handle, type: 'Polyline', closed: true, length: 0, area: (x1 - x0) * (y1 - y0), points: [
    { x: x0, y: y0, z: 0 }, { x: x1, y: y0, z: 0 }, { x: x1, y: y1, z: 0 }, { x: x0, y: y1, z: 0 },
  ] });
  const widths = [0.129999, 0.13, 0.239999, 0.249999, 0.3];
  const selector = (items) => ({ resolve: async () => items });
  const loaded = await AutoCadSpatialModelSource.load({ getTagsByHandles: async () => ({}) }, {
    id: 'grouped-lintels',
    sources: {
      wallsX: selector([geometry('X1', 0, 2, 0, 0.2), geometry('X2', 4, 6, 0, 0.2)]),
      wallsY: selector([geometry('Y1', 0, 0.2, 0, 4), geometry('Y2', 5.8, 6, 0, 4)]),
      lintels: selector(widths.map((width, index) => geometry(`D${index}`, 2, 4, 0.1 - width / 2, 0.1 + width / 2))),
    },
    levels: [{ id: 'N1', elevation: 3, centerOfMass: { x: 3, y: 2 } }],
    loadCases: [{ id: 'SX', levelLoads: [{ levelId: 'N1', fx: 10, fy: 0 }] }],
    wallMaterial: material,
    lintelMaterial: material,
    lintelWidthTolerance: 0.01,
    lintelDepth: 0.2,
  });
  assert.deepEqual(loaded.input.lintels.map((lintel) => lintel.width), [0.13, 0.13, 0.24, 0.24, 0.3]);
});

test('compares wall shear and moment by tag, level and load case', () => {
  const wallActions = [{ wallId: 'M1X', levelId: 'N1', direction: 'x', shear: 10, moment: 20, axial: 5, station: 'bottom' }];
  const caseResult = { caseId: 'SX', appliedResultant: { fx: 10, fy: 0, mz: 0 }, baseReaction: { fx: 10, fy: 0, mz: 0 }, equilibriumError: 0, converged: true, levels: [], wallActions };
  const openSees = { engine: 'opensees', modelId: 'M', cases: [caseResult], diagnostics: [] };
  const etabs = { engine: 'etabs', modelId: 'M', cases: [{ ...caseResult, wallActions: [{ ...wallActions[0], shear: 10.2, moment: 19.8 }] }], diagnostics: [] };
  const comparison = new StructuralEngineComparator().compare(openSees, etabs, { relativeTolerance: 0.03 });
  assert.equal(comparison.allWithinTolerance, true);
  assert.equal(comparison.wallActions.length, 3);
});

test('does not validate matching actions when an engine fails equilibrium', () => {
  const action = { wallId: 'M1X', levelId: 'N1', direction: 'x', shear: 10, moment: 20, axial: 5, station: 'bottom' };
  const caseResult = { caseId: 'SX', appliedResultant: { fx: 10, fy: 0, mz: 0 }, baseReaction: { fx: 9, fy: 0, mz: 0 }, equilibriumError: 0.1, converged: false, levels: [], wallActions: [action] };
  const openSees = { engine: 'opensees', modelId: 'M', cases: [caseResult], diagnostics: [] };
  const etabs = { engine: 'etabs', modelId: 'M', cases: [{ ...caseResult, converged: true, equilibriumError: 0, baseReaction: { fx: 10, fy: 0, mz: 0 } }], diagnostics: [] };
  const comparison = new StructuralEngineComparator().compare(openSees, etabs);
  assert.equal(comparison.wallActions.every((item) => item.withinTolerance), true);
  assert.equal(comparison.allWithinTolerance, false);
  assert.match(comparison.diagnostics[0], /Nonconverged cases: opensees SX/);
});

test('ignores near-zero absolute noise in the maximum relative difference', () => {
  const action = { wallId: 'M1X', levelId: 'N1', direction: 'x', shear: 10, moment: 20, axial: 5e-7, station: 'bottom' };
  const caseResult = { caseId: 'SX', appliedResultant: { fx: 10, fy: 0, mz: 0 }, baseReaction: { fx: 10, fy: 0, mz: 0 }, equilibriumError: 0, converged: true, levels: [], wallActions: [action] };
  const openSees = { engine: 'opensees', modelId: 'M', cases: [caseResult], diagnostics: [] };
  const etabs = { engine: 'etabs', modelId: 'M', cases: [{ ...caseResult, wallActions: [{ ...action, axial: 0 }] }], diagnostics: [] };
  const comparison = new StructuralEngineComparator().compare(openSees, etabs);
  assert.equal(comparison.allWithinTolerance, true);
  assert.equal(comparison.maximumRelativeDifference, 0);
});
