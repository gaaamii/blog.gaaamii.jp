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

### Versions follow the Astro 5 compatibility line

Astro は既存 lockfile で検証済みの `5.18.2`、React integration は Astro 5 対応の
`4.4.2` に固定した。React integration 6 は型チェックだけでは検出できない renderer
互換エラーが production build で発生したため採用しない。Tailwind CSS と Vite integration
は `4.3.3`、Vite は Astro が利用する `6.4.3` に揃えた。

### Environment variables fail the build

`SITE_API_BASE_URL` と `SITE_URL` は暗黙の production fallback を持たない必須値とした。
設定漏れや不正な URL は build を失敗させ、誤った API や canonical URL を使った成果物を公開しない。

### Content API is server-only

API client は Astro frontmatter からのみ呼び出し、`PUBLIC_` prefix を使わない。
ブラウザへ API base URL、cookie、認証情報を渡さず、リクエスト時にも API を呼ばない。

### Public repository filters drafts defensively

公開 API は published のみを返す契約とし、ローカル mock も同じ契約へ変更した。
加えて repository でも status を検査し、一覧と詳細の双方で draft を公開生成対象から除外する。

### API failures remain distinguishable

設定不備、通信失敗、404、その他の HTTP error、JSON 不正、レスポンス shape 不正を
別の error class とした。空配列へ変換せず、そのまま build を失敗させる。

### Shared UI renders as static HTML

React integration は `packages/ui` を再利用するために導入するが、共通 UI には hydration directive を
付けない。Phase 1 では `Center` をレイアウトに利用し、共有 package 解決と静的レンダリングを確認する。
