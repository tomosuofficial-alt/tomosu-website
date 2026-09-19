// Shared build configuration.
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

// Canonical production origin (no trailing slash).
export const ORIGIN = 'https://tomosu-inc.com';

// Component source files, concatenated in dependency order and evaluated in a
// single script scope — this preserves the original browser-global semantics
// (cross-file references to `scrollToId` / `NAV_ITEMS`, `Object.assign(window, …)`).
export const COMPONENT_FILES = [
  'nav-hero.jsx',
  'about-services-works.jsx',
  'flow-blog-contact.jsx',
  'inquiry-home.jsx',
  'app-root.jsx',
];

// Cache-busting query used across all static HTML for CSS / dev-reload.
export const ASSET_VERSION = 53;

// Where the fetched public Journal snapshot is stored.
export const JOURNAL_CACHE = join(ROOT, 'build', 'journal-cache.json');

// Manifest of slug pages this build generated, so rebuilds delete only their own
// output and never touch hand-written files under journal/.
export const JOURNAL_MANIFEST = join(ROOT, 'build', 'journal-manifest.json');
