// Journal HTML rendering — the build-time equivalents of the client scripts in
// journal.html / journal-detail.html. Output is DOM-equivalent to the client
// markup; lines are assembled without trailing whitespace so the prerendered
// journal.html passes `git diff --check`.

export const escapeHtml = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

export const formatDate = (iso) => {
  if (!iso) return '— —';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
};

// Matches the client-built list item in journal.html (DOM-equivalent).
export function renderListItems(articles) {
  const items = articles
    .filter((i) => i.slug)
    .map((i) =>
      [
        `          <a class="journal-item" href="/journal/${escapeHtml(i.slug)}">`,
        `            <div class="journal-item-date">${escapeHtml(formatDate(i.publishedDate))}</div>`,
        `            <div class="journal-item-cat">${escapeHtml(i.category || '')}</div>`,
        `            <div class="journal-item-title">${escapeHtml(i.title)}</div>`,
        `            <div class="journal-item-more">Read →</div>`,
        `          </a>`,
      ].join('\n')
    )
    .join('\n');
  return '\n' + items + '\n        ';
}

// Matches the client-built article body in journal-detail.html (DOM-equivalent).
export function renderDetailInner(item) {
  const lines = [
    `          <div class="legal-kicker">— Journal</div>`,
    `          <div class="journal-detail-meta">`,
    `            <span class="date">${escapeHtml(formatDate(item.publishedDate))}</span>`,
    `            <span class="cat">${escapeHtml(item.category || '')}</span>`,
    `          </div>`,
    `          <h1 class="journal-detail-title">${escapeHtml(item.title)}</h1>`,
  ];
  if (item.author) lines.push(`          <div class="journal-detail-author">${escapeHtml(item.author)}</div>`);
  lines.push(
    `          <div class="journal-detail-body">${item.html || ''}</div>`,
    `          <div class="journal-detail-back">`,
    `            <a href="/journal">← 記事一覧へ</a>`,
    `            <a href="/">Tomosu. Home →</a>`,
    `          </div>`
  );
  return '\n' + lines.join('\n') + '\n        ';
}
