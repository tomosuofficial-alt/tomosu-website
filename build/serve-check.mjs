// Local preview smoke test.
//
// Spins up an ephemeral static server that applies the SAME rewrites declared in
// vercel.json (so /journal/:slug routing is exercised), fetches every public
// route, asserts status + key content, then shuts itself down. Does NOT touch the
// live site or any API — /api/* returns 501 here (the browser degrades to the
// prerendered content, which is exactly what we assert).

import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import { ROOT } from './config.mjs';

const rewrites = JSON.parse(readFileSync(join(ROOT, 'vercel.json'), 'utf8')).rewrites || [];
const compiled = rewrites.map((r) => {
  const params = [];
  const pattern = r.source
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    .replace(/:(\w+)/g, (_, name) => { params.push(name); return '([^/]+)'; });
  return { re: new RegExp('^' + pattern + '/?$'), params, destination: r.destination };
});

const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8', '.json': 'application/json', '.png': 'image/png', '.webp': 'image/webp' };

function resolvePath(urlPath) {
  if (urlPath.startsWith('/api/')) return { api: true };
  for (const c of compiled) {
    const m = c.re.exec(urlPath);
    if (m) {
      let dest = c.destination;
      c.params.forEach((name, i) => { dest = dest.replace(`:${name}`, m[i + 1]); });
      return { file: dest };
    }
  }
  let p = urlPath === '/' ? '/index.html' : urlPath;
  const abs = join(ROOT, p);
  if (existsSync(abs) && statSync(abs).isFile()) return { file: p };
  return { notFound: true };
}

const server = createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split('?')[0]);
  const r = resolvePath(urlPath);
  if (r.api) { res.writeHead(501); return res.end('api not available in preview'); }
  if (r.notFound) { res.writeHead(404); return res.end('Not Found'); }
  const abs = join(ROOT, r.file);
  if (!existsSync(abs)) { res.writeHead(404); return res.end('Not Found'); }
  res.writeHead(200, { 'content-type': MIME[extname(abs)] || 'application/octet-stream' });
  res.end(readFileSync(abs));
});

const cases = [
  { path: '/', status: 200, must: ['その悩みを、', '経営者を、', 'id="services"', 'id="contact"'] },
  { path: '/privacy', status: 200, must: ['プライバシーポリシー'] },
  { path: '/tokutei', status: 200, must: ['特定商取引法'] },
  { path: '/journal', status: 200, must: ['class="journal-item"', '経営者の一歩を、灯りに変える。'] },
  { path: '/journal/keiei-no-akari', status: 200, must: ['journal-detail-title', '経営者の一歩を、灯りに変える。', 'canonical" href="https://tomosu-inc.com/journal/keiei-no-akari"'] },
  { path: '/journal/this-slug-does-not-exist', status: 404, must: [], note: 'unknown slug → real HTTP 404 (no generated file)' },
  { path: '/robots.txt', status: 200, must: ['Sitemap: https://tomosu-inc.com/sitemap.xml'] },
  { path: '/sitemap.xml', status: 200, must: ['<loc>https://tomosu-inc.com/journal/keiei-no-akari</loc>'] },
];

let failures = 0;
server.listen(0, '127.0.0.1', async () => {
  const port = server.address().port;
  const base = `http://127.0.0.1:${port}`;
  console.log(`[serve-check] preview on ${base} (rewrites from vercel.json)`);
  for (const c of cases) {
    try {
      const res = await fetch(base + c.path);
      const body = await res.text();
      const okStatus = res.status === c.status;
      const missing = c.must.filter((m) => !body.includes(m));
      if (okStatus && missing.length === 0) {
        console.log(`  ✓ ${c.path} → ${res.status}${c.note ? '  (' + c.note + ')' : ''}`);
      } else {
        failures++;
        console.error(`  ✗ ${c.path} → ${res.status} (want ${c.status})${missing.length ? '; missing: ' + missing.join(', ') : ''}`);
      }
    } catch (err) {
      failures++;
      console.error(`  ✗ ${c.path} → error ${err.message}`);
    }
  }
  server.close();
  console.log('');
  if (failures) { console.error(`[serve-check] FAILED: ${failures} route(s).`); process.exit(1); }
  console.log('[serve-check] all routes OK.');
});
