import assert from "node:assert/strict";
import test from "node:test";
import { connectToEtabs } from "../dist/index.js";

test(
  "connects to a real ETABS installation and reads its version",
  { skip: process.env.ETABS_INTEGRATION !== "1" },
  async () => {
    const client = await connectToEtabs({ attachOnly: true });
    try {
      const result = await client.sapModel.getVersion();
      assert.match(result.version, /^22(?:\.|$)/);
    } finally {
      client.close();
    }
  },
);
