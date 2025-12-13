import { Router } from 'express';
import { BookController } from '../controllers/BookController';

const router = Router();
const bookController = new BookController();

/**
 * Book API ルート
 */

// 全ての本を取得
router.get('/', bookController.getAllBooks);

// IDで本を取得
router.get('/:id', bookController.getBookById);

// 本を作成
router.post('/', bookController.createBook);

// 本を更新
router.put('/:id', bookController.updateBook);

// 本を削除
router.delete('/:id', bookController.deleteBook);

export default router;
