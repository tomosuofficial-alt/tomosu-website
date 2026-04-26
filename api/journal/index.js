import {
  NOTION_API_KEY,
  NOTION_JOURNAL_DB_ID,
  PUBLISHED_STATUS,
  notionFetch,
  propsToItem,
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

  const limit = Math.min(parseInt(req.query.limit, 10) || 20, 50);

  try {
    const r = await notionFetch(`/databases/${NOTION_JOURNAL_DB_ID}/query`, {
      method: 'POST',
      body: JSON.stringify({
        filter: {
          property: 'Status',
          status: { equals: PUBLISHED_STATUS },
        },
        sorts: [{ property: 'Published Date', direction: 'descending' }],
        page_size: limit,
      }),
    });

    if (!r.ok) {
      const errText = await r.text();
      console.error('Notion list error:', r.status, errText);
      return res.status(502).json({ error: 'Failed to fetch journal' });
    }

    const data = await r.json();
    const items = (data.results || []).map(propsToItem).filter((i) => i.slug);

    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    return res.status(200).json({ items });
  } catch (err) {
    console.error('Journal list exception:', err);
    return res.status(500).json({ error: 'Internal error' });
  }
}
