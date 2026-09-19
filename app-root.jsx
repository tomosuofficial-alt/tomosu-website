/* App root — composes every section into the single-page layout.
   Extracted from the former inline <script type="text/babel"> in index.html so
   that the exact same tree can be (a) prerendered to static HTML at build time
   (React SSR) and (b) hydrated in the browser. The scroll/observer effects below
   run only on the client after hydration; they are inert during SSR. */
const App = () => {
  React.useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.hero-title, .hero-sub, .sec-title, .svc-row, .client-cell, .sample, .comm-row, .flow-row, .blog-row, .tinz, .career-row, .phil-vision, .phil-body p, .diff-text, .voice-card, .about-portrait, .about-content, .form-field, .aud-kicker, .aud-item, .aud-close, .contact-assure').forEach(el => {
      el.classList.add('fade-up');
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  // Cash App-style background switch: when Philosophy is in view,
  // body transitions to dark; otherwise paper.
  React.useEffect(() => {
    const onScroll = () => {
      const phil = document.getElementById('philosophy');
      if (!phil) return;
      const r = phil.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      // Trigger early so body color is already dark when Philosophy enters.
      const inDark = r.top < vh * 0.8 && r.bottom > vh * 0.2;
      document.body.classList.toggle('bg-dark', inDark);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Staged reveal for the inquiry-specific sections. Kept separate from the
  // (inquiry-neutralised) `.fade-up` observer above via its own `.reveal` class.
  // The class is added by JS only when motion is allowed, so no-JS and
  // prefers-reduced-motion visitors always see the content immediately.
  React.useEffect(() => {
    const mq = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq && mq.matches) return;
    const targets = document.querySelectorAll(
      '.inquiry-concerns > div:first-child, .inquiry-concern-list > a, .inquiry-bridge > div, .inquiry-faq > div:first-child, .inquiry-faq details, .inquiry-page .services .sec-header, .inquiry-page .voice-header'
    );
    if (!targets.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('reveal-in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    targets.forEach((el) => { el.classList.add('reveal'); io.observe(el); });
    return () => io.disconnect();
  }, []);

  // Small hero-photo parallax (transform only; no light/brightness). Amplitude is
  // derived from the actual photo height and kept under the scale overscan so the
  // translate never reveals the container edges (SCALE 1.06 ⇒ ~3% each side;
  // amplitude uses 2.5% of height). Live-toggles with prefers-reduced-motion.
  React.useEffect(() => {
    const mq = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
    const fig = document.querySelector('.inquiry-hero-photo');
    const img = fig && fig.querySelector('img');
    if (!img) return;
    const SCALE = 1.06;
    let raf = 0, ticking = false, on = !(mq && mq.matches);
    const update = () => {
      ticking = false;
      if (!on) return;
      const r = fig.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      const amp = r.height * 0.025;                               // < overscan (3%)
      const p = Math.max(-1, Math.min(1, (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2)));
      img.style.transform = `translate3d(0, ${(-p * amp).toFixed(2)}px, 0) scale(${SCALE})`;
    };
    const onScroll = () => { if (on && !ticking) { ticking = true; raf = requestAnimationFrame(update); } };
    const onMq = () => {
      on = !mq.matches;
      if (!on) { if (raf) cancelAnimationFrame(raf); raf = 0; ticking = false; img.style.transform = ''; }
      else { img.style.willChange = 'transform'; update(); }
    };
    if (on) { img.style.willChange = 'transform'; update(); }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    if (mq && mq.addEventListener) mq.addEventListener('change', onMq);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (mq && mq.removeEventListener) mq.removeEventListener('change', onMq);
      if (raf) cancelAnimationFrame(raf);
      img.style.transform = '';
      img.style.willChange = '';
    };
  }, []);

  // Gentle mouse-wheel inertia over the native document scroll. Only plain
  // vertical wheel is smoothed; touch/keyboard/ctrl-zoom/horizontal wheel and
  // nested scrollables (textarea/select/overflow/.clients-marquee) are left to
  // the browser. Native scroll / anchor / pointerdown / key resync to avoid
  // jumps. Disabled under prefers-reduced-motion (live toggle honoured).
  React.useEffect(() => {
    const mq = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
    const docEl = document.documentElement;
    let on = !(mq && mq.matches);
    let target = window.scrollY, current = window.scrollY;
    let raf = 0, animating = false, programmatic = false;

    const maxScroll = () => Math.max(0, docEl.scrollHeight - window.innerHeight);
    const clamp = (v) => Math.max(0, Math.min(maxScroll(), v));
    const isNestedScrollable = (start) => {
      let el = start;
      while (el && el !== document.body && el !== docEl) {
        if (el.nodeType === 1) {
          const tag = el.tagName;
          if (tag === 'TEXTAREA' || tag === 'SELECT') return true;
          if (el.classList && el.classList.contains('clients-marquee')) return true;
          const oy = getComputedStyle(el).overflowY;
          if ((oy === 'auto' || oy === 'scroll') && el.scrollHeight > el.clientHeight) return true;
        }
        el = el.parentNode;
      }
      return false;
    };
    let lastT = 0;
    const stop = () => { if (raf) cancelAnimationFrame(raf); raf = 0; animating = false; lastT = 0; };
    const syncStop = () => { target = current = window.scrollY; stop(); };
    // Explicit instant jump so we don't double-interpolate with the CSS
    // `html { scroll-behavior:smooth }` on the page.
    const scrollToY = (y) => { programmatic = true; window.scrollTo({ top: Math.round(y), behavior: 'instant' }); };
    const step = (t) => {
      if (!lastT) lastT = t;
      const dt = Math.min(50, t - lastT); lastT = t;
      const diff = target - current;
      if (Math.abs(diff) < 0.5) { current = target; scrollToY(current); animating = false; raf = 0; lastT = 0; return; }
      current += diff * (1 - Math.pow(1 - 0.14, dt / 16.67));    // frame-rate independent easing (60/120Hz same speed)
      scrollToY(current);
      raf = requestAnimationFrame(step);
    };
    const ensure = () => { if (!animating) { animating = true; lastT = 0; raf = requestAnimationFrame(step); } };

    // Anything that isn't a plain, cancelable vertical wheel is handed back to
    // the browser — and any existing inertia is synced/stopped so it can't fight.
    const disqualified = (e) =>
      !on || e.defaultPrevented || !e.cancelable || e.ctrlKey || e.metaKey || e.shiftKey ||
      e.deltaY === 0 || Math.abs(e.deltaX) > Math.abs(e.deltaY) || isNestedScrollable(e.target);
    const onWheel = (e) => {
      if (disqualified(e)) { syncStop(); return; }
      let dy = e.deltaY;
      if (e.deltaMode === 1) dy *= 16;                           // lines → px
      else if (e.deltaMode === 2) dy *= (window.innerHeight || 800); // pages → px
      e.preventDefault();
      if (!animating) { current = target = window.scrollY; }     // resync base at gesture start
      target = clamp(target + dy);
      const maxLag = (window.innerHeight || 800) * 1.5;          // clamp how far behind we lag
      if (Math.abs(target - window.scrollY) > maxLag) target = clamp(window.scrollY + Math.sign(target - window.scrollY) * maxLag);
      ensure();
    };
    const onScroll = () => { if (programmatic) { programmatic = false; return; } syncStop(); }; // native scroll → sync
    const onInterrupt = () => syncStop();                        // pointerdown / keydown → sync
    const onMq = () => { on = !mq.matches; if (!on) syncStop(); };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pointerdown', onInterrupt, { passive: true });
    window.addEventListener('keydown', onInterrupt, { passive: true });
    if (mq && mq.addEventListener) mq.addEventListener('change', onMq);

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointerdown', onInterrupt);
      window.removeEventListener('keydown', onInterrupt);
      if (mq && mq.removeEventListener) mq.removeEventListener('change', onMq);
      stop();
    };
  }, []);
  return (<>
    <InquiryNav/>
    <main>
      <InquiryHero/>
      <InquiryConcerns/>
      <Services/>
      <Voice/>
      <InquiryBridge/>
      <About/>
      <Flow/>
      <InquiryFaq/>
      <Contact/>
      <Works/>
      <Blog/>
    </main>
    <Footer/>
    <InquirySticky/>
  </>);
};

Object.assign(window, { App });
