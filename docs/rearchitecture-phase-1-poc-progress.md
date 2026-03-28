# Rearchitecture Phase 1 PoC Progress

Phase 0 で定義した方針に沿って、実装フェーズの最初の土台として
Astro / React Router の最小アプリを追加した。

## 追加したアプリ

- `apps/site-astro`
  - Astro の最小構成
  - ルート: `/`, `/about`, `/posts/:id`
  - `getStaticPaths` を使った dynamic route を実装
- `apps/editor-router`
  - React Router（Vite）最小構成
  - ルート: `/`, `/posts/new`, `/posts/:id`, `/posts/:id/edit`
  - `/api/mock/user_sessions/ping` を用いた簡易認証ガードを実装

## 目的

- 既存 Next.js アプリを壊さずに、移行先フレームワークの実行可能な足場を先に作る
- ルーティング構成と認証ガードの実装イメージを具体化する
- 次の PR で API クライアント統合やページ単位移植に着手できる状態にする

## 次アクション

1. `site-astro` 側へ既存記事データ取得の接続
2. `editor-router` 側へ一覧/編集フォーム接続
3. 共通 API クライアントを `packages/*` へ移設
4. 本番デプロイ導線（site/editor）を分離
