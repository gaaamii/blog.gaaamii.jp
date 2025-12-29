# Working agreement

## Layout
- 画面のレイアウトには `components/ui` のレイアウトプリミティブ（`Box` / `Stack` / `Cluster` / `Center`）を優先して使う

## Styling
- CSS Modules は非推奨
- レイアウトはまず `components/ui` のレイアウトプリミティブで表現する
- プリミティブで表現できないスタイルのみ Tailwind CSS のクラスで書く
