# Rearchitecture Phase 2 Editor Router Implementation Plan

`apps/editor` を移行元として、`apps/editor-router` を雛形から実運用可能な管理画面へ引き上げるための実装計画をまとめる。

## 目的

- `apps/editor` の現行機能を `apps/editor-router` へ移植する
- Next.js 固有依存を除去し、React Router ベースの画面遷移とデータ取得へ置き換える
- ローカル確認と段階移行ができるよう、API 依存と公開サイト依存を明文化する

## 現状サマリー

2026-08-16 時点で `apps/editor-router` に存在するのは PoC 用の最小ルートのみ。

- `/`
- `/posts/new`
- `/posts/:id`
- `/posts/:id/edit`

実装済みなのは以下まで。

- ルート定義
- `user_sessions/ping` を叩く簡易認証ガード
- 各ページのプレースホルダ表示

未実装なのは以下。

- 記事一覧の取得と絞り込み
- 記事詳細の取得と本文表示
- 新規作成フォーム
- 編集フォーム
- 削除
- Cloudinary 画像アップロード
- 画面レイアウト移植
- 共有 API クライアント化
- 公開サイトへのプレビュー導線

## 移行対象の棚卸し

### ルート対応

| 旧 (`apps/editor`) | 新 (`apps/editor-router`) | 現状 | 備考 |
| --- | --- | --- | --- |
| `/` | `/` | PoC のみ | 記事一覧、status filter、削除導線が必要 |
| `/posts/new` | `/posts/new` | PoC のみ | 投稿フォーム移植が必要 |
| `/posts/:id` | `/posts/:id` | PoC のみ | 記事詳細、Markdown 表示が必要 |
| `/posts/:id/edit` | `/posts/:id/edit` | PoC のみ | 初期値ロード付き編集フォームが必要 |

### 移植対象コンポーネント

- `components/feature/AdminLayout`
- `components/feature/MainLayout`
- `components/feature/Article`
- `components/feature/PostLink`
- `components/feature/Markdown`
- `components/feature/Form/*`
- `hooks/useAuthorization`
- `hooks/useFetchPostsAsAdmin`
- `hooks/useFetchPostAsAdmin`
- `hooks/useBlockNavigation`
- `lib/api`
- `lib/cloudinary`

### 既存 API 依存

- `GET /user_sessions/ping`
- `GET /admin/posts`
- `GET /admin/posts/:id`
- `POST /posts`
- `PUT /posts/:id`
- `DELETE /posts/:id`
- `GET /cloudinary_signature`

## Next.js 固有依存の置換方針

### ルーティング

- `next/link` は `react-router-dom` の `Link` へ置換する
- `next/router` は `useParams`, `useNavigate`, `useSearchParams` へ置換する

### `<Head>`

- まずは移植を優先し、初期段階では title 管理を省略してよい
- 必要なら後続で `react-helmet-async` などを導入する

### API route への依存

- `editor-router` はローカル開発用の `msw` mock API を内包する
- フロントは HTTP 越しに `apps/editor-router` 側で起動する `msw` プロセスへ接続する前提で移植する
- Next.js の pages API を直接移植先の前提にはせず、移行期間中のローカル API 提供源は `msw` に寄せる
- API の実装責務は当面 `apps/editor-router` 側の mock API に寄せる

### `beforeunload`

- 既存の `useBlockNavigation` はそのまま流用可能
- React Router 内の画面内遷移ブロックは別途必要なら追加する

## 実装方針

### 1. 先に UI と API クライアントを移す

画面ごとにゼロから書き直すより、現行 `apps/editor` の feature component を React Router 互換へ寄せて再利用する。

- フォーム UI
- Markdown 表示
- 記事一覧 UI
- 記事詳細 UI

この段階で Next.js 固有 import を除去する。

### 2. データ取得は route 単位で閉じる

PoC の `useEffect + fetch` を増やすより、React Router 側の route module に寄せる。

- 一覧ページ: filter を URL search params に載せる
- 詳細ページ: `:id` から取得
- 編集ページ: `:id` から初期値取得
- 新規/編集/削除: action 相当の submit ハンドラに集約

ただし初回は既存 hook ベースの移植でもよい。先に画面を揃え、その後 route loader/action へ整理する。

### 3. レイアウトは `packages/ui` プリミティブ優先で再構成する

このリポジトリの作業ルールに合わせる。

- `Box`
- `Stack`
- `Cluster`
- `Center`

既存の Tailwind class は必要箇所のみに残す。

## 実装フェーズ

### Phase A: 起動導線と土台整理

- ルート `package.json` に `editor-router` 用 script を追加する
- `apps/editor-router` 側に `msw` 起動導線を追加する
- `apps/editor-router` に共通レイアウトと共通 styles の置き場を作る
- `lib/api` を `apps/editor-router` へ移植する
- `NEXT_PUBLIC_*` 前提の env 名を Vite 向けに整理する

成果物:

- `yarn workspace @gaaamii/editor-router dev` で一覧画面開発が回る
- `apps/editor-router` 側の `msw` プロセスを別起動し、`editor-router` から疎通できる
- API base URL を明示的に切り替えられる

