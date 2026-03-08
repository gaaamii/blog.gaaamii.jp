# Blog System Rearchitecture Phase 1 Plan 2026

## 目的

現行の単一 Next.js アプリを、以下の 2 つの Next.js アプリへ分離する。

- `blog.gaaamii.jp`: 読者向け
- `blog-editor.gaaamii.jp`: 管理画面

今回の優先事項は、機能や UI を大きく変えずに、まず構成とデプロイ単位を分離することにある。中身はできるだけ現状維持とし、モノレポ化とアプリ境界の整理を先に完了させる。

このドキュメントはリアーキテクチャ全体の最終形を定義するものではなく、第1フェーズとして「モノレポ化と site / editor 分離」を行うための計画書である。後続フェーズで、各アプリ内部の技術構成や実装方針の見直しを行う。

## 今回の前提

- フレームワークは `Next.js` のまま継続する
- 読者向けと管理画面は別アプリとして管理する
- ただし、共通ロジックと共通 UI はモノレポ内の共有パッケージへ切り出す
- まずは構成移行を優先し、挙動変更や UX 改善は後続フェーズで扱う

## 対象 URL

### 読者向け `blog.gaaamii.jp`

- `/`
- `/posts/:id`
- `/about`

### 管理画面 `blog-editor.gaaamii.jp`

- `/` 旧 `/admin` 相当
- `/posts/:id`
- `/posts/:id/edit`
- `/posts/new`

## 現状整理

現行コードベースは単一 Next.js アプリで、読者向け画面と管理画面が同居している。

主なページ:

- 読者向け: `pages/index.tsx`, `pages/posts/[id].tsx`, `pages/about.tsx`
- 管理画面: `pages/admin.tsx`, `pages/admin/posts/[id].tsx`, `pages/posts/[id]/edit.tsx`, `pages/posts/new.tsx`

管理画面への移行対象を識別する基準として、現時点では `useAuthorization` を使用しているページを採用する。

`useAuthorization` 利用箇所:

- `pages/admin.tsx`
- `pages/admin/posts/[id].tsx`
- `pages/posts/[id]/edit.tsx`

補足:

- ユーザー指定の移行対象 URL は `blog-editor.gaaamii.jp/`, `blog-editor.gaaamii.jp/posts/:id`, `blog-editor.gaaamii.jp/posts/:id/edit`, `blog-editor.gaaamii.jp/posts/new`
- `pages/admin/posts/[id].tsx` も editor 側のコードとして扱う
- 最終 URL は `blog-editor.gaaamii.jp/posts/:id` へ寄せる

## リアーキテクチャ方針

### 1. Next.js アプリを site と editor に分離する

- `apps/site`: 読者向け Next.js アプリ
- `apps/editor`: 管理画面向け Next.js アプリ

両アプリは別々にビルド、別々にデプロイし、サブドメインで出し分ける。

### 2. モノレポで共通部分を管理する

共通化対象:

- `models`
- `utils`
- `config`
- `components/ui`
- 読者向けと管理画面の双方で使う汎用部品

各アプリ固有の画面構成やルーティングは共有しない。
`components/feature` は共有対象に含めない。

### 3. まずは構成移行を優先する

初回移行では、以下を重視する。

- URL とデプロイ単位の分離
- コード配置の整理
- 共通コードの参照経路の明確化

以下は後回しにする。

- UI 改善
- データ取得最適化
- 管理画面 UX の再設計
- API 境界の全面整理

## 推奨モノレポ構成

```text
.
├── apps/
│   ├── site/                # blog.gaaamii.jp
│   │   ├── pages/
│   │   ├── components/
│   │   └── next.config.js
│   └── editor/              # blog-editor.gaaamii.jp
│       ├── pages/
│       ├── components/
│       └── next.config.js
├── packages/
│   ├── ui/                  # Box, Stack, Cluster, Center など
│   ├── domain/              # Post などの型、モデル
│   ├── utils/               # datetime, environment など
│   └── config/              # tsconfig, prettier など
├── docs/
│   └── rearchitecture-phase-1-monorepo-split-plan.md
└── package.json
```

## 共有方針

### `packages/ui`

- `components/ui` をベースに共通化する
- レイアウトは `Box`, `Stack`, `Cluster`, `Center` を優先する
- アプリ固有レイアウトは `apps/site`, `apps/editor` 側に残す

### `packages/domain`

- `models/post.ts` などの型やドメイン知識を移す

### `packages/utils`

- `utils/datetime.ts`
- `utils/environment.ts`
- その他 UI 非依存ユーティリティ

## サブドメインとデプロイ方針

### 読者向け

- デプロイ先: `blog.gaaamii.jp`
- 対象アプリ: `apps/site`
- 対象ルート:
  - `/`
  - `/posts/:id`
  - `/about`

