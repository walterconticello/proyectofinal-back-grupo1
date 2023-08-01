import express from "express";
import commentsController from "../controllers/comments.controller.js";

const router = express.Router();

router.get("/comments", commentsController.getAllComments);
router.get("/comments/:id", commentsController.getByID);

export default router;