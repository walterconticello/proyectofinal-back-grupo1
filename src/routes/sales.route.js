import express from "express";
const router = express.Router();

import salesController from "../controllers/sales.controller.js";

//GET /sales
router.get("/sales", salesController.getSales);

//GET BY ID /products/:id
router.get("/sales/:id", salesController.getSaleById);

//POST /products
router.post("/sales", salesController.createSale);

export default router;
