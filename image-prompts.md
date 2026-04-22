# TOMOSU. Website — AI画像生成プロンプト集 v2（プロ商業写真レベル）

> **v1からの変更点**
> - 「編集的な雰囲気」表現を廃止し、**カメラ・レンズ・フィルム・照明・露出**の物理スペックを明示
> - 参照基準を MUJI / Aesop / IMA Magazine / POPEYE の**実在するブランド広告・雑誌ビジュアル**に設定
> - AI特有の破綻（指の歪み・架空の文字・建築の歪み等）を**ネガティブプロンプトで個別に排除**
> - 21枚の**ルック統一**のため、共通スタイルベースを大幅に詳細化
> - 品質ゲート（受け入れ基準）を追加

---

## 進捗チェックリスト（v2生成）

- [ ] 01 Philosophy — `assets/scenes/philosophy-night-shop.jpg`
- [ ] 02 About On Site 01 — `assets/about/about-onsite-01-kitchen.jpg`
- [ ] 03 About On Site 02 — `assets/about/about-onsite-02-dialogue.jpg`
- [ ] 04 Services i 顧問 — `assets/services/service-01-advisory-desk.jpg`
- [ ] 05 Services ii プロジェクト — `assets/services/service-02-project-collateral.jpg`
- [ ] 06 Services iii スポット — `assets/services/service-03-spot-cafe.jpg`
- [ ] 07 Clients Niki ★ DINER — `assets/clients/shots/niki-diner.jpg`
- [ ] 08 Clients Bistro knocks — `assets/clients/shots/bistro-knocks.jpg`
- [ ] 09 Clients LOCAL POWER — `assets/clients/shots/localpower.jpg`
- [ ] 10 Clients M'z cafe — `assets/clients/shots/mz-cafe.jpg`
- [ ] 11 Clients よいどころ千福 — `assets/clients/shots/senpuku.jpg`
- [ ] 12 Commission 01 弁当 — `assets/commission/commission-01-bento.jpg`
- [ ] 13 Commission 02 イベント — `assets/commission/commission-02-event.jpg`
- [ ] 14 Commission 03 霧積ブルワリー — `assets/commission/commission-03-kirizumi-brewery.jpg`
- [ ] 15 Commission 04 新店立ち上げ — `assets/commission/commission-04-new-shop.jpg`
- [ ] 16 Voice Niki ★ DINER — `assets/voice/niki-diner.jpg`
- [ ] 17 Voice Bistro knocks — `assets/voice/bistro-knocks.jpg`
- [ ] 18 Voice LOCAL POWER — `assets/voice/localpower.jpg`
- [ ] 19 Voice M'z cafe — `assets/voice/mz-cafe.jpg`
- [ ] 20 Voice よいどころ千福 — `assets/voice/senpuku.jpg`
- [ ] 21 Contact — `assets/contact/contact-dialogue.jpg`

---

## 共通スタイルベース（必須・全プロンプト先頭に貼る）

```
PROFESSIONAL EDITORIAL PHOTOGRAPHY

This is a real photograph commissioned for a Japanese luxury
lifestyle editorial campaign — published quality, comparable
to IMA Magazine, POPEYE, Kinfolk print edition, or a MUJI /
Aesop / Le Labo brand campaign. Not an illustration,
not a 3D render, not a stylized generation.

Camera & optics:
- Medium format digital, Hasselblad X2D 100c
- 80mm f/1.9 lens, aperture f/2.8 to f/4
- ISO 200, clean shadow detail, protected highlights
- Kodak Portra 400 color science, Noritsu HS-1800 scan emulation
- Fine natural film grain, subtle highlight halation

Light:
- Soft directional natural light (large window, overcast sky,
  or golden-hour ambient), never direct flash, never HDR
- Warm white balance around 5000–5400K
- Exposure biased to protect highlights, lift shadows gently
- Light has clear but soft direction (reader can tell where
  the window is), with a quiet fall-off

Color palette:
- Desaturated, muted: warm linen beige, soft olive, oxidized
  navy, muted ochre, deep charcoal
- Highlights soft and warm, shadows cool but not crushed
- Absolutely restrained saturation — think Rinko Kawauchi
  or Hiroshi Homma color grading

Composition:
- Rule of thirds or centered with deliberate negative space
- Straight horizon, no Dutch tilt
- Shallow depth of field with intentional focus plane
- Everyday life observed, not posed or staged

Finish:
- Minimal retouching, no beauty smoothing, no overly polished
  digital feel — keep natural texture, pore detail, imperfections
- No filters, no HDR, no oversharpening, no halos
- Output at highest available resolution
```

