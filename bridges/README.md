# AutoCAD / ETABS Realtime Bridge

This workspace contains the existing AutoCAD realtime bridge and the first generated ETABS API inventory.

Current status:

| Area | Status |
|---|---|
| AutoCAD plugin | Existing, unchanged |
| ETABS DLL inventory | Generated from ETABS 22 `ETABSv1.dll` |
| Shared transport/protocol | Started for ETABS on isolated port `5006` |
| ETABS C# wrappers | Generic invoker implemented |
| ETABS host | Packaged host; attaches to or starts ETABS automatically |
| TypeScript client/types | Generated, with one-call connection helper |
| Tests | Build checks and ETABS 22 `GetVersion` integration passed |

Generated files:

| File | Purpose |
|---|---|
| `generated/etabs-api-v1.metadata.json` | Source-of-truth ETABS reflection metadata |
| `docs/ETABS_API_MAPPING.md` | Compact API inventory by interface |
| `docs/API_COVERAGE.md` | Implementation coverage |
| `tools/Export-EtabsMetadata.ps1` | Repeatable metadata exporter |
| `tools/Generate-EtabsTypeScript.ps1` | Repeatable TypeScript client generator |
| `AutoCAD.Plugin/` | Existing AutoCAD plugin and bridge |
| `ETABS.Api/` | ETABS C# session, invoker, and WebSocket server |
| `ETABS.Host/` | Executable that attaches to or starts ETABS on port `5006` |
| `ETABS.Client/` | Generated client, transport, and automatic host controller |
| `tests/` | Build checks and integration test notes |

ETABS RPC scope:

| Item | Count |
|---|---:|
| ETABS public methods inventoried | 1281 |
| TypeScript RPC methods generated | 1268 |
| Callable TypeScript API groups generated | 113 |
| Callable TypeScript methods generated | 1230 |
| Nested API properties generated | 112 |

Regenerate ETABS metadata:

```powershell
& .\tools\Export-EtabsMetadata.ps1
& .\tools\Generate-EtabsTypeScript.ps1
```

Build checks:

```powershell
.\tests\Run-BuildChecks.ps1
```

Consume the TypeScript client from another local project:

```powershell
npm install ".\ETABS.Client"
```

```ts
import {
  connectToEtabs,
} from "@app-alba/etabs-bridge-client";

const etabs = await connectToEtabs();

const { version } = await etabs.sapModel.getVersion();
console.log(version);

etabs.close();
```

`connectToEtabs()` starts a secured bridge automatically.
To reuse a manually started bridge, provide the same `authToken` to the host and client.
The host attaches to an open ETABS instance or starts ETABS when necessary.
The package does not redistribute `ETABSv1.dll`; it resolves the assembly from the local ETABS installation.

For bulk model edits, defer ETABS tree updates until the operation finishes:

```ts
await etabs.withSuspendedUpdates(async model => {
  await model.frameObj.addByCoord(0, 0, 0, 0, 0, 3, "COLUMN");
  await model.frameObj.addByCoord(5, 0, 0, 5, 0, 3, "COLUMN");
});

await etabs.view.refreshView(0, false);
```
