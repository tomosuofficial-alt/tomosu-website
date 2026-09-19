// Only public assets belong in Vercel's static output. API source stays at the
// project root where Vercel builds it as Functions, never as downloadable JS.
import { cpSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT } from './config.mjs';
const output = join(ROOT, 'dist');
rmSync(output, { recursive: true, force: true });
mkdirSync(output);
for (const name of readdirSync(ROOT)) {
  if (name.endsWith('.html') || name.endsWith('.css') ||
      ['assets', 'journal', 'robots.txt', 'sitemap.xml', 'dev-reload.js'].includes(name)) {
    cpSync(join(ROOT, name), join(output, name), { recursive: true });
  }
}
console.log('[build] dist contains public HTML, styles and assets only');
