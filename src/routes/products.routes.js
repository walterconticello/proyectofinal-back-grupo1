import express from "express";
const router = express.Router();
import { verifyAdmin } from "../utils/verifyToken.js";
import productsController from "../controllers/products.controller.js";


router.get("/products", productsController.getAllProducts);


router.get("/products/:id", productsController.getProductById);


router.post("/products", verifyAdmin, productsController.createProduct);


router.put("/products/:id", verifyAdmin, productsController.updateProduct);


router.delete("/products/:id", verifyAdmin, productsController.deleteProduct);

export default router;