## 共通ネガティブプロンプト（必須・すべてのショットに）

```
AVOID AT ALL COSTS:

AI artifacts:
- warped or melted objects, impossible architecture, broken
  perspective lines, floating items
- deformed hands, extra fingers, missing fingers, fused fingers,
  unnatural finger bends
- nonsense text, gibberish writing, fake Japanese characters,
  jumbled kanji, illegible menus
- uncanny partial faces, wrong eye positions, unnatural skin

Photographic failures:
- motion blur where not intentional, soft focus on the subject,
  lens distortion, chromatic aberration
- blown highlights, crushed blacks, flat even lighting,
  ring-light reflections, double light sources
- oversaturated colors, HDR look, oversharpened edges, halos
- heavy vignette, Instagram filter feel, overprocessed glow

Style failures:
- stock-photo cliché (forced smiles, perfect symmetry,
  glossy food-ad feel)
- cartoon, anime, illustration, painterly texture, 3D render look
- stereotypical Japan tropes: cherry blossoms, pagodas, rising sun,
  geisha, samurai, Mount Fuji unless explicitly requested
- modern brand logos, readable text, watermarks,
  trademarked merchandise
- overly "Pinterest" styled arrangement, too-perfect flatlay
```

---

## 01. Philosophy — 夜の群馬の裏道、灯りのある小店

- 保存先: `assets/scenes/philosophy-night-shop.jpg`
- アスペクト比: **16:7**

```
A quiet backstreet in regional Gunma, Japan, photographed
at blue hour (shortly after sunset, deep navy sky just
turning to black). Frame centered on a single small
family-run shop — a low concrete building with weathered
wood trim, one glowing window behind frosted glass, warm
tungsten light spilling softly through a half-drawn noren
curtain onto damp gray asphalt. A faint silhouette of a
shopkeeper behind the counter, barely visible, never face-on.
Other storefronts on the street are dim and closed, with
concrete power poles and overhead utility wires typical of
rural Japanese neighborhoods. A single vending machine glows
dimly far in the background.

Shot from across the street, slightly elevated, with wet
pavement reflecting the warm shop light in long smears.
Cinematic wide horizontal composition, deliberate negative
space of dark sky above and empty street below.
16:7 aspect ratio, banner composition.
```

## 02. About — On Site 01｜厨房に立つ大内氏（後ろ姿）

- 保存先: `assets/about/about-onsite-01-kitchen.jpg`
- アスペクト比: **4:3**

> AI で人物を描く際の破綻を避けるため、**後ろ姿・手元のみ・顔は見せない**構図で固定。

```
A man in his early 40s, photographed strictly from behind
and slightly to the side, standing at a polished stainless-steel
restaurant prep counter in a small professional kitchen.
He wears a dark indigo linen apron over a simple white cotton
shirt with sleeves rolled to the forearms. His hands — five
natural fingers each, relaxed posture — hold a handwritten
service sheet on clean white paper. Face is entirely out of
frame, cropped above the shoulders. Shoulder-length hair is
not visible; implied close-cropped dark hair.

Background: a blurred line kitchen — stainless speed rack
with neatly hung white towels, a gas range with a single
copper pot, faint steam rising. Pendant light above, warm
tungsten glow at 3000K, casting soft shadows on the counter
texture. Natural window light from camera right at 45°
elevation, softening shadow edges.

Focus plane on his hands and the service sheet; background
falls off into smooth bokeh. Composition places the figure
on the right third, with negative space of the counter on
the left.
4:3 aspect ratio.
```

## 03. About — On Site 02｜経営者との対話風景（手元のみ）

- 保存先: `assets/about/about-onsite-02-dialogue.jpg`
- アスペクト比: **4:3**

