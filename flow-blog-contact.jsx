const FLOW = [
  { num: '01', title: '初回ヒアリング', desc: '現状・課題・目指す姿を、じっくり伺います。押し売りは一切ありません。', meta: '60 min.', free: true },
  { num: '02', title: '現状分析・簡易レポート', desc: 'ヒアリングをもとに、現状整理と論点を簡易レポートで可視化します。', meta: '約1週間' },
  { num: '03', title: '提案・見積', desc: '最適な支援レイヤー（顧問 / プロジェクト / スポット）をご提案します。', meta: '提案面談' },
  { num: '04', title: '契約・キックオフ', desc: '合意後に契約。初月のゴール設定とロードマップを明確化します。', meta: 'Kickoff' },
  { num: '05', title: '月次 / 週次で伴走支援', desc: '定例で論点整理・実行・振り返り。孤独な意思決定を、伴走で支えます。', meta: 'Ongoing' },
];

const Flow = () => (
  <section id="flow" className="flow">
    <div className="flow-inner">
      <div style={{ marginBottom: 120, maxWidth: 680 }}>
        <span className="section-number">VI. — Flow</span>
        <h2 className="sec-title" style={{ marginTop: 32 }}>まずは、<br/>話を聞かせてください。</h2>
        <p style={{ fontFamily: 'var(--serif-jp)', fontWeight: 300, fontSize: 16, lineHeight: 2.3, letterSpacing: '0.08em', color: 'var(--ink-soft)', marginTop: 48, maxWidth: 540 }}>
          初回ヒアリングは無料60分。合わないと判断すれば、<br/>正直にそう申し上げます。
        </p>
      </div>
      {FLOW.map((s, i) => (
        <div className="flow-row" key={i}>
          <div className="flow-num">{s.num}</div>
          <div>
            <h3 className="flow-title">{s.title}</h3>
            <p className="flow-desc">{s.desc}</p>
          </div>
          <div className="flow-meta">
            {s.meta}
            {s.free && <span className="free">Free</span>}
          </div>
        </div>
      ))}
    </div>
  </section>
);

const POSTS = [
  { date: '2026.04.12', cat: 'Column', title: '経営者は「考える」だけでは救われない。現場で回す視点の必要性。' },
  { date: '2026.03.28', cat: 'Case Study', title: '地域飲食店のブランド再構築——三ヶ月で客単価が変わった話。' },
  { date: '2026.03.15', cat: 'News', title: '安中・霧積ブルワリーの業務支援を継続しています。' },
  { date: '2026.02.20', cat: 'Column', title: '月次顧問という関係性の、本当の価値について。' },
];

