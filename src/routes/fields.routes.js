import express from "express";
import fieldsController from "../controllers/fields.controller.js";
import {
  verifyAdmin,
  verifyOwner,
  verifyToken,
  verifyUser,
} from "../utils/verifyToken.js";

const router = express.Router();

router.post("/fields", verifyOwner, fieldsController.createField); //this route is only for owners
router.get("/fields", fieldsController.getAllFields);
router.get("/fields/:id", fieldsController.getFieldByID);
router.get("/fieldsPage/:page", fieldsController.getPage);
router.put("/fields/:id", verifyOwner, fieldsController.updateField); //this route is only for owners
router.delete("/fields/:id", verifyOwner, fieldsController.deleteField); //this route is only for owners

export default router;
