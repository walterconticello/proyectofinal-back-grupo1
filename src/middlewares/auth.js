import User from "../models/User.model.js";
import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
	try {
		const token = req.header("access_token");
		const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY);
		req.id = id;

		const user = await User.findById(id);
		req.user = user;
		next();
	} catch (error) {
		res.status(401).json({ message: "Invalid token" });
	}
};