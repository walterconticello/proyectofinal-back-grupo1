const { default: mongoose } = require("mongoose");
const UserModel = require("../models/user.model");

 const getUser = async (req, res, next) => {
	try {
		const user = await UserModel.findById(req.params.id);
		// console.log(user);
		res.status(200).json(user)
	} catch (err) {
		
	}
	console.log(getUser)
}
const getUsers = async (req, res) => {
	try {
		const users = await UserModel.find();
		res.status(200).json(users)
	} catch (err) {
		console.log(err);
	}
}
const updateUser = async (req, res) => {
	try {
		const newUser = new UserModel({
			username: req.body.username,
			email: req.body.email,
			password: req.body.password,
		})
		res.status(200).json(newUser)
		await newUser.save();
	} catch (err) {
		console.log(err);
	}
}

module.exports = {getUser , getUsers ,updateUser}
