import { access, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const html = await readFile(join(root, "index.html"), "utf8");
const required = ["<title>", "id=\"home\"", "id=\"services\"", "id=\"about\"", "id=\"contact\"", "quote-form"];
const missing = required.filter((item) => !html.includes(item));
if (missing.length) throw new Error(`Missing required site elements: ${missing.join(", ")}`);

const localAssets = [
  ...html.matchAll(/(?:src|href|content)=\"(assets\/[^\"?#]+)[^\"]*\"/g),
  ...html.matchAll(/url\(\"(assets\/[^\"?#]+)[^\"]*\"\)/g),
].map((match) => match[1]);
for (const asset of new Set(localAssets)) await access(join(root, asset));

const originalDomainLinks = [...html.matchAll(/href=\"([^\"]*clevelandfencepros\.com[^\"]*)\"/gi)]
  .map((match) => match[1])
  .filter((href) => !href.startsWith("mailto:"));
if (originalDomainLinks.length) throw new Error(`Found prohibited links to original domain: ${originalDomainLinks.join(", ")}`);

console.log(`Build passed: ${new Set(localAssets).size} local assets verified; no links to the original website.`);
