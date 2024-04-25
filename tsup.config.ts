import { defineConfig, Options } from "tsup";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import { vercel } from "./scripts/vercel";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const options: Options[] = [
  {
    entry: {
      main: "src/main.prod.ts",
    },
    format: ["esm"],
    bundle: true,
  },
];

if (process.env.VERCEL) {
  const vercelOutputPath = path.join(__dirname, ".vercel", "output");
  const funcPath = path.join(vercelOutputPath, "functions");
  options.push({
    entry: {
      "api.func/index": ".deploy/vercel.ts",
    },
    bundle: true,
    format: ["esm"],
    outDir: funcPath,
    noExternal: ["hono", "zod"],
    splitting: true,
    async onSuccess() {
      fs.copySync(path.join(__dirname, "dist"), path.join(vercelOutputPath));
      await vercel({ outputDir: vercelOutputPath, funcs: ["api.func"] });
    },
  });
} else if (process.env.NETLIFY) {
  options.push({
    entry: {
      "[[catchall]]": ".deploy/cloudflare.ts",
    },
    bundle: true,
    format: ["esm"],
    outDir: "api",
  });
} else if (process.env.CLOUDFLARE) {
  options.push({
    entry: {
      "edge-functions": ".deploy/netlify.ts",
    },
    format: ["esm"],
    clean: true,
    dts: true,
    outDir: "netlify",
  });
}

export default defineConfig(options);