### 管理画面

- デプロイ先: `blog-editor.gaaamii.jp`
- 対象アプリ: `apps/editor`
- 対象ルート:
  - `/`
  - `/posts/:id`
  - `/posts/:id/edit`
  - `/posts/new`

### デプロイ原則

- site と editor は別ビルドにする
- 環境変数もアプリごとに分ける
- 共有パッケージだけを両アプリから参照する
- デプロイ先は既存運用に合わせて `Vercel` を前提とする

## 構成移行の手順

### Step 1: モノレポ基盤を作る

実施内容:

- ルートをワークスペース対応にする
- `apps/site` と `apps/editor` を作る
- `packages/*` を作る
- 既存の依存関係、TypeScript 設定、ビルド設定をモノレポ前提に整理する

完了条件:

- ルートから両アプリを個別に起動できる
- 共有パッケージを import できる

モノレポ運用方式の候補:

- `npm workspaces`
  - Node 標準で理解しやすい
  - 追加学習コストが低い
  - 高度なキャッシュやタスク依存管理は弱い
- `yarn workspaces`
  - 現在 `yarn.lock` があるため移行差分が小さい
  - Workspace 管理は十分実用的
  - 運用ルールを増やすと npm より少し複雑になる
- `pnpm workspaces`
  - 依存解決が速く、ディスク効率が良い
  - モノレポ適性は高い
  - 現在の Yarn 運用からの乗り換え判断が必要
- `Turborepo`
  - ワークスペース管理そのものではなく、タスク実行とキャッシュの補強
  - build 対象が増えた時に効く
  - 今回は Vercel で 2 アプリを分ける初期段階なので必須ではない

現時点の推奨:

- 最初は `yarn workspaces` で始める
- 構成移行が落ち着いて、build や開発タスクが増えた段階で `Turborepo` の追加を検討する

理由:

- すでに `yarn.lock` があるため差分が小さい
- 今回の主目的は構成分離であり、タスクオーケストレーションの最適化ではない
- 依存管理とアプリ分離だけなら Yarn Workspace で十分進められる

### Step 2: 現行アプリを site / editor に棚卸しする

実施内容:

- 既存ページを「site」「editor」に分類する
- `useAuthorization` 利用ページを editor 候補として明示する
- URL 対応表を作る

初回の分類:

- site:
  - `pages/index.tsx`
  - `pages/posts/[id].tsx`
  - `pages/about.tsx`
- editor:
  - `pages/admin.tsx` -> `/`
  - `pages/admin/posts/[id].tsx` -> `/posts/:id`
  - `pages/posts/[id]/edit.tsx` -> `/posts/:id/edit`
  - `pages/posts/new.tsx` -> `/posts/new`

完了条件:

- どのファイルをどちらへ移すかが明文化されている
- editor 側の URL 変換も含めて整理されている

### Step 3: 共有コードを packages へ移す

実施内容:

- `components/ui` を `packages/ui` へ移す
- `models` を `packages/domain` へ移す
- `utils` を `packages/utils` へ移す
- `config` の共通部分を `packages/config` にまとめる

方針:

- 画面固有コンポーネントは各 app に残す
- `components/feature` は共有しない

完了条件:

- 両アプリで共通パッケージを参照できる
- import の責務境界が明確になっている

### Step 4: site アプリを切り出す

実施内容:

- `apps/site/pages` に以下を移す
  - `/`
  - `/posts/:id`
  - `/about`
- site に不要な認証依存を持ち込まない
- 既存の見た目と挙動を維持する

完了条件:

- `blog.gaaamii.jp` 向けアプリとして単体で動作する
- 対象 3 ルートが現行どおり表示される

### Step 5: editor アプリを切り出す

実施内容:

- `apps/editor/pages` に以下を移す
  - `/` 旧 `/admin`
  - `/posts/:id` 旧 `/admin/posts/:id`
  - `/posts/:id/edit`
  - `/posts/new`
- `useAuthorization` と管理画面用レイアウトを editor に閉じ込める
- 認証 API やセッション確認エンドポイントも editor 側に閉じる
- 画像アップロードや Cloudinary 連携も editor 側に寄せる
- 既存の編集フローを維持する

完了条件:

- `blog-editor.gaaamii.jp` 向けアプリとして単体で動作する
- 対象 4 ルートが現行どおり動作する
- `pages/admin/posts/[id].tsx` が `/posts/:id` として動作する

### Step 6: API とアプリ責務を分離する

実施内容:

- `pages/api/*` のうち公開サイト向け API は `apps/site` に置く
- editor 専用の認証 API やセッション確認 API は `apps/editor` に置く
- 画像アップロード関連 API も `apps/editor` に置く
- API 呼び出し元と API 実装の所属アプリを一致させる

完了条件:

