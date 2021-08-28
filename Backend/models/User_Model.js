import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema(
	{
		user_id: {
			type: String,
			unique: true,
			required: true,
			
		},
		user_password: {
			type: String,
			required: true,
			trim: true,
		},
		user_kind: {
			type: String,
			required: true,
			trim: true,
		},
		user_FamilyName: {
			type: String,			
			trim: true,
		},
		user_Name: {
			type: String,			
			trim: true,
		},
	},

);

const User = mongoose.model("User", UserSchema,'user');

export default User;