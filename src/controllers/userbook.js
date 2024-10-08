import { Book, UserBook, User, Author } from "../models";
import * as Yup from "yup";

class UserBookController {
  async create(req, res) {
    try {
      const schema = Yup.object().shape({
        book_id: Yup.number().required("Book Id is mandatory."),
      });

      await schema.validate(req.body);

      const user = await User.findByPk(req.userId);
      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }

      const book = await Book.findByPk(req.body.book_id);
      if (!book) {
        return res.status(404).json({ error: "Book not found." });
      }

      const alreadyExists = await UserBook.findOne({
        where: {
          user_id: req.userId,
          book_id: req.body.book_id,
        },
      });

      if (alreadyExists) {
        return res.status(400).json({ error: "Book is already a favorite." });
      }

      const userbook = new UserBook({
        user_id: req.userId,
        book_id: req.body.book_id,
      });

      await userbook.save();

      return res.status(200).json(userbook);
    } catch (error) {
      return res.status(400).json({ error: error?.message });
    }
  }

  async getAll(req, res) {
    try {
      const userbooks = await UserBook.findAll({
        where: { user_id: req.userId },
        include: {
          // Para mostrar as informações dos respectivos livros.
          model: Book,
          as: "book",
          include: {
            model: Author,
            as: "author",
            attributes: ["name"],
          },
        },
      });
      return res.status(200).json(userbooks);
    } catch (error) {
      return res.status(400).json({ error: error?.message });
    }
  }

  async delete(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({ error: "Book Id is mandatory." });
      }

      const userbook = await UserBook.findByPk(req.params.id);
      if (!userbook) {
        return res.status(404).json({ error: "Book not found." });
      }

      if (userbook.user_id !== req.userId) {
        return res.status(401).json({ error: "Unauthorized user." });
      }

      await userbook.destroy();

      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(400).json({ error: error?.message });
    }
  }
}

export default new UserBookController();
