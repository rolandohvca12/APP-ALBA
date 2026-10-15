import { copyFileSync, existsSync, mkdirSync, readdirSync, realpathSync } from 'node:fs';
import { basename, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const [, , addonArgument, outputArgument] = process.argv;
if (!addonArgument || !outputArgument) throw new Error('Usage: stage-linux-runtime.mjs <addon> <output-dir>');

const addon = resolve(addonArgument);
const output = resolve(outputArgument);
const systemLibraries = /^(libc\.so|libm\.so|libpthread\.so|libdl\.so|librt\.so|libutil\.so|ld-linux|linux-vdso)/;
const queue = [addon];
const visited = new Set();
const licenseDirectory = resolve(output, 'licenses');
mkdirSync(licenseDirectory, { recursive: true });

while (queue.length) {
  const current = queue.shift();
  if (!current || visited.has(realpathSync(current))) continue;
  visited.add(realpathSync(current));
  for (const dependency of dependencies(current)) {
    const name = basename(dependency);
    if (systemLibraries.test(name)) continue;
    const destination = resolve(output, name);
    if (!existsSync(destination)) copyFileSync(dependency, destination);
    stageSystemLicense(dependency);
    queue.push(destination);
  }
}

for (const name of ['opensees.node', ...readdirSync(output).filter(file => file.includes('.so'))]) {
  const file = resolve(output, name);
  if (!existsSync(file)) continue;
  const result = spawnSync('patchelf', ['--set-rpath', '$ORIGIN', file], { encoding: 'utf8' });
  if (result.status !== 0) throw new Error(`patchelf failed for ${name}: ${result.stderr}`);
}

function dependencies(file) {
  const result = spawnSync('ldd', [file], { encoding: 'utf8' });
  if (result.status !== 0) throw new Error(`ldd failed for ${file}: ${result.stderr}`);
  const paths = [];
  for (const line of result.stdout.split(/\r?\n/)) {
    const match = line.match(/=>\s+(\/[^\s]+)\s+\(/) ?? line.match(/^\s*(\/[^\s]+)\s+\(/);
    if (match?.[1] && existsSync(match[1])) paths.push(match[1]);
  }
  return paths;
}

function stageSystemLicense(library) {
  const resolved = realpathSync(library);
  const owner = spawnSync('dpkg-query', ['-S', resolved], { encoding: 'utf8' });
  if (owner.status !== 0) return;
  const packageName = /^([^:]+)(?::[^:]+)?:\s/.exec(owner.stdout)?.[1];
  if (!packageName) return;
  const copyright = `/usr/share/doc/${packageName}/copyright`;
  if (!existsSync(copyright)) return;
  const destination = resolve(licenseDirectory, `${packageName}.txt`);
  if (!existsSync(destination)) copyFileSync(copyright, destination);
}
