// Post-build verification. Fails (exit 1) if the built output is missing the
// expected prerendered content, SEO tags, or has inconsistent asset versions.

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, ORIGIN, ASSET_VERSION, JOURNAL_CACHE } from './config.mjs';

const read = (p) => readFileSync(join(ROOT, p), 'utf8');
let failures = 0;
const pass = (m) => console.log(`  ✓ ${m}`);
const fail = (m) => { console.error(`  ✗ ${m}`); failures++; };
const check = (cond, m) => (cond ? pass(m) : fail(m));

console.log('[check] index.html — SSR + SEO');
const index = read('index.html');
check(/<link rel="canonical" href="https:\/\/tomosu-inc\.com\/"\/>/.test(index), 'canonical present');
check(index.includes('群馬') && index.includes('高崎'), 'title/description mention 群馬・高崎');
check(!/type="text\/babel"/.test(index), 'no in-browser Babel (text/babel removed)');
check(!/@babel\/standalone/.test(index), 'no @babel/standalone script');
// #root must contain real prerendered content, not be empty.
const rootMatch = index.match(/<div id="root">([\s\S]*?)<\/div><!--\/root-->/);
const rootInner = rootMatch ? rootMatch[1] : '';
check(rootInner.length > 2000, `#root prerendered (${rootInner.length} chars)`);
check(/その悩みを、/.test(rootInner) && /次の/.test(rootInner), 'H1 hero copy present in initial HTML');
check(/経営者を、/.test(rootInner), 'brand tagline present in initial HTML');
check(/id="services"/.test(rootInner) && /id="contact"/.test(rootInner), 'section anchors present in initial HTML');
check(/href="\/journal\//.test(rootInner) || /class="blog-row"/.test(rootInner), 'journal links/section present');
// bundle wired
const bundleMatch = index.match(/data-app-bundle[^>]*src="(\/assets\/app\.[0-9a-f]+\.js)"/);
check(!!bundleMatch, 'app bundle referenced with hashed filename');
if (bundleMatch) check(existsSync(join(ROOT, bundleMatch[1].slice(1))), `bundle file exists (${bundleMatch[1]})`);

console.log('[check] asset version consistency (v=' + ASSET_VERSION + ')');
for (const f of ['index.html', 'privacy.html', 'tokutei.html', 'journal.html', 'journal-detail.html']) {
  const html = read(f);
  // Only the CSS / dev-reload cache-busting number is unified here; per-image
  // ?v= (e.g. profile.webp?v=3) are independent and intentionally left alone.
  const versions = [...html.matchAll(/(?:styles\.css|inquiry\.css|dev-reload\.js)\?v=(\d+)\b/g)].map((m) => m[1]);
  const allMatch = versions.length > 0 && versions.every((v) => v === String(ASSET_VERSION));
  check(allMatch, `${f} uses ?v=${ASSET_VERSION} only (found: ${[...new Set(versions)].join(', ') || 'none'})`);
}

console.log('[check] robots.txt + sitemap.xml');
const robots = read('robots.txt');
check(robots.includes(`Sitemap: ${ORIGIN}/sitemap.xml`), 'robots references sitemap');
const sitemap = read('sitemap.xml');
check(sitemap.includes(`<loc>${ORIGIN}/</loc>`), 'sitemap has homepage');
check(sitemap.includes(`<loc>${ORIGIN}/journal</loc>`), 'sitemap has /journal');

console.log('[check] journal prerender (if snapshot present)');
if (existsSync(JOURNAL_CACHE)) {
  const snap = JSON.parse(readFileSync(JOURNAL_CACHE, 'utf8'));
  const journal = read('journal.html');
  check(/class="journal-item"/.test(journal), `journal.html list prerendered (${snap.count} articles available)`);
  const journalDir = join(ROOT, 'journal');
  const files = existsSync(journalDir) ? readdirSync(journalDir).filter((f) => f.endsWith('.html')) : [];
  check(files.length === snap.count, `per-article pages generated (${files.length}/${snap.count})`);
  // Spot-check the first article page for unique title + canonical + body.
  const a = snap.articles[0];
  if (a) {
    const page = read(`journal/${a.slug}.html`);
    check(page.includes(`https://tomosu-inc.com/journal/${a.slug}`), `${a.slug}: canonical set`);
    check(page.includes(a.title), `${a.slug}: unique title in <head>`);
    check(/class="journal-detail-body"/.test(page) && !/<!--ARTICLE:START--><div class="journal-loading"/.test(page), `${a.slug}: body prerendered`);
    check(sitemap.includes(`<loc>${ORIGIN}/journal/${a.slug}</loc>`), `${a.slug}: in sitemap`);
  }
} else {
  console.log('  … no snapshot — journal prerender intentionally skipped (client-fetch fallback active).');
}

console.log('');
if (failures) {
  console.error(`[check] FAILED: ${failures} problem(s).`);
  process.exit(1);
}
console.log('[check] all checks passed.');
