import express from "express";
import sportCenterController from "../controllers/sportCenter.controller.js";
import { verifyOwner } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/sportCenter", verifyOwner, sportCenterController.postSportCenter);
router.get("/sportCenter", sportCenterController.getAllSportCenters);
router.get("/sportCenter/:id", sportCenterController.getSportCenterById);
router.get("/sportCenter/owner/:id", sportCenterController.getSportCenterOwner);
router.put(
  "/sportCenter/:id",
  verifyOwner,
  sportCenterController.putSportCenter
);
router.delete(
  "/sportCenter/:id",
  verifyOwner,
  sportCenterController.deleteSportCenter
);

export default router;
