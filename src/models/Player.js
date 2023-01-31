/*import {Schema, model} from 'mongoose';
import bcrypt from "bcryptjs";

const PlayerSchema = Schema(
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

export default model('Player', PlayerSchema);*/

import mongoose from 'mongoose';
const { Schema } = mongoose;

import bcrypt from "bcryptjs";

const PlayerSchema = Schema(
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

export default model('Player', PlayerSchema);