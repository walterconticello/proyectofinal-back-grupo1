import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const verifyToken = (req, res, next) => {
	const token = req.header["access_token"]
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

export const verifyAdmin = (req, res, next) => {
	verifyToken(req, res, (err) => {
		if (err) return next(createError(403, "No estas autorizado!"));
		if (req.user.isAdmin) {
			next();
		} else {
			next(createError(403, "No estas autorizado!"));
		}
	});
};