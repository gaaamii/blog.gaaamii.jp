# Site Astro Phase F: Preview and redeploy

> Phase Gの正式昇格後、Astro版のRoot Directoryは `apps/site`、確認コマンドは
> `yarn check:site` / `yarn build:site` へ変更される。以下はPhase F時点のpreview構成を記録したもの。

## Vercel project

正式切り替え前は、Astro版を既存のNext.js版とは別のVercel Projectへ接続する。

- Root Directory: `apps/site-astro`
- Framework Preset: Astro
- Build Command: `yarn build`
- Output Directory: `dist`
- Include source files outside the Root Directory: enabled
- Production Domain: 正式切り替えまでは付与しない

Astro版はworkspace内の `packages/domain`、`packages/ui`、`packages/utils` を参照するため、
Root Directory外のソースをBuild Stepへ含める。

Vercelには次の環境変数をPreviewとProductionの両方へ設定する。

- `SITE_API_BASE_URL`: ビルド時に公開記事を読むContent APIのURL
- `SITE_URL`: canonical、OG、RSSに使用する公開URL

Previewで本番ドメイン向けのmetadataを確認する場合も、`SITE_URL` はPreview固有URLではなく
最終的な公開URLを設定する。

## Redeploy contract

editorは公開サイトへ影響する保存が成功した後、同じ認証付きContent APIへ
`POST /site_deployments` を送る。

再デプロイを要求する操作:

- 新しい記事の公開
- 公開記事の更新
- 公開記事を下書きへ戻す操作
- 公開記事の削除

新規下書きの保存と下書き記事の更新では要求しない。記事保存と再デプロイ要求は別の結果として扱い、
再デプロイ要求が失敗しても保存を失敗扱いにしない。

Content APIの `POST /site_deployments` は次の責務を持つ。

1. editorと同じセッションで認証・認可する
2. サーバー側の `VERCEL_SITE_DEPLOY_HOOK_URL` を呼ぶ
3. Vercelが要求を受理した場合は `202 Accepted` を返す
4. Deploy HookのURLやtokenをレスポンス、ログ、ブラウザ用環境変数へ出さない
5. Vercelが要求を拒否した場合は非2xxを返し、監視可能なログを残す

Deploy HookはAstro版Vercel ProjectのProduction branch用に作成する。連続更新が多い場合は、
Content API側で短時間の重複要求をまとめる。

## Verification

### Repository

```bash
yarn build:editor
yarn check:site-astro
SITE_API_BASE_URL=https://api.example.com SITE_URL=https://blog.example.com yarn build:site-astro
```

### Preview environment

1. Astro版Projectを手動デプロイし、`/`、`/about`、`/feed`、代表記事、404を確認する
2. 下書きを保存し、新しいdeploymentが作られないことを確認する
3. 記事を公開し、新しいdeploymentが作られることを確認する
4. deployment完了後、一覧、記事、RSSへ反映されることを確認する
5. 公開記事を下書きへ戻し、一覧、記事、RSSから消えることを確認する
6. Deploy Hookを一時的に失敗させ、記事保存は成功しeditorに再デプロイ失敗が表示されることを確認する
7. Vercelから手動で再デプロイし、復旧できることを確認する

## Cutover prerequisites

- Previewで主要ルートとmetadataの回帰確認が完了している
- Content APIへ `POST /site_deployments` が実装・デプロイ済みである
- publishから公開反映までの所要時間が許容範囲である
- Vercelの失敗通知と手動再実行の担当・手順が決まっている
- Deploy Hookの秘密値がContent API以外へ露出していない
