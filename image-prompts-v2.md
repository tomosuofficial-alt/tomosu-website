# TOMOSU. v2「夜の灯り」 — 画像生成プロンプト集

GPT-4o(画像生成)/ DALL·E 3 向け。**英語推奨**(色味・構図の精度が高い)。
日本語版も併記。すべて末尾に「共通スタイル」を貼ると一貫性が上がります。

---

## 共通スタイル(全プロンプト末尾に追記)

```
Style: cinematic documentary photography, warm low-key lighting,
film grain (Kodak Portra 400 feel), shallow depth of field, 35mm lens,
soft golden hour or evening lantern glow, deep shadows with amber highlights,
wabi-sabi Japanese aesthetic, restrained and quiet,
no text, no logos, no watermarks,
no people facing camera unless specified.
```

配置先のファイルパスは TOMOSU. v2 のコードに合わせています。
生成画像を該当パスに置けば、自動でページに反映されます。

---

## 1. Philosophy 背景 — 夜の裏路地と灯り
**保存先**: `assets/scenes/philosophy-night-shop.jpg`
**比率**: 16:9(横長)

### EN
```
A quiet narrow alleyway in a small Japanese regional town at night
(Takasaki, Gunma area). A single small restaurant or izakaya with a warm
glowing paper lantern (chōchin) and noren curtain at the entrance.
Wet asphalt reflecting amber light. No people visible, or one silhouette
walking away in the distance. Atmosphere: lonely but warm, like a single
light in the darkness. Deep blacks, amber/orange highlights only from
the lantern. Cinematic, painterly, evocative.
Horizontal 16:9.
```

### JP
```
日本の地方都市(群馬・高崎)の裏路地、夜。狭い路地に提灯と暖簾が灯る
小さな飲食店が一軒だけ。濡れた路面に琥珀色の灯りが反射。人物は不在、
または奥に一人が歩き去る後ろ姿のみ。暗闇に灯る一つの光のような、
静かで温かい雰囲気。黒は深く、光は提灯の暖色のみ。横長16:9。
```

---

## 2. About — 厨房・カウンターの代表
**保存先**: `assets/about/about-onsite-01-kitchen.jpg`
**比率**: 4:3

### EN
```
A Japanese man in his 40s standing behind a small bistro counter,
wearing a dark apron over a black shirt, hands working calmly.
Warm tungsten lighting from above, copper pots and wine glasses softly
catching light in the background. Side profile or three-quarter back view
(face partially obscured or out of focus). Atmosphere: experienced operator,
calm authority, hands-on. Documentary feel, no posing.
4:3.
```

---

## 3. About — 経営者との対話
**保存先**: `assets/about/about-onsite-02-dialogue.jpg`
**比率**: 4:3

### EN
```
Two Japanese men in their 30s-40s sitting across a small wooden table
in a quiet café or office, mid-conversation. Notebooks, a single coffee cup,
soft afternoon window light from the side. Both faces in profile or
three-quarter, blurred slightly to emphasize gesture over identity.
Warm wood tones, restrained palette.
Atmosphere: trusted advisor and owner thinking together.
4:3.
```

---

## 4. Services 01 — Advisory(顧問)
**保存先**: `assets/services/service-01-advisory-desk.jpg`
**比率**: 4:3

### EN
```
Top-down view of a wooden desk in soft evening light. A leather notebook
open with handwritten notes, a fountain pen, a worn paperback on management,
a small ceramic cup of green tea, a single warm desk lamp casting amber glow
on the right edge. Deep shadows, warm tones. No screens.
Quiet, considered, monthly-advisor atmosphere.
4:3.
```

---

## 5. Services 02 — Project(プロジェクト型)
**保存先**: `assets/services/service-02-project-collateral.jpg`
**比率**: 4:3

### EN
```
Flat-lay of restaurant brand collateral: business cards, a folded menu
booklet on textured paper, a stamped paper coaster, a black t-shirt folded,
a sticker sheet, all in muted earthy palette (deep navy, kraft, warm white,
single accent of vermillion). Soft directional lighting, slight shadow.
Editorial photography feel.
4:3.
```

---

## 6. Services 03 — Spot(スポット相談)
**保存先**: `assets/services/service-03-spot-cafe.jpg`
**比率**: 4:3

### EN
```
A quiet corner of a Japanese specialty café in the late afternoon.
A small round wooden table by a window with diffused light, two ceramic
coffee cups, an open notebook, hands of two people gesturing in conversation
(faces out of frame). Warm wood, soft beige walls, plants in shadow.
Calm, unhurried, single-session consultation feel.
4:3.
```

---

## 7. Voice — 経営者の顔写真(5名分、構図統一)
**保存先**: `assets/voice/{name}.jpg`
**比率**: 1:1(正方形 — 円マスクで切り抜かれます)

