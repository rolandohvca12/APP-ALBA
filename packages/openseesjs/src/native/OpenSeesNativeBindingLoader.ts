import { existsSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { OpenSeesNativeAvailability, OpenSeesNativeBinding } from './types.js';

const modulePath = typeof __filename === 'string' ? __filename : fileURLToPath(import.meta.url);
const moduleDirectory = typeof __dirname === 'string' ? __dirname : dirname(modulePath);
const require = createRequire(modulePath);

interface NativeBuildInfo {
  readonly openSeesVersion?: string;
  readonly openSeesSourceRevision?: string;
  readonly nodeApi?: number;
}

function platformPackageName(): string {
  return `@openseesjs/native-${process.platform}-${process.arch}`;
}

function resolveBinding(): { path: string; distribution: OpenSeesNativeAvailability['distribution'] } {
  const override = process.env.OPEN_SEES_NODE_BINDING;
  if (override) return { path: resolve(override), distribution: 'environment' };

  try {
    return {
      path: require.resolve(`${platformPackageName()}/opensees.node`),
      distribution: 'platform-package',
    };
  } catch {
    const packageRoots = [
      resolve(moduleDirectory, '..', '..'),
      resolve(moduleDirectory, '..'),
    ];
    const bundledCandidates = packageRoots.map(packageRoot =>
      resolve(packageRoot, 'native', 'prebuilds', `${process.platform}-${process.arch}`, 'opensees.node'));
    return {
      path: bundledCandidates.find(existsSync) ?? bundledCandidates[0]!,
      distribution: 'bundled',
    };
  }
}

export function defaultNativeBindingPath(): string {
  return resolveBinding().path;
}

export function inspectNativeBackend(bindingPath = defaultNativeBindingPath()): OpenSeesNativeAvailability {
  const resolved = resolve(bindingPath);
  const automatic = resolveBinding();
  const distribution = resolved === automatic.path ? automatic.distribution : 'explicit';
  const base = { bindingPath: resolved, platform: process.platform, arch: process.arch, distribution } as const;
  if (!existsSync(resolved)) {
    return {
      available: false,
      ...base,
      reason: `No native OpenSees runtime is available for ${process.platform}-${process.arch}. Install ${platformPackageName()} or set OPEN_SEES_NODE_BINDING.`,
    };
  }
  try {
    const loaded = require(resolved) as Partial<OpenSeesNativeBinding>;
    if (typeof loaded.createSession !== 'function') {
      return { available: false, ...base, reason: 'The native addon does not export createSession().' };
    }
    return { available: true, ...base, ...readBuildInfo(resolved) };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      available: false,
      ...base,
      reason: `The native addon or one of its runtime libraries could not be loaded: ${message}`,
    };
  }
}

function readBuildInfo(bindingPath: string): Pick<OpenSeesNativeAvailability, 'openSeesVersion' | 'sourceRevision' | 'nodeApi'> {
  const candidates = [
    resolve(dirname(bindingPath), 'BUILD_INFO.json'),
    resolve(dirname(bindingPath), '..', '..', 'BUILD_INFO.json'),
  ];
  for (const candidate of candidates) {
    if (!existsSync(candidate)) continue;
    try {
      const info = JSON.parse(readFileSync(candidate, 'utf8')) as NativeBuildInfo;
      return {
        ...(info.openSeesVersion === undefined ? {} : { openSeesVersion: info.openSeesVersion }),
        ...(info.openSeesSourceRevision === undefined ? {} : { sourceRevision: info.openSeesSourceRevision }),
        ...(info.nodeApi === undefined ? {} : { nodeApi: info.nodeApi }),
      };
    } catch {
      return {};
    }
  }
  return {};
}

export function loadNativeBinding(bindingPath = defaultNativeBindingPath()): OpenSeesNativeBinding {
  const availability = inspectNativeBackend(bindingPath);
  if (!availability.available) {
    throw new Error(`${availability.reason} Expected: ${availability.bindingPath}`);
  }

  const loaded = require(availability.bindingPath) as Partial<OpenSeesNativeBinding>;
  if (typeof loaded.createSession !== 'function') {
    throw new Error(`Invalid OpenSees native addon at ${availability.bindingPath}: createSession() is missing.`);
  }
  return loaded as OpenSeesNativeBinding;
}
