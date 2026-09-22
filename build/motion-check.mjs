// Focused motion checks for the mouse-wheel inertia (app-root.jsx).
//
// Boots the real bundle in jsdom (as the hydration check does) and dispatches
// synthetic wheel/pointer events to assert the guard rails:
//   • prefers-reduced-motion → wheel is NOT intercepted
//   • ctrl+wheel (zoom)      → NOT intercepted
//   • nested scrollable      → NOT intercepted (left to the browser)
//   • plain vertical wheel   → intercepted (preventDefault) and drives scroll
//   • pointerdown/anchor      → cancels/syncs the inertia (no fighting)
//
// Not a full browser; window.scrollTo is spied to observe the smoothing loop.

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { JSDOM } from 'jsdom';
import { ROOT } from './config.mjs';

const indexHtml = readFileSync(join(ROOT, 'index.html'), 'utf8');
const bundleRel = indexHtml.match(/data-app-bundle[^>]*src="(\/assets\/app\.[0-9a-f]+\.js)"/)[1];
const bundleCode = readFileSync(join(ROOT, bundleRel.slice(1)), 'utf8');

const React = (await import('react')).default;
const ReactDOMClient = await import('react-dom/client');

const ALL_TIMERS = new Set();
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function boot(reduce) {
  const dom = new JSDOM(indexHtml, { url: 'https://tomosu-inc.com/', pretendToBeVisual: true, runScripts: 'outside-only' });
  const { window } = dom;
  globalThis.window = window;
  globalThis.document = window.document;
  window.IntersectionObserver = class { observe() {} unobserve() {} disconnect() {} };
  window.matchMedia = (q) => ({ matches: !!reduce && /reduce/.test(q), media: q, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} });
  const calls = [];
  window.scrollTo = (a, b) => { calls.push(a && typeof a === 'object' ? a.top : b); }; // supports scrollTo({top,behavior})
  window.fetch = () => new Promise(() => {});
  window.requestAnimationFrame = (cb) => { const id = setTimeout(() => { ALL_TIMERS.delete(id); cb(Date.now()); }, 16); if (id.unref) id.unref(); ALL_TIMERS.add(id); return id; };
  window.cancelAnimationFrame = (id) => { clearTimeout(id); ALL_TIMERS.delete(id); };
  Object.defineProperty(window, 'innerHeight', { value: 800, configurable: true });
  Object.defineProperty(window.document.documentElement, 'scrollHeight', { value: 6000, configurable: true });
  window.React = React;
  window.ReactDOM = { hydrateRoot: ReactDOMClient.hydrateRoot, createRoot: ReactDOMClient.createRoot };
  window.eval(bundleCode);
  await wait(40);              // let effects attach
  calls.length = 0;           // only capture wheel-driven scrolls
  const dispatchWheel = (opts = {}) => {
    const e = new window.Event('wheel', { bubbles: true, cancelable: opts.cancelable !== false });
    Object.defineProperties(e, {
      deltaY: { value: opts.deltaY ?? 0 }, deltaX: { value: opts.deltaX ?? 0 },
      deltaMode: { value: opts.deltaMode ?? 0 }, ctrlKey: { value: !!opts.ctrlKey },
      shiftKey: { value: !!opts.shiftKey }, metaKey: { value: !!opts.metaKey },
    });
    (opts.target || window.document.body).dispatchEvent(e);
    return e;
  };
  return { dom, window, calls, dispatchWheel };
}

let failures = 0;
const check = (cond, m) => (cond ? console.log(`  ✓ ${m}`) : (console.error(`  ✗ ${m}`), failures++));

console.log('[motion] mouse-wheel inertia guard rails');

// 1) reduced-motion: no interception
{
  const { dom, calls, dispatchWheel } = await boot(true);
  const e = dispatchWheel({ deltaY: 120 });
  await wait(60);
  check(!e.defaultPrevented && calls.length === 0, 'prefers-reduced-motion: wheel left to the browser');
  dom.window.close();
}

// 2–5) motion enabled
{
  const { dom, window, calls, dispatchWheel } = await boot(false);

  {
    calls.length = 0;
    const e = dispatchWheel({ deltaY: 120, ctrlKey: true });
    await wait(50);
    check(!e.defaultPrevented && calls.length === 0, 'ctrl+wheel (zoom) not intercepted');
  }

  {
    calls.length = 0;
    const e = dispatchWheel({ deltaY: 120, shiftKey: true });
    await wait(50);
    check(!e.defaultPrevented && calls.length === 0, 'shift+wheel (horizontal intent) not intercepted');
  }

  {
    calls.length = 0;
    const e = dispatchWheel({ deltaY: 0 });
    await wait(50);
    check(!e.defaultPrevented && calls.length === 0, 'deltaY 0 wheel not intercepted');
  }

  {
    calls.length = 0;
    const e = dispatchWheel({ deltaY: 120, cancelable: false });
    await wait(50);
    check(calls.length === 0, 'non-cancelable wheel not intercepted');
  }

  {
    const ta = window.document.createElement('textarea');
    window.document.body.appendChild(ta);
    calls.length = 0;
    const e = dispatchWheel({ deltaY: 120, target: ta });
    await wait(50);
    check(!e.defaultPrevented && calls.length === 0, 'nested scrollable (textarea) not intercepted');
    window.document.body.removeChild(ta);
  }

  {
    calls.length = 0;
    const e = dispatchWheel({ deltaY: 200 });
    await wait(170);
    check(e.defaultPrevented, 'plain vertical wheel intercepts default');
    check(calls.length > 0 && calls[calls.length - 1] > 0, 'plain wheel drives native scroll forward');
  }

  {
    dispatchWheel({ deltaY: 400 });
    await wait(40);
    const n = calls.length;
    window.dispatchEvent(new window.Event('pointerdown', { bubbles: true }));
    await wait(140);
    check(calls.length - n <= 1, 'pointerdown/anchor interrupt cancels inertia');
  }

  {
    dispatchWheel({ deltaY: 400 });
    await wait(40);
    const n = calls.length;
    window.dispatchEvent(new window.Event('keydown', { bubbles: true }));
    await wait(140);
    check(calls.length - n <= 1, 'keydown interrupt cancels inertia');
  }

  dom.window.close();
}

for (const t of ALL_TIMERS) clearTimeout(t);
ALL_TIMERS.clear();

console.log('');
if (failures) { console.error(`[motion] FAILED: ${failures} problem(s).`); process.exit(1); }
console.log('[motion] passed — wheel inertia is gentle and non-intrusive.');
process.exit(0);
