import express from "express";
import { check } from "express-validator";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user.controller.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
import { getAuthStatus } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/authStatus", getAuthStatus);

const usernameValidator = check("username")
  .optional()
  .isLength({ min: 4, max: 20 })
  .withMessage("El nombre de usuario debe tener entre 4 y 20 caracteres");

const emailValidator = check("email")
  .optional()
  .isEmail()
  .withMessage("Correo electrónico inválido")
  .isLength({ max: 50 })
  .withMessage("El correo electrónico debe tener como máximo 24 caracteres");

const passwordValidator = check("password")
  .optional()
  .isLength({ min: 6, max: 16 })
  .withMessage("La contraseña debe tener entre 6 y 16 caracteres");

router.put(
  "/:id",
  verifyUser,
  [usernameValidator, emailValidator, passwordValidator],
  updateUser
);

// DELETE
router.delete("/:id", verifyUser, deleteUser);

// GET
router.get("/:id", verifyUser, getUser);

// GET ALL
router.get("/", getUsers);

export default router;