```
A small square solid-oak table in a minimalist Japanese
interior, photographed from a low three-quarter angle at
roughly seated eye level. Two pairs of forearms and hands
enter the frame from opposite edges — a consultant's hand
(left) resting on an open linen-bound notebook with
handwritten kanji notes (illegible but natural-looking), and
a client's hand (right) wrapped around a small ceramic
teacup of hōjicha. All hands have five natural, unstylized
fingers. No faces, no upper bodies — cropped at mid-forearm.

Table surface: aged oak with visible grain, one small brass
paperweight, a worn fountain pen resting on the notebook.
Background: blurred shōji paper screen diffusing afternoon
daylight from camera left, faint silhouette of a plant off
to the side. Wall tones in warm beige and soft ochre.

Shallow depth of field, focus on the notebook page.
Natural, unposed composition — caught mid-conversation.
4:3 aspect ratio.
```

## 04. Services i｜顧問 — 月次定例の机上

- 保存先: `assets/services/service-01-advisory-desk.jpg`
- アスペクト比: **4:3**

```
Flat-lay, shot from directly overhead at 90° (true top-down),
of a quiet wooden desk surface prepared for a monthly
advisory meeting. Objects arranged naturally, not styled:
- A thick linen-paper notebook (Midori / Kokuyo style,
  unbranded) open to a page of handwritten kanji in black ink,
  characters natural and plausible but not clearly readable
- A slim matte-black fountain pen resting diagonally across
  the notebook
- A folded A4 strategy brief on cream-colored paper, printed
  with abstract diagrams and text blocks (illegible, natural)
- A small ceramic cup of black coffee, earthenware with
  subtle firing marks
- The edge of a slim silver laptop, screen not visible
- A pair of reading glasses folded shut
- A single dried leaf or small stone as a subtle weight

Surface: natural raw oak plank with visible grain. Lighting:
warm late-afternoon window light from the upper-right of
the frame, long soft shadows stretching diagonally across.
Shot on 90mm macro-length lens, f/4, sharp throughout.
No text is clearly legible.
4:3 aspect ratio.
```

## 05. Services ii｜プロジェクト — 制作物のマクロ静物

- 保存先: `assets/services/service-02-project-collateral.jpg`
- アスペクト比: **4:3**

```
Macro close-up still life of premium craft brand collateral,
arranged as a quiet overlapping stack on a textured linen
surface. Objects:
- A single letterpress business card with deep debossed
  texture, ivory cotton paper, completely blank face (no
  text, no logo) — only the physical impression visible
- A folded kraft-paper tri-fold menu, edge visible, with
  abstract printed composition (no readable text)
- A cloth-bound brand book with exposed stitched spine
  in deep indigo linen
- A brass wax seal with a hand-pressed ochre-red impression
  on the top card, abstract geometric motif
- A single length of natural twine

Side light from camera right at low angle, raking across
the paper textures and revealing every fiber and emboss.
Shot on 100mm macro lens, f/3.5, focus on the wax seal,
gentle falloff toward edges. Kodak Portra 400 palette:
warm cream, ochre, indigo, black. No visible text anywhere.
4:3 aspect ratio.
```

## 06. Services iii｜スポット — カフェでの対話

- 保存先: `assets/services/service-03-spot-cafe.jpg`
- アスペクト比: **4:3**

```
A weathered wooden cafe table photographed from a side seat
at seated eye level, shallow angle. Foreground in focus:
two hand-thrown ceramic coffee cups half-full, an open
linen-paper notebook angled between them with handwritten
notes (natural illegible kanji), a slim wooden pen resting
on the page. Middle ground out of focus: two blurred human
silhouettes from the chest down, leaning in toward each
other mid-conversation. No faces, no upper body details.
Background fully blurred: warm wooden cafe interior with
a soft lamp glow.

Soft afternoon window light from camera left, slightly
warm. Focus plane on the notebook — both people dissolve
into bokeh. Composition gives equal weight to the notebook
in the foreground and the blurred figures behind.
4:3 aspect ratio.
```

## 07. Clients — Niki ★ DINER

- 保存先: `assets/clients/shots/niki-diner.jpg`
- アスペクト比: **4:3**

