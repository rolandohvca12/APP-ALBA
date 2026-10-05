$ErrorActionPreference = "Stop"

$packageRoot = $PSScriptRoot
$bridgeRoot = (Resolve-Path (Join-Path $packageRoot "..")).Path
$hostProject = Join-Path $bridgeRoot "ETABS.Host\EtabsRealtimeBridge.Host.csproj"
$hostOutput = Join-Path $bridgeRoot "ETABS.Host\bin\x64\Package"
$packagedHost = Join-Path $packageRoot "host\win-x64"

dotnet msbuild $hostProject /p:Configuration=Release /p:Platform=x64 /p:OutputPath="$hostOutput\" /v:minimal
if ($LASTEXITCODE -ne 0) { throw "ETABS host build failed with exit code $LASTEXITCODE." }

tsc -p (Join-Path $packageRoot "tsconfig.json")
if ($LASTEXITCODE -ne 0) { throw "TypeScript build failed with exit code $LASTEXITCODE." }

New-Item -ItemType Directory -Force -Path $packagedHost | Out-Null
Get-ChildItem -LiteralPath $packagedHost -File | Remove-Item -Force
Copy-Item -LiteralPath (Join-Path $hostOutput "EtabsRealtimeBridge.Host.exe") -Destination $packagedHost -Force
Get-ChildItem -LiteralPath $hostOutput -Filter "*.dll" |
    Where-Object { $_.Name -ne "ETABSv1.dll" } |
    Copy-Item -Destination $packagedHost -Force

$configPath = Join-Path $hostOutput "EtabsRealtimeBridge.Host.exe.config"
if (Test-Path -LiteralPath $configPath) {
    Copy-Item -LiteralPath $configPath -Destination $packagedHost -Force
}
