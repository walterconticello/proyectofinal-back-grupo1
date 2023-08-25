import express from "express";
import commentsController from "../controllers/comments.controller.js";
import { verifyAdmin, verifyOwner, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/comments", commentsController.getAllComments);
router.get("/comments/:id", commentsController.getByID);
router.get("/comments/user/:user", commentsController.getCommentsByUser);
router.get("/comments/sportcenter/:sportcenter/:page", commentsController.getCommentsBySportCenter);
router.get("/rating/:sportcenter", commentsController.getRating);
router.post("/comments",commentsController.createComment); //Verificar login
router.put("/comments/:id", commentsController.updateComment); //Verificar login
router.delete("/comments/:id", commentsController.deleteComment); //Verificar login

export default router;