import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user.controller.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
import { auth } from "../middlewares/auth.js";
import { getAuthStatus } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/authStatus", auth, getAuthStatus);

//UPDATE
router.put("/user/:id", auth, verifyUser, updateUser);

//DELETE
router.delete("/user/:id", auth, verifyUser, deleteUser);

//GET
router.get("/user/:id", verifyUser, getUser);

//GET ALL (solo para administradores)
router.get("/user", verifyAdmin, getUsers);

export default router;
