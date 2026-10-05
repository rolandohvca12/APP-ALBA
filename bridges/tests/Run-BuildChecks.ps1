$ErrorActionPreference = "Stop"

$root = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path

dotnet msbuild (Join-Path $root "AutoCAD.Plugin\AutoCadRealtimeBridge.Plugin.csproj") /p:Configuration=Debug /p:Platform=x64 /v:minimal
if ($LASTEXITCODE -ne 0) { throw "AutoCAD build failed with exit code $LASTEXITCODE." }
dotnet msbuild (Join-Path $root "ETABS.Api\EtabsRealtimeBridge.ETABS.csproj") /p:Configuration=Debug /p:Platform=AnyCPU /v:minimal
if ($LASTEXITCODE -ne 0) { throw "ETABS API build failed with exit code $LASTEXITCODE." }
dotnet msbuild (Join-Path $root "ETABS.Host\EtabsRealtimeBridge.Host.csproj") /p:Configuration=Debug /p:Platform=x64 /v:minimal
if ($LASTEXITCODE -ne 0) { throw "ETABS host build failed with exit code $LASTEXITCODE." }

npm test --prefix (Join-Path $root "ETABS.Client")
if ($LASTEXITCODE -ne 0) { throw "ETABS client tests failed with exit code $LASTEXITCODE." }
