import { Product } from "../entities/Product";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { checkSizeAndCategoryValid } from "../utils";

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
    size,
  } = req.body;

  const isProductExist = await Product.findOne({ where: { name }})
  if(isProductExist) {
    return res.status(406).json({
      message: "Product already exist",
    });
  }
  const checked = await checkSizeAndCategoryValid(category, size)
  if(!checked) {
    return res.status(406).json({
      message: "Invalid category or size",
    });
  }
  const categoryToString: string = category.join(",");
  const sizeToString: string = size.join(",");

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
    size: sizeToString,
  });

  await product.save();

  return res.status(200).json(product);
};

const getProductById = async (req: Request, res: Response) => {
  const { productId } = req.params;

  const product = await Product.findOne(parseInt(productId));

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  return res.status(200).json(product);
};

const getProduct = async (req: Request, res: Response) => {
  let condition = [];
  if (req.query.size) {
    condition.push(`product.size like '%${req.query.size.toString()}%'`);
  } else if (req.query.category) {
    condition.push(
      `product.category like '%${req.query.category.toString()}%'`
    );
  } else if (req.query.gender) {
    condition.push(`product.gender like '%${req.query.gender.toString()}%'`);
  }
  const products = await getRepository(Product)
    .createQueryBuilder("product")
    .where(condition.join(" AND "))
    .getMany();

  return res.status(200).json(products);
};

export { createProduct, getProductById, getProduct };
