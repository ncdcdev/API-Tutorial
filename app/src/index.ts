import "reflect-metadata";
import express from "express";
import { AppDataSource } from "../data-source";
import bookRoutes from "./routes/books";

const app = express();
const PORT = process.env.PORT || 3000;

// ミドルウェア設定
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ルート設定
app.use("/api/books", bookRoutes);

// ヘルスチェック
app.get("/", (req, res) => {
  res.json({ message: "Book Management API is running" });
});

// データベース接続とサーバー起動
AppDataSource.initialize()
  .then(() => {
    console.log("データベース接続に成功しました");
    
    app.listen(PORT, () => {
      console.log(`サーバーがポート ${PORT} で起動しました`);
    });
  })
  .catch((error) => {
    console.error("データベース接続エラー:", error);
  });
