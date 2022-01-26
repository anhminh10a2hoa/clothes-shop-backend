import multer from "multer";
import fs from "fs";
import { Product } from "../entities/product.entity";
import { Request, Response, NextFunction } from "express";
import { getRepository, getConnection } from "typeorm";
import { checkSizeAndCategoryValid } from "../utils";
import { validate } from "class-validator";

class ProductController {
  public storage = multer.diskStorage({
    destination: function (
      _: Express.Request,
      file: Express.Multer.File,
      callback: (error: Error | null, destination: string) => void
    ) {
      if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/JPEG" ||
        file.mimetype === "image/JPG" ||
        file.mimetype === "image/PNG"
      ) {
        callback(
          null,
          process.env.PRODUCT_IMAGE_FOLDER_PATH
            ? process.env.PRODUCT_IMAGE_FOLDER_PATH
            : "./public/images/productsmi"
        );
      } else {
        // @ts-ignore
        callback(new Error("Invalid image"), false);
      }
    },
    filename: function (
      _: Request,
      file: Express.Multer.File,
      callback: (error: Error | null, filename: string) => void
    ) {
      const mimeExtension = {
        "image/jpeg": ".jpeg",
        "image/jpg": ".jpg",
        "image/png": ".png",
        "image/JPEG": ".JPEG",
        "image/JPG": ".JPG",
        "image/PNG": ".PNG",
      };
      callback(
        null,
        file.fieldname + "-" + Date.now() + mimeExtension[file.mimetype]
      );
    },
  });
  public upload = multer({ storage: this.storage });
  constructor() {}

  getAll = async (_: Request, res: Response) => {
		//Get data from database
		const productRepository = getRepository(Product)
		const selectAttributes: any = { select: ['id', 'name', 'category', 'description', 'gender', 'imageName', 'price', 'status', 'feature', 'sale', 'salePrice', 'size'] }
		const data = await productRepository.find(selectAttributes)

		//Send the data object
		res.status(200).json({ status: 'success', message: 'Data Found', error: false, data: data })
	}

  getProductById = async (req: Request, res: Response) => {
    const id: string = req.params.productId;

    //Get the data from database
		const productRepository = getRepository(Product)

    try {
      const products = await productRepository.findOneOrFail(id);
      res.status(200).json({ status: 'success', message: 'Data Found', error: false, data: products });
    } catch(error) {
      res.status(404).send(error)
    }
  }

  getProductByFilter = async (req: Request, res: Response) => {
    let condition = [];
    if (req.query.size) {
      for (let i of req.query.size.toString().split(",")) {
        condition.push(`product.size like '%${i}%'`);
      }
    }
    if (req.query.category) {
      for (let i of req.query.category.toString().split(",")) {
        condition.push(`product.category like '%${i}%'`);
      }
    }
    if (req.query.gender) {
      condition.push(`product.gender like '%${req.query.gender}%'`);
    }
    const productRepository = getRepository(Product)
    try {
			const products: Product[] = await productRepository
      .createQueryBuilder("product")
      .where(condition.join(" AND "))
      .getMany();

      return res.status(200).json({ status: 'success', message: 'Data Found', error: false, data: products });
		} catch (error) {
			return res.status(404).send(error)
		}
  }

  createProduct = async (req: Request, res: Response) => {
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

    const checked = await checkSizeAndCategoryValid(category, size);
    if (!checked) {
      return res.status(406).json({
        message: "Invalid category or size",
      });
    }
    const categoryToString: string = category.join(",");
    const sizeToString: string = size.join(",");

    let product = new Product()
    product.name = name
    product.category = categoryToString
    product.description = description
    product.gender = gender
    product.price = price
    product.status = status
    product.feature = feature
    product.sale = sale
    product.salePrice = salePrice
    product.size = sizeToString

    const errors = await validate(product)
		if (errors.length > 0) {
			return res.status(400).send(errors)
		}

    const productRepository = getRepository(Product)
		try {
			await productRepository.save(product)
		} catch (e) {
			res.status(404).json({ status: 'fail', message: e.message, error: e, data: false })
			return
		}

    //If all ok, send 201 response
		return res.status(201).send('Product created')
  } 

  updateProduct = async (req: Request, res: Response) => {
    const id = req.params.productId;
    let product = new Product()

    const productRepository = getRepository(Product)
    try {
			product = await productRepository.findOneOrFail(id)
		} catch (error) {
			//If not found, send a 404 response
			res.status(404).send('Product not found')
			return
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

    const checked = await checkSizeAndCategoryValid(category, size);
    if (!checked) {
      return res.status(406).json({
        message: "Invalid category or size",
      });
    }
    const categoryToString: string = category.join(",");
    const sizeToString: string = size.join(",");

    product.name = name
    product.category = categoryToString
    product.description = description
    product.gender = gender
    product.price = price
    product.status = status
    product.feature = feature
    product.sale = sale
    product.salePrice = salePrice
    product.size = sizeToString

    const errors = await validate(product)
		if (errors.length > 0) {
			return res.status(400).send(errors)
		}

		try {
			await productRepository.save(product)
		} catch (e) {
			res.status(409).send('Product already exists')
			return
		}
    //After all send a 204 (no content, but accepted) response
		return res.status(204).send()
  }

  deleteProduct = async (req: Request, res: Response) => {
    const id = req.params.productId;

    const productRepository = getRepository(Product)
		try {
			await productRepository.findOneOrFail(id)
		} catch (error) {
			res.status(404).send('User not found')
			return
		}
    productRepository.delete(id)
    res.status(204).send()
  }

  uploadProductImage = async (req: Request, res: Response, next: NextFunction) => {
    const file = req.file;
    if (!file) {
      const error = new Error("Please upload a file");
      return next(error);
    }
    const { productId } = req.params;
  
    const product: Product | undefined = await Product.findOne(
      parseInt(productId)
    );
    if (!product) {
      return res.status(404).json({
        message: `Product with ${productId} not found`,
      });
    }
  
    const oldProductImagePath =
      (process.env.PRODUCT_IMAGE_FOLDER_PATH
        ? process.env.PRODUCT_IMAGE_FOLDER_PATH
        : "./public/images/") + product.imageName;
    const newProduct = await getConnection()
      .createQueryBuilder()
      .update(Product)
      .set({
        imageName: file.filename,
      })
      .where("id = :id", { id: parseInt(productId) })
      .execute();
  
    try {
      fs.unlinkSync(oldProductImagePath);
      console.log("Successfully deleted the old product image");
      //file removed
    } catch (err) {
      return res.status(400).send(err)
    }
  
    res.status(200).json({ status: 'success', message: 'Upload product image successfully', error: false, data: newProduct })
  }
}

export default new ProductController();
