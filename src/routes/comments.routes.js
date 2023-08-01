import express from "express";
import commentsController from "../controllers/comments.controller.js";

const router = express.Router();

router.get("/comments", commentsController.getAllComments);
router.get("/comments/:id", commentsController.getByID);
router.get("/comments/user/:user", commentsController.getCommentsByUser);
router.get("/comments/sportcenter/:sportcenter", commentsController.getCommentsBySportCenter);
router.post("/comments", commentsController.createComment);

export default router;