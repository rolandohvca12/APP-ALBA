# OpenSees native backend

This directory owns the Node.js addon that embeds OpenSees C++ for the public
`openseesjs` package.

## Contract

The addon must export:

```ts
createSession(): {
  invoke(command: string, args: (string | number | boolean | null)[]): NativeValue;
  invokeMany(command: string, argumentRows: (string | number | boolean | null)[][]): NativeValue[];
  invokeManyVoid(command: string, argumentRows: (string | number | boolean | null)[][]): void;
  invokePacked(command: string, tags: Int32Array, values: Float64Array | Int32Array, width: number): void;
  queryPacked(command: string, tags: Int32Array, width: number, args: NativeScalar[]): Float64Array;
  close(): void;
}
```

The addon embeds the official OpenSees command registry in the Node.js process.
Arguments are passed as `Tcl_Obj` values (without generating or executing a
`.tcl` file). Registered C command procedures are invoked directly, with Tcl
evaluation retained as a compatibility fallback, and results are converted
immediately to JavaScript scalars or arrays. This preserves broad OpenSees
coverage while avoiding the evaluator on the normal command path.

OpenSees currently uses process-global command state. The addon must therefore
allow one active session per Node.js process until that upstream limitation is
removed.

## Build status

Run `npm run native:check` and then `npm run native:build`. The expected binary is:

`native/prebuilds/win32-x64/opensees.node`

The distributed addon is compiled as an optimized Release binary. Every build
writes `native/BUILD_INFO.json` with the OpenSees version, source revision when
available, source-input fingerprint and final binary SHA-256. Set
`OPEN_SEES_SOURCE_REVISION` when building from a source archive without Git
metadata.

The source location can be changed with `OPEN_SEES_SOURCE_DIR`; the binary can
be overridden at runtime with `OPEN_SEES_NODE_BINDING`.

## Current native coverage

The standard modeling, static/transient analysis, recorder, response and query
commands use the in-process backend. The Intel-only upstream implementations
of `Dodd-Restrepo`, `StressDensity` and `PML` are rejected explicitly by the
portable addon and are not available in the current package.
