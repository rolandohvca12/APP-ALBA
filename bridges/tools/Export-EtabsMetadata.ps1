param(
    [string]$DllPath = "C:\Program Files\Computers and Structures\ETABS 22\ETABSv1.dll",
    [string]$RootPath = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
)

$ErrorActionPreference = "Stop"

$docsPath = Join-Path $RootPath "docs"
$generatedPath = Join-Path $RootPath "generated"
New-Item -ItemType Directory -Force -Path $docsPath, $generatedPath | Out-Null

$dllItem = Get-Item -LiteralPath $DllPath
$assembly = [System.Reflection.Assembly]::LoadFrom($DllPath)

function Get-TypeName {
    param([type]$Type)

    if ($Type.IsByRef) {
        return "$(Get-TypeName $Type.GetElementType())&"
    }

    if ($Type.IsArray) {
        return "$(Get-TypeName $Type.GetElementType())[]"
    }

    if ($Type.FullName) {
        return $Type.FullName
    }

    return $Type.Name
}

$exportedTypes = $assembly.GetExportedTypes()
$types = $exportedTypes | Sort-Object FullName | ForEach-Object {
    $type = $_

    [pscustomobject]@{
        name = $type.FullName
        kind = if ($type.IsInterface) { "interface" } elseif ($type.IsEnum) { "enum" } elseif ($type.IsClass) { "class" } else { "other" }
        enumValues = if ($type.IsEnum) { [Enum]::GetNames($type) } else { @() }
        properties = @(
            $type.GetProperties([System.Reflection.BindingFlags]"Public,Instance,Static,DeclaredOnly") |
                Sort-Object Name |
                ForEach-Object {
                    [pscustomobject]@{
                        name = $_.Name
                        type = Get-TypeName $_.PropertyType
                        canRead = $_.CanRead
                        canWrite = $_.CanWrite
                    }
                }
        )
        methods = @(
            $type.GetMethods([System.Reflection.BindingFlags]"Public,Instance,Static,DeclaredOnly") |
                Where-Object { -not $_.IsSpecialName } |
                Sort-Object Name |
                ForEach-Object {
                    $method = $_
                    [pscustomobject]@{
                        name = $method.Name
                        returnType = Get-TypeName $method.ReturnType
                        isStatic = $method.IsStatic
                        parameters = @(
                            $method.GetParameters() | ForEach-Object {
                                [pscustomobject]@{
                                    name = $_.Name
                                    type = Get-TypeName $_.ParameterType
                                    elementType = if ($_.ParameterType.IsByRef -or $_.ParameterType.IsArray) { Get-TypeName $_.ParameterType.GetElementType() } else { $null }
                                    isByRef = $_.ParameterType.IsByRef
                                    isOut = $_.IsOut
                                    isOptional = $_.IsOptional
                                    defaultValue = if ($_.IsOptional) { try { $_.DefaultValue } catch { $null } } else { $null }
                                }
                            }
                        )
                    }
                }
        )
    }
}

$publicMethodCount = (
    $exportedTypes |
        ForEach-Object {
            $_.GetMethods([System.Reflection.BindingFlags]"Public,Instance,Static,DeclaredOnly") |
                Where-Object { -not $_.IsSpecialName }
        }
).Count

$metadata = [pscustomobject]@{
    source = $DllPath
    fileVersion = $dllItem.VersionInfo.FileVersion
    assemblyName = $assembly.FullName
    publicTypeCount = $exportedTypes.Count
    interfaceCount = ($exportedTypes | Where-Object IsInterface).Count
    enumCount = ($exportedTypes | Where-Object IsEnum).Count
    classCount = ($exportedTypes | Where-Object IsClass).Count
    publicMethodCount = $publicMethodCount
    types = $types
}

$metadataPath = Join-Path $generatedPath "etabs-api-v1.metadata.json"
$metadata | ConvertTo-Json -Depth 20 | Set-Content -LiteralPath $metadataPath -Encoding UTF8

$rows = $types |
    Where-Object { $_.kind -eq "interface" } |
    ForEach-Object {
        $methodCount = $_.methods.Count
        $byRefCount = ($_.methods | Where-Object { ($_.parameters | Where-Object { $_.isByRef -or $_.isOut }).Count -gt 0 }).Count
        "| $($_.name -replace '^ETABSv1\.','') | $methodCount | $byRefCount | ETABS | Pending | Pending |"
    }

$mapping = @(
    "# ETABS API Mapping",
    "",
    "| Campo | Valor |",
    "|---|---|",
    "| DLL | ``$DllPath`` |",
    "| FileVersion | $($dllItem.VersionInfo.FileVersion) |",
    "| Assembly | $($assembly.FullName) |",
    "| Interfaces | $($metadata.interfaceCount) |",
    "| Enums | $($metadata.enumCount) |",
    "| Classes | $($metadata.classCount) |",
    "| Public methods | $($metadata.publicMethodCount) |",
    "",
    "| API | Metodos | Metodos ref/out | C# | TS | Test |",
    "|---|---:|---:|---|---|---|"
) + $rows

$mapping | Set-Content -LiteralPath (Join-Path $docsPath "ETABS_API_MAPPING.md") -Encoding UTF8

$coverage = @(
    "# API Coverage",
    "",
    "| API | Metodo | C# | TS | Test |",
    "|-----|--------|----|----|------|",
    "| ETABSv1 | Metadata inventory | yes | no | no |",
    "| ETABSv1 | Generated wrappers | no | no | no |"
)

$coverage | Set-Content -LiteralPath (Join-Path $docsPath "API_COVERAGE.md") -Encoding UTF8

Write-Output $metadataPath
Write-Output (Join-Path $docsPath "ETABS_API_MAPPING.md")
Write-Output (Join-Path $docsPath "API_COVERAGE.md")
