import { Router } from "express";
import authMiddleware from "../middleware/auth";
import UserController from "../controllers/user";
import CategoryController from "../controllers/category";
import AuthorController from "../controllers/author";
import BookController from "../controllers/book";

const routes = new Router();

// Unauthorized Routes
routes.post("/user", UserController.create);
routes.post("/login", UserController.login);
routes.post("/forgot-password", UserController.forgotPassword);
routes.post("/reset-password", UserController.resetPassword);

// Authorized Routes
routes.use(authMiddleware);
routes.get("/user", UserController.get);
routes.get("/category", CategoryController.getAll);
routes.post("/author", AuthorController.create);
routes.get("/author", AuthorController.getAll);
routes.post("/book", BookController.create);
routes.get("/book", BookController.findAll);

export default routes;
