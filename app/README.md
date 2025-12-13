# Book Management API

TypeScriptとExpressを使用した本の管理APIサーバーです。

## 機能

- 本の一覧取得
- IDを指定して本を取得
- 本の登録
- 本の情報更新
- 本の削除

## 技術スタック

- **言語**: TypeScript
- **フレームワーク**: Express.js
- **データベース**: MySQL
- **ORM**: TypeORM
- **開発ツール**: nodemon, ts-node

## 前提条件

- Node.js (推奨: v18以上)
- Docker & Docker Compose

## セットアップ

### 1. データベースの起動

```bash
docker-compose up -d
```

### 2. 依存パッケージのインストール

```bash
npm install
```

### 3. アプリケーションの起動

開発モード（ホットリロード有効）:
```bash
npm run dev
```

本番モード:
```bash
npm start
```

## API エンドポイント

### ヘルスチェック

```
GET /
```

レスポンス:
```json
{
  "message": "Book Management API is running"
}
```

### 本の一覧取得

```
GET /api/books
```

レスポンス例:
```json
[
  {
    "id": 1,
    "title": "吾輩は猫である",
    "summary": "夏目漱石の代表作。猫の視点から人間社会を風刺的に描いた小説。",
    "createdAt": "2025-12-13T00:00:00.000Z",
    "updatedAt": "2025-12-13T00:00:00.000Z"
  }
]
```

### 本の詳細取得

```
GET /api/books/:id
```

レスポンス例:
```json
{
  "id": 1,
  "title": "吾輩は猫である",
  "summary": "夏目漱石の代表作。猫の視点から人間社会を風刺的に描いた小説。",
  "createdAt": "2025-12-13T00:00:00.000Z",
  "updatedAt": "2025-12-13T00:00:00.000Z"
}
```

### 本の登録

```
POST /api/books
Content-Type: application/json
```

リクエストボディ:
```json
{
  "title": "吾輩は猫である",
  "summary": "夏目漱石の代表作。猫の視点から人間社会を風刺的に描いた小説。"
}
```

レスポンス:
```json
{
  "id": 1,
  "title": "吾輩は猫である",
  "summary": "夏目漱石の代表作。猫の視点から人間社会を風刺的に描いた小説。",
  "createdAt": "2025-12-13T00:00:00.000Z",
  "updatedAt": "2025-12-13T00:00:00.000Z"
}
```

### 本の更新

```
PUT /api/books/:id
Content-Type: application/json
```

リクエストボディ:
```json
{
  "title": "吾輩は猫である（改訂版）",
  "summary": "夏目漱石の代表作。猫の視点から人間社会を風刺的に描いた小説。改訂版では新たな解説を追加。"
}
```

レスポンス:
```json
{
  "id": 1,
  "title": "吾輩は猫である（改訂版）",
  "summary": "夏目漱石の代表作。猫の視点から人間社会を風刺的に描いた小説。改訂版では新たな解説を追加。",
  "createdAt": "2025-12-13T00:00:00.000Z",
  "updatedAt": "2025-12-13T00:00:00.000Z"
}
```

### 本の削除

```
DELETE /api/books/:id
```

レスポンス:
```json
{
  "message": "本を削除しました"
}
```

## テスト

APIの動作確認用テストスクリプトが用意されています:

```bash
./test-api.sh
```

このスクリプトは、全てのCRUD操作を実行し、動作を確認します。

## データベース設定

Docker Composeで起動されるMySQLの設定:

- **ホスト**: localhost
- **ポート**: 13306
- **データベース名**: example_db
- **ユーザー名**: docker
- **パスワード**: docker

## プロジェクト構成

```
app/
├── src/
│   ├── entities/
│   │   └── Book.ts          # Book エンティティ
│   ├── routes/
│   │   └── books.ts         # Book API ルート
│   └── index.ts             # メインアプリケーション
├── data-source.ts           # TypeORM データソース設定
├── docker-compose.yml       # Docker Compose 設定
├── package.json             # npm 依存関係
├── tsconfig.json            # TypeScript 設定
├── nodemon.json             # nodemon 設定
└── test-api.sh             # APIテストスクリプト
```

## その他のコマンド

### データベースのマイグレーション生成

```bash
npm run make:migration
```

### マイグレーションの実行

```bash
npm run migrate
```

### マイグレーションのロールバック

```bash
npm run rollback
```

### コードのフォーマット

```bash
npm run format
```

### Lint

```bash
npm run lint
```
