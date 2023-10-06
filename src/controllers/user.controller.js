import User from "../models/User.model.js";
import bcrypt from "bcryptjs"
import { uploadPhoto } from "../utils/cloudinary.js";
import fs from "fs-extra";


export const updateUser = async (req, res, next) => {
	try {
		const { username, email, password , isOwner , isAdmin , state } = req.body;
		const userToUpdate = {
			username,
			email,
			isOwner ,
			isAdmin , 
			state,
		};
		if (password) {
			const hashedPassword = await bcrypt.hash(password, 10);
			userToUpdate.password = hashedPassword;
		}

		if (req.files && req.files.photo) {
			const result = await uploadPhoto(req.files.photo.tempFilePath);
			await fs.remove(req.files.photo.tempFilePath);
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
		console.log(err);
		next(err);
	}
};


export const deleteUser = async (req, res, next) => {
	try {
		await User.findByIdAndDelete(req.params.id);
		res.status(200).json("El usuario se elimino")
	} catch (err) {
		console.log(err);
		next(err);
	}
}

export const getUser = async (req, res, next) => {
	try {
		const user = await User.findById(req.params.id);
		res.status(200).json(user)
	} catch (err) {
		console.log(err);
		next(err);
	}
}

export const getUsers = async (req, res, next) => {
	try {
		const users = await User.find();
		res.status(200).json(users)
	} catch (err) {
		console.log(err);
		next(err);
	}
}