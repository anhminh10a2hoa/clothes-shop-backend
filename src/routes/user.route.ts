import express from "express";
import userController from "../controllers/user.controller";

const userRouter = express.Router();

userRouter
  .route("/:id")
  .get(userController.getUserById)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

userRouter.route("/").get(userController.getAll).post(userController.createUser);

export default userRouter;
