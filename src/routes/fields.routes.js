import express from "express";
import fieldsController from "../controllers/fields.controller";

const router = express.Router();

router.post("/fields", fieldsController.createField);

module.exports = router; //If you use export default router, it throws an error