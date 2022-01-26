import express from "express";
import productController from "../controllers/product.controller";

const productRouter = express.Router();

productRouter
  .route("/:productId")
  .get(productController.getProductById)
  .put(productController.updateProduct)
  .delete(productController.deleteProduct);

productRouter.route("/").get(productController.getAll).post(productController.createProduct);

productRouter
  .route("/file/:productId")
  .post(productController.upload.single("productImage"), productController.uploadProductImage);

export default productRouter;
