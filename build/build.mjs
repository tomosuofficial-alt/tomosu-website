// TOMOSU. static build.
//
//  1. Bundle the JSX component sources into a hashed browser script (build-time
//     transform — no in-browser Babel), appending a hydrate bootstrap.
//  2. Prerender the single-page app to static HTML (React SSR) into #root.
//  3. Prerender the Journal list + per-article detail pages from the public
//     snapshot (when available), and emit sitemap.xml + robots.txt.
//
// All outputs are written next to the source so Vercel can serve them statically.

import {
  readFileSync, writeFileSync, readdirSync, unlinkSync, mkdirSync, existsSync,
} from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { ROOT, ORIGIN, ASSET_VERSION, JOURNAL_CACHE, JOURNAL_MANIFEST } from './config.mjs';
import { readComponentSource, transformComponents, renderAppHtml } from './prerender.mjs';
import { renderListItems, renderDetailInner } from './journal-render.mjs';

const rel = (p) => join(ROOT, p);
const read = (p) => readFileSync(rel(p), 'utf8');
const write = (p, s) => writeFileSync(rel(p), s);

// --- attribute helpers for id-targeted <meta>/<link> tags ------------------
const attrEscape = (s) =>
  String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function setTitle(html, value) {
  return html.replace(/<title id="doc-title">[\s\S]*?<\/title>/, `<title id="doc-title">${attrEscape(value)}</title>`);
}
function setAttrById(html, id, attr, value) {
  const re = new RegExp(`(<[^>]*\\bid="${id}"[^>]*\\b${attr}=")[^"]*(")`);
  if (!re.test(html)) throw new Error(`template tag #${id}[${attr}] not found`);
  return html.replace(re, `$1${attrEscape(value)}$2`);
}
function replaceBetween(html, startMark, endMark, inner) {
  const s = html.indexOf(startMark);
  const e = html.indexOf(endMark);
  if (s === -1 || e === -1) throw new Error(`markers ${startMark}/${endMark} not found`);
  return html.slice(0, s + startMark.length) + inner + html.slice(e);
}

// --- 1. client bundle ------------------------------------------------------
const BOOT = `
;(function(){
  function mount(){
    var r = document.getElementById('root');
    if (r && window.App && window.React && window.ReactDOM && window.ReactDOM.hydrateRoot) {
      window.ReactDOM.hydrateRoot(r, window.React.createElement(window.App));
    }
  }
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', mount); }
  else { mount(); }
})();
`;

function buildClientBundle() {
  const source = readComponentSource() + '\n' + BOOT;
  const code = transformComponents(source, { minify: true });
  const hash = createHash('sha256').update(code).digest('hex').slice(0, 10);
  const file = `app.${hash}.js`;
  const assetsDir = rel('assets');
  // Remove any stale app.*.js bundles.
  for (const f of readdirSync(assetsDir)) {
    if (/^app\.[0-9a-f]+\.js$/.test(f) && f !== file) unlinkSync(join(assetsDir, f));
  }
  writeFileSync(join(assetsDir, file), code);
  return `/assets/${file}`;
}

