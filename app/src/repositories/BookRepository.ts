import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { Book } from '../entities/Book';

/**
 * Book リポジトリ
 * データベースアクセス層
 */
export class BookRepository {
  private repository: Repository<Book>;

  constructor() {
    this.repository = AppDataSource.getRepository(Book);
  }

  /**
   * 全ての本を取得
   */
  async findAll(): Promise<Book[]> {
    return await this.repository.find({
      order: {
        id: 'ASC',
      },
    });
  }

  /**
   * IDで本を取得
   */
  async findById(id: number): Promise<Book | null> {
    return await this.repository.findOneBy({ id });
  }

  /**
   * 本を作成
   */
  async create(title: string, summary: string): Promise<Book> {
    const book = this.repository.create({
      title,
      summary,
    });
    return await this.repository.save(book);
  }

  /**
   * 本を更新
   */
  async update(
    id: number,
    title: string,
    summary: string
  ): Promise<Book | null> {
    const book = await this.findById(id);
    if (!book) {
      return null;
    }

    book.title = title;
    book.summary = summary;
    return await this.repository.save(book);
  }

  /**
   * 本を削除
   */
  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected !== 0;
  }
}
