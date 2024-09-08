import express from "express";
import db from "./src/models";
import UserController from "./src/controllers/user";
const app = express();

app.post("/", UserController.create);

app.listen(3777, async () => {
  try {
    await db.sequelize.authenticate();
    console.log("App running and DB connected.");
  } catch (error) {
    console.log("Error running app", error);
  }
});
