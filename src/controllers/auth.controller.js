import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import { verifyToken } from "../utils/verifyToken.js";

export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);

    

    const newUser = new User({
      username,
      email,
      password: hash,
    });
    
    console.log(newUser, "usuario");
    await newUser.save();
    res.status(200).json({ message: "Usuario creado con exito" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "Usuario no encontrado!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Usuario o contraseña incorrectos!"));

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT, {
      expiresIn: "8h",
    });

    res
      .status(200)
      .json({ message: "Ingreso correcto", ok: true, user, token });
  } catch (error) {
    res
      .status(error.code || 500)
      .json({ message: error.message || "algo explotó :|" });
  }
};

export const getAuthStatus = async (req, res) => {
  try {
    const id = req.id;
    const user = await User.findById(id);
    if (!user) return next(createError("Autenticación fallida", 401));
    res.status(200).json({ user });
  } catch (error) {
    res.status(error.code || 500).json({
      message:
        error.message || "Ups! Hubo un problema, por favor intenta más tarde",
    });
  }
};
