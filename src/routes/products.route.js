import express from "express";
const router = express.Router();

import productsController from "../controllers/products.controller.js";

//GET /products
router.get("/products", productsController.getAllProducts);

//GET BY ID /products/:id
router.get("/products/:id", productsController.getProductById);

//POST /products
router.post("/products", productsController.createProduct);

//PUT /products/:id
router.put("/products/:id", productsController.updateProduct);

//DELETE /products/:id
router.delete("/products/:id", productsController.deleteProduct);

export default router;
