import { User } from "../models";
import { differenceInHours } from "date-fns";
import * as Yup from "yup";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Mail from "../libs/Mail";

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

  async get(req, res) {
    try {
      if (!req.userId) {
        return res.status(400).json({ error: "Id required." });
      }
      const user = await User.findOne({ where: { id: Number(req.userId) } });

      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }
      return res.json(user);
    } catch (error) {
      return res.status(400).json({ error: error?.message });
    }
  }

  async forgotPassword(req, res) {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email("E-mail is invalid.")
          .required("E-mail is mandatory."),
      });

      await schema.validate(req.body);

      const user = await User.findOne({ where: { email: req.body.email } });
      if (!user) {
        return res.status(404).json({ error: "User does not exists." });
      }

      const reset_password_token_sent_at = new Date();
      const token = Math.random().toString().slice(2, 8);
      const reset_password_token = await bcrypt.hash(token, 8);

      await User.update(
        {
          reset_password_token_sent_at,
          reset_password_token,
        },
        { where: { id: user.id } }
      );

      const { email, name } = user;

      const mailResult = await Mail.sendForgotPasswordMail(email, name, token);
      if (mailResult?.error) {
        return res.status(400).json({ error: "Email not sent." });
      }

      return res.json({ succes: true });
    } catch (error) {
      return res.status(400).json({ error: error?.message });
    }
  }

  async resetPassword(req, res) {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email("E-mail is invalid.")
          .required("E-mail is mandatory."),
        token: Yup.string().required("Token is mandatory."),
        password: Yup.string()
          .required("Password is mandatory.")
          .min(5, "Password should have more than 4 characters."),
      });

      await schema.validate(req.body);

      const user = await User.findOne({ where: { email: req.body.email } });
      if (!user) {
        return res.status(404).json({ error: "User does not exists." });
      }

      if (!user.reset_password_token && !user.reset_password_token_sent_at) {
        return res.status(404).json({ error: "Password change not found." });
      }

      const hoursDifference = differenceInHours(
        new Date(),
        user.reset_password_token_sent_at
      );

      if (hoursDifference > 3) {
        return res.status(400).json({ error: "Expired Token." });
      }

      const checkToken = await bcrypt.compare(
        req.body.token,
        user.reset_password_token
      );

      if (!checkToken) {
        return res.status(401).json({ error: "Token is invalid." });
      }

      const password_hash = await bcrypt.hash(req.body.password, 8);

      await User.update(
        {
          password_hash,
          reset_password_token: null,
          reset_password_token_sent_at: null,
        },
        { where: { id: user.id } }
      );

      return res.status(200).json({ succes: true });
    } catch (error) {
      return res.status(400).json({ error: error?.message });
    }
  }
}

export default new UserController();
