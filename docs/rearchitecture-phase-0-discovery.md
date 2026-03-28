# Rearchitecture Phase 0 Discovery (Astro / React Router)

## 目的

本フェーズでは実装に入る前に、現行構成を棚卸しし、次フェーズで迷わないための判断材料を揃える。

- `site` は **Astro** へ移行する
- `editor` は **React Router** へ移行する
- まずは「責務境界」「ルート対応」「依存関係」「移行順」を明文化する

## 現状サマリー（2026-03-28 時点）

- ルートは Yarn workspaces 構成
- 既に `apps/site` と `apps/editor` が存在し、どちらも Next.js を利用
- 共通コードは `packages/ui`, `packages/domain`, `packages/utils`, `packages/config` に分離済み

## ルート棚卸し

### site（公開向け）

- `/`
- `/posts/:id`
- `/about`
- `/404`

### editor（管理向け）

- `/`
- `/posts/:id`
- `/posts/:id/edit`
- `/posts/new`

## API と責務の棚卸し

### site 側 API（現状）

- `/api/feed`（RSS）
- `/api/revalidate`
- `/api/mock/posts`, `/api/mock/posts/:id`
- `/api/mock/admin/posts`, `/api/mock/admin/posts/:id`

### editor 側 API（現状）

- `/api/mock/posts`, `/api/mock/posts/:id`
- `/api/mock/admin/posts`, `/api/mock/admin/posts/:id`
- `/api/mock/user_sessions/ping`（認証確認）
- `/api/mock/cloudinary_signature`（画像アップロード署名）

### 責務整理メモ

- `user_sessions/ping` と `cloudinary_signature` は editor 専用責務として確定
- `feed` は site 専用責務として確定
- 管理操作 API（`/admin/posts*`）は editor へ寄せるのが自然

## 認証・セッション・アップロード依存

- editor は `useAuthorization` により `/user_sessions/ping` を前提に画面制御
- editor の画像アップロードは Cloudinary 署名 API（`/cloudinary_signature`）を前提
- site 側の Cloudinary 実装は「editor only」で例外を投げる実装になっており、公開側依存はない

## 共有境界（Phase 1 以降で維持するルール）

### 共有してよいもの（packages）

- `packages/domain`: Post 型などのドメイン型
- `packages/utils`: 日付・環境判定などの非 UI ロジック
- `packages/ui`: UI プリミティブ（`Box` / `Stack` / `Cluster` / `Center`）

### 共有しないもの（apps 固有）

- ルーティング定義
- 認証画面制御
- API route 実装
- 画面単位の feature component

## ターゲットアーキテクチャ（合意案）

### site（Astro）

- `apps/site` を Astro プロジェクトとして再構成
- 公開ルート（`/`, `/posts/:id`, `/about`）を Astro 側で提供
- SSG/SSR の方式はページ単位で決定（まずは既存挙動に合わせる）

### editor（React Router）

- `apps/editor` を React Router 構成へ再構成
- 現在の管理ルートを React Router 側へ移植
- 認証ガード・ローダー/アクション設計は editor 内に閉じる

## 技術検証タスク（Phase 0 完了条件）

1. Astro 側 PoC
   - dynamic route（`/posts/:id`）
   - markdown レンダリング互換の確認
   - RSS 生成の置き換え方針確認
2. React Router 側 PoC
   - ルートネスト（`/posts/:id/edit`）
   - 認証ガード（`/user_sessions/ping`）
   - フォーム送信（新規/更新）
3. 共通パッケージ互換性
   - `@gaaamii/*` を両ランタイムで参照できるか
   - 型共有とビルド順の確認
4. デプロイ境界
   - site/editor の環境変数を完全分離
   - 既存デプロイ設定との差分確認

## リスクと先回り対応

- **既存 Next.js API route 依存**: 移行後の API 提供方法を先に決める
- **React Router のデータフェッチ責務**: loader/action 採用可否を早期判断
- **Astro の記事描画差分**: markdown/rehype の互換確認を PoC で先行
- **移行中の二重運用コスト**: 画面単位で段階移行し、旧画面を順次凍結

## Phase 1 へ渡す実行バックログ

1. `apps/site` Astro 初期化と最低限レイアウト作成
2. `apps/editor` React Router 初期化（認証ガード付き）
3. API クライアントを `packages` に寄せる設計案作成
4. route migration table（旧実装 -> 新実装）を PR 単位へ分割
5. CI の `site` / `editor` 個別 build job 定義

## Definition of Done（Phase 0）

以下が満たせたら Phase 0 完了とする。

- ルート、API、認証、アップロード責務の境界が文書化されている
- Astro / React Router への移行先と移行順が明文化されている
- Phase 1 で着手する PoC と実装バックログが確定している
