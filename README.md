https://blog.gaaamii.jp のソースコード。

## Development

### Install dependencies

```bash
corepack enable
pnpm install
```

pnpm は `packageManager` で `10.34.5` に固定している。インストール時には
`pnpm-workspace.yaml` のサプライチェーンポリシーが適用される。

- 公開から24時間未満のパッケージは解決しない
- 最近1年以内のリリースで公開時の信頼情報が低下した場合は失敗する
- 推移依存からGit URLや直接tarballを導入できない
- 依存パッケージのinstall scriptは、バージョン単位で明示許可する

`ERR_PNPM_IGNORED_BUILDS` が発生した場合は自動承認せず、対象パッケージの
依存元とscript内容を確認してから `allowBuilds` をバージョン付きで更新する。

### Start dev server

```
pnpm dev:site
```

### Start editor with mock API

`apps/editor` のローカル確認では、先に `apps/editor` 側の mock API を起動する。

1. mock API を起動する

```bash
pnpm dev:editor-mock-api
```

2. editor を起動する

```bash
pnpm dev:editor
```

3. 必要なら site 側も起動する

```bash
pnpm dev:site
```

- `editor`: `http://localhost:3200`
- mock API: `http://127.0.0.1:3005`
- preview link の向き先: site 側ローカル URL

### Start site with mock API

`apps/site` はAstroで構築され、ビルド時だけ Content API を読み、`SITE_API_BASE_URL`
をブラウザへ公開しない。ローカルでは editor の mock API を利用できる。

1. mock API を起動する

```bash
pnpm dev:editor-mock-api
```

2. 別のターミナルで Astro site を起動する

```bash
SITE_API_BASE_URL=http://127.0.0.1:3005/api/mock \
SITE_URL=http://localhost:3100 \
pnpm dev:site
```

production build と preview も同じ環境変数を指定し、
`pnpm build:site`、`pnpm preview:site` を実行する。

site 用の root command:

- `pnpm dev:site`: 開発サーバーを port 3100 で起動し、変更を監視する
- `pnpm check:site`: Astro と TypeScript の型・構文を検査する
- `pnpm build:site`: Content API を読み、静的ファイルを `dist` に生成する
- `pnpm preview:site`: 生成済みの `dist` を port 3100 で確認する
