# Rearchitecture Phase 1 Status (Completed)

Phase 1（モノレポ化 + site/editor 分離）は完了とする。

## Completed

- [x] `apps/site` と `apps/editor` の 2 アプリ構成を確立
- [x] `packages/ui`, `packages/domain`, `packages/utils`, `packages/config` の共通パッケージ分離
- [x] ルート `package.json` に Yarn Workspace 設定を適用
- [x] site/editor の個別起動・個別ビルド運用へ移行
- [x] `blog.gaaamii.jp`（site）/ `blog-editor.gaaamii.jp`（editor）の分離前提をドキュメント化

## Phase 1 Deliverables

- 計画書: `docs/rearchitecture-phase-1-monorepo-split-plan.md`
- デプロイチェック: `docs/vercel-deploy-checklist-phase-1.md`

## Next

Phase 2 は **site のみ** を対象に、`apps/site` の内部技術構成を Astro へ移行する。

- `site`: Astro へ移行（対象）
- `editor`: 現行構成を維持（Phase 2 の対象外）

詳細は `docs/rearchitecture-phase-2-app-architecture-plan.md` を参照。
