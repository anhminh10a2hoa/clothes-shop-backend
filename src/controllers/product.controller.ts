import multer from 'multer';
import { Product } from "../entities/product.entity";
import { Request, Response, NextFunction } from "express";
import { getRepository, getConnection } from "typeorm";
import { checkSizeAndCategoryValid } from "../utils";

const storage = multer.diskStorage({
  destination: function (_: Express.Request, file: Express.Multer.File, callback: (error: Error | null, destination: string) => void) {
    if(
      file.mimetype === 'image/jpeg' || 
      file.mimetype === 'image/jpg'  || 
      file.mimetype === 'image/png'  ||
      file.mimetype === 'image/JPEG' ||
      file.mimetype === 'image/JPG'  ||
      file.mimetype === 'image/PNG'
    ) {
      callback(null, './public/images/')
    } else {
      // @ts-ignore
      callback(new Error('Invalid image'), false)
    }
  },
  filename: function (_: Request, file: Express.Multer.File, callback: (error: Error | null, filename: string) => void) {
    const mimeExtension = {
      'image/jpeg': '.jpeg',
      'image/jpg': '.jpg',
      'image/png': '.png',
      'image/JPEG': '.JPEG',
      'image/JPG': '.JPG',
      'image/PNG': '.PNG',
    }
    callback(null, file.fieldname + '-' + Date.now() + mimeExtension[file.mimetype])
  }
})

const upload = multer({storage: storage});

const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  const {
    name,
    category,
    description,
    gender, 
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
      message: "Product name have to be unique",
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
  if(req.file) {
    uploadProductImage(req, res, next)
  }

  const product = Product.create({
    name,
    category: categoryToString,
    description,
    gender,
    price,
    status,
    feature,
    sale,
    salePrice,
    size: sizeToString,
  });

  await product.save();

  return res.status(201).json(product);
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
    for(let i of req.query.size.toString().split(",")) {
      condition.push(`product.size like '%${i}%'`);
    }
  } 
  if (req.query.category) {
    for(let i of req.query.category.toString().split(",")) {
    condition.push(
      `product.category like '%${i}%'`
    );
  }
  } 
  if (req.query.gender) {
    condition.push(`product.gender like '%${req.query.gender}%'`);
  }
  const products = await getRepository(Product)
    .createQueryBuilder("product")
    .where(condition.join(" AND "))
    .getMany();

  return res.status(200).json(products);
};

const deleteProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;

  const product = await Product.findOne(parseInt(productId));
  if(product) {
    await Product.remove(product);

    return res.status(200).json({
      message: `Product with ${productId} was deleted successfully`
    });
  }
  return res.status(404).json({
    message: `Product with ${productId} not found`,
  });
}

const updateProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;

  const product = await Product.findOne(parseInt(productId));

  if(!product) { 
    return res.status(404).json({
      message: `Product with ${productId} not found`,
    });
  }

  const {
    name,
    category,
    description,
    gender,
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
      message: "Product name have to be unique",
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

  const newProduct = await getConnection()
  .createQueryBuilder()
  .update(Product)
  .set({
    name,
    category: categoryToString,
    description,
    gender,
    price,
    status,
    feature,
    sale,
    salePrice,
    size: sizeToString,
  })
  .where("id = :id", { id: parseInt(productId) })
  .execute();

  return res.status(200).json(newProduct);
}

const uploadProductImage = async (req: Request, res: Response, next: NextFunction) => {
  const file = req.file;
  console.log(file)
  if(!file) {
    const error = new Error('Please upload a file');
    return next(error);
  }
  const { productId } = req.params;
  const newProduct = await getConnection()
  .createQueryBuilder()
  .update(Product)
  .set({
    imageName: file.filename
  })
  .where("id = :id", { id: parseInt(productId) })
  .execute();

  return res.status(200).json(newProduct);
}

export { createProduct, getProductById, getProduct, deleteProduct, updateProduct, uploadProductImage, upload };
