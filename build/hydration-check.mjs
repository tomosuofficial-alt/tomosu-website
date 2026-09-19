// Hydration smoke test.
//
// Loads the prerendered index.html into jsdom, wires up the React *development*
// build (which loudly reports hydration mismatches), evaluates the real built
// bundle, and asserts:
//   1. hydration produces no mismatch / error,
//   2. the prerendered content survives (still present after hydrateRoot),
//   3. a React event handler is live (mobile menu toggles) — proving interactivity.
//
// This mirrors what the browser does with the CDN production build; the dev build
// is used only to surface warnings that production silently patches.

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { JSDOM } from 'jsdom';
import { ROOT } from './config.mjs';

const indexHtml = readFileSync(join(ROOT, 'index.html'), 'utf8');
const bundleRel = indexHtml.match(/data-app-bundle[^>]*src="(\/assets\/app\.[0-9a-f]+\.js)"/)[1];
const bundleCode = readFileSync(join(ROOT, bundleRel.slice(1)), 'utf8');

const errors = [];
const origError = console.error;
console.error = (...args) => { errors.push(args.map(String).join(' ')); };

const dom = new JSDOM(indexHtml, { url: 'https://tomosu-inc.com/', pretendToBeVisual: true, runScripts: 'outside-only' });
const { window } = dom;

// Globals react-dom reads at import time.
globalThis.window = window;
globalThis.document = window.document;

// Inert browser APIs used inside effects (post-hydration); stubbed so they don't throw.
window.IntersectionObserver = class { observe() {} unobserve() {} disconnect() {} };
window.matchMedia = window.matchMedia || (() => ({ matches: false, addEventListener() {}, removeEventListener() {} }));
window.scrollTo = () => {};
window.fetch = () => new Promise(() => {}); // never resolves — Blog stays in its SSR "loading" state
// Cancelable, unref'd rAF stub. The Works marquee runs a perpetual rAF loop; if
// these timers kept the event loop alive the process would never exit. unref()
// lets Node exit once our awaited work is done; cancelAnimationFrame is provided
// so the component's cleanup works too.
const rafTimers = new Map();
let rafSeq = 0;
window.requestAnimationFrame = (cb) => {
  const id = ++rafSeq;
  const timer = setTimeout(() => { rafTimers.delete(id); cb(Date.now()); }, 16);
  if (timer.unref) timer.unref();
  rafTimers.set(id, timer);
  return id;
};
window.cancelAnimationFrame = (id) => {
  const t = rafTimers.get(id);
  if (t) { clearTimeout(t); rafTimers.delete(id); }
};

const React = (await import('react')).default;
const ReactDOMClient = await import('react-dom/client');
window.React = React;
window.ReactDOM = { hydrateRoot: ReactDOMClient.hydrateRoot, createRoot: ReactDOMClient.createRoot };

const rootBefore = window.document.getElementById('root').innerHTML.length;

// Run the real bundle in the page's global scope.
window.eval(bundleCode);

await new Promise((r) => setTimeout(r, 50));

console.error = origError;

let failures = 0;
const pass = (m) => console.log(`  ✓ ${m}`);
const fail = (m) => { console.error(`  ✗ ${m}`); failures++; };

console.log('[hydration] React ' + React.version + ' hydrating prerendered #root');

const hydrationErrors = errors.filter((e) => /hydrat|did not match|Text content does not match|server rendered HTML/i.test(e));
if (hydrationErrors.length === 0) pass('no hydration mismatch reported');
else { fail('hydration mismatch:'); hydrationErrors.forEach((e) => console.error('      ' + e.slice(0, 240))); }

const rootAfter = window.document.getElementById('root').innerHTML.length;
(rootAfter > 2000) ? pass(`content intact after hydrate (${rootAfter} chars)`) : fail(`content lost after hydrate (${rootAfter} chars)`);

// Interactivity: toggle the mobile menu button and confirm React responds.
const btn = window.document.querySelector('.inquiry-menu');
if (!btn) fail('mobile menu button not found');
else {
  const before = btn.textContent;
  btn.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
  await new Promise((r) => setTimeout(r, 20));
  const after = btn.textContent;
  const expanded = btn.getAttribute('aria-expanded');
  (after !== before || expanded === 'true')
    ? pass(`menu button reacts to click ("${before}" → "${after}", aria-expanded=${expanded})`)
    : fail(`menu button did not react ("${before}" → "${after}")`);
}

// Any other unexpected console errors (excluding known post-hydration effect noise).
const otherErrors = errors.filter((e) => !hydrationErrors.includes(e) && !/act\(|Warning: An update to/i.test(e));
if (otherErrors.length) {
  console.log('  … other console output during hydrate (informational):');
  otherErrors.forEach((e) => console.log('      ' + e.slice(0, 200)));
}

console.log('');

// Teardown: stop any pending rAF timers and close the jsdom window so no timer
// keeps the process alive, then exit explicitly with the result.
for (const t of rafTimers.values()) clearTimeout(t);
rafTimers.clear();
try { window.close(); } catch (_) {}

if (failures) { console.error(`[hydration] FAILED: ${failures} problem(s).`); process.exit(1); }
console.log('[hydration] passed — SSR markup hydrates cleanly and stays interactive.');
process.exit(0);
