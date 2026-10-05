# Tests

## Unit / Build Checks

Run:

```powershell
.\tests\Run-BuildChecks.ps1
```

Checks:

| Target | Validation |
|---|---|
| AutoCAD plugin | `dotnet msbuild` x64 Debug |
| ETABS bridge | `dotnet msbuild` AnyCPU Debug |
| TypeScript client | Build plus contract and transport unit tests |
| npm package | Proprietary `ETABSv1.dll` is absent |

## Integration

Integration tests must run against a real ETABS installation/session.

Run the opt-in ETABS test:

```powershell
$env:ETABS_INTEGRATION = "1"
npm test --prefix .\ETABS.Client
```

Current status:

| Target | Status |
|---|---|
| Attach/start ETABS session | Passed against ETABS 22 |
| Invoke `cSapModel.GetVersion` | Passed (`22.6.0`) |
| Verify nonzero ETABS return code mapping | Pending |
| Verify AutoCAD bridge remains compatible | Build check only |
