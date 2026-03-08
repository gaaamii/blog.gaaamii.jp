# Vercel Deploy Checklist For Phase 1

## 目的

`apps/site` と `apps/editor` を Vercel 上で別 Project としてデプロイし、以下の 2 つのサブドメインで配信する。

- `blog.gaaamii.jp`
- `blog-editor.gaaamii.jp`

このドキュメントは、リアーキテクチャ第1フェーズのデプロイ準備用チェックリストである。

## デプロイ前にやること

- `yarn workspace @gaaamii/site build` が通る状態にする
- `yarn workspace @gaaamii/editor build` が通る状態にする
- `apps/site` と `apps/editor` の環境変数を確定する
- editor から site 側 API を読む前提の本番 CORS 方針を決める
- Cloudinary を使う場合は editor 側の設定値を揃える
- revalidate を使う場合は site 側の `SECRET_TOKEN` を設定する

## Vercel Project 構成

### site 用 Project

- Root Directory: `apps/site`
- Domain: `blog.gaaamii.jp`
- Framework Preset: `Next.js`

### editor 用 Project

- Root Directory: `apps/editor`
- Domain: `blog-editor.gaaamii.jp`
- Framework Preset: `Next.js`

## 環境変数

### site

`apps/site/.env.example` を基準に設定する。

- `SITE_API_BASE_URL`
- `NEXT_PUBLIC_SITE_API_BASE_URL`
- `NEXT_PUBLIC_SITE_URL`
- `SECRET_TOKEN`

### editor

`apps/editor/.env.example` を基準に設定する。

- `EDITOR_API_BASE_URL`
- `NEXT_PUBLIC_EDITOR_API_BASE_URL`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_CLOUDINARY_CLOUDNAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

## 重要な確認事項

### 1. editor から site API を呼べること

現在の editor は content 系データ取得を site 側 API に依存している。

そのため、本番では以下が必要になる。

- editor から site 側 API にアクセスできる
- 必要な API が CORS に対応している
- Cookie や認証が必要なら、サブドメイン構成に合わせて整合している

### 2. mock API だけでなく本番 API の CORS も必要

開発中は mock API に対して CORS 対応を入れているが、本番で editor が site API を直接読むなら、本番で使う API も同等の対応が必要になる。

### 3. セッションと認証の境界

管理画面は `blog-editor.gaaamii.jp` で動かすため、認証やセッション確認がこのドメイン前提で成立するかを確認する。

## 動作確認

### site

- `/`
- `/posts/:id`
- `/about`
- `/feed`

### editor

- `/`
- `/posts/:id`
- `/posts/:id/edit`
- `/posts/new`

## デプロイ後に確認すること

- `blog.gaaamii.jp` が正しく表示される
- `blog-editor.gaaamii.jp` が正しく表示される
- editor から記事一覧を取得できる
- editor から記事詳細プレビューを表示できる
- editor から記事作成、編集ができる
- 画像アップロードが必要なら Cloudinary 連携が動く

## 未解決事項

- 本番 site API の CORS 対応範囲
- 本番認証方式の最終確認
- editor から site API を直接読む構成を維持するかどうか

## 備考

第1フェーズでは、Vercel への分離デプロイを優先し、内部実装の再設計は後続フェーズで行う。