### 共通テンプレ(EN)
```
Portrait of a Japanese restaurant owner in their 40s, standing in their own
[VENUE], slight smile, three-quarter angle, looking off-camera.
Warm low-key lighting from a paper lantern or window,
soft background bokeh of their actual venue (wood, bottles, kitchen, etc.).
Documentary editorial portrait, no posed studio look.
Same lighting and color treatment across all five portraits for consistency.
1:1 square.
```

### 差し替え

| ファイル名 | [VENUE] |
|---|---|
| `voice/senpuku.jpg` | cozy izakaya with red lanterns and bottle shelves |
| `voice/niki-diner.jpg` | American-style diner counter with chrome and red accents |
| `voice/bistro-knocks.jpg` | small French bistro with chalkboard menu |
| `voice/mz-cafe.jpg` | bright minimal café with plants |
| `voice/localpower.jpg` | small regional office with maps and local products |

> 5枚は同じ会話で連続生成すると色味・トーンが揃います。

---

## 8. Commission — 業務委託シーン(4枚)

### 8-1. 弁当製造
**保存先**: `assets/commission/commission-01-bento.jpg` / 4:3
```
Industrial-scale bento preparation in a commercial kitchen, rows of black
bento boxes being filled with colorful Japanese food, hands working, steam,
warm overhead light. Documentary, top-down or low angle.
4:3.
```

### 8-2. イベント運営
**保存先**: `assets/commission/commission-02-event.jpg` / 4:3
```
Outdoor regional food festival at dusk, food stall with warm lights,
a queue of customers (backs visible), staff working, paper lanterns strung
overhead. Energetic but not chaotic.
4:3.
```

### 8-3. 霧積ブルワリー
**保存先**: `assets/commission/commission-03-kirizumi-brewery.jpg` / 4:3
```
A craft brewery restaurant interior in mountainous Gunma (Annaka),
exposed wooden beams, copper brewing tanks visible through a window,
a chef plating food in the foreground (hands only).
Earthy warm palette.
4:3.
```

### 8-4. 新店立ち上げ
**保存先**: `assets/commission/commission-04-new-shop.jpg` / 4:3
```
A newly-opened small Japanese restaurant on its opening night, exterior
view from across a quiet street, warm light spilling out, a small queue
forming, evening blue hour. Hopeful, beginning-of-something atmosphere.
4:3.
```

---

## 9. Clients shots — 店舗外観/内観(5店舗)
**保存先**: `assets/clients/shots/{name}.jpg`
**比率**: 4:3

> 実店舗の写真があればそちらが理想。生成で代用する場合のみ使用。

### 共通テンプレ(EN)
```
Storefront or interior of a Japanese small business: [TYPE].
Evening or warm afternoon light, signage visible but not readable,
a sense of place and care. Documentary editorial, no people in foreground.
4:3.
```

| ファイル名 | [TYPE] |
|---|---|
| `clients/shots/niki-diner.jpg` | American-Japanese fusion diner with neon star signage |
| `clients/shots/bistro-knocks.jpg` | small French bistro storefront with chalkboard |
| `clients/shots/localpower.jpg` | regional brand showroom with local products on shelves |
| `clients/shots/mz-cafe.jpg` | minimal Japanese café exterior with wooden signage |
| `clients/shots/senpuku.jpg` | traditional izakaya with red lanterns and noren |

---

## 10. Contact — 対話シーン
**保存先**: `assets/contact/contact-dialogue.jpg`
**比率**: 16:7(ワイドレターボックス)

### EN
```
Wide horizontal composition: two people sitting across a wooden table
in a quiet, well-lit space, mid-conversation. Soft natural window light
from the left. Faces blurred or out of frame, focus on hands, notebooks,
a single coffee. Warm minimal palette.
First-meeting, listening atmosphere.
16:7 letterbox wide.
```

---

## 運用のコツ

1. **GPT-4o**(または Sora image)に依頼するとき、各プロンプトの末尾に **共通スタイル** を貼り付ける。
2. **同じセクション(Voice 5枚など)は1つの会話で連続生成** — 色味・粒子感・露出が揃いやすい。
3. **人物の顔**は AI 生成だと不気味の谷に落ちやすいので、**後ろ姿・側面・手元・顔ぼかし** を指示するのが安全。可能なら実写推奨。
4. 生成後はファイル名を上記の保存先パスに合わせて配置すれば、自動で v2 ページに反映されます。
5. 全体トーンは「**夜・暖色・墨・wabi-sabi**」で統一。明るい昼の写真はトーンが浮くので避ける(About 対話シーンを除く)。

---

## チェックリスト(必須12点)

