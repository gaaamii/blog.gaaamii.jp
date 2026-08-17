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

### Start editor-router with mock API
`apps/editor-router` のローカル確認では、先に `apps/editor-router` 側の mock API を起動する。

1. mock API を起動する
```bash
yarn dev:editor-mock-api
```

2. editor-router を起動する
```bash
yarn dev:editor-router
```

3. 必要なら site 側も起動する
```bash
yarn dev:site
```

- `editor-router`: `http://localhost:3200`
- mock API: `http://127.0.0.1:3005`
- preview link の向き先: site 側ローカル URL
