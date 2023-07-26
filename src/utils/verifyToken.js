import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const verifyToken = (req, res, next) => {
	const token = req.cookies.access_token;
	if (!token) {
		return next(createError(401, "Autenticacion incorrecta"))
	}

	jwt.verify(token, process.env.JWT, (err, user) => {
		if(err) return next(createError(403, "El token no es valido"));
		req.user = user;
		next();
	});
};