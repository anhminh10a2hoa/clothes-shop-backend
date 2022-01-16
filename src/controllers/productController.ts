import { Product } from "../entities/Product"
import { Request, Response } from "express"

const createProduct = async (req: Request, res: Response) => {
  const {
    name,
    category,
    description,
    gender,
    image,
    price,
    status,
    feature,
    sale,
    salePrice,
    size
  } = req.body

  const categoryToString: string = category.join(',')
  const sizeToString: string = size.join(',')

  const product = Product.create({
    name,
    category: categoryToString,
    description,
    gender,
    image,
    price,
    status,
    feature,
    sale,
    salePrice,
    size: sizeToString
  });

  await product.save();

  return res.json(product);
}

const getProduct = async (res: Response) => {
  return res.json({"message": "hello"})
}

export { createProduct, getProduct }