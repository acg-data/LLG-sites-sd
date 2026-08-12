import { cp, mkdir, rm, writeFile } from "node:fs/promises";

await rm("dist", { recursive: true, force: true });
await mkdir("dist", { recursive: true });
await cp("index.html", "dist/index.html");
await cp("thank-you", "dist/thank-you", { recursive: true });
await cp("assets", "dist/assets", { recursive: true });
await mkdir("dist/server", { recursive: true });
await writeFile("dist/server/index.js", "export default { fetch(request, env) { return env.ASSETS.fetch(request); } };\n");
console.log("Static production build created in dist/.");
