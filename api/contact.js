import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const TYPE_LABELS = {
  advisory: '顧問コンサルティング',
  project: 'プロジェクト型支援',
  spot: 'スポット相談',
  other: 'まだ決まっていない / その他',
};

const escapeHtml = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const body = req.body || {};
  const name = String(body.name || '').trim();
  const company = String(body.company || '').trim();
  const email = String(body.email || '').trim();
  const phone = String(body.phone || '').trim();
  const type = String(body.type || '').trim();
  const budget = String(body.budget || '').trim();
  const message = String(body.message || '').trim();

  const errors = {};
  if (!name) errors.name = 'お名前が空です';
  if (!email) errors.email = 'メールアドレスが空です';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'メールアドレス形式が不正です';
  if (!type) errors.type = 'ご相談内容が選択されていません';
  if (!message) errors.message = '本文が空です';
  else if (message.length < 20) errors.message = '本文が短すぎます';
  if (message.length > 5000) errors.message = '本文が長すぎます（5000文字以内）';

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ ok: false, errors });
  }

  const typeLabel = TYPE_LABELS[type] || type;

  const html = `<div style="font-family:'Hiragino Kaku Gothic ProN','Yu Gothic',sans-serif;line-height:1.7;color:#1a1a1a;max-width:600px">
  <h2 style="font-size:18px;border-bottom:2px solid #c2a370;padding-bottom:8px;margin:0 0 24px">お問い合わせを受け取りました</h2>
  <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
    <tr><td style="padding:8px 0;width:120px;color:#888;font-size:13px;vertical-align:top">ご担当者様</td><td style="padding:8px 0">${escapeHtml(name)}</td></tr>
    <tr><td style="padding:8px 0;color:#888;font-size:13px;vertical-align:top">会社名 / 屋号</td><td style="padding:8px 0">${company ? escapeHtml(company) : '<span style="color:#bbb">（記載なし）</span>'}</td></tr>
    <tr><td style="padding:8px 0;color:#888;font-size:13px;vertical-align:top">メール</td><td style="padding:8px 0"><a href="mailto:${escapeHtml(email)}" style="color:#1a1a1a">${escapeHtml(email)}</a></td></tr>
    <tr><td style="padding:8px 0;color:#888;font-size:13px;vertical-align:top">電話</td><td style="padding:8px 0">${phone ? escapeHtml(phone) : '<span style="color:#bbb">（記載なし）</span>'}</td></tr>
    <tr><td style="padding:8px 0;color:#888;font-size:13px;vertical-align:top">ご相談内容</td><td style="padding:8px 0">${escapeHtml(typeLabel)}</td></tr>
    <tr><td style="padding:8px 0;color:#888;font-size:13px;vertical-align:top">想定ご予算</td><td style="padding:8px 0">${budget ? escapeHtml(budget) : '<span style="color:#bbb">（記載なし）</span>'}</td></tr>
  </table>
  <h3 style="font-size:14px;color:#888;margin:0 0 8px">ご相談内容の詳細</h3>
  <div style="background:#f9f8f5;padding:20px;border-left:3px solid #c2a370;white-space:pre-wrap">${escapeHtml(message)}</div>
  <p style="font-size:12px;color:#aaa;margin-top:32px">tomosu-inc.com の問い合わせフォームより</p>
</div>`;

  const text = `TOMOSU. お問い合わせ

ご担当者様: ${name}
会社名 / 屋号: ${company || '（記載なし）'}
メール: ${email}
電話: ${phone || '（記載なし）'}
ご相談内容: ${typeLabel}
想定ご予算: ${budget || '（記載なし）'}

ご相談内容の詳細:
${message}

---
tomosu-inc.com の問い合わせフォームより`;

  try {
    const { data, error } = await resend.emails.send({
      from: '"TOMOSU." <info@tomosu-inc.com>',
      to: ['tomosu.official@gmail.com'],
      replyTo: email,
      subject: `[TOMOSU. お問い合わせ] ${name} 様より`,
      html,
      text,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ ok: false, error: 'メール送信に失敗しました。時間をおいて再度お試しください。' });
    }

    return res.status(200).json({ ok: true, id: data?.id });
  } catch (err) {
    console.error('Send exception:', err);
    return res.status(500).json({ ok: false, error: 'メール送信中にエラーが発生しました。時間をおいて再度お試しください。' });
  }
}
