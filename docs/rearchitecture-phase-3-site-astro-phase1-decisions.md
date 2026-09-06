# Site Astro Phase 1 Decisions

`rearchitecture-phase-3-site-astro-implementation-plan.md` の PR 分割 1、
実装フェーズ A を Phase 1 として実施した際の判断を記録する。

## Scope

- Astro、React integration、Tailwind CSS、型チェックのバージョンを固定する
- workspace の domain、utils、ui package を Astro から参照可能にする
- build-time 専用の Content API client と記事 repository を追加する
- root scripts とローカル mock API を使う開発導線を追加する
- PoC の固定記事を Content API の公開記事へ置き換える

共通レイアウトの本移植、検索、Markdown、RSS、404、テーマは後続 Phase とする。

## Decisions

### Versions use the latest Astro compatibility line

2026-09-06 時点の最新安定版である Astro `7.3.1` と React integration `6.0.5` に
固定した。Astro 7 の実行条件に合わせて Node.js `>=22.12.0` を前提とし、Vite は
`8.2.2`、Tailwind CSS と Vite integration は `4.3.3` に揃えた。

### Environment variables fail the build

`SITE_API_BASE_URL` と `SITE_URL` は暗黙の production fallback を持たない必須値とした。
設定漏れや不正な URL は build を失敗させ、誤った API や canonical URL を使った成果物を公開しない。

### Content API is server-only

API client は Astro frontmatter からのみ呼び出し、`PUBLIC_` prefix を使わない。
ブラウザへ API base URL、cookie、認証情報を渡さず、リクエスト時にも API を呼ばない。

### Data access uses functions

Content API client と記事 repository は状態を持つ class にせず、処理単位の関数として定義する。
テスト時に差し替える API URL と `fetch` は関数の option で受け取る。
モジュールスコープには再代入を伴う cache を持たず、data access の変数は原則 `const` とする。

### The public API returns only visible posts

公開 API は site から閲覧可能な記事だけを返す契約とし、ローカル mock も同じ契約へ変更した。
site の data access とページでは `published` status を判定せず、`getPosts` / `getPost` の結果をそのまま使う。

`GET /posts` は本文を含まないため、`id`、`title`、`published_at` だけの `PostSummary` として扱う。
`body` を含む `PostDetail` は `GET /posts/:id` から取得し、一覧と詳細を別々の response shape として検証する。

### API failures remain distinguishable

設定不備、通信失敗、HTTP error、JSON 不正、レスポンス shape 不正は、判別可能な message を
持つ標準 `Error` とする。独自 Error class は設けず、空配列へ変換せずに build を失敗させる。

### Shared UI renders as static HTML

React integration は `packages/ui` を再利用するために導入するが、共通 UI には hydration directive を
付けない。Phase 1 では `Center` をレイアウトに利用し、共有 package 解決と静的レンダリングを確認する。
