# Rearchitecture Phase 3 Site Astro Implementation Plan

`apps/site` の現行 Next.js 実装を移行元として、`apps/site-astro` を公開サイトとして実運用可能な Astro アプリへ引き上げるための実装計画をまとめる。

## 目的

- 公開サイトの既存機能と URL を Astro へ移植する
- 記事ページ、一覧、RSS を静的ファイルとして生成する
- 記事更新後の反映は Vercel の再デプロイで行う
- 将来の Astro / Vercel によるオンデマンド生成へ移行しやすい責務境界を作る
- 移行完了後、Astro 版を正式な `apps/site` として昇格できる状態にする

## 確定済み事項

- 初期移行では Astro の `output: "static"` を維持する
- 記事更新時は Vercel の再デプロイを起動し、全ページを再生成する
- 現行 Next.js の `/api/revalidate` は Astro 側へ移植しない
- 将来的に Astro / Vercel 側のオンデマンド生成を導入する
- 公開 URL は維持する
  - `/`
  - `/posts/:id`
  - `/about`
  - `/feed`
- UI の大幅な再設計は行わず、まず既存の見た目と挙動を維持する
- レイアウトは `packages/ui` の `Box` / `Stack` / `Cluster` / `Center` を優先し、それで表現できないスタイルだけ Tailwind CSS を使う
- CSS Modules は Astro 側へ新規移植しない

## 現状サマリー

### `apps/site`

現在の公開サイト。Next.js Pages Router で以下を提供している。

- 記事一覧とタイトル検索
- 記事詳細の静的生成
- MDX レンダリング
- コードハイライト
- Markdown 内画像のサイズ付与
- About ページ
- カスタム 404
- RSS
- ダークモード
- Twitter Card メタデータ
- オンデマンド revalidation API
- 開発用 mock API

### `apps/site-astro`

Astro の技術検証用 PoC。現時点では以下のみ実装済み。

- `/`
- `/about`
- `/posts/:id`
- `getStaticPaths` による動的ルート生成
- 固定データ 2 件を使った静的ビルド

未実装なのは、実 API 接続、既存 UI、Markdown、検索、RSS、404、メタデータ、ダークモード、デプロイ導線である。

## ターゲットアーキテクチャ

### ビルドと公開

```text
Vercel build
  -> Astro が Content API から公開記事を取得
  -> 一覧・記事詳細・RSS を同じビルド入力から生成
  -> dist を blog.gaaamii.jp へ配信
```

公開サイトのリクエスト時には Content API へアクセスしない。API 障害の影響は新しいデプロイに限定し、直前の正常なデプロイは配信を継続する。

### 記事更新と反映

```text
editor
  -> Content API に記事を保存
  -> 保存成功
  -> Content API が Vercel のデプロイを起動
  -> Astro が全ページを再生成
```

デプロイ起動用の URL やシークレットはブラウザへ公開しない。第一候補は Content API が保存成功後に起動する方式とする。このリポジトリ外の Content API をすぐ変更できない場合は、秘密情報を保持できるサーバー側の中継処理を別途用意する。

記事の保存成功とサイト反映成功は別の状態として扱う。デプロイ失敗によって記事保存自体を失敗扱いにはせず、Vercel 側で失敗を検知・再実行できる運用にする。

### 将来のオンデマンド生成に備える境界

ページから直接 `fetch` を散在させず、記事取得を site 内のデータアクセス層へ集約する。

```text
Astro pages
  -> site data access layer
  -> Content API
```

初期実装ではビルド時にデータアクセス層を呼ぶ。将来 SSR やオンデマンド生成へ切り替える際は、ページの表示コンポーネントと `Post` 型を維持し、呼び出すタイミングとキャッシュ方針を交換できるようにする。

## route migration table

