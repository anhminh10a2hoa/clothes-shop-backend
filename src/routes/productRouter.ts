import express from "express";
import { updateProductImage } from "../storage";
import {
  createProduct,
  getProductById,
  getProduct,
  updateProduct,
  deleteProduct
} from "../controllers/productController";

const productRouter = express.Router();

productRouter.use(updateProductImage.single('productImage'))

productRouter.route("/:productId").get(getProductById).put(updateProduct).delete(deleteProduct);

productRouter.route("/").get(getProduct).post(createProduct);


export default productRouter;
