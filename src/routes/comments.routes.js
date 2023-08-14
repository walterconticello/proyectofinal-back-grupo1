import express from "express";
import commentsController from "../controllers/comments.controller.js";

const router = express.Router();

router.get("/comments", commentsController.getAllComments);
router.get("/comments/:id", commentsController.getByID);
router.get("/comments/user/:user", commentsController.getCommentsByUser);
router.get("/comments/sportcenter/:sportcenter", commentsController.getCommentsBySportCenter);
router.get("/rating/:sportcenter", commentsController.getRating);
router.post("/comments", commentsController.createComment);
router.put("/comments/:id", commentsController.updateComment);
router.delete("/comments/:id", commentsController.deleteComment);

export default router;