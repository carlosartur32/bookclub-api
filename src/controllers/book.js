import { Book, Category, Author } from "../models";
import * as Yup from "yup";

class BookController {
  async create(req, res) {
    try {
      const schema = Yup.object().shape({
        category_id: Yup.number().required("Category is mandatory."),
        author_id: Yup.number().required("Author is mandatory."),
        name: Yup.string().required("Name is mandatory."),
        cover_url: Yup.string().url("Cover should be a valid URL."),
        release_date: Yup.date("Release date should be yyyy-mm-dd"),
        pages: Yup.number(),
        synopsis: Yup.string(),
        highlighted: Yup.boolean(),
      });

      await schema.validate(req.body);

      const { category_id, author_id } = req.body;

      const category = Category.findByPk(category_id);

      if (!category) {
        return res.status(404).json({ error: "Category not found." });
      }

      const author = Category.findByPk(author_id);

      if (!author) {
        return res.status(404).json({ error: "Author not found." });
      }

      const book = await new Book({
        ...req.body,
      });

      await book.save();

      return res.status(200).json(book);
    } catch (error) {
      return res.status(400).json({ error: error?.message });
    }
  }

  async findAll(req, res) {
    try {
      const books = await Book.findAll({
        include: [
          {
            model: Author,
            as: "author",
          },
          {
            model: Category,
            as: "category",
          },
        ],
      });
      return res.status(200).json(books);
    } catch (error) {
      return res.status(400).json({ error: error?.message });
    }
  }
}

export default new BookController();
