import {
  NOTION_API_KEY,
  NOTION_JOURNAL_DB_ID,
  PUBLISHED_STATUS,
  notionFetch,
  propsToItem,
  blocksToHtml,
} from './_notion.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!NOTION_API_KEY || !NOTION_JOURNAL_DB_ID) {
    console.error('Missing Notion env vars');
    return res.status(500).json({ error: 'Server not configured' });
  }

  const slug = String(req.query.slug || '').trim();
  if (!slug) {
    return res.status(400).json({ error: 'Slug required' });
  }

  try {
    const queryRes = await notionFetch(`/databases/${NOTION_JOURNAL_DB_ID}/query`, {
      method: 'POST',
      body: JSON.stringify({
        filter: {
          and: [
            { property: 'Status', status: { equals: PUBLISHED_STATUS } },
            { property: 'Slug', rich_text: { equals: slug } },
          ],
        },
        page_size: 1,
      }),
    });

    if (!queryRes.ok) {
      const errText = await queryRes.text();
      console.error('Notion detail query error:', queryRes.status, errText);
      return res.status(502).json({ error: 'Failed to fetch' });
    }

    const queryData = await queryRes.json();
    const page = (queryData.results || [])[0];
    if (!page) {
      return res.status(404).json({ error: 'Article not found' });
    }

    const blocksRes = await notionFetch(`/blocks/${page.id}/children?page_size=100`, {
      method: 'GET',
    });

    if (!blocksRes.ok) {
      const errText = await blocksRes.text();
      console.error('Notion blocks error:', blocksRes.status, errText);
      return res.status(502).json({ error: 'Failed to fetch content' });
    }

    const blocksData = await blocksRes.json();
    const html = blocksToHtml(blocksData.results || []);

    const item = { ...propsToItem(page), html };

    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    return res.status(200).json(item);
  } catch (err) {
    console.error('Journal detail exception:', err);
    return res.status(500).json({ error: 'Internal error' });
  }
}
