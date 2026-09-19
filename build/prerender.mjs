// Build-time React SSR of the single-page app.
//
// The component sources reference the browser globals `React` / `window` and were
// written to run as classic (non-module) scripts. We reproduce that exactly here:
// concatenate them, transform the JSX to `React.createElement(...)` calls with
// esbuild, then evaluate the combined script in a Node `vm` context that exposes
// the same globals. The resulting `window.App` is rendered with react-dom/server.
//
// Only pure render output is produced — React effects (IntersectionObserver,
// scroll listeners, fetch) do not run during renderToString, so the markup is the
// deterministic initial state and hydrates cleanly on the client.

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import vm from 'node:vm';
import { transformSync } from 'esbuild';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { ROOT, COMPONENT_FILES } from './config.mjs';

export function readComponentSource() {
  return COMPONENT_FILES
    .map((f) => `\n/* ---- ${f} ---- */\n` + readFileSync(join(ROOT, f), 'utf8'))
    .join('\n;\n');
}

// Transform the concatenated JSX into browser-ready classic JS (React global).
export function transformComponents(source, { minify = false } = {}) {
  const { code } = transformSync(source, {
    loader: 'jsx',
    jsx: 'transform',
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment',
    minify,
    target: 'es2019',
  });
  return code;
}

// Minimal, render-safe DOM stubs. Nothing here is touched during renderToString,
// but they guard against accidental access and keep evaluation from throwing.
function makeSandbox() {
  const noop = () => {};
  const el = { classList: { add: noop, remove: noop, toggle: noop }, getBoundingClientRect: () => ({ top: 0, bottom: 0, left: 0, right: 0 }), style: { setProperty: noop } };
  const documentStub = {
    getElementById: () => null,
    querySelectorAll: () => [],
    querySelector: () => null,
    createElement: () => el,
    addEventListener: noop,
    removeEventListener: noop,
    body: { style: {}, classList: { add: noop, remove: noop, toggle: noop } },
    head: { appendChild: noop },
  };
  const windowStub = {
    React,
    innerWidth: 1440,
    innerHeight: 900,
    scrollY: 0,
    addEventListener: noop,
    removeEventListener: noop,
    scrollTo: noop,
    matchMedia: () => ({ matches: false, addEventListener: noop, removeEventListener: noop }),
  };
  const sandbox = {
    React,
    window: windowStub,
    document: documentStub,
    console,
    setTimeout: () => 0,
    clearTimeout: noop,
    Date,
    // Effects don't run in SSR, but provide inert stubs just in case.
    fetch: () => Promise.reject(new Error('fetch is unavailable during SSR')),
    IntersectionObserver: class { constructor() {} observe() {} unobserve() {} disconnect() {} },
  };
  windowStub.document = documentStub;
  windowStub.window = windowStub;
  return sandbox;
}

export function renderAppHtml() {
  const code = transformComponents(readComponentSource());
  const sandbox = makeSandbox();
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox, { filename: 'tomosu-app.jsx' });
  const App = sandbox.window.App;
  if (typeof App !== 'function') {
    throw new Error('SSR failed: window.App was not defined by the component sources');
  }
  return renderToString(React.createElement(App));
}
