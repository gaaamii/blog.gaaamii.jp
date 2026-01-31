# アーキテクチャ改修プラン

## 目的
- 公開するサイト（公開Web）と認証が必要な管理画面（管理Web）を分離し、モノリポで一元管理する。
- 共通UIをパッケージとして切り出し、再利用性と保守性を高める。
- デザイントークンを`tokens`パッケージに集約し、テーマ/スタイルの一貫性を担保する。

## 前提
- 既存のNext.js構成を前提にしつつ、モノリポ化に合わせたアプリ分割を行う。
- UIレイアウトは`components/ui`のレイアウトプリミティブを優先して利用する方針を継続する。

## ゴール像（モノリポ構成案）
```
repo-root/
  apps/
    web/          # 公開サイト（Astro）
    admin/        # 認証が必要な管理画面（React Router）
    legacy-next/  # 既存Next.jsアプリ（移行対象）
  packages/
    ui/           # 共通UIコンポーネント
    tokens/       # デザイントークン（色/タイポ/スペーシングなど）
  docs/
    architecture-plan.md
```

### apps/web（公開サイト）
- Astro を採用し、公開ページとSEO向けのルーティングを担当。
- `packages/ui`と`packages/tokens`を依存関係として利用する。
- 既存の`pages`や`components`は順次移行する。

### apps/admin（管理画面）
- シンプルなSPA構成を前提にし、React + React Router を採用する。
- Vite でビルドし、認証/認可の導入を前提とした管理ページ群とする。
- `packages/ui`と`packages/tokens`を共通利用。
- 管理画面固有のUIは`apps/admin`内に閉じる。

### apps/legacy-next（既存アプリ）
- 既存のNext.jsアプリを移行対象として保持する。
- `apps/web`（Astro）への移行が完了次第、削除する。

### packages/ui（共通UI）
- 既存の`components/ui`を中心に再構成。
- レイアウトプリミティブ（`Box`/`Stack`/`Cluster`/`Center`）はここに集約。
- 公開Web/管理Webで共通利用するUIのみを格納する。

### packages/tokens（デザイントークン）
- 色、フォント、余白、サイズなどのトークン定義を集約。
- Tailwind設定やCSS変数と連携させ、`packages/ui`と各アプリのスタイルを統一。

## 改修ステップ案
1. **モノリポ基盤の導入**
   - `apps/`と`packages/`ディレクトリを追加。
   - 既存ルート構成を`apps/web`に移設するための準備を行う。

2. **共通UIパッケージ化**
   - `components/ui`配下の共通UIを`packages/ui`へ段階的に移動。
   - importパスの置き換えを行い、`apps/web`から利用できるようにする。

3. **デザイントークンの抽出**
   - `tailwind.config.js`や`styles`からトークン定義を抽出して`packages/tokens`化。
   - `packages/ui`と`apps/*`でトークン参照を統一。

4. **管理画面の新設**
   - `apps/admin`を新規作成。
   - SPA向けの認証導入方針（Auth0, Cognito など）を決定し適用。
   - 既存の管理系ページがあれば移設。

5. **CI/ビルド/デプロイの整備**
   - モノリポの依存関係に合わせてビルド設定を更新。
   - `apps/web`と`apps/admin`で別々のデプロイパイプラインを準備。

## 検討事項
- モノリポ管理ツール（Turborepo, Nx, pnpm workspaces など）の選定。
- `packages/ui`と`packages/tokens`のビルド方法（TypeScript/ESM/CJS）。
- 既存ページ移行時のルーティング/SEO影響。
- 管理画面の認証基盤（SSO含む、SPA向けのトークン管理方針）

## 次のアクション
- モノリポツール候補を比較し、採用方針を決定。
- `packages/ui`と`packages/tokens`の初期構成を決める。
- 既存資産の移行計画を詳細化する。
