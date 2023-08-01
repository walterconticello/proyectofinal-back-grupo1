import express from "express";
import commentsController from "../controllers/comments.controller.js";

const router = express.Router();

router.get("/comments", commentsController.getAllComments);

export default router;