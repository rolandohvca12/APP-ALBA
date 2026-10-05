# Changelog

## 0.3.0 - 2026-09-29

- Add batched domain snapshots for visualization and post-processing.
- Add typed element topology, support, eigenvector and element-response queries.
- Preserve the existing command API and native runtime compatibility.

## 0.2.5 - 2026-09-27

- Dispatch registered OpenSees commands directly through their native Tcl C
  procedures, retaining Tcl evaluation as a compatibility fallback.
- Add contiguous typed-array APIs for high-volume nodes, masses, constraints,
  loads, nodal responses and element responses, with automatic fallback for
  older native runtimes.
- Avoid allocating discarded JavaScript results for write-only bulk commands.
- Regenerate stale third-party CMake caches during native builds so renamed or
  relocated workspaces remain buildable.

## 0.2.4 - 2026-09-27

- Add discoverable, strongly typed variant methods to all polymorphic OpenSees
  commands, including materials, recorders, sections, beam integrations and
  analysis configuration, while preserving their Tcl-compatible callable forms.
- Generate and share one runtime variant-command inventory across the native,
  minimal and Tcl backends.
- Add generated, discoverable element methods such as
  `ops.element.elasticBeamColumn(...)` while preserving the Tcl-compatible
  `ops.element("elasticBeamColumn", ...)` form.
- Share the variant dispatcher across the native, minimal and Tcl APIs.

## 0.2.3 - 2026-09-26

- Prioritize the typed `elasticBeamColumn` 2D/3D overloads in editor Signature
  Help without changing the command API or native runtime.

## 0.2.2 - 2026-09-26

- Add a CommonJS entry point for TSLab, Jupyter and `require()` consumers while
  preserving the existing ESM API.

## 0.2.1 - 2026-09-26

- Move the Windows native runtime to the organization-owned package
  `@openseesjs/native-win32-x64`.
- Remove the maintainer's personal npm scope from new installations.

## 0.2.0 - 2026-09-26

- Add the lazy OpenSeesPy-style global `ops` facade with automatic cleanup.
- Split native binaries into an optional platform-specific package.
- Add contextual native errors, bulk model commands and structured result helpers.
- Generate API documentation and editor hints from the command metadata.
- Use native Tcl flags as the single typed command convention and remove the
  duplicated generated options-object overloads.
- Add complete `node` flag inference for `-ndf`, `-mass`, `-disp`, `-vel` and
  `-accel` in one-, two- and three-dimensional models.
- Make `printA`/`printB` flags optional and return matrix/vector data directly
  from the global API when `-ret` is requested.
- Support native `modalProperties` flags, including simultaneous report-file
  output and strongly typed property results.
- Replace public rest parameters with explicit overloads and named arrays for
  genuinely variable-length OpenSees lists.
- Add a publication check that rejects rest parameters in public declarations.

## 0.1.1 - 2026-09-25

- Publish only the native OpenSees runtime, typed commands, and direct queries.
- Exclude Tcl generation, visualization, examples, and application-specific analysis modules.

## 0.1.0 - 2026-09-25

- Added a strongly typed OpenSeesPy-compatible command surface.
- Added the embedded OpenSees native runtime and direct TypeScript queries.
- Added the Windows x64 in-process OpenSees 3.8.0 backend using Node-API 8.
- Added direct typed queries, bulk response extraction and modal response-spectrum analysis.
- Added model visualization and recorder parsers.
- Added native/executable parity tests, release provenance and third-party license notices.

Native limitations: one active session per Node.js process; `Dodd-Restrepo`,
`StressDensity` and `PML` are not available in this package version.
