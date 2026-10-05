import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const required = [
  'opensees.node',
  'tcl86t.dll',
  'openblas.dll',
  'libarpack.dll',
  'liblapack.dll',
  'BUILD_INFO.json',
  'LICENSE',
  'THIRD_PARTY_NOTICES.md',
];
const failures = required
  .filter(path => !existsSync(resolve(root, path)))
  .map(path => `Missing ${path}`);

const packageJson = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'));
const buildInfo = JSON.parse(readFileSync(resolve(root, 'BUILD_INFO.json'), 'utf8'));
const binaryPath = resolve(root, 'opensees.node');

if (packageJson.name !== `@openseesjs/native-${buildInfo.platform}-${buildInfo.arch}`) {
  failures.push('Package name does not match BUILD_INFO platform and architecture.');
}
if (packageJson.os?.[0] !== buildInfo.platform || packageJson.cpu?.[0] !== buildInfo.arch) {
  failures.push('npm platform constraints do not match BUILD_INFO.');
}
if (buildInfo.openSeesVersion !== '3.8.0') {
  failures.push(`Unexpected OpenSees version ${buildInfo.openSeesVersion}.`);
}
if (existsSync(binaryPath)) {
  const hash = createHash('sha256').update(readFileSync(binaryPath)).digest('hex');
  if (hash !== buildInfo.binarySha256) failures.push('Native binary SHA-256 does not match BUILD_INFO.');
}

if (failures.length > 0) {
  throw new Error(`Platform package verification failed:\n- ${failures.join('\n- ')}`);
}

console.log(`${packageJson.name}@${packageJson.version} is ready to publish.`);
