import { User } from "../models";
import * as Yup from "yup";
import bcrypt from "bcrypt";

class UserController {
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

      const existedUser = await User.findOne({
        where: { email: req.body.email },
      });

      if (existedUser) {
        return res.status(400).json("User already exists.");
      }

      await schema.validate(req.body);

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
