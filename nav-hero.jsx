const NAV_ITEMS = [
  { id: 'philosophy', label: 'Philosophy', jp: '理念' },
  { id: 'about', label: 'About', jp: '代表' },
  { id: 'services', label: 'Services', jp: '支援' },
  { id: 'works', label: 'Works', jp: '実績' },
  { id: 'flow', label: 'Flow', jp: '流れ' },
  { id: 'journal', label: 'Journal', jp: '発信' },
  { id: 'contact', label: 'Contact', jp: 'お問い合わせ' },
];

const scrollToId = (id) => (e) => {
  if (e) e.preventDefault();
  const el = document.getElementById(id);
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - 20;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
};

/* MorphLogo + opening sequence:
   1. Hero text is hidden (body.opening-active) and the huge logo holds 700ms
   2. Logo docks into the header over 1400ms
   3. body.opening-revealed → hero text fades in with stagger (~1.5s)
   4. Once text is settled, scroll lock is released — user takes over
*/
const MorphLogo = () => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
    const setP = (eased) => {
      if (ref.current) ref.current.style.setProperty('--p', eased);
    };

    const HOLD_MS = 700;
    const ANIM_MS = 1400;
    const TEXT_REVEAL_MS = 1500; // wait for the stagger to settle before unlocking

    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.body.classList.add('opening-active');
    window.scrollTo(0, 0);

    const startAt = performance.now() + HOLD_MS;
    let raf = 0;
    let unlockTimer = 0;

    const unlock = () => {
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
    };

    const tick = (now) => {
      const elapsed = now - startAt;
      if (elapsed < 0) { raf = requestAnimationFrame(tick); return; }
      const t = Math.min(1, elapsed / ANIM_MS);
      setP(easeInOut(t));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setP(1);
        document.body.classList.remove('opening-active');
        document.body.classList.add('opening-revealed');
        unlockTimer = setTimeout(unlock, TEXT_REVEAL_MS);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(unlockTimer);
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
      document.body.classList.remove('opening-active');
      document.body.classList.remove('opening-revealed');
    };
  }, []);
  return (
    <a
      ref={ref}
      className="morph-logo"
      onClick={scrollToId('hero')}
      aria-label="TOMOSU."
      style={{ ['--p']: 0 }}
    >
      <img src="assets/logo-dark.png" alt="TOMOSU." className="morph-logo-img"/>
    </a>
  );
};