| 優先度 | 公開 URL           | 移行元                                   | 移行先                                       | 生成方式        | 移植する責務                                                               | 完了条件                                                                       |
| ------ | ------------------ | ---------------------------------------- | -------------------------------------------- | --------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| P1     | `/`                | `apps/site/pages/index.tsx`              | `apps/site-astro/src/pages/index.astro`      | static          | 公開記事一覧、公開日、記事リンク、タイトル検索、`query` パラメータ         | 実 API の公開記事を表示し、検索と URL が現行同等に動く                         |
| P1     | `/posts/:id`       | `apps/site/pages/posts/[id].tsx`         | `apps/site-astro/src/pages/posts/[id].astro` | static paths    | 記事取得、Markdown、コードハイライト、画像、公開日、戻るリンク、メタデータ | 全公開記事が生成され、本文とメタデータが現行同等になる                         |
| P1     | `/about`           | `apps/site/pages/about.tsx`              | `apps/site-astro/src/pages/about.astro`      | static          | ブログ説明、筆者、RSS、GitHub へのリンク                                   | 内容と外部リンクが現行同等になる                                               |
| P1     | `/feed`            | `apps/site/pages/api/feed.ts` と rewrite | `apps/site-astro/src/pages/feed.ts`          | static endpoint | 公開記事の RSS XML                                                         | URL、Content-Type、記事 URL、公開日が維持される                                |
| P1     | `/404`             | `apps/site/pages/404.tsx`                | `apps/site-astro/src/pages/404.astro`        | static          | 404 表示、トップへの導線                                                   | 存在しない URL で 404 ステータスと画面が返る                                   |
| P2     | `/api/revalidate`  | `apps/site/pages/api/revalidate.ts`      | 移植しない                                   | 廃止            | Next.js ISR                                                                | 記事更新後の Vercel 再デプロイへ置換され、呼び出し元が残っていない             |
| P2     | `/api/mock/posts*` | `apps/site/pages/api/mock/posts*`        | Astro には移植しない                         | 開発時のみ      | ローカル記事 API                                                           | site の API base URL を既存 mock API または専用 mock server へ向けて開発できる |

## 機能移行表

| 機能         | 現行実装                        | Astro での方針                                                                  |
| ------------ | ------------------------------- | ------------------------------------------------------------------------------- |
| 記事型       | `@gaaamii/domain/post`          | 同じ `Post` 型を利用する                                                        |
| API 接続     | `apps/site/lib/api.ts`          | server-only な data access layer を `apps/site-astro/src/lib` に作る            |
| API base URL | `NEXT_PUBLIC_SITE_API_BASE_URL` | `SITE_API_BASE_URL` に変更し、ブラウザへ公開しない                              |
| サイト URL   | ハードコードと設定が混在        | `SITE_URL` を基準に canonical、RSS、OG URL を生成する                           |
| 一覧生成     | `getStaticProps`                | Astro frontmatter でビルド時に取得する                                          |
| 記事パス     | `getStaticPaths`                | Astro の `getStaticPaths` で公開記事だけを列挙する                              |
| Markdown     | `next-mdx-remote`               | Astro のビルド時 Markdown パイプラインへ置換する                                |
| コード表示   | client-side syntax highlighter  | Shiki など Astro のビルド時ハイライトを優先し、不要なクライアント JS を削減する |
| 画像サイズ   | 独自 rehype plugin              | 既存記事との互換を確認し、ビルドを不安定にする外部画像取得は必要最小限にする    |
| 検索         | React state と Next Router      | 静的 HTML と小さな client script/island で `query` と表示を同期する             |
| ダークモード | React `ThemeToggle`             | 初期テーマ適用をインライン script、操作 UI のみ island 化する                   |
| レイアウト   | Tailwind と CSS Modules         | UI プリミティブ優先。残りを Tailwind CSS で表現する                             |
| SEO          | `next/head`                     | Astro layout の `<head>` props に集約する                                       |
| RSS          | Next.js API Route               | ビルド時 static endpoint として生成する                                         |
| 再生成       | Next.js revalidate              | 記事更新時の Vercel 再デプロイに置換する                                        |

## 実装方針

### 1. データ取得を先に安定させる

- `SITE_API_BASE_URL` を必須のビルド時環境変数として扱う
- `GET /posts` と `GET /posts/:id` のレスポンスを `Post` として検証する
- 404、非 2xx、JSON 不正、通信失敗を区別したエラーにする
- API 取得失敗時に空サイトを正常デプロイしない
- 一度取得した一覧を可能な範囲で記事パスと RSS に再利用する
- draft が公開ビルドへ混入しないことを確認する

### 2. Astro を基本とし、React は必要箇所だけ使う

一覧、記事、About、RSS は Astro コンポーネントとして静的生成する。

`packages/ui` は React コンポーネントなので、Astro から利用するために React integration を導入する。`Box` / `Stack` / `Cluster` / `Center` やアイコンはクライアント JS を付けずに静的 HTML として描画する。検索やテーマ切り替えのようにブラウザ状態が必要な部分だけ hydration する。

