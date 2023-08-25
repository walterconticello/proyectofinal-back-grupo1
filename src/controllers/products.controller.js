import productSchema from "../models/product.model.js";
import validation from "../helpers/products.validation.js";
import { uploadImage, deleteImage } from "../utils/cloudinary.js";
import fs from "fs-extra";
//GET

const getAllProducts = async (req, res) => {
  try {
    const products = await productSchema.find();
    res.status(200).json({ products });
  } catch (err) {
    res.status(400).json({ message: err.message });
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
      res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

//POST
const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, categories } = req.body;
    console.log(req.files);
    let image;

    if (req.files && req.files.image) {
      const result = await uploadImage(req.files.image.tempFilePath);
      await fs.remove(req.files.image.tempFilePath);
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
      return res.status(400).json({ message: "missing data" });
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
      return res.status(400).json({ message: "invalid data", invalidFields });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

//PUT
const updateProduct = async (req, res) => {
  try {
    const product = await productSchema.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    console.log(req.body);
    const { name, description, price, stock, categories } = req.body;
    let image;

    if (req.files && req.files.image) {
      const result = await uploadImage(req.files.image.tempFilePath);
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
      return res.status(400).json({
        message: "Invalid data",
        invalidFields: validationResult.invalidFields,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
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
      return res.status(404).json({ message: "product not found" });
    }

    res.status(200).json({ message: "product deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

export default {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
