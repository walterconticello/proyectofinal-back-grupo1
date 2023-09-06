import express from "express";
const router = express.Router();

import salesController from "../controllers/sales.controller.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

//GET /sales
router.get("/sales", verifyAdmin, salesController.getSales); //only admin

//GET BY ID /products/:id
router.get("/sales/:id", verifyAdmin, salesController.getSaleById);

//GET BY userId

//POST /products
router.post("/sales", verifyUser, salesController.createSale);

export default router;
