import express from "express";
const router = express.Router();
import { auth } from "../middlewares/auth.js";
import { verifyAdmin } from "../utils/verifyToken.js";
import productsController from "../controllers/products.controller.js";

//GET /products
router.get("/products", productsController.getAllProducts);

//GET BY ID /products/:id
router.get("/products/:id", productsController.getProductById);

//POST /products
router.post("/products", auth, verifyAdmin, productsController.createProduct);

//PUT /products/:id
router.put(
  "/products/:id",
  auth,
  verifyAdmin,
  productsController.updateProduct
);

//DELETE /products/:id
router.delete(
  "/products/:id",
  auth,
  verifyAdmin,
  productsController.deleteProduct
);

export default router;
