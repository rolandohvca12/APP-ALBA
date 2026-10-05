# etabsjs

Strongly typed TypeScript and JavaScript access to the CSI ETABS API through a bundled Windows bridge.

## Requirements

- Windows x64
- Node.js 22 or newer
- A locally installed, licensed copy of ETABS 22

## Install

```bash
npm install etabsjs
```

## Usage

```ts
import { connectToEtabs, eUnits } from "etabsjs";

const etabs = await connectToEtabs();

try {
  await etabs.sapModel.initializeNewModel(eUnits.kN_m_C);
  await etabs.file.newBlank();
  console.log(await etabs.sapModel.getVersion());
} finally {
  etabs.close();
}
```

`connectToEtabs()` starts the bundled bridge and attaches to an existing ETABS instance or starts one through the ETABS API. ETABS `ref` and `out` values are returned as typed objects, and nonzero API return codes become JavaScript errors.

The proprietary `ETABSv1.dll` assembly is not distributed with this package. It is resolved from the local ETABS installation.

ETABS is a product of Computers and Structures, Inc. This project is independent and is not affiliated with or endorsed by CSI.
