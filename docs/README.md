# 医療用シューズ受注管理システム

## プロジェクト概要
3Dプリント技術を活用した医療用シューズの受注管理システムです。

## ドキュメント構成
- `docs/`
  - `architecture.md` - システムアーキテクチャ設計書
  - `requirements.md` - 要件定義書
  - `api/` - API仕様書

## 開発環境セットアップ
1. 必要な環境
   - Node.js 18.0以上
   - PostgreSQL 14.0以上
   - yarn

2. インストール
```bash
git clone [repository-url]
cd 3D_Shoe
yarn install
```

3. 環境変数の設定
```bash
cp .env.example .env
# .envファイルを編集して必要な環境変数を設定
```

4. 開発サーバーの起動
```bash
yarn dev
```

## 技術スタック
- フロントエンド: Next.js, TypeScript, Tailwind CSS
- バックエンド: Node.js, Prisma
- データベース: PostgreSQL
- インフラ: Vercel

## コントリビューション
1. このリポジトリをフォーク
2. 新しいブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## ライセンス
このプロジェクトは非公開です。すべての権利は保護されています。
