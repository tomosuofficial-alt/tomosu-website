export const NOTION_API_KEY = process.env.NOTION_API_KEY;
export const NOTION_JOURNAL_DB_ID = process.env.NOTION_JOURNAL_DB_ID;
export const NOTION_VERSION = '2022-06-28';
export const PUBLISHED_STATUS = process.env.NOTION_JOURNAL_PUBLISHED_STATUS || '完了';

export const getTitle = (p) => p?.title?.map((t) => t.plain_text).join('') || '';
export const getRichText = (p) => p?.rich_text?.map((t) => t.plain_text).join('') || '';
export const getSelect = (p) => p?.select?.name || '';
export const getDate = (p) => p?.date?.start || null;
export const getUrl = (p) => p?.url || null;

export const propsToItem = (page) => {
  const props = page.properties || {};
  return {
    id: page.id,
    slug: getRichText(props['Slug']),
    title: getTitle(props['Title']),
    category: getSelect(props['Category']),
    publishedDate: getDate(props['Published Date']),
    excerpt: getRichText(props['Excerpt']),
    author: getRichText(props['Author']),
    coverImageUrl: getUrl(props['Cover Image URL']),
  };
};

export const notionFetch = async (path, init = {}) => {
  return fetch(`https://api.notion.com/v1${path}`, {
    ...init,
    headers: {
      'Authorization': `Bearer ${NOTION_API_KEY}`,
      'Content-Type': 'application/json',
      'Notion-Version': NOTION_VERSION,
      ...(init.headers || {}),
    },
  });
};

const escapeHtml = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

const renderRichText = (rt = []) =>
  rt
    .map((t) => {
      let text = escapeHtml(t.plain_text);
      const ann = t.annotations || {};
      if (ann.bold) text = `<strong>${text}</strong>`;
      if (ann.italic) text = `<em>${text}</em>`;
      if (ann.code) text = `<code>${text}</code>`;
      if (ann.strikethrough) text = `<s>${text}</s>`;
      if (ann.underline) text = `<u>${text}</u>`;
      if (t.href) {
        text = `<a href="${escapeHtml(t.href)}" target="_blank" rel="noopener noreferrer">${text}</a>`;
      }
      return text;
    })
    .join('');

export const blocksToHtml = (blocks) => {
  let html = '';
  let inList = null;

  const closeList = () => {
    if (inList) {
      html += `</${inList}>`;
      inList = null;
    }
  };

  for (const b of blocks) {
    const type = b.type;
    const data = b[type] || {};
    const rt = data.rich_text || [];
    const text = renderRichText(rt);

    if (type === 'bulleted_list_item' || type === 'numbered_list_item') {
      const tag = type === 'numbered_list_item' ? 'ol' : 'ul';
      if (inList !== tag) {
        closeList();
        html += `<${tag}>`;
        inList = tag;
      }
      html += `<li>${text}</li>`;
      continue;
    }

    closeList();

    switch (type) {
      case 'paragraph':
        html += text ? `<p>${text}</p>` : '<p>&nbsp;</p>';
        break;
      case 'heading_1':
      case 'heading_2':
        html += `<h2>${text}</h2>`;
        break;
      case 'heading_3':
        html += `<h3>${text}</h3>`;
        break;
      case 'quote':
        html += `<blockquote>${text}</blockquote>`;
        break;
      case 'divider':
        html += '<hr/>';
        break;
      case 'image': {
        const file = data.file || data.external;
        const url = file?.url;
        const caption = renderRichText(data.caption || []);
        if (url) {
          html += `<img src="${escapeHtml(url)}" alt=""/>`;
          if (caption) {
            html += `<p style="text-align:center;color:var(--ink-mute,#7a7874);font-size:13px;margin-top:-16px;">${caption}</p>`;
          }
        }
        break;
      }
      case 'code': {
        const code = data.rich_text?.map((t) => t.plain_text).join('') || '';
        html += `<pre><code>${escapeHtml(code)}</code></pre>`;
        break;
      }
      default:
        if (text) html += `<p>${text}</p>`;
    }
  }

  closeList();
  return html;
};
