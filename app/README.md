# Book Management API

TypeScript + Express + TypeORM + MySQLで構築された本の管理APIサーバーです。

## 技術スタック

- **言語**: TypeScript
- **フレームワーク**: Express.js
- **ORM**: TypeORM
- **データベース**: MySQL 8.0
- **インフラ**: Docker Compose

## プロジェクト構造

```
app/
├── src/
│   ├── entities/          # エンティティ（データモデル）
│   │   └── Book.ts
│   ├── repositories/      # リポジトリ（データアクセス層）
│   │   └── BookRepository.ts
│   ├── services/          # サービス（ビジネスロジック層）
│   │   └── BookService.ts
│   ├── controllers/       # コントローラー（HTTPハンドラー）
│   │   └── BookController.ts
│   ├── routes/            # ルート定義
│   │   └── bookRoutes.ts
│   ├── migrations/        # データベースマイグレーション
│   │   └── 1702468800000-CreateBooksTable.ts
│   └── index.ts          # エントリーポイント
├── data-source.ts        # TypeORM設定
├── tsconfig.json         # TypeScript設定
├── package.json          # 依存関係
├── docker-compose.yml    # Docker設定
└── .env                  # 環境変数
```

## セットアップ手順

### 1. 依存パッケージのインストール

```bash
npm install
# または
yarn install
```

### 2. 環境変数の設定

`.env.example`から`.env`ファイルを作成します：

```bash
cp .env.example .env
```

`.env`ファイルの内容：
```
DB_HOST=localhost
DB_PORT=13306
DB_USER=docker
DB_PASSWORD=docker
DB_NAME=example_db
PORT=3000
```

### 3. データベースの起動

Docker Composeを使ってMySQLを起動します：

```bash
docker-compose up -d
```

起動確認：
- MySQL: `localhost:13306`
- Adminer（データベース管理ツール）: `http://localhost:8080`

### 4. マイグレーションの実行

データベースにテーブルを作成します：

```bash
npm run migrate
```

### 5. サーバーの起動

#### 開発モード（ホットリロード）

```bash
npm run dev
```

#### 本番モード

```bash
npm start
```

サーバーは `http://localhost:3000` で起動します。

## API仕様

### エンドポイント一覧

#### 1. 全ての本を取得

```
GET /api/books
```

**レスポンス例：**
```json
[
  {
    "id": 1,
    "title": "吾輩は猫である",
    "summary": "夏目漱石の代表作。猫の視点から人間社会を風刺的に描いた作品。",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### 2. IDで本を取得

```
GET /api/books/:id
```

**レスポンス例：**
```json
{
  "id": 1,
  "title": "吾輩は猫である",
  "summary": "夏目漱石の代表作。猫の視点から人間社会を風刺的に描いた作品。",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### 3. 本を登録

```
POST /api/books
Content-Type: application/json
```

**リクエストボディ：**
```json
{
  "title": "吾輩は猫である",
  "summary": "夏目漱石の代表作。猫の視点から人間社会を風刺的に描いた作品。"
}
```

**レスポンス例：**
```json
{
  "id": 1,
  "title": "吾輩は猫である",
  "summary": "夏目漱石の代表作。猫の視点から人間社会を風刺的に描いた作品。",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### 4. 本を更新

```
PUT /api/books/:id
Content-Type: application/json
```

**リクエストボディ：**
```json
{
  "title": "吾輩は猫である（改訂版）",
  "summary": "夏目漱石の代表作。猫の視点から人間社会を風刺的に描いた作品。改訂版。"
}
```

**レスポンス例：**
```json
{
  "id": 1,
  "title": "吾輩は猫である（改訂版）",
  "summary": "夏目漱石の代表作。猫の視点から人間社会を風刺的に描いた作品。改訂版。",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-02T00:00:00.000Z"
}
```

#### 5. 本を削除

```
DELETE /api/books/:id
```

**レスポンス：** 204 No Content

### エラーレスポンス

#### 400 Bad Request
```json
{
  "error": "タイトルと要約は必須です"
}
```

#### 404 Not Found
```json
{
  "error": "本が見つかりません"
}
```

#### 500 Internal Server Error
```json
{
  "error": "サーバーエラーが発生しました"
}
```

## 利用可能なコマンド

```bash
# 開発サーバー起動（ホットリロード）
npm run dev

# 本番サーバー起動
npm start

# マイグレーション作成
npm run make:migration

# マイグレーション実行
npm run migrate

# マイグレーションロールバック
npm run rollback

# リント実行
npm run lint

# コードフォーマット
npm run format
```

## データベース管理

### Adminerでデータベースにアクセス

1. ブラウザで `http://localhost:8080` を開く
2. 以下の情報でログイン：
   - システム: MySQL
   - サーバ: db
   - ユーザ名: docker
   - パスワード: docker
   - データベース: example_db

### MySQLに直接接続

```bash
mysql -h 127.0.0.1 -P 13306 -u docker -p
# パスワード: docker
```

## トラブルシューティング

### データベースに接続できない

1. Dockerコンテナが起動しているか確認：
   ```bash
   docker-compose ps
   ```

2. MySQLが完全に起動するまで待つ（初回は時間がかかる場合があります）

3. コンテナを再起動：
   ```bash
   docker-compose restart
   ```

### マイグレーションエラー

マイグレーションをリセット：
```bash
npm run rollback
npm run migrate
```

### ポートが既に使用されている

`.env`ファイルでポート番号を変更するか、使用中のプロセスを停止してください。

## ライセンス

MIT
