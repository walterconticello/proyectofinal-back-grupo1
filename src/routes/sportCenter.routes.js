import express from "express";
import sportCenterController from "../controllers/sportCenter.controller.js";

const router = express.Router();

router.post("/sportCenter", sportCenterController.postSportCenter,);
router.get("/sportCenter", sportCenterController.getAllSportCenters);
router.get("/sportCenter/:id", sportCenterController.getSportCenterById);
router.put("/sportCenter/:id", sportCenterController.putSportCenter);
router.delete("/sportCenter/:id", sportCenterController.deleteSportCenter);

export default router;