# SEO 対応・静的ビルド手順

このプレビューに導入した「ビルド時 JSX 変換 + React SSR 事前生成」と、SEO 周り
（メタ / canonical / robots / sitemap / Journal 事前生成）の運用メモ。

## 何が変わったか

- **ブラウザ Babel を廃止**。`index.html` から `@babel/standalone` と
  `<script type="text/babel">` を除去し、ビルド時に JSX を変換した単一バンドル
  `/assets/app.<hash>.js` を読み込む方式へ。React / ReactDOM 18.3.1 は従来どおり
  CDN（本番ビルド）を使用。
- **初期 HTML に実本文を事前生成**。同じコンポーネント群を Node 上で React SSR し、
  `index.html` の `#root` に見出し・本文・リンクを埋め込む。ブラウザ側はそれを
  `hydrateRoot` でハイドレートするだけなので、メニュー / フォーム / スクロール演出
  など既存の React 動作はそのまま維持される。
- **Journal を公開 API から事前生成**（資格情報不要）。公開 GET で取得した記事から
  一覧（`journal.html`）と記事個別ページ（`journal/<slug>.html`：固有 title /
  description / canonical / OGP / 本文）を生成。未知 slug はフォールバックの
  `journal-detail.html`（クライアント取得 → soft 404 + noindex）へ。
- **robots.txt / sitemap.xml** を実在 URL のみで生成。sitemap の記事 URL は公開 API
  のスナップショットから自動生成。
- 下部画像に `loading="lazy" decoding="async"`。ヒーロー（LCP）と上部ロゴは即時読み込み
  のまま。CSS の `object-fit` レイアウトを崩さないため width/height は付与していない。
- CSS / dev-reload のキャッシュ番号を全 5 HTML で `?v=52` に統一。
- 「灯す」アクセント（Bridge の芯＋halo）はユーザー要望により撤去し、v49 相当の
  白墨レイアウトへ戻した（スクロール慣性・parallax・drag・voice 修正は保持）。
- モーション: hero 写真は光/sweep なし＋小幅スクロールパララックス（transform のみ）。
  マウスホイールに穏やかな慣性（native scroll 位置で実装、touch/keyboard/ctrl ズーム/
  横 wheel/入れ子スクロール・marquee は非介入、native scroll/pointerdown/key で同期、
  reduced-motion で OFF）。検証は `npm run check:motion`（`verify` に接続）。

## コマンド

```sh
npm install          # 初回のみ（esbuild / react / react-dom / jsdom を取得）
npm run build        # prebuild で公開 Journal を取得 → SSR 事前生成 + バンドル + sitemap/robots
npm run verify       # build + 静的検査 + ハイドレーション検査 + ローカルルート検査
```

個別に実行する場合:

| script | 内容 |
| --- | --- |
| `npm run fetch:journal` | 公開 API から `build/journal-cache.json` を更新（失敗時は既存を保持し空にしない） |
| `npm run build` | バンドル生成 → `index.html` / `journal.html` / `journal/<slug>.html` / `sitemap.xml` / `robots.txt` を出力 |
| `npm run check` | 事前生成物・SEO タグ・`?v=52` 一致・sitemap/robots・記事ページを静的検査 |
| `npm run check:motion` | ホイール慣性のガードレール（reduced-motion/ctrl/入れ子/通常/中断）を検査 |
| `npm run check:hydration` | jsdom + React dev ビルドでハイドレーション不整合が無いか、クリックで反応するかを検査 |
| `npm run check:preview` | vercel.json の rewrite を適用したローカルサーバで全ルートを GET 検査 |

## 記事を追加/更新/削除したとき（運用変更）

- **公開記事を追加・更新・削除したら `npm run build` を再実行する。** 事前生成は
  ビルド時スナップショットに基づくため、再ビルドしない限り本番へ反映されない。
- `vercel.json` は汎用 rewrite `/journal/:slug → /journal/:slug.html` のみ。**新しい
  slug は再ビルドで生成される `journal/<slug>.html` に自動で対応**（vercel.json の
  手動追記は不要）。
- sitemap の記事 URL とその `lastmod`（＝実 Published Date）も自動更新される。
- 生成した slug ページは `build/journal-manifest.json` で管理し、次回ビルドでは
  **前回自分が生成したファイルだけを削除**して再生成する（`journal/` 内の手書き
  ファイルは削除しない）。
- **取得失敗時はビルドを中断する（非ゼロ終了）。** 空の記事や古いスナップショット
  を黙って公開しない。ネットワークを回復してから再ビルドする。

## ソース構成

- `nav-hero.jsx` / `about-services-works.jsx` / `flow-blog-contact.jsx` /
  `inquiry-home.jsx`：セクション定義（従来どおり `window` グローバルに関数を公開）。
- `app-root.jsx`：`App` を組み立て `window.App` に公開（旧 `index.html` インライン）。
- `build/config.mjs`：origin・対象ファイル・`ASSET_VERSION` など共有設定。
- `build/prerender.mjs`：上記を連結 → esbuild で JSX 変換 → `vm` で評価 → SSR。
- `build/build.mjs`：バンドル生成・`index.html` 注入・Journal 生成・sitemap/robots。
- `build/fetch-journal.mjs`：公開 API スナップショット取得（記事の捏造なし）。
- `build/journal-render.mjs`：一覧 / 本文 HTML（クライアント出力と一致）。
- `build/{check,hydration-check,serve-check}.mjs`：検証。

## Vercel

- `vercel.json` に `buildCommand: "npm run build"`、`outputDirectory: "."` を設定。
  デプロイ時に `prebuild`（公開 API 取得）→ ビルドが走り、生成物をそのまま配信する。
- 生成物（`/assets/app.*.js`、`/journal/`、`sitemap.xml`、`robots.txt`）は `.gitignore`
  済み。ビルドで都度再生成される。

## 未検証・注意点

- **Vercel の実ルーティング / ビルド設定はローカル未検証**（デプロイ禁止のため）。
  `check:preview` は vercel.json の rewrite を Node で模擬しているが、`cleanUrls`・
  `outputDirectory: "."` の実挙動・優先順位は実デプロイまたは `vercel build` で要確認。
- 未知記事は汎用 rewrite の宛先ファイルが存在しないため **Vercel が実 HTTP 404 を
  返す**（生成済み記事のみ 200）。フォールバックの `journal-detail.html`（クライアント
  取得 + soft 404 + noindex）はテンプレートとして残置しているが、通常ルートからは
  参照されない。まだビルドに含まれない新記事は、再ビルドまで 404 になる（上記運用参照）。
- ビルドの `prebuild` はビルド時に本番 `tomosu-inc.com` の公開 API へ GET する。
  ネットワーク不可時はスナップショットを空にせず（既存 `build/journal-cache.json` が
  あれば流用、無ければ Journal 事前生成をスキップしてクライアント取得へ縮退）。
- Notion 資格情報・環境変数・`.vercel/project.json` は一切読み書きしていない。
- 実フォーム送信・push・deploy は行っていない。