- [ ] `assets/scenes/philosophy-night-shop.jpg`
- [ ] `assets/about/about-onsite-01-kitchen.jpg`
- [ ] `assets/about/about-onsite-02-dialogue.jpg`
- [ ] `assets/services/service-01-advisory-desk.jpg`
- [ ] `assets/services/service-02-project-collateral.jpg`
- [ ] `assets/services/service-03-spot-cafe.jpg`
- [ ] `assets/voice/senpuku.jpg`
- [ ] `assets/voice/niki-diner.jpg`
- [ ] `assets/voice/bistro-knocks.jpg`
- [ ] `assets/voice/mz-cafe.jpg`
- [ ] `assets/voice/localpower.jpg`
- [ ] `assets/contact/contact-dialogue.jpg`

## チェックリスト(推奨)

- [ ] `assets/commission/commission-01-bento.jpg`
- [ ] `assets/commission/commission-02-event.jpg`
- [ ] `assets/commission/commission-03-kirizumi-brewery.jpg`
- [ ] `assets/commission/commission-04-new-shop.jpg`
- [ ] `assets/clients/shots/niki-diner.jpg`
- [ ] `assets/clients/shots/bistro-knocks.jpg`
- [ ] `assets/clients/shots/localpower.jpg`
- [ ] `assets/clients/shots/mz-cafe.jpg`
- [ ] `assets/clients/shots/senpuku.jpg`

---

## セクション IV. Training（研修）— service-04〜06

> **追加日**: 2026-05-02
> **対象セクション**: IV. — Training（現場で動ける人を、社内に育てる。）
> **統一仕様**: 既存 service-01〜03 と完全一致
> - アスペクト比: 4:3
> - スタイルベース: 共通スタイルベース（Hasselblad X2D / Kodak Portra 400 / 5000–5400K）を先頭に貼ること
> - ネガティブプロンプト: 共通ネガティブプロンプトを必ず付加すること
> - TOMOSU. ブランドリタッチ: 色温度 +150K / 彩度 -10% / シャドウ持ち上げ / 粒状感わずか
> - **最終配置は .webp**（生成 .jpg → 変換して `assets/services/service-0X-training-XXX.webp` に配置。JSX 側参照は .webp で固定済み）

---

### 22. Services iv｜Web/SNS 内製化研修 — スタッフがPCで販促物を作る

- **保存先（生成）**: `assets/services/service-04-training-web.jpg`
- **最終配置（webp変換後）**: `assets/services/service-04-training-web.webp`
- **アスペクト比**: 4:3

**シーン意図**:
飲食店の事務スペース（バックヤードの静かな一角）で、スタッフがノートPCに向かいバナーやSNS投稿を制作している。横に立った講師が画面を覗き込みながら指差しで指導している。「外注から内製化へ」という静かな転換の瞬間。顔は見せない。手元・画面・ノートに焦点。

**英語プロンプト本文**:

```
A quiet back-office corner of a small Japanese restaurant or café,
photographed at seated eye level with a slight angle. Scene: a
member of staff in their 20s–30s sits at a simple wooden desk,
facing an open laptop screen. The screen glows with a graphic
design interface — canvas grid, color swatches, a half-finished
banner layout — soft and unreadable, suggested only. The staff
member's hands (five natural fingers each) rest on the keyboard,
one finger gesturing toward the screen. Beside them, a second
person — a trainer or colleague — leans in slightly from the
standing position, one hand pointing calmly at the screen. Both
figures are shown from behind or at a profile angle; no faces
are visible. A printed A4 style guide sheet lies flat on the
desk, handwritten notes in the margin (illegible, natural).
A small ceramic mug beside the laptop, half-full.

Background: a blurred wooden shelf with binders and small plant,
faint warm light from a high window at camera left. The room
has the quiet, purposeful atmosphere of learning in a real workplace.

Light: soft indirect window light from camera left at 5200K,
supplemented by the gentle glow of the laptop screen casting
cool-blue fill on the figures from the front. Warm-cool interplay.
Shadows soft and directional. No overhead fluorescent glare.

Focus plane on the laptop keyboard and the pointing hand.
Background falls to smooth bokeh.
Palette: warm linen, natural oak, muted slate blue from the screen,
soft cream, deep charcoal.
4:3 aspect ratio.
```

**ネガティブプロンプト（共通ネガティブに加えて）**:
```
ADDITIONAL AVOID: corporate stock photo pose, overly bright office
lighting, visible brand logos on laptop, any readable screen content,
excessive cable clutter, fluorescent overhead lighting.
```

---

### 23. Services v｜店長・幹部育成研修 — 数字で語れる店長を育てる

- **保存先（生成）**: `assets/services/service-05-training-leadership.jpg`
- **最終配置（webp変換後）**: `assets/services/service-05-training-leadership.webp`
- **アスペクト比**: 4:3

