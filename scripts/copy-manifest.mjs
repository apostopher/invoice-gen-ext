import { mkdir, copyFile } from "node:fs/promises";
import { resolve } from "node:path";

const outDir = resolve("dist");
await mkdir(outDir, { recursive: true });

await copyFile(resolve("src/manifest.json"), resolve("dist/manifest.json"));
