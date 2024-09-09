import { Router } from "express";
import authMiddleware from "../middleware/auth";
import UserController from "../controllers/user";

const routes = new Router();

// Unauthorized Routes
routes.post("/user", UserController.create);
routes.post("/login", UserController.login);
routes.post("/forgot-password", UserController.forgotPassword);
routes.post("/reset-password", UserController.resetPassword);

// Authorized Routes
routes.use(authMiddleware);
routes.get("/user", UserController.get);

export default routes;
