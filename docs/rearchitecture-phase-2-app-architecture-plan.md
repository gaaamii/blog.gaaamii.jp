# Blog System Rearchitecture Phase 2 Plan 2026 (Site Only)

## 目的

Phase 2 では `site` アプリのみを対象に、内部技術構成を Next.js から Astro へ移行する。

- `site` (`blog.gaaamii.jp`): **Astro**
- `editor` (`blog-editor.gaaamii.jp`): **現行構成を維持（対象外）**

Phase 2 の狙いは、Phase 1 で確立した app 分離を維持したまま、公開サイトの配信モデルを Astro ベースに最適化すること。

---

## スコープ

### 対象

- `apps/site` を Next.js から Astro へ置き換える
- `packages/*`（`ui` / `domain` / `utils` / `config`）との再利用境界を維持する
- site の公開 URL と SEO 要件を維持する

### 非対象（Phase 2 外）

- `apps/editor` のフレームワーク移行
- CMS / DB の全面刷新
- 大規模なデザインリニューアル
- URL 構造の変更（原則維持）

---

## 目標アーキテクチャ

## site (`blog.gaaamii.jp`) - Astro

### 役割

- 読者向けの公開ページ配信
- 高速表示と静的配信の最適化

### 想定ルーティング

- `/`
- `/posts/:id`
- `/about`
- `/feed.xml`（現行 feed 相当）

### 実装方針

- ページは Astro の file-based routing へ移行
- Markdown / MDX 描画は必要に応じて Astro 側の仕組みに寄せる
- 既存の共通 UI（`packages/ui`）は React component として island 利用を基本にする
- API Route が必要なものは Astro endpoint へ置換する

### SSR/SSG 方針

- 基本は SSG（静的生成）優先
- 更新頻度や連携要件があるページのみ SSR を検討

---

## editor の扱い（Phase 2）

- editor は Phase 2 の移行対象外とする
- 既存の運用（Next.js ベース）を維持し、必要な保守対応のみ実施する
- editor の技術刷新は別フェーズとして切り出して計画する

---

## 共有パッケージ運用（継続）

### 継続利用

- `packages/domain`: 型・ドメインモデル
- `packages/utils`: UI 非依存ユーティリティ
- `packages/ui`: 汎用 UI コンポーネント
- `packages/config`: tsconfig 等の共有設定

### ルール

- site 固有機能は `apps/site` に置く
- 再利用前提のもののみ `packages/*` へ昇格
- 依存方向は `apps/site -> packages/*` を維持する

---

## 移行手順（推奨順）

## Step 1: site 移行の土台準備

1. `apps/site` に Astro の新構成を作成
2. ルート scripts を site の実行ランタイムに合わせて更新
3. 既存 `packages/*` を import できる状態を確認

完了条件:

- `yarn dev:site` で site が起動できる
- `packages/*` の利用が維持される

## Step 2: site のページ移植

1. `/`, `/posts/:id`, `/about` を順次移植
2. feed 生成（`/feed.xml`）を Astro 側へ移行
3. OGP / metadata / canonical など SEO 基本要件を移植

完了条件:

- 現行 site と同等 URL が表示可能
- 公開ページの主要導線が維持される

## Step 3: 切替とクリーンアップ

1. site の Vercel 設定を Astro 前提へ更新
2. `apps/site` 内の不要な Next.js 依存と設定を撤去
3. site 運用ドキュメントを更新

完了条件:

- 本番 site が Astro で安定稼働する
- site 側で旧実装依存が残っていない

---

## リスクと対策

- **リスク:** 既存 Next.js API Route 依存の取りこぼし
  - **対策:** site で利用中の API 依存箇所を先に棚卸しし、移行対象一覧を作る
- **リスク:** site 側 SEO 設定漏れ
  - **対策:** title/description/canonical/OGP/feed のチェックリストを作成
- **リスク:** 移行中の挙動差分混入
  - **対策:** URL 単位の比較チェック（現行/移行後）をリリース前に実施する

---

## Definition of Done (Phase 2)

- [ ] site が Astro で本番運用されている
- [ ] site の主要 URL（`/`, `/posts/:id`, `/about`, `/feed.xml`）が維持されている
- [ ] site の SEO 基本要件（title/description/canonical/OGP）が維持されている
- [ ] 共有パッケージ境界（`apps/site -> packages/*`）が保たれている
- [ ] site の運用ドキュメントと起動手順が最新化されている
