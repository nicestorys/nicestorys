import path from "path";
import fs from "fs-extra";

export async function vercel({ outputDir }: { outputDir: string }) {
  const funcPath = path.join(outputDir, "functions");

  const vercelConfigPath = path.join(funcPath, "api.func", ".vc-config.json");
  fs.mkdirSync(path.dirname(vercelConfigPath), { recursive: true });
  fs.writeFileSync(
    vercelConfigPath,
    JSON.stringify(
      {
        runtime: "edge",
        deploymentTarget: "v8-worker",
        entrypoint: "api.js",
        launcherType: "Nodejs",
        supportsResponseStreaming: true,
      },
      null,
      2,
    ),
  );
  fs.writeFileSync(
    path.join(outputDir, "config.json"),
    JSON.stringify(
      {
        version: 3,
        routes: [
          {
            handle: "filesystem",
          },
          {
            src: ".*",
            dest: "api",
            continue: true,
          },
        ],
      },
      null,
      2,
    ),
  );
}
