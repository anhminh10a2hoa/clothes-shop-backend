import express from "express";
import { createProduct, getProduct } from "../controllers/productController";

const productRouter = express.Router();

productRouter
  .route('/')
  .post(createProduct)
  .get(getProduct)

export default productRouter;