import User from "../models/User.model.js";
import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  try {
    const token = req.header("authorization");

    if (!token) {
      return next(createError(401, "Acceso denegado"));
    }

    const tokenParts = token.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      return next(createError(401, "Token inválido"));
    }

    const jwtToken = tokenParts[1];

    const { id } = jwt.verify(jwtToken, process.env.JWT);
    req.id = id;

    const user = await User.findById(id);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido" });
  }
};