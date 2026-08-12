import { access, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = new URL('.', import.meta.url);
const html = await readFile(new URL('index.html', root), 'utf8');
const css = await readFile(new URL('styles.css', root), 'utf8');

const required = [
  'index.html',
  'styles.css',
  'images/brandmark.svg',
  'images/favicon.png',
  'images/representative-1.webp',
  'images/representative-2.webp',
  'images/representative-3.webp',
  'site.js',
  'services/index.html',
  'services/crawlspace-encapsulation/index.html',
  'services/crawlspace-drainage/index.html',
  'services/moisture-control/index.html',
  'services/dehumidifier-solutions/index.html',
  'about/index.html',
  'service-areas/index.html',
  'contact/index.html'
];

await Promise.all(required.map((file) => access(new URL(file, root))));

for (const id of ['services', 'why', 'process', 'projects', 'areas', 'contact']) {
  if (!html.includes(`id="${id}"`)) throw new Error(`Missing section: ${id}`);
}

if (!html.includes('data-llg-lead-form')) throw new Error('Lead form hook is missing.');
if (!html.includes('data-lead-endpoint')) throw new Error('Lead endpoint is missing.');
if (!css.includes('@media (max-width: 768px)')) throw new Error('Mobile breakpoint is missing.');

const pages = required.filter((file) => file.endsWith('.html'));
for (const page of pages) {
  const pageUrl = new URL(page, root);
  const source = await readFile(pageUrl, 'utf8');
  if (source.includes('clone-rebuild.ws-crawl-space.pages.dev')) throw new Error(`Original-site link remains in ${page}.`);
  if (/615\.655|info@wscrawlspace\.com/.test(source)) throw new Error(`Unsupported contact detail remains in ${page}.`);
  const refs = [...source.matchAll(/(?:href|src)="([^"]+)"/g)].map((match) => match[1]);
  for (const ref of refs) {
    if (/^(?:https?:|mailto:|tel:|#|data:)/.test(ref)) continue;
    const target = new URL(ref.split('#')[0].split('?')[0], pageUrl);
    await access(target).catch(() => { throw new Error(`Broken local reference in ${page}: ${ref}`); });
  }
}

console.log(`Static production build verified at ${fileURLToPath(root)}.`);
