import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const [, , binaryArgument, outputArgument, sourceArgument] = process.argv;
if (!binaryArgument || !outputArgument || !sourceArgument) {
  throw new Error('Usage: write-build-info.mjs <binary> <output> <OpenSees source>');
}
const binary = resolve(binaryArgument);
const output = resolve(outputArgument);
const source = resolve(sourceArgument);
const versionHeader = readFileSync(resolve(source, 'SRC', 'OPS_Globals.h'), 'utf8');
const version = /#define\s+OPS_VERSION\s+"([^"]+)"/.exec(versionHeader)?.[1];
if (!version) throw new Error('Unable to determine OpenSees version.');

const git = spawnSync('git', ['-C', source, 'rev-parse', 'HEAD'], { encoding: 'utf8' });
const revision = process.env.OPEN_SEES_SOURCE_REVISION || (git.status === 0 ? git.stdout.trim() : 'source-archive');
const tree = spawnSync('git', ['-C', source, 'ls-tree', '-r', 'HEAD'], { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 });
const sourceFingerprint = sha256(Buffer.from(tree.status === 0 ? tree.stdout : revision));
const directory = resolve(binary, '..');
const libraries = readdirSync(directory).filter(name => name.includes('.so')).sort();
const buildInfo = {
  schemaVersion: 1,
  backend: 'direct-registered-command-dispatcher',
  openSeesVersion: version,
  openSeesSourceRevision: revision,
  openSeesSourceFingerprintSha256: sourceFingerprint,
  nodeApi: 8,
  platform: process.platform,
  arch: process.arch,
  libc: 'glibc',
  compiler: 'gcc',
  optimization: '-O3 -DNDEBUG -fPIC',
  sharedLibraries: libraries,
  binarySha256: sha256(readFileSync(binary)),
};
writeFileSync(output, `${JSON.stringify(buildInfo, null, 2)}\n`);

function sha256(value) {
  return createHash('sha256').update(value).digest('hex');
}
