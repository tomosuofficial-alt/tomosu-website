/* Local development auto-reload.
   Polls the styles + JSX + current page every 1.5s and triggers a hard
   reload when any signature changes. Disabled outside localhost so the
   script becomes a no-op on tomosu-inc.com. */
(() => {
  const host = location.hostname;
  const isLocal = host === 'localhost' || host === '127.0.0.1' || host === '0.0.0.0' || host === '';
  if (!isLocal) return;

  const targets = new Set([
    '/styles.css',
    '/nav-hero.jsx',
    '/about-services-works.jsx',
    '/flow-blog-contact.jsx',
    '/dev-reload.js',
  ]);

  // Also watch the current page so HTML edits trigger a reload.
  const path = location.pathname || '/';
  if (path === '/' || path === '') {
    targets.add('/index.html');
  } else if (/^\/journal\/[^/]+/.test(path)) {
    targets.add('/journal-detail.html');
  } else if (path === '/journal' || path === '/journal/') {
    targets.add('/journal.html');
  } else if (path === '/privacy' || path === '/privacy/') {
    targets.add('/privacy.html');
  } else if (path === '/tokutei' || path === '/tokutei/') {
    targets.add('/tokutei.html');
  }

  const last = {};

  const sigOf = async (url) => {
    try {
      const r = await fetch(url + (url.includes('?') ? '&' : '?') + '_t=' + Date.now(), { cache: 'no-store' });
      if (!r.ok) return null;
      const text = await r.text();
      let h = 5381;
      for (let i = 0; i < text.length; i++) {
        h = ((h * 33) ^ text.charCodeAt(i)) | 0;
      }
      return h + ':' + text.length;
    } catch {
      return null;
    }
  };

  const check = async () => {
    for (const url of targets) {
      const sig = await sigOf(url);
      if (sig === null) continue;
      if (last[url] !== undefined && last[url] !== sig) {
        console.log('[dev-reload] changed:', url);
        location.reload();
        return;
      }
      last[url] = sig;
    }
  };

  check();
  setInterval(check, 1500);
  console.log('[dev-reload] watching', [...targets]);
})();
