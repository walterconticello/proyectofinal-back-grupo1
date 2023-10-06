import express from "express";
import { check, validationResult } from "express-validator";
import { getAuthStatus, login, register } from "../controllers/auth.controller.js";
import { verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

const usernameValidator = check("username")
	.notEmpty().withMessage("El nombre de usuario es obligatorio")
	.isLength({ min: 4, max: 20 }).withMessage("El nombre de usuario debe tener entre 4 y 20 caracteres");

const emailValidator = check("email")
	.notEmpty().withMessage("El correo electrónico es obligatorio")
	.isEmail().withMessage("Correo electrónico inválido")
	.isLength({ max: 50 }).withMessage("El correo electrónico debe tener como máximo 24 caracteres");

const passwordValidator = check("password")
	.notEmpty().withMessage("La contraseña es obligatoria")
	.isLength({ min: 6, max: 16 }).withMessage("La contraseña debe tener entre 6 y 16 caracteres");

router.post(
	"/register",
	[
		usernameValidator,
		emailValidator,
		passwordValidator
	],
	register
);

router.post(
	"/login",
	[
		usernameValidator,
		passwordValidator
	],
	login
);

router.get("/check", verifyUser, getAuthStatus);

export default router;
