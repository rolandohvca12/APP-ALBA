import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const failures = [];
const forbiddenLegacySources = [
  'src/OpenSeesScriptBuilder.ts',
  'src/index.ts',
  'src/tcl',
  'src/commands',
  'src/execution',
  'src/openseespy/OpenSeesPyTclCommands.ts',
];
const requiredFiles = [
  'dist/native-index.js',
  'dist/native-index.cjs',
  'dist/native-index.d.ts',
  'LICENSE',
  'THIRD_PARTY_NOTICES.md',
  'CHANGELOG.md',
  'API_REFERENCE.md',
  'API_COVERAGE.md',
];

for (const relativePath of requiredFiles) {
  if (!existsSync(resolve(root, relativePath))) failures.push(`Missing ${relativePath}`);
}
for (const relativePath of forbiddenLegacySources) {
  if (existsSync(resolve(root, relativePath))) failures.push(`Legacy Tcl source must be removed: ${relativePath}`);
}

const packageJson = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'));
if (packageJson.name !== 'openseesjs') failures.push('The public package name must be openseesjs.');
if (packageJson.main !== 'dist/native-index.cjs') failures.push('The CommonJS entry point must be native-index.cjs.');
if (packageJson.exports?.['.']?.import !== './dist/native-index.js') {
  failures.push('The ESM export must use native-index.js.');
}
if (packageJson.exports?.['.']?.require !== './dist/native-index.cjs') {
  failures.push('The CommonJS export must use native-index.cjs.');
}
if (Object.keys(packageJson.exports ?? {}).some(key => key !== '.')) {
  failures.push('Only the native package root may be exported.');
}
if (packageJson.files?.includes('dist') || packageJson.files?.includes('dist/index.js')) {
  failures.push('The legacy Tcl entry point must not be published.');
}
if ((packageJson.files ?? []).some(path => path.includes('analysis') || path.includes('examples'))) {
  failures.push('Application analysis and examples must not be published.');
}
if ('opensees-tcl-adapter' in (packageJson.dependencies ?? {})) {
  failures.push('The package must not depend on the legacy Tcl adapter.');
}
const windowsRuntimeVersion = packageJson.optionalDependencies?.['@openseesjs/native-win32-x64'];
if (typeof windowsRuntimeVersion !== 'string') failures.push('The Windows runtime optional dependency is missing.');
if ((packageJson.files ?? []).some(path => path.includes('native/prebuilds'))) {
  failures.push('Native binaries must be published by platform packages, not the root package.');
}
if (packageJson.license !== 'SEE LICENSE IN LICENSE') failures.push('package.json must declare the composite license.');
if (packageJson.private === true) failures.push('The package is marked private.');
if (!packageJson.description || !packageJson.author || !Array.isArray(packageJson.keywords)) {
  failures.push('Publication metadata is incomplete.');
}

const platformRoot = resolve(root, '..', 'openseesjs-win32-x64');
const buildInfoPath = resolve(platformRoot, 'BUILD_INFO.json');
if (existsSync(buildInfoPath)) {
  const platformPackageJson = JSON.parse(readFileSync(resolve(platformRoot, 'package.json'), 'utf8'));
  if (platformPackageJson.version !== windowsRuntimeVersion) {
    failures.push('The local platform package must match the optional dependency version.');
  }
  const buildInfo = JSON.parse(readFileSync(buildInfoPath, 'utf8'));
  const binaryPath = resolve(platformRoot, 'opensees.node');
  if (buildInfo.openSeesVersion !== '3.8.0') failures.push(`Unexpected OpenSees version ${buildInfo.openSeesVersion}.`);
  if (!/^[a-f0-9]{64}$/.test(buildInfo.openSeesSourceFingerprintSha256 ?? '')) {
    failures.push('OpenSees source fingerprint is missing or invalid.');
  }
  if (typeof buildInfo.openSeesSourceRevision !== 'string' || buildInfo.openSeesSourceRevision.length === 0) {
    failures.push('OpenSees source revision or snapshot identity is missing.');
  }
  if (existsSync(binaryPath)) {
    const actualHash = createHash('sha256').update(readFileSync(binaryPath)).digest('hex');
    if (actualHash !== buildInfo.binarySha256) failures.push('Native binary SHA-256 does not match BUILD_INFO.json.');
  }
}

if (failures.length > 0) {
  throw new Error(`Package verification failed:\n- ${failures.join('\n- ')}`);
}

console.log(`Package ${packageJson.name}@${packageJson.version} is ready to pack.`);
