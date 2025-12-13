import 'reflect-metadata';
import express, { Request, Response, Application } from 'express';
import { AppDataSource } from '../data-source';
import bookRoutes from './routes/bookRoutes';

/**
 * Express アプリケーションのエントリーポイント
 */
const app: Application = express();
const PORT = process.env.PORT || 3000;

// ミドルウェア設定
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ルート設定
app.use('/api/books', bookRoutes);

// ヘルスチェックエンドポイント
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK' });
});

// データベース接続とサーバー起動
AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error during Data Source initialization:', error);
    process.exit(1);
  });

// グレースフルシャットダウン
process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: closing HTTP server');
  if (AppDataSource.isInitialized) {
    await AppDataSource.destroy();
  }
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT signal received: closing HTTP server');
  if (AppDataSource.isInitialized) {
    await AppDataSource.destroy();
  }
  process.exit(0);
});
