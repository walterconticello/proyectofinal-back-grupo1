import { createError } from "./error.js";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js"

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const tokenParts = token.split(" ");

    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      return res.status(401).json({ message: "Token inválido" });
    }
    const jwtToken = tokenParts[1];
    console.log(jwtToken + " " + process.env.JWT)
    const { id } = jwt.verify(jwtToken, process.env.JWT);

    req.id = id;

    const user = await User.findById(id);
    req.user = user;
    next();
  } catch (error) {
    console.log(error.message)
    res.status(401).json({ message: "Acceso denegado" });
  }
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
