# Site Astro Phase G: Production promotion

## Repository layout

- `apps/site`: 正式な公開サイトとして扱うAstroアプリ
- 旧Next.jsアプリは安定稼働確認後のクリーンアップで削除済み

通常の開発・検証には次のコマンドを使用する。

```bash
yarn check:site
SITE_API_BASE_URL=https://api.gaaamii.jp SITE_URL=https://blog.gaaamii.jp yarn build:site
yarn preview:site
```

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
旧Next.js実装への切り戻しは行わず、Git履歴から必要な変更を調査する。
