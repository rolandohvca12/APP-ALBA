# Native release process

`openseesjs` is a platform-neutral API package. Native binaries are published
independently so npm installs only the runtime matching the consumer machine.

## Automated release

1. Push the `0.4.0` changes to GitHub.
2. Run the `openseesjs native runtimes` workflow manually.
3. Leave `publish=false` for a validation build and inspect both `.tgz` artifacts.
4. Configure npm Trusted Publishing for this repository, workflow and the
   `npm` GitHub environment.
5. Run the workflow again with `publish=true`.

The workflow publishes in dependency order:

1. `@openseesjs/native-win32-x64`
2. `@openseesjs/native-linux-x64`
3. `openseesjs`

## Local Windows validation

```powershell
$env:OPEN_SEES_NODE_BINDING = (Resolve-Path ..\openseesjs-win32-x64\opensees.node)
npm run verify:publish
npm --prefix ..\openseesjs-win32-x64 run verify
```

Linux compilation is intentionally performed on Linux. Do not cross-compile
the glibc package from Windows because the resulting dependency inventory and
minimum glibc compatibility would not be verifiable.