`packages/ui/Button` は `next/link` 依存を含むため、そのまま共有せず、Next.js 非依存化するか Astro のリンクとして実装する。

### 3. Markdown は互換性をテストしてから切り替える

- 見出し、段落、リンク、リスト、インラインコード、コードブロックを確認する
- 既存記事で使われている Markdown / MDX 構文をサンプル化する
- raw HTML や MDX 固有 JSX の利用有無を確認する
- 外部画像、幅・高さ、レスポンシブ表示を確認する
- コードブロックの言語指定と未指定の両方を確認する
- 外部リンクには安全な `target` / `rel` を設定する

### 4. 静的サイトとして不要な API Route を持たない

Astro 版には Content API の proxy、管理 API、認証 API、revalidate API を置かない。公開サイトはビルド時の読み取り専用クライアントと静的成果物だけを持つ。

## 実装フェーズ

### Phase A: 開発・ビルド基盤

- Astro と関連依存を採用バージョンへ更新・固定する
- React integration と Tailwind CSS を設定する
- `@gaaamii/domain`、`@gaaamii/utils`、`@gaaamii/ui` を参照可能にする
- `apps/site-astro/.env.example` を追加する
- API client と記事 repository を追加する
- ルート package scripts に `site-astro` の dev/build/preview 導線を追加する
- ローカル mock API への接続手順を README または docs に記載する

成果物:

- ローカル mock と実 API base URL を切り替えられる
- `yarn workspace @gaaamii/site-astro build` が実データ構造で成功する

### Phase B: 共通レイアウトとデザイン基盤

- title、description、canonical、OG/Twitter metadata を扱う layout を作る
- navigation、main、footer、avatar を移植する
- favicon と logo を移植する
- light/dark theme と初期表示時のちらつき対策を実装する
- CSS Modules を使わず UI プリミティブと Tailwind CSS で構成する

成果物:

- 全ページで共通レイアウトとテーマが現行同等に表示される

### Phase C: 記事一覧

- 実 API から公開記事を取得する
- 公開日と記事リンクを表示する
- `?query=` を使ったタイトル検索を移植する
- JavaScript 無効時も全記事へ到達できる HTML を維持する
- 空一覧と取得失敗を区別する

成果物:

- `/` の表示、検索、レスポンシブ表示が現行同等に動く

### Phase D: 記事詳細と Markdown

- 公開記事一覧から static paths を生成する
- 記事詳細を取得し、Markdown をビルド時に HTML 化する
- Article、公開日、戻るリンクを移植する
- コードハイライトと画像表示を移植する
- title、description、canonical、Twitter Card を記事ごとに生成する
- API から取得できない記事で壊れたページを生成しない

成果物:

- 既存公開記事がすべてビルドされ、代表記事の表示差分が許容範囲に収まる

### Phase E: 固定ページ、404、RSS

- About ページを移植する
- `404.astro` を追加する
- `/feed` を static endpoint として生成する
- RSS には公開記事だけを含める
- RSS の URL、日付、文字コード、Content-Type を確認する

成果物:

- `/about`、存在しない URL、`/feed` が現行 URL のまま動く

### Phase F: Vercel preview と再デプロイ導線

- `apps/site-astro` を別の Vercel Project または preview 環境へ接続する
- Root Directory、Build Command、Output Directory、環境変数を設定する
- Content API の保存成功後に Vercel デプロイを起動する
- draft 保存では公開サイトを更新しない方針を基本とし、publish または公開記事の更新時だけ起動する
- デプロイの連続起動、失敗通知、手動再実行を確認する
- editor の preview URL を Astro preview へ向ける

成果物:

- 記事公開・更新から静的サイト反映までの一連の動作を preview 環境で確認できる

### Phase G: 回帰確認と正式昇格

- 主要画面を現行 Next.js と比較する
- production build、リンク、RSS、404、メタデータを確認する
- Lighthouse 等で致命的な性能・アクセシビリティ退行がないことを確認する
- `apps/site` を `apps/site-legacy` へ移動する
- `apps/site-astro` を正式な `apps/site` へ昇格する
- workspace scripts、Vercel 設定、README、デプロイドキュメントを更新する
- 安定稼働確認後に `apps/site-legacy` の削除を別変更として行う

成果物:

- `blog.gaaamii.jp` が Astro 版から配信される
- 通常の `dev:site` / `build:site` が Astro 版を対象にする

