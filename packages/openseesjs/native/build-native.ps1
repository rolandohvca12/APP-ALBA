param(
  [string]$OpenSeesSource = $(if ($env:OPEN_SEES_SOURCE_DIR) { $env:OPEN_SEES_SOURCE_DIR } else { 'C:\Users\rolando\Downloads\OpenSees-master' }),
  [string]$TclRoot = $(if ($env:TCL_ROOT) { $env:TCL_ROOT } else { "$env:LOCALAPPDATA\Apps\Tcl86" }),
  [string]$SourceRevision = $env:OPEN_SEES_SOURCE_REVISION
)

$ErrorActionPreference = 'Stop'
function Get-Sha256([string]$Path) {
  $algorithm = [System.Security.Cryptography.SHA256]::Create()
  $stream = [System.IO.File]::OpenRead($Path)
  try {
    return ([BitConverter]::ToString($algorithm.ComputeHash($stream))).Replace('-', '').ToLowerInvariant()
  } finally {
    $stream.Dispose()
    $algorithm.Dispose()
  }
}
$packageRoot = Split-Path $PSScriptRoot -Parent
$nodeVersion = (& node -p "process.versions.node").Trim()
$nodeInclude = "$env:LOCALAPPDATA\node-gyp\Cache\$nodeVersion\include\node"
if (-not (Test-Path $nodeInclude)) {
  $nodeMajor = $nodeVersion.Split('.')[0]
  $cachedHeaders = Get-ChildItem "$env:LOCALAPPDATA\node-gyp\Cache" -Directory -ErrorAction SilentlyContinue |
    Where-Object { $_.Name -like "$nodeMajor.*" -and (Test-Path (Join-Path $_.FullName 'include\node\node_api.h')) } |
    Sort-Object Name -Descending |
    Select-Object -First 1
  if ($cachedHeaders) { $nodeInclude = Join-Path $cachedHeaders.FullName 'include\node' }
}
$vcvars = 'C:\Program Files\Microsoft Visual Studio\18\Community\VC\Auxiliary\Build\vcvars64.bat'
$libraryDirectory = Join-Path $OpenSeesSource 'Win64\lib\release'
$cmake = 'C:\Program Files\Microsoft Visual Studio\18\Community\Common7\IDE\CommonExtensions\Microsoft\CMake\CMake\bin\cmake.exe'
$outputDirectory = Join-Path $PSScriptRoot 'prebuilds\win32-x64'
$objectDirectory = Join-Path $PSScriptRoot 'build\win32-x64'

foreach ($required in @($OpenSeesSource, $TclRoot, $nodeInclude, $vcvars, $libraryDirectory, $cmake)) {
  if (-not (Test-Path $required)) { throw "Required native build path not found: $required" }
}

New-Item -ItemType Directory -Force $outputDirectory, $objectDirectory | Out-Null
$source = Join-Path $PSScriptRoot 'src\opensees_node.cpp'
$object = Join-Path $objectDirectory 'opensees_node.obj'
$mefiSource = Join-Path $OpenSeesSource 'SRC\element\mefi\MEFI_3D.cpp'
$mefiObject = Join-Path $objectDirectory 'MEFI_3D.obj'
$output = Join-Path $outputDirectory 'opensees.node'
$includeDirectories = @(
  $nodeInclude,
  (Join-Path $TclRoot 'include'),
  (Join-Path $OpenSeesSource 'SRC'),
  (Join-Path $OpenSeesSource 'SRC\tcl')
)
$libraries = Get-ChildItem $libraryDirectory -Filter *.lib |
  Where-Object { $_.BaseName -notin @('arpack', 'blas', 'lapack', 'DoddRestrepo', 'PML', 'sdmuc', 'umfpack', 'umfpackC') } |
  ForEach-Object { $_.FullName }
