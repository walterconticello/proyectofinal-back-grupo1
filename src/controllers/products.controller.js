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
  const id = req.params.id;
  const product = await productSchema.findById(id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
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
    };
    if (!validation.createProductDataValidation(productBody)) {
      res.status(400).json({ message: "missing data" });
    } else if (
      validation.nameValidation(productBody.name) &&
      validation.priceValidation(productBody.price)
    ) {
      const product = new productSchema(req.body);
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
    const id = req.params.id;
    const product = await productSchema.findById(id);
    if (product) {
      product.name = req.body.name;
      product.description = req.body.description;
      product.price = req.body.price;
      product.stock = req.body.stock;
      await product.save();
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: "product not found" });
    }
  } catch (err) {
    console.log(err);
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
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
