import mongoose from 'mongoose';
import bcrypt from "bcryptjs";

const PlayerSchema = new mongoose.Schema(
	{
		user: {type: String, trim: true, unique: true},
		email: {type: String, trim: true, unique: true},
		password: { type: String }
	},
	{
		timestamps: true,
    	versionKey: false
	}
);

PlayerSchema.methods.encryptPassword = async (password) => {
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password, salt);
};

PlayerSchema.methods.matchPassword = async function (password) {
	return await bcrypt.compare(password, this.password);

};

export default mongoose.model('Player', PlayerSchema);