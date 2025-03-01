# 医療用シューズ受注管理システム 要件定義書

## 1. システム概要

### 1.1 目的
糖尿病患者向け医療用シューズの受注から製造までのプロセスを効率化し、3Dプリントによる製造期間の短縮と品質の安定化を実現する。本システムにより、従来比50%の製造期間短縮を目指す。

### 1.2 背景
- 糖尿病患者の足の感覚低下や変形に対応した医療用シューズの需要
- 現状の医療用シューズの高コストと低いデザイン性の課題
- 3Dプリント技術による効率的な製造の可能性

### 1.3 期待される効果
- 製造期間：従来比50%短縮
- 販売目標：初年度200足、3年後2,000足
- 医療機関連携：3年で50施設

## 2. システム機能要件

### 2.1 基本機能
1. 採寸データ管理
   - 手動採寸データの入力
   - データ検証と正規化
   - 採寸履歴の管理

2. 3Dモデル生成
   - 採寸データからの自動モデル生成
   - 特定3Dプリンター向けデータ出力
   - プレビュー機能

3. 受注管理
   - 受注情報の登録・管理
   - 進捗状況トラッキング
   - 納期管理

### 2.2 付加機能
1. ダッシュボード
   - 月間受注件数表示
   - 製造状況進捗管理
   - 納期遅延アラート

2. トレーニング支援
   - システム操作説明動画（15分）
   - 採寸データ入力手順動画（10分）
   - 3Dプレビュー確認手順動画（5分）

## 3. 非機能要件

### 3.1 性能要件
- レスポンス時間：画面遷移3秒以内
- 同時接続ユーザー：最大10ユーザー
- 3Dモデル生成時間：5分以内

### 3.2 運用要件
- システム稼働時間：平日9:00-20:00
- 計画メンテナンス：月1回（休日実施）
- バックアップ：日次（増分）、週次（フル）
- データ保持：無期限

### 3.3 セキュリティ要件
- SSL/TLS暗号化通信
- ロールベースアクセス制御
- 個人情報の暗号化保存
- アクセスログ記録

## 4. システム構成

### 4.1 技術スタック
- フロントエンド：Next.js + TypeScript
- バックエンド：Node.js + Prisma
- データベース：PostgreSQL
- インフラ：Vercel

### 4.2 リソース要件
- ストレージ：初年度100GB
- メモリ：4GB以下
- CPU使用率：通常時30%以下

## 5. 開発計画

### 5.1 フェーズ1：基本システム構築（1-2ヶ月）
- 採寸データ入力フォーム
- 基本的な受注管理機能
- シンプルなダッシュボード
- 初期トレーニング動画作成

### 5.2 フェーズ2：3Dプリント連携（2-3ヶ月）
- 3Dモデル生成の自動化
- プリンター出力データ生成
- プレビュー機能実装

### 5.3 フェーズ3：安定化（1ヶ月）
- システム動作の安定化
- パフォーマンスチューニング
- トレーニング動画の改善

## 6. 保守・運用計画

### 6.1 システム保守
- セキュリティアップデート：随時
- 機能アップデート：年1回
- バグ修正：優先度に応じて適時

### 6.2 運用サポート
- サポート時間：平日9:00-20:00
- トレーニング資料：随時更新可能
- エラー監視：稼働時間内の死活監視

## 7. 制約条件

### 7.1 予算・リソース
- 開発予算：100万円以下
- 開発要員：1名
- 使用可能ツール：オープンソースソフトウェア中心

### 7.2 技術的制約
- 特定3Dプリンター対応
- ブラウザベースのシステム
- 高価なアプリケーション導入不可

## 8. リスクと対策

### 8.1 想定されるリスク
- 3Dモデル生成の精度
- システム障害時の対応
- データバックアップの確実性

### 8.2 対策
- 段階的な精度向上
- 基本的なエラー監視の実装
- 定期的なバックアップ確認

## 9. 成功基準
1. 製造期間の50%短縮達成
2. 初年度200足の販売実現
3. システム稼働率99%以上
4. ユーザーからの重大な不具合報告ゼロ 