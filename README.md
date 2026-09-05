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

旧 Next.js 版は `apps/editor-legacy` に残しており、`yarn dev:editor-legacy` で起動できる。