```
Interior detail shot of a small Japanese-run American-style
diner in regional Japan, shortly before opening (no
customers, no staff). Composition frames a corner of the
counter: weathered chrome edge, red vinyl stools with
gentle patina, a small ceramic sugar caddy, a folded linen
napkin, a single filter coffee in a thick white mug. Beyond
the counter, blurred: an aged pie display case, a chalkboard
(illegible), vintage pendant lights with warm tungsten glow.
Early-morning light entering from the left through wooden
window frames, soft and diffuse.

Shot at table height, slightly angled, focus on the coffee
mug. Color palette: warm cream, oxidized red, dark walnut,
pale brass. No text, no readable signage, no branded labels.
4:3 aspect ratio.
```

## 08. Clients — Bistro knocks

- 保存先: `assets/clients/shots/bistro-knocks.jpg`
- アスペクト比: **4:3**

```
Interior detail shot of a small French-Japanese neighborhood
bistro in regional Japan, shortly before dinner service
(no people). Composition frames the corner of a dark oak
bar: two bistro wine glasses (empty, freshly polished),
a folded white linen napkin, a small slate plate, a single
stem of dried lavender in a short glass vase. Background
blurred: a large chalkboard wall with faint illegible
handwritten script, shelves of unlabeled bottles, warm
pendant light glowing above.

Side light from a narrow window at camera right, late
afternoon, warm tungsten supplementation from overhead.
Shot at counter height, shallow angle, focus on the wine
glass stems. Palette: deep charcoal, warm ochre, oxidized
brass, cream. No readable text, no brand labels.
4:3 aspect ratio.
```

## 09. Clients — LOCAL POWER

- 保存先: `assets/clients/shots/localpower.jpg`
- アスペクト比: **4:3**

```
Interior detail shot of a community-work studio / small
regional-revitalization office in Japan. Composition frames
a corner of a long raw-pine communal table: an open paper
map of a rural Japanese region (hand-sketched lines, no
readable place names), a worn wooden ruler, a few small
river stones used as paperweights, a stoneware mug half
full of tea. Background softly blurred: a cork wall with
pinned photographs of rural scenes and craft materials,
a potted zelkova seedling, warm morning light streaming
through a tall window at camera left.

Shot at seated height, focus on the map surface. Palette:
warm kraft, soft moss green, pale slate, oxidized iron.
Natural, lived-in feel — the workspace of people doing
regional development. No readable text, no logos.
4:3 aspect ratio.
```

## 10. Clients — M'z cafe

- 保存先: `assets/clients/shots/mz-cafe.jpg`
- アスペクト比: **4:3**

```
Interior detail shot of a small, quiet neighborhood cafe in
Japan, shortly after opening (no customers, no staff).
Composition frames a corner of a light oak counter: a ceramic
pour-over dripper mid-pour with a thin stream of water from
a gooseneck kettle, a hand-thrown espresso cup with faint
latte art swirl settling, a folded linen cloth, a single
stem of eucalyptus in a small glass. Background softly
blurred: a wooden pastry shelf with a few unglazed croissants,
shelves of unlabeled coffee jars, warm morning light from a
large window at camera left diffusing softly through sheer
white curtain.

Shot at counter height, focus on the pour-over dripper.
Palette: cream, pale oak, soft olive, warm brass. Quiet,
meditative mood. No readable text, no brand labels.
4:3 aspect ratio.
```

## 11. Clients — よいどころ千福

- 保存先: `assets/clients/shots/senpuku.jpg`
- アスペクト比: **4:3**

```
Interior detail shot of a traditional Japanese izakaya in
regional Japan, early evening, just before opening (no
customers). Composition frames a corner of a worn wooden
counter: a small sake cup (ochoko) beside a ceramic tokkuri,
a folded indigo cloth, a bamboo menu holder with a
hand-written paper tag (illegible, natural brush strokes),
a single sprig of sansho leaf on a small plate. Background
softly blurred: hand-written paper menu tags (omote-na) on
the wall with natural brushwork (illegible), the edge of
an indigo noren curtain, a hanging paper lantern glowing
warm amber.

Side light from a lantern at camera right plus cool blue-hour
light from a small window at camera left — warm-cool
interplay. Shot at counter height, focus on the sake cup.
Palette: deep indigo, aged wood, warm amber, black ink.
No clearly readable text; brush strokes appear as texture.
4:3 aspect ratio.
```

