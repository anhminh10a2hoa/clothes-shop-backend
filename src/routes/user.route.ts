import express from "express";
import userController from "../controllers/user.controller";
import authController from "../controllers/auth.controller";
import { checkJwt } from "../middlewares/auth.middleware";

const userRouter = express.Router();

userRouter.route("/signup").post(userController.createUser);
userRouter.route("/login").post(authController.login);
userRouter.route("/logout").post(authController.logout);

userRouter.use(checkJwt)
userRouter
  .route("/:id")
  .get(userController.getUserById)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

userRouter.route("/").get(userController.getAll);

export default userRouter;
