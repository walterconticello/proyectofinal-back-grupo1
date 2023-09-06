import User from "../models/User.model.js";
import bcrypt from "bcryptjs"
import { uploadPhoto } from "../utils/cloudinary.js";
import fs from "fs-extra";


export const updateUser = async (req, res, next) => {
	try {
		const { username, email, password } = req.body;
		const userToUpdate = {
			username,
			email,
		};

		// Verificar si se proporciona una contraseña
		if (password) {
			const hashedPassword = await bcrypt.hash(password, 10);
			userToUpdate.password = hashedPassword;
		}

		if (req.files && req.files.photo) {
			const result = await uploadPhoto(req.files.photo.tempFilePath);
			await fs.remove(req.files.photo.tempFilePath);

			// Agregar la URL de la imagen de perfil y el public_id a userToUpdate
			userToUpdate.photo = {
				url: result.secure_url,
				public_id: result.public_id,
			};
		}

		const updatedUser = await User.findByIdAndUpdate(
			req.params.id,
			{
				$set: userToUpdate,
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