## 12. Commission 01｜弁当製造・調達運営

- 保存先: `assets/commission/commission-01-bento.jpg`
- アスペクト比: **16:6**

```
Wide horizontal scene inside a commercial kitchen mid-prep
for a large catering run, shot from a slightly elevated
three-quarter angle to show depth along a row of
stainless-steel prep tables. Rows of open rectangular bento
boxes in light natural wood, each partially filled with
seasonal Japanese side dishes — tamagoyaki, nimono, blanched
greens, pickled vegetables. Staff hands only (no faces,
five natural fingers each, uniform white cotton sleeves)
arranging ingredients with wooden tongs and small spoons.
Gentle steam rising from a pot in the background, soft
motion blur only on the rising steam — all hands sharp.

Warm overhead fluorescent light corrected to 4200K,
supplementary window light from camera left softening shadows.
Organized, focused, no chaos. Composition leads the eye
down the row of bentos from foreground to background.
16:6 banner aspect ratio.
```

## 13. Commission 02｜イベント運営支援

- 保存先: `assets/commission/commission-02-event.jpg`
- アスペクト比: **16:6**

```
Wide horizontal shot of an outdoor regional Japanese food
event at golden hour, shot from behind the crowd at standing
height. Strings of warm tungsten bulbs arc overhead between
wooden booth posts, casting pools of amber light. In the
middle ground, silhouettes of a small crowd gathering at
a food stall — all shown from behind or in profile, no
faces visible, natural body postures, five-fingered hands.
Cloth banners hanging from the booths in deep indigo and
cream, with hand-painted marks (no readable text). Rustic
wooden booths, a single chalkboard easel with natural
illegible script.

Backlight from the setting sun behind the crowd creates rim
lighting on shoulders and hair. Gentle motion blur on a
single flag in the breeze — everything else sharp.
Atmosphere: festive but quiet, observed, not staged.
Palette: warm amber, deep blue dusk, natural linen, wood.
16:6 banner aspect ratio.
```

## 14. Commission 03｜霧積ブルワリー

- 保存先: `assets/commission/commission-03-kirizumi-brewery.jpg`
- アスペクト比: **16:6**

```
Wide horizontal interior of a mountain-side craft brewery
restaurant in Gunma, Japan (Kirizumi region), photographed
from a seated height along the length of a long raw-wood
communal table. Foreground: a single tall glass of amber
beer with perfect two-finger foam head, a small ceramic
plate with a simple unbranded snack (smoked nuts or a
single pickled vegetable), a folded linen napkin, a pair
of empty chopsticks resting on a rest. Middle ground:
long wooden table disappearing into shallow bokeh,
empty wooden chairs on both sides. Background: a large
glass wall revealing copper brewing tanks in soft focus,
beyond which blurred green forest light filters through
trees.

Warm brass sconces on the stone wall to the left cast
directional light across the table at 45°; cool forest
daylight from the glass wall on the right creates a
warm-cool interplay. Focus on the beer glass rim and foam.
Palette: warm copper, aged oak, deep forest green, amber,
cream. No readable text, no brand labels.
16:6 banner aspect ratio.
```

## 15. Commission 04｜地域飲食店 新規立ち上げ

- 保存先: `assets/commission/commission-04-new-shop.jpg`
- アスペクト比: **16:6**

```
Wide horizontal shot of a newly opened small Japanese
restaurant on its opening morning, photographed from inside
looking toward the entrance door. A fresh indigo noren
curtain, just hung, catches a breath of breeze from outside,
slight natural sway (no heavy motion blur). A freshly
polished raw-wood counter runs along the right side with
neatly folded white towels, empty wooden stools evenly
spaced, a small vase with a single seasonal flower on the
counter. No people, no food yet. Beyond the doorway,
gentle morning light on an unseen street, soft bokeh.

Natural daylight streaming in from the entrance at camera
center, warm and diffuse, long soft shadows stretching
into the shop interior. Palette: raw oak, deep indigo,
ivory linen, pale morning gold. Sense of quiet anticipation,
the moment before the first guest. No readable signage,
no logos.
16:6 banner aspect ratio.
```

