import { spawnSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const nativeRoot = dirname(fileURLToPath(import.meta.url));
const command = process.platform === 'win32'
  ? ['powershell', ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', resolve(nativeRoot, 'build-native.ps1')]]
  : ['bash', [resolve(nativeRoot, 'build-native-linux.sh')]];

const result = spawnSync(command[0], command[1], { stdio: 'inherit', env: process.env });
if (result.error) throw result.error;
process.exit(result.status ?? 1);
