# Site Astro Phase G: Production promotion

## Repository layout

- `apps/site`: 正式な公開サイトとして扱うAstroアプリ
- `apps/site-legacy`: 切り戻し比較のため一時的に保持する旧Next.jsアプリ

通常の開発・検証には次のコマンドを使用する。

```bash
yarn check:site
SITE_API_BASE_URL=https://api.gaaamii.jp SITE_URL=https://blog.gaaamii.jp yarn build:site
yarn preview:site
```

旧Next.jsアプリは通常のビルド対象にせず、比較が必要な場合に限り
`yarn dev:site-legacy` または `yarn build:site-legacy` を使用する。

## Vercel project

Astro版のVercel Projectを次の設定へ更新する。

- Root Directory: `apps/site`
- Framework Preset: Astro
- Build Command: `yarn build`
- Output Directory: `dist`
- Include source files outside the Root Directory: enabled
- Production Domain: `blog.gaaamii.jp`

環境変数はPhase Fから変更しない。

- `SITE_API_BASE_URL`: `https://api.gaaamii.jp`
- `SITE_URL`: `https://blog.gaaamii.jp`

Root Directoryの更新後に再デプロイし、`apps/site` からProduction Deploymentが
正常に生成されることを確認する。

## Regression checklist

- `/`、`/about`、代表的な `/posts/:id` が200を返す
- 存在しないURLが404を返す
- `/feed` が生成され、公開記事だけを含む
- canonical、OGP、Twitter metadataが本番URLを指す
- 一覧検索、light/dark theme、内部リンクが動作する
- PCとmobileで致命的なレイアウト退行がない
- Content APIの保存後にAstro版の再デプロイが起動する

## Rollback

問題が見つかった場合は、Vercelで直前の正常なAstro Deploymentへ戻す。
旧Next.jsへの切り戻しが必要な場合のみ、旧Projectへドメインを戻し、
`apps/site-legacy` を比較・修復に使用する。

安定稼働確認後、`apps/site-legacy` とNext.js専用依存を別変更で削除する。
