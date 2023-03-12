import mongoose from 'mongoose';

const ResultSchema = new mongoose.Schema({
	result: {type: Number}, 
	user: {type: String}
},
{
	timestamps: true,
	versionKey: false
});

export default mongoose.model('Result', ResultSchema);