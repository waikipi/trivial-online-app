import {Schema, model} from 'mongoose';

const ResultSchema = Schema({
	result: {type: Number}, 
	user: {type: String}
},
{
	timestamps: true,
	versionKey: false
});

export default model ('Result', ResultSchema);