### Phase B: 認証ガードを実運用レベルにする

- `useAuthorization` を `isLoading` / `isAuthorized` / `error` を返す形へ統一する
- ガード表示を各ページ個別ではなくルートレイアウトへ寄せる
- 未認証時の表示方針を統一する

成果物:

- どの route でも認証状態が同じ UX で扱われる

### Phase C: 一覧画面を移植する

移植元は `apps/editor/pages/index.tsx`。

- status filter を移植
- 一覧取得 hook を移植
- `PostLink` と日付表示を移植
- 削除ボタンと再取得を移植
- エラー時のメッセージを移植

追加で整理したい点:

- status filter は local state ではなく URL search params に持たせる
- `selected` 属性ではなく controlled component にする

成果物:

- 記事一覧、絞り込み、削除が動く

### Phase D: 詳細画面を移植する

移植元は `apps/editor/pages/posts/[id].tsx`。

- `useFetchPostAsAdmin` を移植
- `Article` と `MarkdownCompiledOnClient` を移植
- 読込中、取得失敗、未認証の分岐を整理する

追加で整理したい点:

- `pageTitle` state は今は未使用なので削除してよい
- `Not Found` を文字列返却する実装は route error UI へ寄せる

成果物:

- 管理側の記事詳細が表示される

### Phase E: 新規作成画面を移植する

移植元は `apps/editor/pages/posts/new.tsx`。

- `Form` 一式を移植
- `POST /posts` を使う submit を移植
- `useBlockNavigation` を移植
- 成功/失敗時の通知を移植

追加で整理したい点:

- 保存完了後に form reset する挙動が妥当か確認する
- draft 保存と publish で成功メッセージを分ける
- 成功時 UX は当面 `alert` を維持する

成果物:

- 新規投稿と下書き保存が動く

### Phase F: 編集画面を移植する

移植元は `apps/editor/pages/posts/[id]/edit.tsx`。

- 初期値ロード付き `Form` を移植
- `PUT /posts/:id` を使う submit を移植
- `postId` による preview link を移植
- preview link の向き先は `site` 側ローカル URL を使う

追加で整理したい点:

- 取得失敗時のエラー表示を追加する
- 保存成功後の UX は当面遷移させず `alert` を維持する

成果物:

- 既存記事の編集と保存が動く

### Phase G: Cloudinary 画像アップロードを移植する

- `lib/cloudinary` を Vite 環境変数へ置換する
- `ImageForm` を移植
- `GET /cloudinary_signature` と Cloudinary upload の動作確認を行う

追加で整理したい点:

- アップロード後 URL のコピー導線が必要か確認する

成果物:

- フォーム内から画像アップロードできる

### Phase H: 共通化と削除準備

- `apps/editor` と `apps/editor-router` の重複コードを比較する
- 共有すべきものを `packages/*` へ移す
- 旧 `apps/editor` を参照しているドキュメントや script を更新する

成果物:

- `editor-router` が editor の主系統として扱える

## 実装順の理由

一覧を先に移す理由は、認証、API、レイアウト、削除導線の大半を最短で通せるから。

フォームを後段に置く理由は、Cloudinary と navigation block と submit フローが絡み、一覧・詳細より依存が多いため。

## route migration table

| 優先度 | route | 旧実装の主責務 | 新実装の主責務 |
| --- | --- | --- | --- |
| P1 | `/` | 認証後に記事一覧、status 絞り込み、削除 | layout 配下で一覧表示、search params 管理、削除後再検証 |
| P1 | `/posts/:id` | 管理用記事詳細、Markdown 表示 | `:id` 読込、エラー分岐、Markdown 表示 |
| P1 | `/posts/new` | 新規投稿、下書き保存、画像アップロード | form submit、block navigation、upload |
| P1 | `/posts/:id/edit` | 既存記事編集、プレビュー | 初期値読込、更新 submit、preview link |

## リスク

- `apps/editor-router` 側の `msw` mock API を維持するか、別の API 提供方法へ置き換えるかは今後の判断対象
- `editor-router` 単体では完結せず、ローカル確認時は `site` と `msw` の 2 系統依存が残る
- env 名が `NEXT_PUBLIC_*` 前提のため、Vite へ寄せる整理が必要
- 既存 component の一部は `next/link` 前提で、単純移植では崩れる
- React Router 化の初期段階で loader/action を後回しにすると、hook ベース実装が残る

## Definition of Done

以下を満たしたら `apps/editor-router` の実装移行完了とみなす。

- `/`, `/posts/new`, `/posts/:id`, `/posts/:id/edit` が現行 `apps/editor` 相当で動く
- 認証ガード、一覧取得、詳細取得、作成、更新、削除、画像アップロードが動く
- 主要画面から Next.js 依存 import が消えている
- ローカル起動手順がルート README か docs に明文化されている
- `apps/editor` を残す理由がなくなっている

## 確定済み事項

- `editor-router` は当面 `apps/editor-router` 側で用意する `msw` プロセスへ接続する
- 編集画面のプレビューは `site` 側のローカル URL を向ける
- 作成・更新成功後の UX は当面 `alert` を維持する
