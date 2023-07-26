import User from "../models/User.js";

export const register = async (req, res, next) => {
	try {
		const newUser = new User({
			username: req.body.username,
			email: req.body.email,
			password: req.body.password,
			name: req.body.name,
			lastname: req.body.lastname,
		})

		await newUser.save()
		res.status(200).send("El usuario fue creado!")
	} catch (err){
		next(err);
	}
}