import { Request, Response } from 'express';
import { BookService } from '../services/BookService';

/**
 * Book コントローラー
 * HTTPリクエストとレスポンスを処理
 */
export class BookController {
  private bookService: BookService;

  constructor() {
    this.bookService = new BookService();
  }

  /**
   * 全ての本を取得
   * GET /api/books
   */
  getAllBooks = async (req: Request, res: Response): Promise<void> => {
    try {
      const books = await this.bookService.getAllBooks();
      res.status(200).json(books);
    } catch (error) {
      console.error('Error getting all books:', error);
      res.status(500).json({ error: 'サーバーエラーが発生しました' });
    }
  };

  /**
   * IDで本を取得
   * GET /api/books/:id
   */
  getBookById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: '無効なIDです' });
        return;
      }

      const book = await this.bookService.getBookById(id);
      if (!book) {
        res.status(404).json({ error: '本が見つかりません' });
        return;
      }

      res.status(200).json(book);
    } catch (error) {
      console.error('Error getting book by id:', error);
      res.status(500).json({ error: 'サーバーエラーが発生しました' });
    }
  };

  /**
   * 本を作成
   * POST /api/books
   */
  createBook = async (req: Request, res: Response): Promise<void> => {
    try {
      const { title, summary } = req.body;

      if (!title || !summary) {
        res
          .status(400)
          .json({ error: 'タイトルと要約は必須です' });
        return;
      }

      const book = await this.bookService.createBook(title, summary);
      res.status(201).json(book);
    } catch (error) {
      console.error('Error creating book:', error);
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'サーバーエラーが発生しました' });
      }
    }
  };

  /**
   * 本を更新
   * PUT /api/books/:id
   */
  updateBook = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: '無効なIDです' });
        return;
      }

      const { title, summary } = req.body;

      if (!title || !summary) {
        res
          .status(400)
          .json({ error: 'タイトルと要約は必須です' });
        return;
      }

      const book = await this.bookService.updateBook(id, title, summary);
      if (!book) {
        res.status(404).json({ error: '本が見つかりません' });
        return;
      }

      res.status(200).json(book);
    } catch (error) {
      console.error('Error updating book:', error);
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'サーバーエラーが発生しました' });
      }
    }
  };

  /**
   * 本を削除
   * DELETE /api/books/:id
   */
  deleteBook = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: '無効なIDです' });
        return;
      }

      const deleted = await this.bookService.deleteBook(id);
      if (!deleted) {
        res.status(404).json({ error: '本が見つかりません' });
        return;
      }

      res.status(204).send();
    } catch (error) {
      console.error('Error deleting book:', error);
      res.status(500).json({ error: 'サーバーエラーが発生しました' });
    }
  };
}
