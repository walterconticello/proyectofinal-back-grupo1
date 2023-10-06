import express from "express";
import fieldsController from "../controllers/fields.controller.js";
import {
  verifyAdmin,
  verifyOwner,
  verifyToken,
  verifyUser,
} from "../utils/verifyToken.js";

const router = express.Router();

router.post("/fields", verifyOwner, fieldsController.createField);
router.get("/fields", fieldsController.getAllFields);
router.get("/fields/:id", fieldsController.getFieldByID);
router.get("/fieldsPage/:page", fieldsController.getPage);
router.get(
  "/sportcenter/fields/:id",
  verifyOwner,
  fieldsController.getFieldsBySportCenterId
);
router.get("/fieldsOwner", verifyOwner, fieldsController.getOwnerFields);
router.put("/fields/:id", verifyOwner, fieldsController.updateField);
router.put("/fields/state/:id", verifyOwner, fieldsController.putState);
router.delete("/fields/:id", verifyOwner, fieldsController.deleteField);

export default router;
