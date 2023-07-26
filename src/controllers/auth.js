import User from "../models/User.js";
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js";

export const register = async (req, res, next) => {
	try {

		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(req.body.password, salt);

		const newUser = new User({
			username: req.body.username,
			email: req.body.email,
			password: hash,
			name: req.body.name,
			lastname: req.body.lastname,
		})

		await newUser.save()
		res.status(200).send("El usuario fue creado!")
	} catch (err){
		next(err);
	}
}

import User from "../models/User.js";
import bcrypt from "bcryptjs"

export const login = async (req, res, next) => {
	try {

		const user = await User.findOne({email: req.body.email})
		if (!user) return next(createError(404, "Usuario no encontrado!"));

		const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
		if(!isPasswordCorrect) return next(createError(400, "Usuario o contraseña incorrectos!"))


		const {password, isAdmin, ...otherDetails} = user._doc;
		res.status(200).json({...otherDetails})
	} catch (err){
		next(err);
	}
}