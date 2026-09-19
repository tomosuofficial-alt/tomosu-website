// Build a local snapshot of the *published* Journal from the public site.
//
// Uses only public, unauthenticated GET requests against the live API (the same
// endpoints the browser already calls). No Notion credentials are read or needed.
// Articles are never fabricated: on any failure we leave the previous snapshot
// untouched and report loudly, so downstream steps can decide to skip journal
// prerendering rather than silently emit empty pages.

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { ORIGIN, JOURNAL_CACHE } from './config.mjs';

const SOURCE_ORIGIN = process.env.JOURNAL_SOURCE_ORIGIN || ORIGIN;

async function getJson(url) {
  const res = await fetch(url, { headers: { accept: 'application/json' } });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`GET ${url} → ${res.status} ${body.slice(0, 200)}`);
  }
  return res.json();
}

export async function fetchJournalSnapshot() {
  const listUrl = `${SOURCE_ORIGIN}/api/journal?limit=50`;
  const list = await getJson(listUrl);
  const items = (list.items || []).filter((i) => i && i.slug);
  if (items.length === 0) {
    throw new Error(`published list is empty at ${listUrl} — refusing to write an empty snapshot`);
  }

  const articles = [];
  for (const it of items) {
    const detailUrl = `${SOURCE_ORIGIN}/api/journal/${encodeURIComponent(it.slug)}`;
    const detail = await getJson(detailUrl);
    if (!detail || !detail.slug) {
      throw new Error(`detail missing slug for ${it.slug}`);
    }
    articles.push(detail);
  }

  return {
    source: SOURCE_ORIGIN,
    fetchedAt: new Date().toISOString(),
    count: articles.length,
    articles,
  };
}

async function main() {
  try {
    const snap = await fetchJournalSnapshot();
    writeFileSync(JOURNAL_CACHE, JSON.stringify(snap, null, 2) + '\n');
    console.log(`[journal] snapshot written: ${snap.count} published articles from ${snap.source}`);
  } catch (err) {
    // Fail the build (non-zero) rather than publishing empty or stale-silent
    // journal output. The previous snapshot (if any) is left untouched for
    // inspection but is NOT used to publish.
    console.error(`[journal] FETCH FAILED: ${err.message}`);
    if (existsSync(JOURNAL_CACHE)) {
      const prev = JSON.parse(readFileSync(JOURNAL_CACHE, 'utf8'));
      console.error(`[journal] existing snapshot kept for reference (${prev.count} articles from ${prev.fetchedAt}) but build will abort.`);
    }
    console.error('[journal] fix connectivity to the public site, then re-run the build.');
    process.exit(1);
  }
}

// Run when invoked directly (node build/fetch-journal.mjs).
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
