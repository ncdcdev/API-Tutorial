import { Router, Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { Book } from "../entities/Book";

const router = Router();
const bookRepository = AppDataSource.getRepository(Book);

// 本の一覧を取得
router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const books = await bookRepository.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "サーバーエラーが発生しました", error });
  }
});

// IDを指定して本を取得
router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const book = await bookRepository.findOne({ where: { id } });
    
    if (!book) {
      res.status(404).json({ message: "本が見つかりませんでした" });
      return;
    }
    
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: "サーバーエラーが発生しました", error });
  }
});

// 本を登録
router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, summary } = req.body;
    
    if (!title || !summary) {
      res.status(400).json({ message: "タイトルと要約は必須です" });
      return;
    }
    
    const book = bookRepository.create({ title, summary });
    const result = await bookRepository.save(book);
    
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "サーバーエラーが発生しました", error });
  }
});

// 本の情報を更新
router.put("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const { title, summary } = req.body;
    
    const book = await bookRepository.findOne({ where: { id } });
    
    if (!book) {
      res.status(404).json({ message: "本が見つかりませんでした" });
      return;
    }
    
    if (title !== undefined) {
      book.title = title;
    }
    if (summary !== undefined) {
      book.summary = summary;
    }
    
    const result = await bookRepository.save(book);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "サーバーエラーが発生しました", error });
  }
});

// 本を削除
router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const book = await bookRepository.findOne({ where: { id } });
    
    if (!book) {
      res.status(404).json({ message: "本が見つかりませんでした" });
      return;
    }
    
    await bookRepository.remove(book);
    res.json({ message: "本を削除しました" });
  } catch (error) {
    res.status(500).json({ message: "サーバーエラーが発生しました", error });
  }
});

export default router;
