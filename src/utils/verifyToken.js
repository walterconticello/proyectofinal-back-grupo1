import { createError } from "./error.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return next(createError(401, "Acceso denegado"));
  }

  const tokenParts = token.split(" ");
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return next(createError(401, "Token inválido"));
  }

  const jwtToken = tokenParts[1];

  jwt.verify(jwtToken, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "El token no es válido"));
    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, (err) => {
    if (err) return next(createError(403, "No estás autorizado!"));
    if (req.user.id || req.user.isAdmin || req.user.isOwner) {
      next();
    } else {
      next(createError(403, "No estás autorizado!"));
    }
  });
};

export const verifyOwner = async (req, res, next) => {
  verifyToken(req, res, (err) => {
    if (err) return next(createError(403, "No estás autorizado!"));
    if (req.user.isOwner || req.user.isAdmin) {
      next();
    } else {
      next(createError(403, "No estás autorizado!"));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, (err) => {
    if (err) return next(createError(403, "No estás autorizado!"));

    if (req.user.isAdmin) {
      next();
    } else {
      next(createError(403, "No estás autorizado como administrador!"));
    }
  });
};