const Blog = () => (
  <section id="journal" className="blog">
    <div className="blog-inner">
      <div className="blog-head-row">
        <div>
          <span className="section-number">VII. — Journal</span>
          <h2 className="sec-title" style={{ marginTop: 32 }}>経営の現場から、<br/>灯りになる言葉を。</h2>
        </div>
        <a className="text-link" onClick={(e) => e.preventDefault()}>すべての記事を見る</a>
      </div>
      <div className="blog-list">
        {POSTS.map((p, i) => (
          <div className="blog-row" key={i}>
            <div className="blog-date">{p.date}</div>
            <div className="blog-cat">{p.cat}</div>
            <div className="blog-title">{p.title}</div>
            <div className="blog-more">Read →</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Contact = () => {
  const [form, setForm] = React.useState({ name:'', company:'', email:'', phone:'', type:'', budget:'', message:'', agree: false });
  const [errors, setErrors] = React.useState({});
  const [submitting, setSubmitting] = React.useState(false);
  const [done, setDone] = React.useState(false);

  const set = (k) => (e) => {
    const v = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm({ ...form, [k]: v });
    if (errors[k]) setErrors({ ...errors, [k]: null });
  };

  const submit = (ev) => {
    ev.preventDefault();
    const e = {};
    if (!form.name.trim()) e.name = 'ご担当者様のお名前をご入力ください';
    if (!form.email.trim()) e.email = 'メールアドレスをご入力ください';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'メールアドレスの形式をご確認ください';
    if (!form.type) e.type = 'ご相談内容をお選びください';
    if (!form.message.trim()) e.message = 'ご相談内容をご入力ください';
    else if (form.message.trim().length < 20) e.message = 'できるだけ具体的にお聞かせください（20文字以上）';
    if (!form.agree) e.agree = 'プライバシーポリシーへのご同意が必要です';
    setErrors(e);
    if (Object.keys(e).length) return;
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setDone(true); }, 800);
  };

  return (
    <section id="contact" className="contact">
      <div className="contact-inner">
        <div className="contact-head">
          <span className="section-number">VIII. — Contact</span>
          <h2 className="contact-title" style={{ marginTop: 32 }}>最初の一歩は、<br/>六十分の対話から。</h2>
          <p className="contact-lede">
            初回ヒアリングは無料です。「まだ課題がはっきりしていない」段階でも構いません。
            現状を整理し、TOMOSU. がお役に立てるか・立てないかを、フラットに考えるところから始めましょう。
          </p>
          <div className="contact-photo photo-slot">
            <img src="assets/contact/contact-dialogue.jpg" alt="初回ヒアリングの対話風景" className="photo-slot-img"/>
          </div>
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            <div className="info-row">
              <span className="k">Email</span>
              <span className="v"><a href="mailto:tomosu.official@gmail.com">tomosu.official@gmail.com</a></span>
            </div>
            <div className="info-row">
              <span className="k">Base</span>
              <span className="v">群馬県中心に関東全域</span>
            </div>
            <div className="info-row">
              <span className="k">Area</span>
              <span className="v">オンライン全国対応</span>
            </div>
            <div className="info-row">
              <span className="k">Reply</span>
              <span className="v">原則、二営業日以内にご返信</span>
            </div>
          </div>

          <div>
            {done ? (
              <div className="form-success">
                <div className="rule"></div>
                <h3>お問い合わせ、確かに承りました。</h3>
                <p>
                  内容を拝読のうえ、原則二営業日以内に<br/>
                  tomosu.official@gmail.com よりご返信いたします。<br/>
                  灯りを灯す準備を、こちらで整えてお待ちしております。
                </p>
              </div>
            ) : (
              <form className="form" onSubmit={submit} noValidate>
                <div className="form-row-2">
                  <div className={`form-field ${errors.name ? 'error' : ''}`}>
                    <div className="form-label"><span className="jp">ご担当者様</span><span className="req">REQUIRED</span></div>
                    <input className="form-input" value={form.name} onChange={set('name')} placeholder="山田 太郎"/>
                    {errors.name && <div className="form-err">{errors.name}</div>}
                  </div>
                  <div className="form-field">
                    <div className="form-label"><span className="jp">会社名 / 屋号</span><span className="opt">OPTIONAL</span></div>
                    <input className="form-input" value={form.company} onChange={set('company')} placeholder="株式会社 ◯◯"/>
                  </div>
                </div>
                <div className="form-row-2">
                  <div className={`form-field ${errors.email ? 'error' : ''}`}>
                    <div className="form-label"><span className="jp">メールアドレス</span><span className="req">REQUIRED</span></div>
                    <input type="email" className="form-input" value={form.email} onChange={set('email')} placeholder="name@example.com"/>
                    {errors.email && <div className="form-err">{errors.email}</div>}
                  </div>
                  <div className="form-field">
                    <div className="form-label"><span className="jp">電話番号</span><span className="opt">OPTIONAL</span></div>
                    <input className="form-input" value={form.phone} onChange={set('phone')} placeholder="090-1234-5678"/>
                  </div>
                </div>
                <div className="form-row-2">
                  <div className={`form-field ${errors.type ? 'error' : ''}`}>
                    <div className="form-label"><span className="jp">ご相談内容</span><span className="req">REQUIRED</span></div>
                    <select className="form-select" value={form.type} onChange={set('type')}>
                      <option value="">お選びください</option>
                      <option value="advisory">顧問コンサルティング</option>
                      <option value="project">プロジェクト型支援</option>
                      <option value="spot">スポット相談</option>
                      <option value="other">まだ決まっていない / その他</option>
                    </select>
                    {errors.type && <div className="form-err">{errors.type}</div>}
                  </div>
                  <div className="form-field">
                    <div className="form-label"><span className="jp">想定ご予算</span><span className="opt">OPTIONAL</span></div>
                    <select className="form-select" value={form.budget} onChange={set('budget')}>
                      <option value="">お選びください</option>
                      <option>〜10万円</option>
                      <option>10〜30万円</option>
                      <option>30〜100万円</option>
                      <option>100万円〜</option>
                      <option>相談して決めたい</option>
                    </select>
                  </div>
                </div>
                <div className={`form-field ${errors.message ? 'error' : ''}`}>
                  <div className="form-label"><span className="jp">ご相談内容の詳細</span><span className="req">REQUIRED</span></div>
                  <textarea className="form-textarea" value={form.message} onChange={set('message')} placeholder="現状・課題・目指している状態などを、わかる範囲でご記入ください。"/>
                  {errors.message && <div className="form-err">{errors.message}</div>}
                </div>
                <label className="form-agree">
                  <input type="checkbox" checked={form.agree} onChange={set('agree')}/>
                  <span>
                    <a onClick={(e) => e.preventDefault()}>プライバシーポリシー</a>にご同意のうえ、送信します。
                    {errors.agree && <div className="form-err" style={{ marginTop: 6 }}>{errors.agree}</div>}
                  </span>
                </label>
                <div className="form-submit-wrap">
                  <button type="submit" className="form-submit" disabled={submitting}>
                    {submitting ? '送信中 ...' : '初回無料ヒアリングを申し込む'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="footer">
    <div className="footer-inner">
      <div className="footer-top">
        <div>
          <div className="footer-brand">
            <img src="assets/logo-light.png" alt="TOMOSU." className="footer-logo-img"/>
          </div>
          <p className="footer-tag">
            地域ビジネス支援コンサルタント。<br/>
            「経営者を、ひとりにしない」を掲げ、<br/>
            群馬を拠点に全国へ。
          </p>
        </div>
        <div>
          <h5>Navigation</h5>
          <ul className="footer-list">
            {NAV_ITEMS.slice(0, 4).map(n => (
              <li key={n.id}><a onClick={scrollToId(n.id)}>{n.label} &nbsp;— &nbsp;{n.jp}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h5>Contact</h5>
          <ul className="footer-list">
            <li><a href="mailto:tomosu.official@gmail.com">tomosu.official@gmail.com</a></li>
            <li>群馬県中心に関東全域</li>
            <li>オンライン全国対応</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div>© 2026 Tomosu.</div>
        <div>Takashi Ouchi — Founder</div>
      </div>
    </div>
  </footer>
);

Object.assign(window, { Flow, Blog, Contact, Footer });
