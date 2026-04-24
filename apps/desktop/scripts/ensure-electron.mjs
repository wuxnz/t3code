import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const desktopRoot = fileURLToPath(new URL("..", import.meta.url));
const require = createRequire(join(desktopRoot, "package.json"));
let installJs;
let pathTxt;
try {
  const pkg = require.resolve("electron/package.json");
  const electronDir = dirname(pkg);
  installJs = join(electronDir, "install.js");
  pathTxt = join(electronDir, "path.txt");
} catch {
  process.exit(0);
}
if (existsSync(pathTxt) || !existsSync(installJs)) {
  process.exit(0);
}
const result = spawnSync(process.execPath, [installJs], { stdio: "inherit" });
process.exit(result.status === null ? 1 : result.status);
