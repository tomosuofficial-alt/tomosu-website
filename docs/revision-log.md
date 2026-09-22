# 修正ログ

## 2026-09-12 モーション調整（hero 光削除＋ホイール慣性＋パララックス）

Kinfolk 志向でスクロール体験をリッチ化。hero 写真の shine/sweep/brightness 演出を
完全削除（static caption gradient は保持）。マウスホイールのみ穏やかな慣性/減速を
native scroll 位置で実装（deltaMode 正規化・最大 lag clamp・touch/keyboard/ctrl ズーム/
横 wheel/入れ子スクロール・.clients-marquee は非介入・native scroll/pointerdown/key で
同期・reduced-motion と設定切替で OFF・listener/rAF cleanup）。hero 写真に小幅パララックス
（transform のみ、baseline scale で overscan）。既存 reveal と opacity 競合なし。
`build/motion-check.mjs` を追加し `npm run verify` に接続。cache 48。

## 2026-09-12 Kinfolk-inspired エディトリアル別案（白×墨）

inquiry プレビューを白〜薄生成り＋墨色主体の雑誌的レイアウトへ変更（前版 v46 は
兄弟 `tomosu-inquiry-v46-snapshot-20260912` に保全）。主に `inquiry.css` と
`inquiry-home.jsx`。Hero を二分割から中央組みの大きな明朝 H1＋簡潔な墨色 CTA（初期
画面から可視）＋縦に贅沢なワイド実写真へ。緑系のセクション背景を白/生成り＋細罫線に
整理、セクション見出しを中央セリフ化、余白を拡大。CTA は墨色ボタン／下線で明快に維持。
ロゴ・日本語本文・料金・実績は保持、参考ブランドの画像/文言は不使用。SEO/SSR/
hydration/ドラッグ Works/reduced-motion は保持。cache 47。

## 2026-09-12 Clients マーカーのドラッグ操作 + hydration-check が終了しない不具合

支援先マーキー（`.clients-marquee`）に PC マウスドラッグ操作を追加（自動スクロール
維持・drag 中停止・閾値6pxで click 抑止・pointer capture・touch は pan-y）。実装に
永続 `requestAnimationFrame` ループを使ったところ、`build/hydration-check.mjs` の
rAF スタブ（`setTimeout` で無限に再スケジュール）が Node のイベントループを生かし
続け、`npm run verify` が終了しなくなった（root cause）。対策として rAF スタブを
`unref()` 付き＋ `cancelAnimationFrame` 対応にし、検査終了時に残タイマー破棄・
`window.close()`・`process.exit()` で確実に終了させた。あわせて Works の pointer
ハンドラを `pointerId` で限定し、`lostpointercapture` で hover/focus の pause を
再評価するよう修正。

## 2026-09-12 SEO 対応・ビルド時 SSR 事前生成

ブラウザ Babel を廃止し、esbuild による JSX 変換 + React 18.3.1 SSR で `index.html`
の `#root` に実本文を事前生成（ハイドレーションで既存動作を維持）。全ページに
canonical と 群馬・高崎/中小企業・飲食店経営支援を自然に含む title/description/OGP。
公開 Journal API から一覧・記事個別ページ（固有 title/canonical/本文）を事前生成、
robots.txt / sitemap.xml を実在 URL のみで生成。下部画像を lazy/async 化。キャッシュ
番号を全 5 HTML で `?v=47` に統一。`npm run build` / `verify` と検証（静的・ハイド
レーション・ローカルルート）を追加。詳細は `docs/seo-build.md`。Vercel 実ルーティング
とデプロイ設定は未検証（デプロイ禁止のため）。push/deploy/実フォーム送信は未実施。

## 2026-09-12 プレビュー作業領域の永続化

`git worktree move` で `/tmp` から別ボリュームへの移動を試み、Cross-device linkで失敗。通常の`mv`で移動し、`git worktree repair`で参照を修復した。以後、独立worktreeは最初から永続化先の同一ボリューム内に作成する。
