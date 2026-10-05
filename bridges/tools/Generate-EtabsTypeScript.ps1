param(
    [string]$MetadataPath = (Join-Path (Resolve-Path (Join-Path $PSScriptRoot "..")).Path "generated\etabs-api-v1.metadata.json"),
    [string]$OutputPath = (Join-Path (Resolve-Path (Join-Path $PSScriptRoot "..")).Path "ETABS.Client\etabs-client.ts"),
    [string]$CoveragePath = (Join-Path (Resolve-Path (Join-Path $PSScriptRoot "..")).Path "docs\API_COVERAGE.md")
)

$ErrorActionPreference = "Stop"

$rootPath = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
New-Item -ItemType Directory -Force -Path (Split-Path -Parent $OutputPath) | Out-Null

$metadata = Get-Content -LiteralPath $MetadataPath -Raw | ConvertFrom-Json

function Strip-Namespace {
    param([string]$Name)
    return $Name -replace '^ETABSv1\.', ''
}

$enumNames = @{}
foreach ($enumType in ($metadata.types | Where-Object { $_.kind -eq "enum" })) {
    $enumNames[(Strip-Namespace $enumType.name)] = $true
}

$excludedRpcInterfaces = @{
    "cHelper" = $true
    "cPluginCallback" = $true
    "cPluginContract" = $true
}

$typesByName = @{}
foreach ($type in $metadata.types) {
    $typesByName[(Strip-Namespace $type.name)] = $type
}

# Only interfaces that can actually be reached through cSapModel properties
# (plus cOAPI itself) can be invoked by the bridge host.
$reachableInterfaces = @{}
function Add-ReachableInterface {
    param([string]$InterfaceName)

    $name = Strip-Namespace $InterfaceName
    if ($reachableInterfaces.ContainsKey($name) -or -not $typesByName.ContainsKey($name)) { return }

    $type = $typesByName[$name]
    if ($type.kind -ne "interface" -or $excludedRpcInterfaces.ContainsKey($name)) { return }

    $reachableInterfaces[$name] = $true
    foreach ($property in @($type.properties | Where-Object { $_.canRead })) {
        Add-ReachableInterface $property.type
    }
}

Add-ReachableInterface "cSapModel"
Add-ReachableInterface "cOAPI"

$rpcInterfaces = @($metadata.types | Where-Object {
    $_.kind -eq "interface" -and $reachableInterfaces.ContainsKey((Strip-Namespace $_.name))
})

function Is-DirectIntResult {
    param($Method)
    return $Method.returnType -eq "System.Int32" -and
        $Method.name.StartsWith("Count") -and
        @($Method.parameters | Where-Object { $_.isByRef -or $_.isOut }).Count -eq 0
}

function Is-ByRefInput {
    param([string]$ApiName, $Method, $Parameter)

    if (-not $Parameter.isByRef -or $Parameter.isOut) { return $false }
    if ($Method.name.StartsWith("Set")) { return $true }

    $api = Strip-Namespace $ApiName
    if ($api -eq "cAreaObj" -and $Method.name -eq "AddByCoord") {
        return $Parameter.name -in @("X", "Y", "Z")
    }
    if ($api -eq "cAreaObj" -and $Method.name -eq "AddByPoint") {
        return $Parameter.name -eq "Point"
    }
    if ($api -eq "cDatabaseTables" -and $Method.name -eq "ShowTablesInExcel") {
        return $Parameter.name -eq "TableKeyList"
    }

    return $false
}

function To-Camel {
    param([string]$Name)
    if ([string]::IsNullOrEmpty($Name)) { return $Name }
    return $Name.Substring(0, 1).ToLowerInvariant() + $Name.Substring(1)
}

function To-Pascal {
    param([string]$Name)
    if ([string]::IsNullOrEmpty($Name)) { return $Name }
    return $Name.Substring(0, 1).ToUpperInvariant() + $Name.Substring(1)
}

function Safe-Identifier {
    param([string]$Name)
    $safe = $Name -replace '[^A-Za-z0-9_$]', '_'
    if ($safe -match '^[0-9]') { $safe = "_$safe" }
    if ([string]::IsNullOrEmpty($safe)) { return "_" }
    $reserved = @{
        "break"=$true; "case"=$true; "catch"=$true; "class"=$true; "const"=$true;
        "continue"=$true; "debugger"=$true; "default"=$true; "delete"=$true; "do"=$true;
        "else"=$true; "enum"=$true; "export"=$true; "extends"=$true; "false"=$true;
        "finally"=$true; "for"=$true; "function"=$true; "if"=$true; "import"=$true;
        "in"=$true; "instanceof"=$true; "new"=$true; "null"=$true; "return"=$true;
        "super"=$true; "switch"=$true; "this"=$true; "throw"=$true; "true"=$true;
        "try"=$true; "typeof"=$true; "var"=$true; "void"=$true; "while"=$true;
        "with"=$true; "yield"=$true; "let"=$true; "static"=$true; "implements"=$true;
        "interface"=$true; "package"=$true; "private"=$true; "protected"=$true;
        "public"=$true; "await"=$true
    }
    if ($reserved.ContainsKey($safe)) { return "${safe}_" }
    return $safe
}

