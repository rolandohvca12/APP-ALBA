# Architecture

## Current AutoCAD bridge

```text
TypeScript/JavaScript
  -> WebSocket JSON
  -> AutoCadBridge
  -> CadCommandFactory | CadQueryFactory | CadDocumentCommandFactory
  -> AutoCAD API
```

Decision:
Keep the existing AutoCAD plugin behavior and public JSON contract intact.

Reason:
The plugin already works and mixes AutoCAD runtime requirements with transport.

Impact:
Common infrastructure must be added beside it, not by rewriting AutoCAD handlers.

## Target shared bridge

```text
TypeScript/JavaScript
  -> Bridge Client
  -> Transport
  -> Protocol
  -> Domain Dispatcher
     -> AutoCAD adapter -> AutoCAD API
     -> ETABS adapter   -> ETABS API
```

Decision:
Share only protocol, transport, dispatch registry, error envelope, and generated metadata.

Reason:
AutoCAD and ETABS object models are unrelated.

Impact:
AutoCAD commands stay AutoCAD-specific. ETABS gets an independent generated adapter.

## Ports

| Bridge | Port | Status |
|---|---:|---|
| AutoCAD | 5005 | Existing behavior preserved |
| ETABS | 5006 | Added as isolated WebSocket bridge |

## ETABS mapping

```text
ETABSv1.dll
  -> metadata JSON
  -> C# generated invoker/wrappers
  -> TypeScript types
  -> TypeScript client
```

Decision:
Use `generated/etabs-api-v1.metadata.json` as the source of truth.

Reason:
The DLL exposes 135 interfaces, 57 enums, and 1281 public methods.

Impact:
Manual wrappers are not viable for full 1:1 coverage.

## Return codes

Decision:
ETABS methods returning `int` are treated as status codes except direct `Count*` queries without `ref/out` parameters.

Reason:
1255 of 1281 public methods return `System.Int32`.

Impact:
C# maps nonzero status codes to typed errors, while count queries return `number`.

## ref/out

Decision:
`ref` and `out` parameters become structured result objects.

Reason:
785 methods use by-reference output parameters.

Impact:
TypeScript users receive objects instead of manually allocating mutable parameters.
Mutable input buffers required by ETABS, such as `cAreaObj.AddByCoord(X, Y, Z)`, remain typed inputs and are also returned after invocation.

Example:

```text
GetCoordCartesian(name, ref x, ref y, ref z, cSys)
  -> getCoordCartesian(name, cSys?): Promise<{ x: number; y: number; z: number }>
```

## Versioning

Decision:
ETABS version is identified by DLL file version and assembly identity.

Reason:
This machine has ETABS 22 with `ETABSv1.dll` FileVersion `2.8.0.0`.

Impact:
The client validates ETABS major version 22 at connection time. Other versions require explicit opt-in until their compatibility is validated.

## Local transport security

Decision:
Use an ephemeral authentication token, WebSocket protocol versioning, origin rejection, and bounded messages.

Reason:
A localhost WebSocket without authentication can be reached by unrelated browser pages.

Impact:
`connectToEtabs()` starts an authenticated host automatically. Reusing a manually started host requires the same explicit token.

## ETABS assembly

Decision:
Resolve `ETABSv1.dll` from the installed ETABS application and never package it.

Reason:
The assembly is vendor-owned and the installed version must match the local ETABS runtime.

Impact:
ETABS 22 is discovered automatically; custom installations can use `etabsApiDllPath` or `ETABS_API_DLL`.

## RPC coverage boundary

Decision:
Expose ETABS model APIs through RPC, but keep `cHelper`, `cPluginCallback`, and `cPluginContract` out of the TypeScript RPC client.

Reason:
Those interfaces control lifecycle/plugin callbacks rather than model operations, and several methods return live COM objects that are not JSON-serializable.

Impact:
`cHelper` remains represented by `EtabsSession` on the C# side. `API_COVERAGE.md` marks these methods as not exposed with the reason.