$nodeCacheDirectory = Split-Path (Split-Path $nodeInclude -Parent) -Parent
$nodeLibrary = Join-Path $nodeCacheDirectory 'x64\node.lib'
$vcpkgLibraryDirectory = Join-Path $PSScriptRoot 'vcpkg_installed\x64-windows\lib'
$portableMathLibraries = @(
  (Join-Path $vcpkgLibraryDirectory 'libarpack.lib'),
  (Join-Path $vcpkgLibraryDirectory 'lapack.lib'),
  (Join-Path $vcpkgLibraryDirectory 'openblas.lib'),
  (Join-Path $objectDirectory 'thirdparty\umfpack\Release\UMFPACK.lib'),
  (Join-Path $objectDirectory 'thirdparty\amd\Release\AMD.lib')
)
$systemLibraries = @('opengl32.lib', 'glu32.lib', 'gdi32.lib', 'wsock32.lib', 'ws2_32.lib', 'advapi32.lib', 'user32.lib', 'shell32.lib')

$includeFlags = ($includeDirectories | ForEach-Object { '/I"' + $_ + '"' }) -join ' '
$libraryFlags = (($libraries + $portableMathLibraries + $nodeLibrary + (Join-Path $TclRoot 'lib\tcl86t.lib') + $systemLibraries) | ForEach-Object { '"' + $_ + '"' }) -join ' '
$allOpenSeesIncludes = Get-ChildItem (Join-Path $OpenSeesSource 'SRC') -Directory -Recurse |
  ForEach-Object { '/I"' + $_.FullName + '"' }
$responseFile = Join-Path $objectDirectory 'opensees-includes.rsp'
Set-Content -Path $responseFile -Value (@(
  '/I"' + (Join-Path $TclRoot 'include') + '"',
  '/I"' + (Join-Path $OpenSeesSource 'SRC') + '"',
  '/I"' + (Join-Path $OpenSeesSource 'SRC\tcl') + '"'
) + $allOpenSeesIncludes) -Encoding ascii

& $cmake --fresh -S (Join-Path $PSScriptRoot 'thirdparty') -B (Join-Path $objectDirectory 'thirdparty') -G 'Visual Studio 18 2026' -A x64 "-DOPEN_SEES_SOURCE_DIR=$OpenSeesSource" | Out-Host
if ($LASTEXITCODE -ne 0) { throw 'Unable to configure portable UMFPACK.' }
& $cmake --build (Join-Path $objectDirectory 'thirdparty') --config Release --target UMFPACK AMD --parallel | Out-Host
if ($LASTEXITCODE -ne 0) { throw 'Unable to build portable UMFPACK.' }

$fortranAliases = @(
  'DGESV', 'DGETRF', 'DGETRI', 'DGGEV', 'DGELS', 'DGETRS', 'DPOTRF', 'DTRTRS',
  'DGEEV', 'DSBEVX', 'DPBSV', 'DPBTRS', 'DGBSV', 'DGBTRS', 'DSAUPD', 'DSEUPD',
  'DTRSV', 'DGEMV', 'DTRSM', 'DGEMM', 'DGER'
) | ForEach-Object { '/alternatename:' + $_ + '=' + $_.ToLowerInvariant() + '_' }
$aliasFlags = $fortranAliases -join ' '
$command = @"
call "$vcvars" >nul && cl /nologo /c /O2 /DNDEBUG /std:c++17 /EHsc /MT /DNAPI_VERSION=8 /DNODE_GYP_MODULE_NAME=opensees $includeFlags /Fo"$object" "$source" && cl /nologo /c /O2 /DNDEBUG /std:c++17 /EHsc /MT @"$responseFile" /Fo"$mefiObject" "$mefiSource" && link /nologo /DLL /OPT:REF /OPT:ICF /NODEFAULTLIB:ifconsol.lib /NODEFAULTLIB:libifcoremt.lib /NODEFAULTLIB:libifport.lib /NODEFAULTLIB:libmmt.lib /NODEFAULTLIB:libirc.lib /NODEFAULTLIB:svml_dispmt.lib /NODEFAULTLIB:libdecimal.lib $aliasFlags /OUT:"$output" "$object" "$mefiObject" $libraryFlags
"@

