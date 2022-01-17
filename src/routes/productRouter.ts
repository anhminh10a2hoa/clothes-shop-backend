import express from "express";
import {
  createProduct,
  getProductById,
  getProduct,
} from "../controllers/productController";

const productRouter = express.Router();

productRouter.route("/").get(getProduct).post(createProduct);

productRouter.route("/:productId").get(getProductById);

export default productRouter;
