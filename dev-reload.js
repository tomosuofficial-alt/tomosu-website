/* Local development auto-reload.
   Polls the styles + JSX + current page every 1.5s and triggers a reload
   when any signature changes. Disabled outside localhost so the script
   becomes a no-op on tomosu-inc.com. Preserves scroll position across
   reloads via sessionStorage so the visitor stays where they were. */
(() => {
  const host = location.hostname;
  const isLocal = host === 'localhost' || host === '127.0.0.1' || host === '0.0.0.0' || host === '';
  if (!isLocal) return;

  // -- Restore scroll position saved before the previous dev-reload
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  const savedY = sessionStorage.getItem('dev-reload-scrollY');
  if (savedY !== null) {
    sessionStorage.removeItem('dev-reload-scrollY');
    const y = parseInt(savedY, 10);
    if (Number.isFinite(y)) {
      window.scrollTo(0, y);
      requestAnimationFrame(() => window.scrollTo(0, y));
      setTimeout(() => window.scrollTo(0, y), 50);
    }
  }

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
        sessionStorage.setItem('dev-reload-scrollY', String(window.scrollY));
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
