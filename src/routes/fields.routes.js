import express from "express";
import fieldsController from "../controllers/fields.controller.js";

const router = express.Router();

router.post("/fields", fieldsController.createField);
router.get("/fields", fieldsController.getAllFields);
router.get("/fields/:id", fieldsController.getFieldByID);
router.put("/fields/:id", fieldsController.updateField);
router.delete("/fields/:id", fieldsController.deleteField);

export default router;
