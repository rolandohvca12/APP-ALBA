import { existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join, resolve } from 'node:path';

const sourceDir = resolve(process.env.OPEN_SEES_SOURCE_DIR ?? (
  process.platform === 'win32'
    ? 'C:/Users/rolando/Downloads/OpenSees-master'
    : new URL('./vendor/OpenSees', import.meta.url).pathname
));
let failed = false;

checkPath('OpenSees source', join(sourceDir, 'CMakeLists.txt'), process.platform === 'linux');
checkCommand('Node.js', 'node', ['--version']);
checkCommand('CMake', 'cmake', ['--version']);

if (process.platform === 'win32') {
  const vsRoot = process.env.VSINSTALLDIR ?? 'C:/Program Files/Microsoft Visual Studio/18/Community';
  const tclRoot = resolve(process.env.TCL_ROOT ?? `${process.env.LOCALAPPDATA}/Apps/Tcl86`);
  checkPath('MSVC environment', join(vsRoot, 'VC', 'Auxiliary', 'Build', 'vcvars64.bat'));
  checkPath('Tcl 8.6 headers', join(tclRoot, 'include', 'tcl.h'));
  checkPath('Tcl 8.6 library', join(tclRoot, 'lib', 'tcl86t.lib'));
} else if (process.platform === 'linux') {
  checkCommand('C++ compiler', 'c++', ['--version']);
  checkCommand('Fortran compiler', 'gfortran', ['--version']);
  checkCommand('Ninja', 'ninja', ['--version']);
  checkCommand('patchelf', 'patchelf', ['--version']);
  checkCommand('ldd', 'ldd', ['--version']);
} else {
  console.error(`MISSING Native build support for ${process.platform}`);
  failed = true;
}

console.log(failed
  ? '\nNative build prerequisites are incomplete.'
  : '\nNative build prerequisites are available.');
process.exitCode = failed ? 1 : 0;

function checkPath(label, path, optional = false) {
  const found = existsSync(path);
  console.log(`${found ? 'OK     ' : optional ? 'OPTIONAL' : 'MISSING'} ${label}: ${path}`);
  if (!found && !optional) failed = true;
}

function checkCommand(label, command, args) {
  const result = spawnSync(command, args, { encoding: 'utf8' });
  const found = result.status === 0;
  const version = found ? (result.stdout || result.stderr).split(/\r?\n/)[0] : 'not found';
  console.log(`${found ? 'OK     ' : 'MISSING'} ${label}: ${version}`);
  if (!found) failed = true;
}