**シーン意図**:
小さな研修室またはバックオフィスの一角。ホワイトボード（または紙の資料）の前に立った一人が、数字の書かれた図表を指差している。テーブルを挟んで向かい側に一人が座り、手元のノートにメモを取っている。経営数字を「学ぶ」ではなく「語る」ための、緊張感のある静かな対話。顔は見せない。

**英語プロンプト本文**:

```
A small training room or back-office meeting corner in a Japanese
restaurant setting, photographed from a side angle at standing
height. Scene: two figures without visible faces — one person
stands beside a wall-mounted whiteboard or a large sheet of paper
taped to the wall; the other sits at a simple table facing them.

The standing figure (shown from the side or back, five natural
fingers) has one hand pointing at a chart drawn on the whiteboard —
simple bar graphs, numerical figures, profit/loss columns in
natural handwritten marks (not clearly readable, suggestive only).
The seated figure leans slightly forward over an open linen-bound
notebook, pen in hand (five natural fingers), mid-note.

On the table: a folded A4 printout with abstract table layouts
(illegible), a small ceramic cup of tea, a slim ruler.
No technology, no screens — this is analogue thinking.

Room details: a plain beige wall, a small rectangular window
letting in cool afternoon light from the upper right, casting
a clean beam across the whiteboard surface. Simple folded chairs.
The space feels functional, not designed — a back room repurposed
for learning.

Light: cool overcast daylight from the upper-right window as key
light, warm supplemental light from a pendant lamp at camera left.
Shadows soft but present, giving the scene quiet gravity.
Focus on the pointing hand and the whiteboard surface.
Background and the seated figure fall into partial bokeh.

Palette: warm linen beige, natural chalk-white, pale ochre,
deep charcoal, soft slate.
4:3 aspect ratio.
```

**ネガティブプロンプト（共通ネガティブに加えて）**:
```
ADDITIONAL AVOID: corporate boardroom aesthetic, PowerPoint projector,
tie-wearing executives, aggressive body language, any clear numerical
data that could be read, modern minimalist glass-office look.
```

---

### 24. Services vi｜組織・職場づくり研修 — スタッフが自走するチームへ

- **保存先（生成）**: `assets/services/service-06-training-organization.jpg`
- **最終配置（webp変換後）**: `assets/services/service-06-training-organization.webp`
- **アスペクト比**: 4:3

**シーン意図**:
厨房またはフロアの片隅、仕込みの前後の静かな一瞬。二〜三人のスタッフが自然な距離感で立ち話をしている。メモ帳が一冊あり、一人が何かを書き込んでいる。強制された整列ではなく、自発的な対話の空気。「離職防止・心理的安全性・自走」というテーマを、温かい光と自然なシーンで表現する。

**英語プロンプト本文**:

```
A brief, natural gathering of two or three restaurant staff members
in a quiet corner of a kitchen or dining floor, photographed at
standing height from a slight distance. The moment captured is
between service shifts — a relaxed, voluntary conversation, not a
formal meeting.

Figures: two or three people standing in a loose informal cluster,
shown from behind, in three-quarter profile, or with faces turned
away. No faces visible. They wear simple restaurant work clothes —
dark aprons, cotton shirts — looking natural and lived-in, not
uniformed to perfection. One person holds a small open notepad
(illegible handwritten notes); another person's hands (five natural
fingers) gesture naturally mid-conversation. The mood is warm and
unhurried — not tense, not performative.

Setting: the edge of a kitchen pass or a quiet corner of a dining
floor. Visible details in background (soft focus): a stainless prep
surface with a folded towel, a wooden shelving unit with jars or
folded linens, warm pendant lighting overhead. Natural imperfections
of a real working kitchen — not staged or pristine.

Light: warm ambient light from low-hung pendant lamps overhead at
3000K, gentle fill from a small window or open service door at
camera left bringing in cooler daylight. The overall feeling is
warm, grounded, and honest — the light of a place where people
actually work.

Focus plane on the notepad and the gesturing hands in the
foreground. Other figures dissolve softly toward middle-ground bokeh.

Palette: deep warm charcoal (aprons), natural linen, oxidized brass
(pendant hardware), muted clay, soft amber. Restrained saturation.
4:3 aspect ratio.
```

**ネガティブプロンプト（共通ネガティブに加えて）**:
```
ADDITIONAL AVOID: forced smiles or theatrical happiness, team-building
stock-photo clichés (fist bumps, high fives, group cheering), overly
bright or clinical kitchen lighting, pristine unused kitchen surfaces,
any visible corporate signage or branded uniforms.
```

---

## 進捗チェックリスト（Training 追加分）

- [ ] 22 Services iv Web研修 — `assets/services/service-04-training-web.webp`
- [ ] 23 Services v リーダーシップ研修 — `assets/services/service-05-training-leadership.webp`
- [ ] 24 Services vi 組織づくり研修 — `assets/services/service-06-training-organization.webp`
