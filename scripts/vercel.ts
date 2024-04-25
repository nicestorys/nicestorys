import path from "path";
import fs from "fs-extra";

export async function vercel({ outputDir, funcs }: { outputDir: string; funcs: string[] }) {
  const funcPath = path.join(outputDir, "functions");

  for (const func of funcs) {
    const vercelConfigPath = path.join(funcPath, func, ".vc-config.json");
    fs.mkdirSync(path.dirname(vercelConfigPath), { recursive: true });
    fs.writeFileSync(
      vercelConfigPath,
      JSON.stringify(
        {
          runtime: "edge",
          deploymentTarget: "v8-worker",
          entrypoint: "index.js",
          launcherType: "Nodejs",
          supportsResponseStreaming: true,
        },
        null,
        2,
      ),
    );
  }
  fs.writeFileSync(
    path.join(outputDir, "config.json"),
    JSON.stringify(
      {
        version: 3,
        routes: [
          {
            handle: "filesystem",
          },
          ...funcs.map((func) => ({
            src: ".*",
            dest: func.replace(/\.func$/, ""),
            continue: true,
          })),
        ],
      },
      null,
      2,
    ),
  );
}
