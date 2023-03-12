import mongoose from "mongoose";

// connection to db

  try {
	const db = mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/trivial-app');
	console.log("Db connected");
  } catch (error) {
    console.error(error); 
  }

