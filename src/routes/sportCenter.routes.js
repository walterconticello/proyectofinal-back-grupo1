import express from "express";
import sportCenterController from "../controllers/sportCenter.controller.js";
import { auth } from "../middlewares/auth.js";
import { verifyOwner } from "../utils/verifyToken.js";

const router = express.Router();

router.post(
  "/sportCenter",
  auth,
  verifyOwner,
  sportCenterController.postSportCenter
);
router.get("/sportCenter", sportCenterController.getAllSportCenters);
router.get("/sportCenter/:id", sportCenterController.getSportCenterById);
router.put(
  "/sportCenter/:id",
  auth,
  verifyOwner,
  sportCenterController.putSportCenter
);
router.delete(
  "/sportCenter/:id",
  auth,
  verifyOwner,
  sportCenterController.deleteSportCenter
);

export default router;