- site は公開向け API を持つ
- editor は認証、セッション、アップロード系 API を持つ
- 両アプリの API 責務が混在しない

### Step 7: サブドメイン前提の設定を分離する

実施内容:

- `next.config.js` を app ごとに持つ
- 環境変数を site 用 / editor 用に分ける
- API エンドポイントや画像設定など、サブドメイン差分を各 app で管理する

完了条件:

- ローカル・Preview・本番の各環境で site と editor を個別設定できる

環境変数の分割案:

- 共通候補:
  - `NEXT_PUBLIC_SITE_URL`
  - `NODE_ENV`
- site 専用候補:
  - `SITE_URL`
  - `FEED_BASE_URL`
  - 公開向け revalidate や feed 生成に使う値
- editor 専用候補:
  - `EDITOR_URL`
  - 認証用の secret や session 関連値
  - Cloudinary の API key, secret, cloud name
- 運用方針:
  - 両 app で使う値でも、用途が違う URL は分ける
  - `NEXT_PUBLIC_*` は本当にブラウザ公開が必要な値だけに限定する
  - Cloudinary や認証 secret は editor 側に閉じる

### Step 8: デプロイパイプラインを分離する

実施内容:

- `apps/site` と `apps/editor` を別々に build / deploy できるようにする
- Vercel 上で site 用 Project と editor 用 Project を分ける
- それぞれの Root Directory を対応 app に設定する
- どちらか片方だけ変更した場合のデプロイを可能にする
- shared package 更新時の影響範囲を確認できるようにする

完了条件:

- 読者向けと管理画面を独立してデプロイできる
- サブドメインごとにデプロイ先が明確になっている

## ルート対応表

| 現行 | 移行先 | 配備先 |
| --- | --- | --- |
| `/` | `/` | `blog.gaaamii.jp` |
| `/posts/:id` | `/posts/:id` | `blog.gaaamii.jp` |
| `/about` | `/about` | `blog.gaaamii.jp` |
| `/admin` | `/` | `blog-editor.gaaamii.jp` |
| `/admin/posts/:id` | `/posts/:id` | `blog-editor.gaaamii.jp` |
| `/posts/:id/edit` | `/posts/:id/edit` | `blog-editor.gaaamii.jp` |
| `/posts/new` | `/posts/new` | `blog-editor.gaaamii.jp` |

## 管理画面判定ルール

初回移行では次のルールで扱う。

- `useAuthorization` を利用するページは管理画面候補とみなす
- `useAuthorization` を利用するページは、今回の主要公開ルート外であっても editor 側へ寄せる
- 公開 URL は段階的に整理するが、コード配置は editor に統一する

このルールにより、今回の対象は次の 2 層で整理する。

- 今回移行する editor ページ:
  - `pages/admin.tsx`
  - `pages/admin/posts/[id].tsx`
  - `pages/posts/[id]/edit.tsx`
  - `pages/posts/new.tsx`

## 実装時の注意点

- まずは中身を変えず、ファイル配置と import 先だけを整理する
- 共通化は最小限に留める
- 管理画面用認証ロジックを site 側へ持ち込まない
- site 側に editor 用ページや依存を残さない
- editor 側で読者向け専用レイアウトを流用しすぎない
- API は site と editor の責務に沿って分ける
- `next.config.js` は app ごとに持つ
- 移行順は `site` を先、`editor` を後にする

## 非目標

- UI の再設計
- API の全面刷新
- 管理画面ルートの最終整理
- パフォーマンス改善や UX 改善の本格着手

## 成功条件

- モノレポ内に `apps/site` と `apps/editor` が存在する
- `blog.gaaamii.jp` と `blog-editor.gaaamii.jp` を別々にデプロイできる
- 読者向け 3 ルートが site から提供される
- 管理画面 4 ルートが editor から提供される
- 共有コードの置き場が `packages/*` に整理されている
- 初回移行では UI や挙動の差分を極小に抑えられている

## この計画の結論

今回のリアーキテクチャでは、`Next.js` を維持したままモノレポ化し、読者向けと管理画面をサブドメイン単位で分離する。最初のゴールは再設計ではなく構成移行であり、site と editor を独立デプロイ可能にしつつ、既存コードの中身はなるべく維持して移す。

これはリアーキテクチャの第1フェーズであり、後続フェーズでは site / editor それぞれの内部実装、データ取得方式、UI 構成、技術選定の見直しを段階的に進める前提とする。

実施順は以下で固定する。

1. モノレポ基盤を作る
2. 既存ページを site / editor に分類する
3. 共通コードを `packages/*` に切り出す
4. site を `apps/site` に移す
5. editor を `apps/editor` に移す
6. API とアプリ責務を分ける
7. サブドメイン前提の設定を分ける
8. デプロイパイプラインを分離する
