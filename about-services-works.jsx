const CAREER = [
  { year: '2004', role: '栄養士', company: 'Registered Dietitian', note: '栄養士免許取得' },
  { year: '2007', role: '営業職', company: 'Sales' },
  { year: '2010', role: '調理責任者', company: 'Head of Kitchen Operations' },
  { year: '2013', role: '代表取締役', company: "TIN'z (3 Brands)" },
  { year: '2025', role: '代表', company: 'Tomosu.', note: '地域ビジネス支援コンサルタントとして独立' },
];

const About = () => (
  <section id="about" className="about">
    <div className="about-grid">
      <div className="about-portrait">
        <img src="assets/profile.png" alt="大内 嵩志 Takashi Ouchi" className="about-portrait-img"/>
        <div className="label">Takashi Ouchi</div>
      </div>
      <div className="about-content">
        <div className="about-kicker">II. — About</div>
        <h2 className="about-title">
          現場で、経営のすべてを背負った<br/>
          人間だからこそ、伴走できる。
        </h2>
        <div className="about-name">
          大内 嵩志
          <span className="en">Takashi Ouchi</span>
        </div>
        <div className="about-role">Founder / Consultant</div>
        <div className="about-body">
          <p>
            群馬県高崎市を拠点に、中小企業・スタートアップ・地方自治体・個人事業主・
            大企業の部門責任者まで、「経営の灯り」を必要とする方に伴走しています。
          </p>
          <p>
            栄養士としての食の素養、営業職での提案力、調理責任者としての現場統率、
            そしてTIN'z 代表としての9年・3ブランド経営。
            机上で語られる戦略も、現場で磨かれた運営も、どちらも実体験から語れます。
          </p>
        </div>
      </div>
    </div>

    <div className="about-scenes">
      <div className="about-scene photo-slot">
        <img src="assets/about/about-onsite-01-kitchen.jpg" alt="厨房・カウンターに立つ大内嵩志" className="photo-slot-img"/>
      </div>
      <div className="about-scene photo-slot">
        <img src="assets/about/about-onsite-02-dialogue.jpg" alt="経営者との対話風景" className="photo-slot-img"/>
      </div>
    </div>

    <div className="career">
      <div className="career-title">
        <span className="en">Career</span>
        経歴
      </div>
      <div className="career-list">
        {CAREER.map((c, i) => (
          <div className="career-row" key={i}>
            <div className="career-year">{c.year}</div>
            <div className="career-body">
              <span className="role">{c.role}</span>
              <span className="company">{c.company}</span>
              {c.note && <span className="career-note">{c.note}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const SERVICES = [
  {
    num: 'i.',
    title: '顧問コンサルティング',
    en: 'Advisory Retainer',
    price: '¥150,000', priceSuffix: '/月 〜',
    note: '最低契約期間 6ヶ月',
    desc: '月次・週次で経営の隣に立ち、意思決定と実行をともに。孤独な判断を、灯りのあるものに変える基幹サービスです。',
    items: ['経営戦略', 'ブランド構築', 'SNS戦略', '人事・組織', 'IT・DX'],
    photoImg: 'assets/services/service-01-advisory-desk.jpg',
  },
  {
    num: 'ii.',
    title: 'プロジェクト型支援',
    en: 'Project-based',
    price: '個別見積', priceSuffix: '',
    note: 'スコープに応じてご提案',
    desc: '単発の制作・構築プロジェクト。「作る」だけで終わらせず、「回る」ところまで一貫して設計します。',
    items: ['HP制作', 'ブランドデザイン一式', '地域コンテンツ制作', '業務マニュアル整備'],
    photoImg: 'assets/services/service-02-project-collateral.jpg',
  },
  {
    num: 'iii.',
    title: 'スポット相談',
    en: 'Spot Consultation',
    price: '¥10,000', priceSuffix: '/1時間 〜',
    note: '単発・オンライン可',
    desc: '「まず話を聞いてほしい」方に。現状整理と、次の一歩のための視点提供を行います。',
    items: ['現状整理', '意思決定サポート', '壁打ち', '専門家紹介'],
    photoImg: 'assets/services/service-03-spot-cafe.jpg',
  },
];

const Services = () => (
  <>
    <section id="services" className="services">
      <div className="sec-header" style={{ maxWidth: 1320, margin: '0 auto 40px', padding: '0 64px' }}>
        <span className="section-number num">III. — Services</span>
        <h2 className="sec-title" style={{ marginTop: 32 }}>経営の距離に合わせて、<br/>三つの伴走のかたち。</h2>
      </div>
      {SERVICES.map((s, i) => (
        <div className="svc-row" key={i}>
          <div className="svc-left">
            <div className="svc-photo photo-slot">
              <img src={s.photoImg} alt={s.title} className="photo-slot-img"/>
            </div>
            <span className="svc-num">{s.num}</span>
            <h3 className="svc-title">{s.title}</h3>
            <span className="svc-title-en">{s.en}</span>
            <div className="svc-price">
              {s.price}<span className="small">{s.priceSuffix}</span>
            </div>
            <div className="svc-note">{s.note}</div>
          </div>
          <div className="svc-right">
            <p className="svc-desc">{s.desc}</p>
            <ul className="svc-items">
              {s.items.map((it, j) => (
                <li key={j}>
                  <span>{it}</span>
                  <span className="idx">{String(j + 1).padStart(2, '0')}</span>
                </li>
              ))}
            </ul>
            <a className="cta" onClick={scrollToId('contact')}>このサービスについて相談する</a>
          </div>
        </div>
      ))}
    </section>

    <section className="diff">
      <div className="container-narrow">
        <div className="diff-rule"></div>
        <div className="diff-text">
          戦略だけ・制作だけ・運営だけで、止まらない。<br/>
          <span className="em">考える・作る・回す</span>を、一人で完結できる。<br/>
          十年の飲食経営実体験から生まれた、伴走力です。
        </div>
      </div>
    </section>
  </>
);

const CLIENTS = [
  { name: 'Niki ★ DINER', en: "Niki Diner", cat: 'Diner', logo: 'assets/clients/niki-diner.png', company: '株式会社二期', shotImg: 'assets/clients/shots/niki-diner.jpg' },
  { name: 'Bistro knocks', en: 'Bistro knocks', cat: 'Bistro', logo: 'assets/clients/bistro-knocks.png', company: '株式会社DELIENTZ', shotImg: 'assets/clients/shots/bistro-knocks.jpg' },
  { name: 'LOCAL POWER', en: 'Local Power', cat: 'Regional Brand', isEn: true, logo: 'assets/clients/localpower.png', company: 'LOCAL POWER株式会社', shotImg: 'assets/clients/shots/localpower.jpg' },
  { name: "M'z cafe", en: "M'z Cafe", cat: 'Cafe', isEn: true, logo: 'assets/clients/mz-cafe.png', company: '株式会社サンフラワー', shotImg: 'assets/clients/shots/mz-cafe.jpg' },
  { name: 'よいどころ千福', en: 'Yoidokoro Senpuku', cat: 'Izakaya', logo: 'assets/clients/senpuku.png', company: '株式会社千福', shotImg: 'assets/clients/shots/senpuku.jpg' },
];
const SAMPLES = [
  { title: 'ブランドデザイン一式', en: 'Brand Identity Suite', img: 'assets/works/brand-identity.jpg', desc: '名刺・ショップカード・メニュー・POP・ステッカー・Tシャツまで、ブランドの表現を一貫した手触りで構築します。' },
  { title: 'コーポレートサイト制作', en: 'Corporate Web', img: 'assets/works/corporate-web.jpg', desc: '伝えるべき価値を、読みやすく、静かに届ける設計。立ち上げ後の運用まで伴走します。' },
  { title: '地域コンテンツ制作', en: 'Regional Content', img: 'assets/works/regional-content.jpg', desc: '地域の事業者と共につくる、写真・映像・文章。観光と生業の両輪を照らす企画を。' },
];
const COMMISSIONS = [
  { title: '弁当製造・調達運営', body: '地域イベント向け大量製造オペレーションを設計・統括。', photoImg: 'assets/commission/commission-01-bento.jpg' },
  { title: 'イベント運営支援', body: '企画から当日運営までを一貫で伴走。地域事業者との連携設計を含む。', photoImg: 'assets/commission/commission-02-event.jpg' },
  { title: '霧積ブルワリー レストラン部門立ち上げ伴走', body: 'レシピマニュアルの制作、およびオペレーションの提案を単発案件として実施。', photoImg: 'assets/commission/commission-03-kirizumi-brewery.jpg' },
  { title: '地域飲食店 新規立ち上げ', body: 'コンセプト設計・物件・メニュー・採用・オペレーションまでを現場統括。', photoImg: 'assets/commission/commission-04-new-shop.jpg' },
];

const Works = () => {
  const [tab, setTab] = React.useState('clients');
  return (
    <section id="works" className="works">
      <div className="works-head">
        <span className="section-number">IV. — Works</span>
        <h2 className="sec-title" style={{ marginTop: 32 }}>灯してきた、<br/>地域の事業たち。</h2>
      </div>
      <div className="works-tabs-wrap">
        <div className="works-tabs">
          <button className={`works-tab ${tab === 'clients' ? 'active' : ''}`} onClick={() => setTab('clients')}>支援先 <span className="en">Clients</span></button>
          <button className={`works-tab ${tab === 'samples' ? 'active' : ''}`} onClick={() => setTab('samples')}>制作物 <span className="en">Creative</span></button>
          <button className={`works-tab ${tab === 'commission' ? 'active' : ''}`} onClick={() => setTab('commission')}>業務委託 <span className="en">Commission</span></button>
        </div>
      </div>
      <div className="works-panel">
        {tab === 'clients' && (
          <>
            <div className="clients-marquee">
              <div className="clients-track">
                {[...CLIENTS, ...CLIENTS].map((c, i) => (
                  <div className="client-chip" key={i}>
                    <div className="client-chip-logo">
                      {c.logo ? (
                        <img src={c.logo} alt={c.name} className="client-chip-img"/>
                      ) : (
                        <span className="client-chip-name">{c.name}</span>
                      )}
                    </div>
                    <div className="client-chip-shot photo-slot">
                      <img src={c.shotImg} alt={`${c.name} 店舗`} className="photo-slot-img"/>
                    </div>
                    <div className="client-chip-store">{c.name}</div>
                    <div className="client-chip-company">{c.company} 様</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        {tab === 'samples' && (
          <div className="samples">
            {SAMPLES.map((s, i) => (
              <div className="sample" key={i}>
                <div className="sample-img">
                  {s.img && <img src={s.img} alt={s.title} className="sample-img-pic"/>}
                </div>
                <div className="sample-info">
                  <span className="sample-idx">Work No. {String(i + 1).padStart(2, '0')}</span>
                  <h3 className="sample-title">
                    {s.title}
                    <span className="en">{s.en}</span>
                  </h3>
                  <p className="sample-desc">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        {tab === 'commission' && (
          <div className="commissions">
            {COMMISSIONS.map((c, i) => (
              <div className="comm-row" key={i}>
                <div className="comm-photo photo-slot">
                  <img src={c.photoImg} alt={c.title} className="photo-slot-img"/>
                </div>
                <div className="comm-idx">No. {String(i + 1).padStart(2, '0')}</div>
                <div className="comm-title">{c.title}</div>
                <div className="comm-body">{c.body}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const VOICES = [
  {
    quote: 'チェックシステムをWebアプリで作ってもらってから、現場の確認作業が劇的に変わりました。月一の定例では在庫管理や人事評価制度の導入まで相談できて、「こういうの欲しかった」がそのまま形になる。開発から保守まで一貫して見てもらえる安心感は大きいです。',
    name: 'よいどころ千福',
    company: '株式会社千福',
    role: '代表取締役',
    cat: 'Izakaya',
    img: 'assets/voice/senpuku.jpg',
  },
  {
    quote: 'メニューや販促物のデザインはほぼお任せしていて、週一で店長代理として現場にも入ってもらっています。デザインだけ・相談だけじゃなく、実際にホールに立つ人が店舗運営の顧問をしてくれる。この距離感は他にないと思います。',
    name: 'Niki★DINER',
    company: '株式会社二期',
    role: '飲食事業部統括',
    cat: 'Diner',
    img: 'assets/voice/niki-diner.jpg',
  },
  {
    quote: '弁当製造の調理を任せられるだけでも助かっているのに、大型イベントの出店までサポートしてもらっています。先日の肉フェスでは二日間で約300万円の売上を達成。調理スタッフの配置からオペレーション、レイアウトまで一緒に設計してもらえたからこその結果です。',
    name: 'Bistro knocks',
    company: '株式会社DELIENTZ',
    role: '代表取締役',
    cat: 'Bistro',
    img: 'assets/voice/bistro-knocks.jpg',
  },
  {
    quote: 'SNS運用を丸ごとお願いしていて、月2回は店舗に来てスタッフと直接やり取りしてくれる。現場の空気を知っている人が発信するから、投稿に嘘がない。お客様からも「Instagramを見て来ました」という声が増えました。',
    name: "M'z cafe",
    company: '株式会社サンフラワー',
    role: '飲食事業部統括',
    cat: 'Cafe',
    img: 'assets/voice/mz-cafe.jpg',
  },
  {
    quote: 'Webサイト制作のサポートに加えて、地域活性化につながる地図の制作やデータ入力まで柔軟に対応してくれる。こちらの「やりたい」をそのまま受け止めて、実務レベルで手を動かしてくれるのが本当にありがたいです。',
    name: 'LOCAL POWER',
    company: 'LOCAL POWER株式会社',
    role: '代表取締役',
    cat: 'Regional Brand',
    img: 'assets/voice/localpower.jpg',
  },
];

const Voice = () => (
  <section id="voice" className="voice">
    <div className="voice-header">
      <span className="section-number">V. — Voice</span>
      <div className="voice-rule"></div>
      <h2 className="voice-heading">伴走してきた、<br/>経営者の声。</h2>
    </div>
    <div className="voice-list">
      {VOICES.map((v, i) => (
        <div className="voice-card" key={i}>
          <div className={`voice-card-photo ${v.img ? '' : 'photo-slot photo-slot--square'}`} role="img" aria-label={`${v.name} の顔写真 / 店舗写真（予定地）`}>
            {v.img
              ? <img src={v.img} alt={v.name} className="voice-card-img"/>
              : <span className="photo-slot-label">顔写真 / 店舗</span>
            }
          </div>
          <div className="voice-card-body">
            <div className="voice-card-cat">{v.cat}</div>
            <blockquote className="voice-card-quote">{v.quote}</blockquote>
            <div className="voice-card-meta">
              <span className="voice-card-name">{v.name}</span>
              <span className="voice-card-role">{v.company}　{v.role}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
    <div className="voice-note">
      ※ 掲載はご本人の許可をいただいた上で行っております。
    </div>
  </section>
);

Object.assign(window, { About, Services, Works, Voice });