cmd.exe /d /s /c $command
if ($LASTEXITCODE -ne 0) { throw "Native OpenSees addon build failed with exit code $LASTEXITCODE." }

Remove-Item (Join-Path $outputDirectory 'opensees.exp') -Force -ErrorAction SilentlyContinue
Remove-Item (Join-Path $outputDirectory 'opensees.lib') -Force -ErrorAction SilentlyContinue

Copy-Item (Join-Path $TclRoot 'bin\tcl86t.dll') $outputDirectory -Force
Copy-Item (Join-Path $TclRoot 'bin\zlib1.dll') $outputDirectory -Force
Get-ChildItem (Join-Path $PSScriptRoot 'vcpkg_installed\x64-windows\bin') -Filter *.dll |
  Where-Object { $_.Name -in @('libarpack.dll', 'liblapack.dll', 'openblas.dll', 'libgfortran-5.dll', 'libgcc_s_seh-1.dll', 'libquadmath-0.dll', 'libwinpthread-1.dll') } |
  Copy-Item -Destination $outputDirectory -Force

if (-not $SourceRevision -and (Test-Path (Join-Path $OpenSeesSource '.git'))) {
  $detectedRevision = & git -C $OpenSeesSource rev-parse HEAD 2>$null
  if ($LASTEXITCODE -eq 0) { $SourceRevision = $detectedRevision.Trim() }
}
$versionHeader = Get-Content (Join-Path $OpenSeesSource 'SRC\OPS_Globals.h') -Raw
$versionMatch = [regex]::Match($versionHeader, '#define\s+OPS_VERSION\s+"([^"]+)"')
if (-not $versionMatch.Success) { throw 'Unable to determine OPS_VERSION from OpenSees source.' }

$sourceInputs = @($libraries) + @(
  $mefiSource,
  (Join-Path $OpenSeesSource 'COPYRIGHT')
) | Sort-Object
$sourceRootPath = (Resolve-Path $OpenSeesSource).Path.TrimEnd('\') + '\'
$fingerprintLines = foreach ($inputFile in $sourceInputs) {
  $inputPath = (Resolve-Path $inputFile).Path
  $relative = $(if ($inputPath.StartsWith($sourceRootPath, [System.StringComparison]::OrdinalIgnoreCase)) {
    $inputPath.Substring($sourceRootPath.Length)
  } else {
    Split-Path $inputPath -Leaf
  }).Replace('\', '/')
  $hash = Get-Sha256 $inputFile
  "$relative|$hash"
}
$sha256 = [System.Security.Cryptography.SHA256]::Create()
try {
  $fingerprintBytes = [System.Text.Encoding]::UTF8.GetBytes(($fingerprintLines -join "`n"))
  $sourceFingerprint = ([BitConverter]::ToString($sha256.ComputeHash($fingerprintBytes))).Replace('-', '').ToLowerInvariant()
} finally {
  $sha256.Dispose()
}
$buildInfo = [ordered]@{
  schemaVersion = 1
  backend = 'direct-registered-command-dispatcher'
  openSeesVersion = $versionMatch.Groups[1].Value
  openSeesSourceRevision = $(if ($SourceRevision) { $SourceRevision } else { "snapshot-sha256:$sourceFingerprint" })
  openSeesSourceFingerprintSha256 = $sourceFingerprint
  nodeApi = 8
  platform = 'win32'
  arch = 'x64'
  compiler = 'msvc'
  optimization = '/O2 /DNDEBUG /OPT:REF /OPT:ICF'
  binarySha256 = Get-Sha256 $output
}
$buildInfoJson = $buildInfo | ConvertTo-Json
[System.IO.File]::WriteAllText(
  (Join-Path $PSScriptRoot 'BUILD_INFO.json'),
  $buildInfoJson,
  (New-Object System.Text.UTF8Encoding($false))
)
Write-Host "Built $output"