function Ts-Type {
    param([string]$TypeName)

    $type = $TypeName
    $isByRef = $false
    if ($type.EndsWith("&")) {
        $isByRef = $true
        $type = $type.Substring(0, $type.Length - 1)
    }

    if ($type.EndsWith("[]")) {
        return "$(Ts-Type $type.Substring(0, $type.Length - 2))[]"
    }

    switch ($type) {
        "System.String" { return "string" }
        "System.Int32" { return "number" }
        "System.Double" { return "number" }
        "System.Boolean" { return "boolean" }
        "System.Void" { return "void" }
        default {
            if ($type.StartsWith("ETABSv1.")) {
                $name = Strip-Namespace $type
                if ($enumNames.ContainsKey($name)) {
                    return $name
                }

                return "unknown"
            }

            if ($isByRef) {
                return Ts-Type $type
            }

            return "unknown"
        }
    }
}

function Result-Type-Name {
    param([string]$ApiName, [string]$MethodName)
    return "$(Strip-Namespace $ApiName)$(To-Pascal $MethodName)Result"
}

function Method-Return-Type {
    param($Type, $Method)

    $outputs = @($Method.parameters | Where-Object { $_.isByRef -or $_.isOut })

    if ($outputs.Count -gt 0) {
        return Result-Type-Name $Type.name $Method.name
    }

    if (Is-DirectIntResult $Method) {
        return "number"
    }

    if ($Method.returnType -eq "System.Int32" -or $Method.returnType -eq "System.Void") {
        return "void"
    }

    return Ts-Type $Method.returnType
}

$lines = New-Object System.Collections.Generic.List[string]
$lines.Add("// Generated from ETABSv1 metadata. Do not edit manually.")
$lines.Add("// Source: $($metadata.source)")
$lines.Add("")
$lines.Add("export interface EtabsRpcMessage {")
$lines.Add("  id?: string;")
$lines.Add("  protocolVersion?: 1;")
$lines.Add("  api: string;")
$lines.Add("  method: string;")
$lines.Add("  parameters?: Record<string, unknown>;")
$lines.Add("}")
$lines.Add("")
$lines.Add("export interface EtabsTransport {")
$lines.Add("  request<T>(message: EtabsRpcMessage): Promise<T>;")
$lines.Add("}")
$lines.Add("")

