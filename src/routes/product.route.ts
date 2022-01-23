import express from "express";
import {
  createProduct,
  getProductById,
  getProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
  upload
} from "../controllers/product.controller";

const productRouter = express.Router();


productRouter.route("/:productId").get(getProductById).put(updateProduct).delete(deleteProduct);

productRouter.route("/").get(getProduct).post(createProduct);

productRouter.route("/file/:productId").post(upload.single('productImage'), uploadProductImage);

export default productRouter;
