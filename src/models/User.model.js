const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true
		},
		email: {
			type: String,
			required: true,
			unique: true
		},
		password: {
			type: String,
			required: true,
		},
		state: {
			type: Boolean,
			default: true,
		},
		isAdmin: {
			type: Boolean,
			default: false
		}
	},
	{ 
		timestamps: true ,
		versionKey: false,
	}
);

const UserModel = mongoose.model("User", UserSchema); //Creamos la coleccion en la base de datos

module.exports = UserModel;

// export default mongoose.model("User", UserSchema)