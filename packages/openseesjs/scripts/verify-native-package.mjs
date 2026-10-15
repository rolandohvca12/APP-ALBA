import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(process.argv[2] ?? process.cwd());
const failures = [];
const required = ['opensees.node', 'BUILD_INFO.json', 'LICENSE', 'THIRD_PARTY_NOTICES.md', 'licenses'];
for (const entry of required) {
  if (!existsSync(resolve(root, entry))) failures.push(`Missing ${entry}`);
}

const packageJson = readJson('package.json');
const buildInfo = readJson('BUILD_INFO.json');
const expectedName = `@openseesjs/native-${buildInfo.platform}-${buildInfo.arch}`;
if (packageJson.name !== expectedName) failures.push(`Expected package name ${expectedName}.`);
if (packageJson.os?.[0] !== buildInfo.platform || packageJson.cpu?.[0] !== buildInfo.arch) {
  failures.push('npm platform constraints do not match BUILD_INFO.json.');
}
if (buildInfo.platform === 'linux' && packageJson.libc?.[0] !== 'glibc') {
  failures.push('The Linux runtime must be explicitly restricted to glibc.');
}
if (buildInfo.openSeesVersion !== '3.8.0') failures.push(`Unexpected OpenSees version ${buildInfo.openSeesVersion}.`);
if (buildInfo.nodeApi !== 8) failures.push(`Unexpected Node-API version ${buildInfo.nodeApi}.`);
if (!/^[a-f0-9]{64}$/.test(buildInfo.openSeesSourceFingerprintSha256 ?? '')) {
  failures.push('OpenSees source fingerprint is missing or invalid.');
}

const binaryPath = resolve(root, 'opensees.node');
if (existsSync(binaryPath)) {
  const hash = createHash('sha256').update(readFileSync(binaryPath)).digest('hex');
  if (hash !== buildInfo.binarySha256) failures.push('Native binary SHA-256 does not match BUILD_INFO.json.');
}
for (const library of buildInfo.sharedLibraries ?? []) {
  if (!existsSync(resolve(root, library))) failures.push(`Missing staged runtime library ${library}`);
}

if (failures.length) throw new Error(`Platform package verification failed:\n- ${failures.join('\n- ')}`);
console.log(`${packageJson.name}@${packageJson.version} is ready to publish.`);

function readJson(name) {
  const path = resolve(root, name);
  if (!existsSync(path)) return {};
  return JSON.parse(readFileSync(path, 'utf8'));
}