## 16. Voice — Niki ★ DINER（1:1 正方形）

- 保存先: `assets/voice/niki-diner.jpg`
- アスペクト比: **1:1**

```
Intimate square still-life detail of a single focal object
on a weathered American-style diner counter in Japan: a
thick white ceramic coffee mug, half full, steam curling
naturally from the surface. Positioned on a worn chrome-edged
counter with a folded linen napkin and a single slice of
homemade apple pie on a small plate just visible at the
edge of frame. Soft morning window light from camera left,
warm tungsten pendant glow above. Focus pinned on the coffee
surface. Shallow depth of field.

Palette: warm cream, pale brass, oxidized red accents from
vinyl upholstery in the blur behind. Composition centered
with quiet negative space around the mug.
1:1 square aspect ratio.
```

## 17. Voice — Bistro knocks（1:1 正方形）

- 保存先: `assets/voice/bistro-knocks.jpg`
- アスペクト比: **1:1**

```
Intimate square still-life detail on a dark oak bistro bar
in Japan: a single freshly polished bistro wine glass,
empty, catching warm pendant light on its rim and stem.
Positioned beside a folded white linen napkin and a small
dark slate plate. Background softly blurred: faint chalkboard
texture, shelves of unlabeled bottles. Directional warm
tungsten light from above-right at 45°, cool ambient from
camera left creating edge light on the glass stem.

Focus on the glass stem. Shallow depth of field, rich
shadow detail. Palette: deep charcoal, warm ochre, oxidized
brass, cream. Composition centered, breath of negative space
all around.
1:1 square aspect ratio.
```

## 18. Voice — LOCAL POWER（1:1 正方形）

- 保存先: `assets/voice/localpower.jpg`
- アスペクト比: **1:1**

```
Intimate square still-life detail on a raw pine communal
work table in a regional-revitalization studio in Japan:
a single focal object — a hand-drawn paper map corner
showing abstract topographic lines (no readable place names)
with a worn wooden ruler resting diagonally across it, a
small smooth river stone acting as a paperweight. Background
softly blurred: cork board with pinned scraps of craft paper.
Soft morning window light from camera left, warm and diffuse,
casting gentle shadow of the ruler across the map.

Focus on the ruler's wooden grain. Palette: warm kraft paper,
pale moss, soft slate, oxidized iron. Quiet, intentional
mood. No readable text anywhere.
1:1 square aspect ratio.
```

## 19. Voice — M'z cafe（1:1 正方形）

- 保存先: `assets/voice/mz-cafe.jpg`
- アスペクト比: **1:1**

```
Intimate square still-life detail on a light-oak cafe counter
in Japan: a single focal object — a hand-thrown ceramic
pour-over dripper resting on a clear glass server, one or
two final amber drops of coffee falling from the cone. A
folded linen cloth in soft linen beige beside it, and a
single sprig of eucalyptus at the edge of frame. Background
softly blurred: pale oak shelf with unlabeled coffee jars.
Soft morning window light from camera left diffusing through
sheer curtain, gentle warm glow.

Focus on the falling coffee drop. Palette: cream, pale oak,
soft olive, warm brass. Meditative, quiet mood.
1:1 square aspect ratio.
```

## 20. Voice — よいどころ千福（1:1 正方形）

- 保存先: `assets/voice/senpuku.jpg`
- アスペクト比: **1:1**

```
Intimate square still-life detail on an aged wooden izakaya
counter in regional Japan, early evening: a single focal
object — a small ceramic sake cup (ochoko) half-filled with
clear sake, beside a small ceramic tokkuri. A folded indigo
cotton cloth rests underneath. Background softly blurred:
hand-written paper menu tags on the wall with natural
brushwork (texture only, no readable characters), warm
amber lantern glow.

Side light from the paper lantern at camera right creates
warm rim light on the cup; cool blue-hour light from a small
window at camera left adds subtle edge light. Focus on the
sake cup rim. Palette: deep indigo, aged wood, warm amber,
black brush ink. Intimate, contemplative mood.
1:1 square aspect ratio.
```

