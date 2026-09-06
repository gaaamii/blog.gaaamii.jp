https://blog.gaaamii.jp のソースコード。

## Development

### Install dependencies

```
yarn
```

### Start dev server

```
yarn dev
```

### Start editor with mock API

`apps/editor` のローカル確認では、先に `apps/editor` 側の mock API を起動する。

1. mock API を起動する

```bash
yarn dev:editor-mock-api
```

2. editor を起動する

```bash
yarn dev:editor
```

3. 必要なら site 側も起動する

```bash
yarn dev:site
```

- `editor`: `http://localhost:3200`
- mock API: `http://127.0.0.1:3005`
- preview link の向き先: site 側ローカル URL

### Start Astro site with mock API

`apps/site-astro` はビルド時だけ Content API を読み、`SITE_API_BASE_URL`
をブラウザへ公開しない。ローカルでは editor の mock API を利用できる。

1. mock API を起動する

```bash
yarn dev:editor-mock-api
```

2. 別のターミナルで Astro site を起動する

```bash
SITE_API_BASE_URL=http://127.0.0.1:3005/api/mock \
SITE_URL=http://localhost:3100 \
yarn dev:site-astro
```

production build と preview も同じ環境変数を指定し、
`yarn build:site-astro`、`yarn preview:site-astro` を実行する。
