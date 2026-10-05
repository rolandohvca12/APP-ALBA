import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

test("generated client exposes only callable, correctly shaped ETABS contracts", async () => {
  const source = await readFile(new URL("../etabs-client.ts", import.meta.url), "utf8");

  assert.match(source, /count\(\): Promise<number>/);
  assert.match(
    source,
    /addByCoord\(numberPoints: number, x: number\[\], y: number\[\], z: number\[\]/,
  );
  assert.match(source, /get areaObj\(\): cAreaObjApi/);
  assert.doesNotMatch(source, /export class cDCoACI318_11Api/);
});

test("package never redistributes the proprietary ETABS assembly", async () => {
  await assert.rejects(
    readFile(join(fileURLToPath(new URL("../host/win-x64/", import.meta.url)), "ETABSv1.dll")),
    error => error?.code === "ENOENT",
  );
});