// --- 2. index.html SSR -----------------------------------------------------
function prerenderIndex(bundlePath) {
  let html = read('index.html');
  const app = renderAppHtml();
  html = html.replace(/<div id="root">[\s\S]*?<\/div><!--\/root-->/, `<div id="root">${app}</div><!--/root-->`);
  html = html.replace(/(<script[^>]*\bdata-app-bundle\b[^>]*\bsrc=")[^"]*(")/, `$1${bundlePath}$2`);
  write('index.html', html);
  return app.length;
}

// --- 3. journal ------------------------------------------------------------
function loadSnapshot() {
  if (!existsSync(JOURNAL_CACHE)) return null;
  try {
    const snap = JSON.parse(readFileSync(JOURNAL_CACHE, 'utf8'));
    if (!snap.articles || snap.articles.length === 0) return null;
    return snap;
  } catch {
    return null;
  }
}

function prerenderJournalList(articles) {
  let html = read('journal.html');
  html = replaceBetween(html, '<!--JOURNAL_LIST:START-->', '<!--JOURNAL_LIST:END-->', renderListItems(articles));
  write('journal.html', html);
}

function prerenderJournalDetails(articles) {
  const template = read('journal-detail.html');
  const dir = rel('journal');
  mkdirSync(dir, { recursive: true });

  // Delete only the slug pages this build generated last time (tracked in the
  // manifest) so any hand-written files under journal/ are preserved.
  let prev = [];
  if (existsSync(JOURNAL_MANIFEST)) {
    try { prev = JSON.parse(readFileSync(JOURNAL_MANIFEST, 'utf8')).slugs || []; } catch { prev = []; }
  }
  for (const slug of prev) {
    const f = join(dir, `${slug}.html`);
    if (existsSync(f)) unlinkSync(f);
  }

  const written = [];
  for (const a of articles) {
    if (!a.slug) continue;
    const title = `${a.title} — TOMOSU. Journal`;
    const desc = a.excerpt || 'TOMOSU. のJournal記事';
    const url = `${ORIGIN}/journal/${a.slug}`;
    let html = template;
    html = setTitle(html, title);
    html = setAttrById(html, 'meta-desc', 'content', desc);
    html = setAttrById(html, 'canonical-link', 'href', url);
    html = setAttrById(html, 'og-title', 'content', `${a.title} — TOMOSU.`);
    html = setAttrById(html, 'og-desc', 'content', desc);
    html = setAttrById(html, 'og-url', 'content', url);
    if (a.coverImageUrl) html = setAttrById(html, 'og-image', 'content', a.coverImageUrl);
    html = replaceBetween(html, '<!--ARTICLE:START-->', '<!--ARTICLE:END-->', renderDetailInner(a));
    writeFileSync(join(dir, `${a.slug}.html`), html);
    written.push(a.slug);
  }
  writeFileSync(JOURNAL_MANIFEST, JSON.stringify({ generatedAt: new Date().toISOString(), slugs: written }, null, 2) + '\n');
  return written.length;
}

// --- 4. sitemap + robots ---------------------------------------------------
const xmlEscape = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

function writeSitemap(articles) {
  // Static pages: no lastmod (we have no honest change date — don't fabricate one).
  const staticUrls = [
    { loc: `${ORIGIN}/`, priority: '1.0' },
    { loc: `${ORIGIN}/journal`, priority: '0.7' },
    { loc: `${ORIGIN}/privacy`, priority: '0.3' },
    { loc: `${ORIGIN}/tokutei`, priority: '0.3' },
  ];
  // Articles: lastmod is the real Published Date from the snapshot.
  const articleUrls = (articles || [])
    .filter((a) => a.slug)
    .map((a) => ({ loc: `${ORIGIN}/journal/${a.slug}`, lastmod: a.publishedDate ? String(a.publishedDate).slice(0, 10) : null, priority: '0.6' }));
  const urls = [...staticUrls, ...articleUrls];
  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls
      .map((u) =>
        `  <url>\n    <loc>${xmlEscape(u.loc)}</loc>\n` +
        (u.lastmod ? `    <lastmod>${xmlEscape(u.lastmod)}</lastmod>\n` : '') +
        `    <priority>${u.priority}</priority>\n  </url>`)
      .join('\n') +
    '\n</urlset>\n';
  write('sitemap.xml', xml);
  return urls.length;
}
function writeRobots() {
  // No Disallow: /api/ — the Journal pages fetch /api/journal via JS and Google
  // needs to GET it to render/index the client-side content.
  const txt = `User-agent: *\nAllow: /\n\nSitemap: ${ORIGIN}/sitemap.xml\n`;
  write('robots.txt', txt);
}

// --- run -------------------------------------------------------------------
function main() {
  console.log(`[build] asset version v=${ASSET_VERSION}`);
  const bundle = buildClientBundle();
  console.log(`[build] client bundle → ${bundle}`);
  const ssrLen = prerenderIndex(bundle);
  console.log(`[build] index.html prerendered (#root ${ssrLen} chars)`);

  // A fresh, non-empty snapshot is required (prebuild = fetch:journal must have
  // succeeded). We never publish empty or stale-silent journal output.
  const snap = loadSnapshot();
  if (!snap) {
    console.error('[build] FATAL: no valid journal snapshot (build/journal-cache.json).');
    console.error('[build] run `npm run fetch:journal` (needs network to the public site) first — it must succeed.');
    process.exit(1);
  }
  prerenderJournalList(snap.articles);
  const n = prerenderJournalDetails(snap.articles);
  console.log(`[build] journal prerendered: list + ${n} detail pages (snapshot ${snap.fetchedAt})`);
  const total = writeSitemap(snap.articles);
  console.log(`[build] sitemap.xml → ${total} URLs`);
  writeRobots();
  console.log('[build] robots.txt written');
  console.log('[build] done.');
}

main();