const Nav = () => {
  const [scrolled, setScrolled] = React.useState(false);
  const [active, setActive] = React.useState('hero');
  const [onDark, setOnDark] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = ['hero', ...NAV_ITEMS.map(i => i.id)];
      let current = 'hero';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= 120) current = id;
      }
      setActive(current);
      // dark sections: philosophy
      const phil = document.getElementById('philosophy');
      if (phil) {
        const r = phil.getBoundingClientRect();
        setOnDark(r.top <= 60 && r.bottom > 60);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Body scroll lock + Escape-to-close while the mobile menu is open
  React.useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  // Safety: if viewport is resized above the mobile breakpoint, close menu
  React.useEffect(() => {
    const onResize = () => { if (window.innerWidth > 980 && menuOpen) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [menuOpen]);

  const goto = (id) => (e) => {
    if (e) e.preventDefault();
    setMenuOpen(false);
    // slight delay so the overlay fade-out isn't competing with the scroll
    setTimeout(() => scrollToId(id)(), 120);
  };

  return (
    <>
      <header className={`nav ${scrolled ? 'scrolled' : ''} ${onDark ? 'on-dark' : ''} ${menuOpen ? 'menu-open' : ''}`}>
        <div className="nav-inner">
          {/* Logo slot — reserves space in the header; the actual logo is
              a separately-positioned fixed element (MorphLogo) that docks here. */}
          <span className="nav-logo-slot" aria-hidden="true"></span>
          <nav className="nav-links">
            {NAV_ITEMS.map(n => (
              <a key={n.id} href={`#${n.id}`} className={active === n.id ? 'active' : ''} onClick={scrollToId(n.id)}>{n.label}</a>
            ))}
          </nav>
          <a className="nav-cta" href="#contact" onClick={scrollToId('contact')}>初回無料ヒアリング</a>
          <button
            type="button"
            className={`nav-burger ${menuOpen ? 'is-open' : ''}`}
            aria-label={menuOpen ? 'メニューを閉じる' : 'メニューを開く'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(v => !v)}
          >
            <span className="nav-burger-line"></span>
            <span className="nav-burger-line"></span>
            <span className="nav-burger-line"></span>
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`mobile-menu ${menuOpen ? 'is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="サイトナビゲーション"
        aria-hidden={!menuOpen}
      >
        <div className="mobile-menu-inner">
          <div className="mobile-menu-head">
            <span className="en-label">Navigation — 目次</span>
          </div>
          <nav className="mobile-menu-list">
            {NAV_ITEMS.map((n, i) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className={`mobile-menu-item ${active === n.id ? 'active' : ''}`}
                style={{ transitionDelay: menuOpen ? `${0.08 + i * 0.05}s` : '0s' }}
                onClick={goto(n.id)}
              >
                <span className="num">{String(i + 1).padStart(2, '0')}</span>
                <span className="en">{n.label}</span>
                <span className="jp">{n.jp}</span>
              </a>
            ))}
          </nav>
          <div className="mobile-menu-foot">
            <a className="mobile-menu-cta" href="#contact" onClick={goto('contact')}>
              初回無料ヒアリングを予約する
              <span className="en">Book a free first session</span>
            </a>
            <div className="mobile-menu-meta">
              <span>Tomosu. — Business Consulting, Gunma</span>
              <span>Takashi Ouchi · Founder</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Hero = () => (
  <section id="hero" className="hero">
    <div className="hero-inner">
      <div className="hero-meta">
        <span className="rule"></span>
        <span>Tomosu. — Business Consulting, Gunma</span>
      </div>
      <h1 className="hero-title">経営者を、<br/>ひとりにしない。</h1>
      <p className="hero-sub">地域の事業に、次の一歩を照らす灯りを。</p>
      <a className="cta" onClick={scrollToId('contact')}>初回無料ヒアリングを予約する</a>
      <div className="hero-foot">
        <div className="left">
          Takashi Ouchi<br/>
          Founder &nbsp;·&nbsp; Consultant
        </div>
        <div className="right">
          Based in Gunma — Kanto Region<br/>
          Online &nbsp;·&nbsp; Nationwide
        </div>
      </div>
    </div>
  </section>
);

/* Philosophy photo: scroll-driven illumination.
   --lit goes 0 (closed/dark shop) → 1 (warm noren glow on) as the photo
   moves up through the viewport. */
const Philosophy = () => {
  const photoRef = React.useRef(null);
  React.useEffect(() => {
    const update = () => {
      const el = photoRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      // Start lighting when the photo's top crosses ~85% from the top
      // of the viewport; fully lit when it reaches ~30%.
      const start = vh * 0.85;
      const end = vh * 0.30;
      const raw = (start - rect.top) / (start - end);
      const p = Math.max(0, Math.min(1, raw));
      // Smoothstep — gentle ease-in-out
      const eased = p * p * (3 - 2 * p);
      el.style.setProperty('--lit', eased);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);
  return (
    <section id="philosophy" className="philosophy">
      <div className="phil-inner">
        <span className="phil-num">I. — Philosophy</span>
        <div className="phil-rule"></div>
        <h2 className="phil-vision">
          経営者の一歩を、<br/>灯りに変えるために。
        </h2>
        <div className="phil-body">
          <p>
            TOMOSU.（灯す）という屋号には、<br/>
            経営という暗い道を歩む方の、次の一歩を照らす存在でありたい——<br/>
            その願いを込めています。
          </p>
          <p>
            机上の戦略屋でも、請負の制作屋でもなく、<br/>
            経営者の隣で、確かな灯りとして在り続けること。<br/>
            それが、私たちの仕事の芯です。
          </p>
        </div>
        <div ref={photoRef} className="phil-photo phil-photo--lit photo-slot photo-slot--dark" style={{ ['--lit']: 0 }}>
          <img src="assets/scenes/philosophy-night-shop.png?v=2" alt="夜の群馬の裏道に灯る小さな店" className="photo-slot-img"/>
          <div className="phil-photo__dim" aria-hidden="true"></div>
          <div className="phil-photo__lights" aria-hidden="true"></div>
          <div className="phil-photo__glow" aria-hidden="true"></div>
        </div>
        <div className="phil-sign">— Tomosu.</div>
      </div>
    </section>
  );
};

Object.assign(window, { Nav, MorphLogo, Hero, Philosophy, scrollToId, NAV_ITEMS });