foreach ($enum in ($metadata.types | Where-Object { $_.kind -eq "enum" })) {
    $enumName = Strip-Namespace $enum.name
    $lines.Add("export enum $enumName {")
    foreach ($value in $enum.enumValues) {
        $member = Safe-Identifier $value
        $lines.Add("  $member = `"$value`",")
    }
    $lines.Add("}")
    $lines.Add("")
}

foreach ($type in $rpcInterfaces) {
    foreach ($method in $type.methods) {
        $outputs = @($method.parameters | Where-Object { $_.isByRef -or $_.isOut })
        if ($outputs.Count -eq 0) { continue }

        $resultName = Result-Type-Name $type.name $method.name
        $lines.Add("export interface $resultName {")

        if ((Is-DirectIntResult $method) -or ($method.returnType -ne "System.Int32" -and $method.returnType -ne "System.Void")) {
            $lines.Add("  returnValue: $(Ts-Type $method.returnType);")
        }

        foreach ($output in $outputs) {
            $lines.Add("  $(To-Camel $output.name): $(Ts-Type $output.elementType);")
        }

        $lines.Add("}")
        $lines.Add("")
    }
}

foreach ($type in $rpcInterfaces) {
    $apiName = Strip-Namespace $type.name
    $groupName = "${apiName}Api"
    $lines.Add("export class $groupName {")
    $lines.Add("  constructor(private readonly transport: EtabsTransport) {}")
    $lines.Add("")

    foreach ($property in @($type.properties | Where-Object {
        $_.canRead -and $reachableInterfaces.ContainsKey((Strip-Namespace $_.type))
    })) {
        $propertyType = Strip-Namespace $property.type
        $propertyName = Safe-Identifier (To-Camel $property.name)
        $lines.Add("  get ${propertyName}(): ${propertyType}Api {")
        $lines.Add("    return new ${propertyType}Api(this.transport);")
        $lines.Add("  }")
        $lines.Add("")
    }

    foreach ($method in $type.methods) {
        # CSI uses mutable `ref` arrays on Set* methods as inputs, while Get*
        # methods expose their result buffers with the same COM metadata.
        # Reflection alone cannot distinguish those cases because many output
        # refs are not marked `out`, so preserve scalar inputs and include ref
        # buffers only for setters. Ref values are still returned in both cases.
        $inputParams = @($method.parameters | Where-Object {
            -not $_.isOut -and (-not $_.isByRef -or (Is-ByRefInput $type.name $method $_))
        })
        $argParts = @()
        foreach ($param in $inputParams) {
            $argName = Safe-Identifier (To-Camel $param.name)
            $optional = if ($param.isOptional) { "?" } else { "" }
            $argParts += "$argName${optional}: $(Ts-Type $param.type)"
        }

        $returnType = Method-Return-Type $type $method
        $methodName = Safe-Identifier (To-Camel $method.name)
        $lines.Add("  $methodName($($argParts -join ', ')): Promise<$returnType> {")
        $lines.Add("    return this.transport.request<$returnType>({")
        $lines.Add("      api: `"$apiName`",")
        $lines.Add("      method: `"$($method.name)`",")

        if ($inputParams.Count -eq 0) {
            $lines.Add("    });")
        }
        else {
            $lines.Add("      parameters: {")
            foreach ($param in $inputParams) {
                $argName = Safe-Identifier (To-Camel $param.name)
                $lines.Add("        $($param.name): $argName,")
            }
            $lines.Add("      },")
            $lines.Add("    });")
        }

        $lines.Add("  }")
        $lines.Add("")
    }

    $lines.Add("}")
    $lines.Add("")
}

$lines.Add("export class EtabsClient {")

foreach ($type in $rpcInterfaces) {
    $apiName = Strip-Namespace $type.name
    $propertyName = To-Camel $(if ($apiName.StartsWith("c") -and $apiName.Length -gt 1) { $apiName.Substring(1) } else { $apiName })
    $lines.Add("  readonly ${propertyName}: ${apiName}Api;")
}

$lines.Add("")
$lines.Add("  constructor(transport: EtabsTransport) {")

foreach ($type in $rpcInterfaces) {
    $apiName = Strip-Namespace $type.name
    $propertyName = To-Camel $(if ($apiName.StartsWith("c") -and $apiName.Length -gt 1) { $apiName.Substring(1) } else { $apiName })
    $lines.Add("    this.$propertyName = new ${apiName}Api(transport);")
}

$lines.Add("  }")
$lines.Add("}")

$lines | Set-Content -LiteralPath $OutputPath -Encoding UTF8
$coverage = New-Object System.Collections.Generic.List[string]
$coverage.Add("# API Coverage")
$coverage.Add("")
$coverage.Add("Generated from the ETABS v1 metadata. Only interfaces reachable from cSapModel or cOAPI are exposed.")
$coverage.Add("")
$coverage.Add("| API | Method | C# | TS | Test |")
$coverage.Add("|-----|--------|----|----|------|")
$coverage.Add("| ETABSv1 | Metadata inventory | yes | no | generation |")
$coverage.Add("| ETABSv1 | Authenticated WebSocket bridge | yes | yes | unit |")
foreach ($type in $rpcInterfaces) {
    $apiName = Strip-Namespace $type.name
    foreach ($method in $type.methods) {
        $test = "pending integration"
        if (Is-DirectIntResult $method) { $test = "contract" }
        if ($apiName -eq "cAreaObj" -and $method.name -in @("AddByCoord", "AddByPoint")) { $test = "contract" }
        if ($apiName -eq "cSapModel" -and $method.name -eq "GetVersion") { $test = "integration opt-in" }
        $coverage.Add("| $apiName | $($method.name) | yes | yes | $test |")
    }
}

$coverage.Add("")
$coverage.Add("## Not exposed")
foreach ($type in ($metadata.types | Where-Object {
    $_.kind -eq "interface" -and
    -not $reachableInterfaces.ContainsKey((Strip-Namespace $_.name)) -and
    @($_.methods).Count -gt 0
})) {
    $apiName = Strip-Namespace $type.name
    $reason = if ($excludedRpcInterfaces.ContainsKey($apiName)) {
        "Lifecycle/callback COM interface; not JSON serializable."
    } else {
        "Not reachable from cSapModel in this ETABS version."
    }
    $coverage.Add("")
    $coverage.Add("API: $apiName  ")
    $coverage.Add("Reason: $reason  ")
    $coverage.Add("Alternative: Access through a future version-specific adapter if ETABS exposes a model path.  ")
    $coverage.Add("Status: Not exposed.")
}

$coverage | Set-Content -LiteralPath $CoveragePath -Encoding UTF8
Write-Output $OutputPath
