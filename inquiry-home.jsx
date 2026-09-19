const InquiryNav = () => {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const close = e => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);
  // Sticky nav gains a quiet glassy background/shadow once the page is scrolled.
  // Height is unchanged, so there is no layout shift.
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <header className={`inquiry-nav ${scrolled ? 'scrolled' : ''}`}>
    <a href="#hero" aria-label="TOMOSU. ホーム"><img src="/assets/logo-dark.png" alt="TOMOSU."/></a>
    <button className="inquiry-menu" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="inquiry-links">{open ? '閉じる ×' : 'メニュー ＋'}</button>
    <nav id="inquiry-links" className={open ? 'open' : ''} aria-label="メインナビゲーション">
      {[["services", "支援内容・料金"], ["voice", "お客様の声"], ["about", "私たちについて"], ["flow", "ご相談の流れ"]].map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>)}
      <a className="inquiry-button small" href="#contact" onClick={() => setOpen(false)}>初回無料相談 <span>↗</span></a>
    </nav>
  </header>;
};

const InquiryHero = () => <section id="hero" className="inquiry-hero">
  <div className="inquiry-hero-head">
    <p className="inquiry-eyebrow">群馬の中小企業・飲食店の経営者へ</p>
    <h1>その悩みを、<br/>次の<span>一歩</span>に。</h1>
    <p className="inquiry-hero-lede">集客も、現場も、経営の判断も。<br/>ひとりで抱えず、一緒に整理しませんか。</p>
    <p className="inquiry-hero-desc">TOMOSU.は、考える・作る・回すまで伴走する地域ビジネスの相談相手です。</p>
    <div className="inquiry-hero-cta">
      <a className="inquiry-button" href="#contact">まずは無料で相談する <span>↗</span></a>
      <p className="inquiry-micro">初回60分無料 · オンライン全国対応</p>
    </div>
    <a className="inquiry-textlink" href="#services">支援内容と料金を見てみる ↓</a>
  </div>
  <figure className="inquiry-hero-photo">
    <img src="/assets/about/about-onsite-02-dialogue.webp" alt="事業の現場で向き合い、対話する風景" fetchpriority="high" decoding="async"/>
    <figcaption><span>Business Consulting — Gunma</span><strong>経営者を、ひとりにしない。</strong></figcaption>
  </figure>
</section>;

const InquiryConcerns = () => <section id="concerns" className="inquiry-concerns">
  <div><p className="inquiry-eyebrow">WHERE TO START</p><h2>「何から変えよう」を、<br/>一緒に見つける。</h2><p>課題がまとまっていなくても、大丈夫。<br/>いま気になっていることからお聞かせください。</p></div>
  <div className="inquiry-concern-list">{[
    ['01', '集客の次の一手が、見えない。', 'SNS・Web・ブランドづくりを、事業全体から整理。'],
    ['02', '現場に追われ、経営に向き合えない。', '業務の仕組みづくりから、人材育成まで。'],
    ['03', '大切な判断を、ひとりで抱えている。', '目の前の課題を言葉にし、優先順位を一緒に考える。']
  ].map(([num, title, desc]) => <a href="#services" key={num}><span>{num}</span><div><h3>{title}</h3><p>{desc}</p></div><span>↗</span></a>)}</div>
</section>;

const InquiryBridge = () => <section className="inquiry-bridge"><div><p className="inquiry-eyebrow">LET’S TALK</p><h2>まだ、答えがなくても。<br/>話すことから始めましょう。</h2><p>初回60分で、現状と気になっていることを一緒に整理します。</p></div><div><a className="inquiry-button" href="#contact">無料相談を申し込む <span>↗</span></a><p className="inquiry-micro">無理な勧誘はありません。</p></div></section>;

const InquiryFaq = () => <section className="inquiry-faq" id="faq"><div><p className="inquiry-eyebrow">BEFORE WE MEET</p><h2>相談する前に。</h2></div><div>{[
  ['何を相談するか、まだ決まっていません。', '「集客が気になる」「現場が回らない」といった、いま感じていることをお話しください。現状を整理するところからご一緒します。'],
  ['初回相談は無料ですか？', '初回60分のヒアリングは無料です。有料のスポット相談は、個別の課題について現状整理や意思決定の助言を行うサービスです。継続的な支援や制作が必要な場合は、内容とお見積もりをご提案し、合意後に契約となります。'],
  ['群馬以外からも相談できますか？', 'はい。対面は群馬県を中心に関東全域、オンラインでは全国のご相談に対応しています。'],
  ['単発の相談や、制作だけでも依頼できますか？', 'スポット相談（1時間10,000円〜）や、Web制作・ブランドデザインなどのプロジェクト型支援もあります。まずはご希望をお聞かせください。']
].map(([q,a]) => <details key={q}><summary>{q}<span aria-hidden="true">＋</span></summary><p>{a}</p></details>)}</div></section>;

const InquirySticky = () => <a className="inquiry-sticky" href="#contact">初回60分無料 <span>相談してみる ↗</span></a>;
Object.assign(window, { InquiryNav, InquiryHero, InquiryConcerns, InquiryBridge, InquiryFaq, InquirySticky });
