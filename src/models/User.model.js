import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
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
		},
		isOwner: {
			type: Boolean,
			default: false
		},
	},
	{ 
		timestamps: true ,
		versionKey: false,
	}
);

export default mongoose.model("User", UserSchema)