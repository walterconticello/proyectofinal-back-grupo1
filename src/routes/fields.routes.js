import express from "express";
import fieldsController from "../controllers/fields.controller";

const router = express.Router();

router.post("/fields", fieldsController.createField);
router.get("/fields", fieldsController.getAllFields);
router.get("/fields/:id", fieldsController.getFieldByID);
router.put("/fields/:id", fieldsController.updateField);
router.delete("/fields/:id", fieldsController.deleteField);

module.exports = router; //If you use export default router, it throws an error