## 21. Contact — 対話風景（16:6）

- 保存先: `assets/contact/contact-dialogue.jpg`
- アスペクト比: **16:6**

```
Wide horizontal scene in a quiet Japanese cafe during a
first-meeting conversation. Shot from the perspective of
a third seat at the table. Foreground sharp: two hand-thrown
ceramic coffee cups (one half-full of black coffee, one
slightly fuller with milk coffee), an open linen-paper
notebook with a fountain pen resting across the page
(handwritten natural kanji notes, illegible), a folded
linen napkin. Middle ground blurred: two silhouettes of
seated figures from chest-down, leaning slightly toward
each other mid-conversation — only forearms, hands, and
torsos visible, no faces, five natural fingers per hand.

Soft side window light from camera right, warm late-afternoon
tone. Focus plane on the notebook. Palette: cream, oxidized
brass, soft oak, oat linen. Composition wide and quiet,
calm and honest feeling — a first trust-building conversation.
16:6 banner aspect ratio.
```

---

## 品質ゲート（受け入れ基準）

生成した画像を採用する前に、必ず以下をチェック：

### 即リテイクの基準（1つでも該当したら再生成）

- [ ] **指が6本以上 / 4本以下 / 溶けている / 不自然な角度で曲がっている**
- [ ] **顔が部分的に見えている**（目・鼻・口が識別可能なら NG）
- [ ] **読めそうで読めない偽日本語が大きく写り込んでいる**（看板・大きなメニュー等）
- [ ] **建築・パース破綻**（柱が曲がっている、床が消えている、影が逆方向）
- [ ] **HDR・オレンジ／ティール色調・過剰彩度**（AI 的 Instagram トーン）
- [ ] **ストック写真感**（完璧対称・笑顔・清潔すぎるショット）
- [ ] **3D レンダー・イラスト・絵画的テクスチャ**が混じる

### 採用の基準（すべて満たすと合格）

- [ ] 共通スタイルベースの色温度・彩度・明度が**他の20枚と揃って見える**
- [ ] 被写体に**物理的な質感**が感じられる（紙の繊維、木目、陶器の手触り）
- [ ] 光源の方向が**1つ**に定まっている（複数光源が混在して見えない）
- [ ] 指定のアスペクト比で**構図が成立**している
- [ ] プロの商業写真家が撮ったと言っても**違和感がない**

---

## 生成時の実務ヒント

### Google AI Studio（Imagen / Gemini 2.5 Flash Image）で生成する場合

1. 共通スタイルベース＋ネガティブプロンプト＋本文を**1プロンプトに結合**して投入
2. アスペクト比は設定パネルから指定（`--ar` は書かない）
3. **同じシード値を使う**とサブジェクトの一貫性が上がる（被写体変更時はシード固定）
4. 「seed: [任意の固定値]」「quality: high」を指定できる場合は必ず指定

### Midjourney で生成する場合

1. 各プロンプトの末尾に `--ar 16:7 --style raw --v 6.1 --s 100` 等を付加
2. 共通スタイルベースは `--sref [URL]` で参照画像化するのが理想（1枚目を作ってから残り20枚を sref 参照）
3. ネガティブは `--no` フラグで羅列（文章のネガティブより効く）

### 統一感を出す鉄則

**最初に 01 Philosophy または 10 M'z cafe（中間的なルック）を先に完成**させ、
それを "参照画像" として残り20枚を生成すると、トーンが揃います。
Google AI Studio なら「この画像と同じトーンで」と指示、
Midjourney なら `--sref` 参照、
Gemini なら参照画像アップロード機能を使用。

### 人物が含まれるショット（02, 03, 06, 12, 13, 21）

これらは AI が最も失敗しやすい領域。以下を厳守：
- **顔は絶対に見せない構図**（後ろ姿・手元・シルエット）
- プロンプトに "five natural fingers" を毎回明示
- 失敗した場合は迷わず再生成（画像編集で直すより早い）
- どうしても破綻が直らない場合は、**その1枚だけ実写撮影で置き換える**判断を
