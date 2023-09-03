import productSchema from "../models/product.model.js";
import validation from "../helpers/products.validation.js";
import { uploadImage, deleteImage } from "../utils/cloudinary.js";
import fs from "fs-extra";

import { createError } from "../utils/error.js";
//GET

const getAllProducts = async (req, res) => {
  try {
    const products = await productSchema.find();
    res.status(200).json({ products });
  } catch (err) {
    const error = createError(400, err.message);
    res.status(error.status).json({ message: error.message });
  }
};

//GET BY ID

const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await productSchema.findById(id);
    if (product) {
      res.json(product);
    } else {
      const error = createError(404, "Product not found");
      res.status(error.status).json({ message: error.message });
    }
  } catch (err) {
    const error = createError(500, err.message);
    res.status(error.status).json({ message: error.message });
  }
};

//POST
const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, categories } = req.body;
    let image;

    if (req.files && req.files.image) {
      const result = await uploadImage(req.files.image.tempFilePath);
      fs.remove(req.files.image.tempFilePath);
      image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    const productData = {
      name,
      description,
      price,
      stock,
      categories,
      image,
    };

    if (!validation.createProductDataValidation(productData)) {
      const error = createError(400, "Missing data");
      return res.status(error.status).json({ message: error.message });
    }

    if (
      validation.nameValidation(name) &&
      validation.descriptionValidation(description) &&
      validation.priceValidation(price) &&
      validation.stockValidation(stock) &&
      validation.categoriesValidation(categories)
    ) {
      const product = new productSchema(productData);
      await product.save();
      return res.status(201).json(product);
    } else {
      let invalidFields = [];
      if (!validation.nameValidation(name)) {
        invalidFields.push("name");
      }
      if (!validation.descriptionValidation(description)) {
        invalidFields.push("description");
      }
      if (!validation.priceValidation(price)) {
        invalidFields.push("price");
      }
      if (!validation.stockValidation(stock)) {
        invalidFields.push("stock");
      }
      if (!validation.categoriesValidation(categories)) {
        invalidFields.push("categories");
      }
      const error = createError(400, "Invalid data", { invalidFields });
      return res
        .status(error.status)
        .json({ message: error.message, invalidFields });
    }
  } catch (err) {
    const error = createError(500, err.message);
    res.status(error.status).json({ message: error.message });
  }
};

//PUT
const updateProduct = async (req, res) => {
  try {
    const product = await productSchema.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const { name, description, price, stock, categories } = req.body;
    let image;

    if (req.files && req.files.image) {
      const result = await uploadImage(req.files.image.tempFilePath);

      if (product.image.public_id) {
        await deleteImage(product.image.public_id);
      }

      await fs.remove(req.files.image.tempFilePath);
      image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    if (name !== undefined) {
      product.name = name;
    }

    if (description !== undefined) {
      product.description = description;
    }

    if (price !== undefined) {
      product.price = price;
    }

    if (stock !== undefined) {
      product.stock = stock;
    }

    if (categories !== undefined) {
      product.categories = categories;
    }

    if (image !== undefined) {
      product.image = image;
    }

    const validationResult = validation.validateProduct(product);

    if (validationResult.isValid) {
      await product.save();
      return res.status(200).json(product);
    } else {
      const error = createError(400, "Invalid data", {
        invalidFields: validationResult.invalidFields,
      });
      return res.status(error.status).json({
        message: error.message,
        invalidFields: error.invalidFields,
      });
    }
  } catch (err) {
    const error = createError(500, err.message);
    return res.status(error.message).json({ message: error.message });
  }
};

//DELETE
const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedProduct = await productSchema.findOneAndDelete({ _id: id });

    if (deletedProduct.image.public_id) {
      await deleteImage(deletedProduct.image.public_id);
    }

    if (!deletedProduct) {
      const error = createError(404, "Product not found");
      return res.status(error.status).json({ message: error.message });
    }

    res.status(200).json({ message: "product deleted" });
  } catch (err) {
    const error = createError(500, err.message);
    res.status(error.status).json({ message: error.message });
  }
};

export default {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
