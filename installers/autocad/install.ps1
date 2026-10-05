# installer/install.ps1
# Installs the AutoCadRealtimeBridge plugin and configures AutoCAD autoload.
# Usage: right-click -> "Run with PowerShell" (or: powershell -ExecutionPolicy Bypass -File install.ps1)

$ErrorActionPreference = "Stop"

Write-Host "=== AutoCadRealtimeBridge Installer ===" -ForegroundColor Cyan

$installerDir = $PSScriptRoot
$projectRoot  = (Resolve-Path (Join-Path $installerDir "..\..")).Path
$sourceDir    = Join-Path $projectRoot "bridges\AutoCAD.Plugin\bin\x64\Debug"
$installDir   = Join-Path $env:ProgramData "AutoCadRealtimeBridge"

if (-not (Test-Path $sourceDir)) {
    throw "Build output folder not found:`n$sourceDir"
}

$files = @(
    "AutoCadRealtimeBridge.Plugin.dll",
    "Microsoft.Bcl.AsyncInterfaces.dll",
    "Newtonsoft.Json.dll",
    "Serilog.dll",
    "Serilog.Sinks.File.dll",
    "System.Buffers.dll",
    "System.IO.Pipelines.dll",
    "System.Memory.dll",
    "System.Numerics.Vectors.dll",
    "System.Runtime.CompilerServices.Unsafe.dll",
    "System.Text.Encodings.Web.dll",
    "System.Text.Json.dll",
    "System.Threading.Tasks.Extensions.dll"
)

Write-Host "`n[1/3] Installing plugin files..." -ForegroundColor Cyan
New-Item -ItemType Directory -Path $installDir -Force | Out-Null

foreach ($file in $files) {
    $source = Join-Path $sourceDir $file
    $target = Join-Path $installDir $file

    if (-not (Test-Path $source)) {
        throw "File not found:`n$source"
    }

    try {
        Copy-Item -Path $source -Destination $target -Force
    }
    catch [System.IO.IOException] {
        throw "Cannot overwrite '$file' - it is still locked by a running process.`nClose AutoCAD completely and run this installer again."
    }

    Unblock-File -Path $target -ErrorAction SilentlyContinue
    Write-Host "  $file" -ForegroundColor Green
}

$dllPath     = Join-Path $installDir "AutoCadRealtimeBridge.Plugin.dll"
$dllPathLisp = $dllPath -replace '\\', '/'

Write-Host "`n[2/3] Configuring AutoCAD..." -ForegroundColor Cyan

$autodeskDir = Join-Path $env:APPDATA "Autodesk"
if (-not (Test-Path $autodeskDir)) {
    throw "Autodesk folder not found:`n$autodeskDir"
}

# Matches "AutoCAD", "AutoCAD 2024", "AutoCAD 2025", etc. — any version, no hardcoding.
$supportFolders = @(
    Get-ChildItem -Path $autodeskDir -Directory -Recurse -Filter "Support" -ErrorAction SilentlyContinue |
        Where-Object { $_.FullName -match '\\AutoCAD[ \d]*\\' }
)

if ($supportFolders.Count -eq 0) {
    throw "No AutoCAD Support folder was found on this machine."
}

$lispContent = @"
; AutoCadRealtimeBridge
(command "_NETLOAD" "$dllPathLisp")
(command "STARTBRIDGE")
(princ)
"@

foreach ($folder in $supportFolders) {
    $acadLsp = Join-Path $folder.FullName "acad.lsp"

    if (Test-Path $acadLsp) {
        $existing = Get-Content -Path $acadLsp -Raw
        if ($existing -notmatch "AutoCadRealtimeBridge") {
            Add-Content -Path $acadLsp -Value "`r`n$lispContent"
            Write-Host "  Autoload added: $acadLsp" -ForegroundColor Green
        }
        else {
            Write-Host "  Already configured: $acadLsp" -ForegroundColor Yellow
        }
    }
    else {
        Set-Content -Path $acadLsp -Value $lispContent -Encoding UTF8
        Write-Host "  Autoload created: $acadLsp" -ForegroundColor Green
    }
}

Write-Host "`n[3/3] Installation complete." -ForegroundColor Green
Write-Host "`nInstall path:" -ForegroundColor Cyan
Write-Host $installDir
Write-Host "`nAutoCAD will automatically run:" -ForegroundColor Cyan
Write-Host "  NETLOAD"
Write-Host "  STARTBRIDGE"

Read-Host "`nPress ENTER to close"
