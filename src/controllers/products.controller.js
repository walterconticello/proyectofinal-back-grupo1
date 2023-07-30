const productSchema = require("../models/product.model");
import validation from "../helpers/products.validation";

//GET

const getAllProducts = async (req, res) => {
  try {
    const allProducts = await productSchema.find();
    res.status(200).json(allProducts);
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
    const productBody = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
      categories: req.body.categories,
    };
    if (!validation.createProductDataValidation(productBody)) {
      res.status(400).json({ message: "missing data" });
    } else if (
      validation.nameValidation(productBody.name) &&
      validation.descriptionValidation(productBody.description) &&
      validation.priceValidation(productBody.price) &&
      validation.stockValidation(productBody.stock) &&
      validation.categoriesValidation(productBody.categories)
    ) {
      const product = new productSchema(productBody);
      await product.save();
      res.status(201).json(product);
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
    const { name, description, price, stock, categories } = req.body;

    if (!product) {
      return res.status(404).json("Product Not Found");
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

    if (
      validation.nameValidation(product.name) &&
      validation.descriptionValidation(product.description) &&
      validation.priceValidation(product.price) &&
      validation.stockValidation(product.stock) &&
      validation.categoriesValidation(product.categories)
    ) {
      await product.save();
      return res.status(200).json(product);
    } else {
      return res.status(400).json("invalid data");
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
    await productSchema.findOneAndDelete({ _id: id });
    res.status(200).json({ message: "product deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
