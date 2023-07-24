import express from "express";
import fieldsController from "../controllers/fields.controller";

const router = express.Router();

router.post("/fields", fieldsController.createField);

export default router;