## Vercel 設定方針

Astro 版を preview する段階では以下を基準にする。

- Root Directory: `apps/site-astro`
- Framework Preset: Astro
- Build Command: `yarn build`
- Output Directory: `dist`
- Production Domain: 正式切り替えまでは付与しない

必要な環境変数:

- `SITE_API_BASE_URL`: ビルド時に使用する Content API
- `SITE_URL`: canonical、OG、RSS に使用するサイト URL

デプロイ起動用シークレットは site のビルドには不要であり、Content API またはサーバー側の中継処理にだけ設定する。

## テスト・検証方針

### 自動確認

- TypeScript / Astro check
- production build
- 生成対象の記事数と公開記事数の一致
- 主要ルートの存在確認
- RSS XML の parse と必須項目確認
- 内部リンク切れ確認
- Markdown fixture の snapshot または HTML 構造確認

### 手動確認

- PC / mobile の一覧、記事、About、404
- light / dark theme
- 検索と URL query の同期
- 日本語記事、英語記事、長いタイトル
- コードブロック、インラインコード、リンク、リスト、画像
- OGP/Twitter metadata
- 記事公開から Vercel 再デプロイ、公開反映まで

## PR 分割案

1. Astro 基盤、環境変数、data access layer
2. 共通レイアウト、Tailwind、テーマ
3. 記事一覧と検索
4. 記事詳細、Markdown、メタデータ
5. About、404、RSS
6. Vercel preview と記事更新時の再デプロイ
7. 回帰確認と `apps/site` への正式昇格
8. 安定稼働後の `apps/site-legacy` 削除

各 PR は `site-astro` の production build が通る状態を維持し、Next.js 版の本番配信には正式切り替えまで影響を与えない。

## リスクと対策

### API 障害でデプロイできない

- API エラーを空配列へ変換せず build を失敗させる
- 直前の正常デプロイを継続配信する
- Vercel の失敗通知と手動再実行手順を用意する

### 記事更新から反映まで時間がかかる

- editor では保存成功と公開反映待ちを区別する
- 初期移行では許容し、必要になった時点でオンデマンド生成へ移行する

### 更新が集中してデプロイが重複する

- publish と公開記事更新に起動条件を限定する
- 必要に応じて Content API 側で debounce または重複抑制を行う

### Markdown の表示が変わる

- 代表記事と構文 fixture を先に用意する
- raw HTML、画像、コードブロックを優先して比較する
- 全記事を preview build してから切り替える

### React 依存を Astro へ持ち込みすぎる

- 静的表示は Astro を基本とする
- React integration は共有 UI と必要な island に限定する
- hydration の有無をコンポーネント単位で明示する

### デプロイシークレットが漏れる

- editor の `VITE_*` 環境変数には入れない
- ブラウザからデプロイ URL を直接呼ばない
- Content API またはサーバー側だけに保持する

## 今回のスコープ外

- Astro / Vercel によるオンデマンド生成
- 記事 API の再設計
- CMS やデータストアの変更
- 公開サイトの大規模な UI リニューアル
- editor の記事編集 UX 変更
- コメント、タグ、全文検索などの新機能

## Definition of Done

以下を満たしたら site の Astro 移行完了とみなす。

- `/`、`/posts/:id`、`/about`、`/feed`、404 が Astro から提供される
- 全公開記事が静的生成され、draft が含まれない
- 記事一覧、検索、Markdown、コード、画像、テーマが現行相当で動く
- title、description、canonical、OG/Twitter metadata が設定される
- 記事公開・更新時に Vercel の再デプロイが起動し、公開内容へ反映される
- デプロイ起動用シークレットがブラウザへ露出していない
- production build と主要な自動確認が通る
- ローカル開発、build、deploy、失敗時の再実行手順が文書化されている
- Astro 版が正式な `apps/site` として扱われる
- 現行 Next.js 版を残す理由と削除条件が明確になっている

## 将来バックログ

静的再デプロイ方式で運用を開始した後、更新頻度とビルド時間を計測してオンデマンド生成の導入を判断する。

- Astro / Vercel の採用可能なオンデマンド生成方式を再調査する
- 記事単位の更新、一覧・RSS の更新整合性を設計する
- キャッシュ無効化と失敗時のロールバックを設計する
- 現在の data access layer と表示コンポーネントを維持したまま生成方式を置換する
