# 問い合わせ導線リデザイン・プレビュー引継ぎ

- ブランチ: `feat/inquiry-redesign`。本番未公開、pushなし。
- ユーザーがプレビューを確認し「公開OK」を出すまで本番へ反映しない。
- 基点: ローカル HEAD `7eac92b`。元の未コミット5HTML（Analytics追加、各4行）をコピーして保全した。
- 本番に「シタク」、ローカルHEADに「Training」がある差異は今回の追加ではない。公開前に最新main・本番の内容と照合し、既存の公開内容を失わないよう統合する。
- 変更: 新ヒーロー、日本語ナビ、課題の入口、支援/声の早期表示、中間CTA、FAQ、モバイル固定相談CTA、フォーム案内とアクセシビリティ、キャッシュ/絶対パス修正。
- 検証: JSX構文、diff whitespace、5ページHTTP200、Journal API 200/7件。PC1440/モバイル390表示・メニュー・CTA・FAQは親エージェントがブラウザ確認。実メール送信は行っていない。
- Vercel認証トークン無効のためリモートPreviewは未作成。保護設定は変更していない。
- ローカルURL: http://localhost:8765

## 再起動

このworktreeで、既存リポジトリのdevelopment環境変数を読み込みVercel localを起動する。秘密値を表示・コミットしない。

```sh
node --env-file='../TOMOSU. - 地域ビジネス支援コンサルタント/.vercel/.env.development.local' /Users/takashiouchi/.nvm/versions/node/v22.22.0/bin/vercel dev --local --listen 8765 --yes
```
