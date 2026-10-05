import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { AutoCadQueryClient, AutoCadRealtimeClient } from '../dist/index.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outputPath = resolve(root, 'tests/fixtures/tributary-bidirectional-real.json');
const layers = {
  wallsX: 'MUROS_X',
  wallsY: 'MUROS_Y',
  lintels: 'DINTELES',
  columns: 'COL EXT',
  reference: 'AREAS_TRIBUTARIAS_REFERENCIA',
};

const transport = new AutoCadRealtimeClient();
await transport.connect();

try {
  const query = new AutoCadQueryClient(transport);
  const [wallsX, wallsY, lintels, columns, reference] = await Promise.all([
    query.getGeometryByLayer(layers.wallsX),
    query.getGeometryByLayer(layers.wallsY),
    query.getGeometryByLayer(layers.lintels),
    query.getGeometryByLayer(layers.columns),
    query.getGeometryByLayer(layers.reference),
  ]);
  const referenceAreas = reference.filter((geometry) => geometry.closed && geometry.points.length >= 3);
  const referenceLines = reference.filter((geometry) => !geometry.closed);

  if (referenceAreas.length === 0) {
    throw new Error(`Layer ${layers.reference} has no closed reference polygons.`);
  }

  const fixture = {
    schemaVersion: 1,
    mode: 'bidirectional',
    layers,
    sources: { wallsX, wallsY, lintels, columns },
    expected: { areas: referenceAreas, constructionLines: referenceLines },
  };

  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(fixture, null, 2)}\n`, 'utf8');
  console.log(JSON.stringify({
    outputPath,
    wallsX: wallsX.length,
    wallsY: wallsY.length,
    lintels: lintels.length,
    columns: columns.length,
    referenceAreas: referenceAreas.length,
    referenceLines: referenceLines.length,
  }));
} finally {
  transport.close();
}

process.exit(0);
