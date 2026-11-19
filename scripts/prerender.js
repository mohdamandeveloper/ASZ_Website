// Runs after `vite build` + the SSR build (see "build" in package.json).
// Writes a real HTML file for every route into dist/, so crawlers, AI agents
// (GPTBot, ClaudeBot, PerplexityBot...) and link previews (LinkedIn, WhatsApp,
// Slack) see the full page content without executing JavaScript.
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

const { render, PRERENDER_PATHS, getSeo, headTagList } = await import(
  pathToFileURL(path.join(ssrDir, 'entry-server.js')).href
);

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function headTags(urlPath) {
  const s = getSeo(urlPath);
  const tags = headTagList(s).map(({ tag, attrs }) => {
    const a = Object.entries(attrs).map(([k, v]) => `${k}="${esc(v)}"`).join(' ');
    return `<${tag} ${a} />`;
  });
  if (s.jsonLd) {
    tags.push(`<script type="application/ld+json">${JSON.stringify(s.jsonLd).replace(/</g, '\\u003c')}</script>`);
  }
  return [`<title>${esc(s.title)}</title>`, ...tags].join('\n    ');
}

function buildPage(urlPath, appHtml) {
  if (!template.includes('<div id="root"></div>')) throw new Error('index.html: <div id="root"></div> not found');
  return template
    .replace(/<title>[\s\S]*?<\/title>/, '')
    .replace('<!--app-head-->', headTags(urlPath))
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
}

function outFile(urlPath) {
  return urlPath === '/' ? path.join(dist, 'index.html') : path.join(dist, urlPath, 'index.html');
}

let failed = 0;
for (const urlPath of PRERENDER_PATHS) {
  try {
    const { html } = await render(urlPath);
    const file = outFile(urlPath);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, buildPage(urlPath, html));
    console.log(`  prerendered ${urlPath}`);
  } catch (err) {
    failed++;
    console.error(`  FAILED ${urlPath}:`, err);
  }
}

// 404 page (served by nginx for unknown URLs, with a real 404 status).
// getSeo() returns noindex + no canonical for unknown paths.
{
  const { html } = await render('/__not-found__');
  fs.writeFileSync(path.join(dist, '404.html'), buildPage('/__not-found__', html));
  console.log('  prerendered 404.html');
}

// sitemap.xml
const today = new Date().toISOString().slice(0, 10);
const urls = PRERENDER_PATHS.filter((p) => !getSeo(p).noindex)
  .map((p) => `  <url>\n    <loc>${getSeo(p).canonical}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`)
  .join('\n');
fs.writeFileSync(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
);
console.log('  wrote sitemap.xml');

fs.rmSync(ssrDir, { recursive: true, force: true });

if (failed) {
  console.error(`\n${failed} route(s) failed to prerender`);
  process.exit(1);
}
