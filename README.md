# APP-ALBA

Workspace organized by responsibility:

| Directory | Responsibility |
|---|---|
| `bridges/` | C# bridge infrastructure, AutoCAD plugin, ETABS host/API, generated ETABS client, tools and bridge tests |
| `packages/autocad-client/` | TypeScript client and geometry workflows that depend on AutoCAD |
| `packages/openseesjs/` | OpenSees native addon and typed TypeScript API |
| `apps/etabs-scripts/` | User scripts that consume the ETABS TypeScript client |
| `installers/` | Product-specific installation scripts |
| `artifacts/` | Generated ETABS models and OpenSees/DXF outputs |

## Unified entry point

The root module exposes each domain through its own namespace:

```js
import { AutoCAD, OpenSees, ETABS } from './index.js';

const cad = new AutoCAD.AutoCadRealtimeClient();
const model = new OpenSees.OpenSeesScriptBuilder();
const etabs = await ETABS.connectToEtabs();
```

Build every module from the repository root:

```powershell
npm run build
```

## Main commands

Build and verify all bridges:

```powershell
& .\bridges\tests\Run-BuildChecks.ps1
```

Build the OpenSees adapter:

```powershell
npm run build --prefix .\packages\openseesjs
```

Build the AutoCAD TypeScript client:

```powershell
npm run build --prefix .\packages\autocad-client
```

Run ETABS scripts from their own application:

```powershell
npm run material-general --prefix .\apps\etabs-scripts
```

Install the AutoCAD plugin after building:

```powershell
& .\installers\autocad\install.ps1
```
