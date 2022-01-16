import express from "express";
import {
  createProduct,
  getProductById,
} from "../controllers/productController";

const productRouter = express.Router();

productRouter.route("/").post(createProduct);

productRouter.route("/:productId").get(getProductById);

export default productRouter;
