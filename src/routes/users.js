import express from "express";
import {
	deleteUser,
	getUser,
	getUsers,
	updateUser,
} from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req, res, next) => {
// 	res.send("Hola Usuario, estas logeado");
// });

// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
// 	res.send("Hola Usuario, estas logeado y puedes eliminar tu cuenta");
// });

// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
// 	res.send("Hola admin, estas logeado y puedes eliminar todas las cuentas");
// });

//UPDATE
router.put("/:id", verifyUser, updateUser);

//DELETE
router.delete("/:id", verifyUser, deleteUser);

//GET
router.get("/:id", verifyUser, getUser);

//GET ALL (solo para administradores)
router.get("/", verifyAdmin, getUsers);

export default router;
