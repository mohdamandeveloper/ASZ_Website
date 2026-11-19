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

const { render, PRERENDER_PATHS, getSeo, SITE_URL } = await import(
  pathToFileURL(path.join(ssrDir, 'entry-server.js')).href
);

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ASZ Technologies',
  url: SITE_URL,
  logo: `${SITE_URL}/og-image.png`,
  email: 'info@asztechnologies.com',
  description:
    'Global technology and engineering company delivering AI systems, intelligent security, digital products and enterprise technology.',
  contactPoint: { '@type': 'ContactPoint', email: 'info@asztechnologies.com', contactType: 'sales' },
};

function headTags(urlPath) {
  const s = getSeo(urlPath);
  const page = {
    '@context': 'https://schema.org',
    '@type': s.type === 'article' ? 'Article' : 'WebPage',
    [s.type === 'article' ? 'headline' : 'name']: s.title,
    description: s.description,
    url: s.canonical,
    publisher: { '@type': 'Organization', name: 'ASZ Technologies', url: SITE_URL },
  };
  return [
    `<title>${esc(s.title)}</title>`,
    `<meta name="description" content="${esc(s.description)}" />`,
    `<link rel="canonical" href="${esc(s.canonical)}" />`,
    s.noindex ? `<meta name="robots" content="noindex, follow" />` : `<meta name="robots" content="index, follow" />`,
    `<meta property="og:type" content="${s.type}" />`,
    `<meta property="og:site_name" content="ASZ Technologies" />`,
    `<meta property="og:title" content="${esc(s.title)}" />`,
    `<meta property="og:description" content="${esc(s.description)}" />`,
    `<meta property="og:url" content="${esc(s.canonical)}" />`,
    `<meta property="og:image" content="${esc(s.image)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(s.title)}" />`,
    `<meta name="twitter:description" content="${esc(s.description)}" />`,
    `<meta name="twitter:image" content="${esc(s.image)}" />`,
    `<script type="application/ld+json">${JSON.stringify([orgJsonLd, page]).replace(/</g, '\\u003c')}</script>`,
  ].join('\n    ');
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

// 404 page (served by nginx for unknown URLs, with a real 404 status)
{
  const { html } = await render('/__not-found__');
  const page = buildPage('/__not-found__', html)
    .replace(/<title>[^<]*<\/title>/g, '<title>Page Not Found | ASZ Technologies</title>')
    .replace(/<link rel="canonical"[^>]*>\n\s*/, '')
    .replace(/<meta name="robots"[^>]*>/, '<meta name="robots" content="noindex" />');
  fs.writeFileSync(path.join(dist, '404.html'), page);
  console.log('  prerendered 404.html');
}

// sitemap.xml
const today = new Date().toISOString().slice(0, 10);
const urls = PRERENDER_PATHS.filter((p) => !getSeo(p).noindex)
  .map((p) => `  <url><loc>${getSeo(p).canonical}</loc><lastmod>${today}</lastmod></url>`)
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
