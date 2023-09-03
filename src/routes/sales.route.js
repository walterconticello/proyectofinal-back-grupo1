import express from "express";
const router = express.Router();

import salesController from "../controllers/sales.controller.js";
import { auth } from "../middlewares/auth.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

//GET BY userId /sales
router.get("/sales/user", auth, verifyUser, salesController.getSalesByUserId);

//POST /products
router.post("/sales", auth, verifyUser, salesController.createSale);

//GET /sales
router.get("/sales", auth, verifyAdmin, salesController.getSales); //only admin

//GET BY salesID /sales/:id
router.get("/sales/:id", auth, verifyAdmin, salesController.getSaleById);
export default router;
