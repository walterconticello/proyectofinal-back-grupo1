import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const verifyToken = (req, res, next) => {
	const token = req.headers["access_token"]
	if (!token) {
		return next(createError(401, "Acceso denegado"))
	}

	jwt.verify(token, process.env.JWT, (err, user) => {
		if (err) return next(createError(403, "El token no es valido"));
		req.user = user;
		next();
	});
};

export const verifyUser = (req, res, next) => {
	verifyToken(req, res, (err) => {
		if (err) return next(createError(403, "No estas autorizado!"));
		if (req.user.id === req.params.id || req.user.isAdmin) {
			next();
		} else {
			next(createError(403, "No estas autorizado!"));
		}
	});
};

export const verifyOwner = async (req, res, next) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user) {
			return res.status(404).json({ message: "Usuario no encontrado" });
		}

		if (req.user.isAdmin || user.isOwner) {
			next();
		} else {
			return res.status(403).json({ message: "No estás autorizado para realizar esta acción" });
		}
	} catch (error) {
		return res.status(500).json({ message: "Error interno del servidor" });
	}
};

export const verifyAdmin = (req, res, next) => {
	verifyToken(req, res, (err) => {
		if (err) return next(createError(403, "No estas autorizado!"));

		if (req.user.isAdmin) {
			next();
		} else {
			next(createError(403, "No estas autorizado como administrador!"));
		}
	});
};