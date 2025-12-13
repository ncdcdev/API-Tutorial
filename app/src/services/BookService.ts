import { BookRepository } from '../repositories/BookRepository';
import { Book } from '../entities/Book';

/**
 * Book サービス
 * ビジネスロジック層
 */
export class BookService {
  private bookRepository: BookRepository;

  constructor() {
    this.bookRepository = new BookRepository();
  }

  /**
   * 全ての本を取得
   */
  async getAllBooks(): Promise<Book[]> {
    return await this.bookRepository.findAll();
  }

  /**
   * IDで本を取得
   */
  async getBookById(id: number): Promise<Book | null> {
    return await this.bookRepository.findById(id);
  }

  /**
   * 本を作成
   */
  async createBook(title: string, summary: string): Promise<Book> {
    // ビジネスロジックのバリデーション
    if (!title || title.trim().length === 0) {
      throw new Error('タイトルは必須です');
    }
    if (!summary || summary.trim().length === 0) {
      throw new Error('要約は必須です');
    }

    return await this.bookRepository.create(title, summary);
  }

  /**
   * 本を更新
   */
  async updateBook(
    id: number,
    title: string,
    summary: string
  ): Promise<Book | null> {
    // ビジネスロジックのバリデーション
    if (!title || title.trim().length === 0) {
      throw new Error('タイトルは必須です');
    }
    if (!summary || summary.trim().length === 0) {
      throw new Error('要約は必須です');
    }

    return await this.bookRepository.update(id, title, summary);
  }

  /**
   * 本を削除
   */
  async deleteBook(id: number): Promise<boolean> {
    return await this.bookRepository.delete(id);
  }
}
