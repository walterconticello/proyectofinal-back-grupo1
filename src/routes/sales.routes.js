import express from "express";
const router = express.Router();

import salesController from "../controllers/sales.controller.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";


router.post("/sales", verifyUser, salesController.createSale);


router.get("/sales", verifyAdmin, salesController.getSales); //only admin


router.get("/sales/:id", verifyAdmin, salesController.getSaleById);


export default router;
