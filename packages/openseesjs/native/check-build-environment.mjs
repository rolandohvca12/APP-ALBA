import { existsSync } from 'node:fs';
import { delimiter, join, resolve } from 'node:path';

const sourceDir = resolve(process.env.OPEN_SEES_SOURCE_DIR ?? 'C:/Users/rolando/Downloads/OpenSees-master');
const vsRoot = process.env.VSINSTALLDIR ?? 'C:/Program Files/Microsoft Visual Studio/18/Community';
const bundledCmake = join(vsRoot, 'Common7', 'IDE', 'CommonExtensions', 'Microsoft', 'CMake', 'CMake', 'bin', 'cmake.exe');
const tclRoot = resolve(process.env.TCL_ROOT ?? `${process.env.LOCALAPPDATA}/Apps/Tcl86`);
const checks = [
  ['OpenSees source', join(sourceDir, 'SRC', 'interpreter', 'DL_Interpreter.h')],
  ['OpenSees commands', join(sourceDir, 'SRC', 'interpreter', 'OpenSeesCommands.cpp')],
  ['MSVC environment', join(vsRoot, 'VC', 'Auxiliary', 'Build', 'vcvars64.bat')],
  ['Tcl 8.6 headers', join(tclRoot, 'include', 'tcl.h')],
  ['Tcl 8.6 library', join(tclRoot, 'lib', 'tcl86t.lib')],
];

let failed = false;
for (const [label, path] of checks) {
  const found = existsSync(path);
  console.log(`${found ? 'OK     ' : 'MISSING'} ${label}: ${path}`);
  failed ||= !found;
}

const pathEntries = (process.env.PATH ?? '').split(delimiter);
const cmake = pathEntries.map((entry) => join(entry, 'cmake.exe')).find(existsSync) ?? (existsSync(bundledCmake) ? bundledCmake : undefined);
console.log(`${cmake ? 'OK     ' : 'MISSING'} CMake: ${cmake ?? 'not found'}`);
failed ||= !cmake;

if (failed) {
  console.error('\nNative build prerequisites are incomplete. Install the missing components before rebuilding the addon.');
  process.exitCode = 1;
} else {
  console.log('\nNative build prerequisites are available.');
}
