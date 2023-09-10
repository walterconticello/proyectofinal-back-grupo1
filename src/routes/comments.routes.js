import express from "express";
import commentsController from "../controllers/comments.controller.js";
import {
  verifyAdmin,
  verifyOwner,
  verifyToken,
  verifyUser,
} from "../utils/verifyToken.js";

const router = express.Router();

router.get("/comments/user/:user", commentsController.getCommentsByUser);
router.get(
  "/comments/sportcenter/:sportcenter/:page",
  commentsController.getCommentsBySportCenter
);
router.get("/rating/:sportcenter", commentsController.getRating);
router.post("/comments", verifyUser, commentsController.createComment);
router.put("/comments/:id", verifyUser, commentsController.updateComment);
router.delete("/comments/:id", verifyUser, commentsController.deleteComment);

export default router;
