import User from "../models/User.model.js";
import bcrypt from "bcryptjs"


export const updateUser = async (req, res, next) => {
	try {
		const { username, email, password } = req.body;
		const hashedPassword = await bcrypt.hash(password, 10);

		const updatedUser = await User.findByIdAndUpdate(
			req.params.id,
			{
				$set: {
					username,
					email,
					password: hashedPassword
				},
			},
			{ new: true }
		);

		res.status(200).json(updatedUser);
	} catch (err) {
		next(err);
	}
};


export const deleteUser = async (req, res, next) => {
	try {
		await User.findByIdAndDelete(req.params.id);
		res.status(200).json("El usuario se elimino")
	} catch (err) {
		next(err);
	}
}

export const getUser = async (req, res, next) => {
	try {
		const user = await User.findById(req.params.id);
		res.status(200).json(user)
	} catch (err) {
		next(err);
	}
}

export const getUsers = async (req, res, next) => {
	try {
		const users = await User.find();
		res.status(200).json(users)
	} catch (err) {
		next(err);
	}
}