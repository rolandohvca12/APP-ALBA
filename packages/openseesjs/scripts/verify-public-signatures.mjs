import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = new URL('..', import.meta.url).pathname.slice(1);
const publicDeclarations = [
  join(root, 'dist', 'native-index.d.ts'),
  join(root, 'dist', 'native'),
  join(root, 'dist', 'openseespy', 'generated'),
  join(root, 'dist', 'openseespy', 'types.d.ts'),
];
const restParameter = /\.\.\.[A-Za-z_$][\w$]*\s*:/g;
const failures = [];

for (const path of publicDeclarations.flatMap(walk)) {
  if (!path.endsWith('.d.ts')) continue;
  const source = readFileSync(path, 'utf8');
  for (const match of source.matchAll(restParameter)) {
    const line = source.slice(0, match.index).split('\n').length;
    failures.push(`${relative(root, path)}:${line} ${match[0]}`);
  }
}

if (failures.length > 0) {
  throw new Error(`Public rest parameters are forbidden:\n${failures.join('\n')}`);
}

const generatedDeclarations = readFileSync(
  join(root, 'dist', 'openseespy', 'generated', 'OpenSeesPyApi.generated.d.ts'),
  'utf8',
);
const expectedVariants = {
  element: 'elasticBeamColumn',
  uniaxialMaterial: 'Steel01',
  recorder: 'Node',
  nDMaterial: 'ElasticIsotropic',
  section: 'Fiber',
  beamIntegration: 'Lobatto',
  algorithm: 'Newton',
  integrator: 'LoadControl',
  system: 'BandGen',
  test: 'NormDispIncr',
  timeSeries: 'Linear',
};
for (const [command, variant] of Object.entries(expectedVariants)) {
  const interfaceName = `${command[0].toUpperCase()}${command.slice(1)}Command`;
  if (!generatedDeclarations.includes(`readonly ${command}: ${interfaceName}<this>;`)) {
    throw new Error(`OpenSeesPyCommandMethods must expose the generated ${interfaceName} facade.`);
  }
  const escapedVariant = variant.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(`export interface ${interfaceName}<TReturn>[\\s\\S]*?["']${escapedVariant}["']\\(`);
  if (!pattern.test(generatedDeclarations)) {
    throw new Error(`${interfaceName} must expose the typed ${variant} variant method.`);
  }
}

console.log('Public declarations have no rest parameters and expose generated variant methods.');

function walk(path) {
  const stats = statSync(path);
  if (stats.isFile()) return [path];
  return readdirSync(path).flatMap(entry => walk(join(path, entry)));
}
