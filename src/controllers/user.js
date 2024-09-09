import { User } from "../models";
import * as Yup from "yup";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

class UserController {
  async login(req, res) {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email("E-mail is invalid.")
          .required("E-mail is mandatory."),
        password: Yup.string().required("Password is mandatory."),
      });

      await schema.validate(req.body);

      const user = await User.findOne({ where: { email: req.body.email } });
      if (!user) {
        return res
          .status(401)
          .json({ error: "E-mail or password are incorrect." });
      }

      const checkPassword = await bcrypt.compare(
        req.body.password,
        user.password_hash
      );

      if (!checkPassword) {
        return res
          .status(401)
          .json({ error: "E-mail or password are incorrect." });
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_HASH, {
        expiresIn: "30d",
      });

      const { id, name, email, avatar_url, created_at } = user;

      return res
        .status(200)
        .json({ user: { id, name, email, avatar_url, created_at }, token });
    } catch (error) {
      return res.status(500).json({ error: error?.message });
    }
  }

  async create(req, res) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string()
          .required("Name is mandatory.")
          .min(4, "Name should have more than 3 characters."),
        email: Yup.string()
          .email("E-mail is invalid.")
          .required("E-mail is mandatory."),
        password: Yup.string()
          .required("Password is mandatory.")
          .min(5, "Password should have more than 4 characters."),
      });

      await schema.validate(req.body);

      const existedUser = await User.findOne({
        where: { email: req.body.email },
      });

      if (existedUser) {
        return res.status(400).json("User already exists.");
      }

      const hashPassword = await bcrypt.hash(req.body.password, 8);

      const user = new User({
        ...req.body,
        password: " ",
        password_hash: hashPassword,
      });

      await user.save();

      return res.json({ user });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: error?.message });
    }
  }
}

export default new UserController();
