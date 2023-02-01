/*import { connect } from "mongoose";

// connection to db
(async () => {
  try {
    const db = await connect('mongodb://localhost:27017/trivial-app');
    console.log("Db connected to", db.connection.name);
  } catch (error) {
    console.error(error);
  }
})();*/

import mongoose from "mongoose";

// connection to db

  try {
    //const db = await mongoose.connect('mongodb://localhost:27017/trivial-app');
	const db = mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/trivial-app');
    //console.log("Db connected to", db.connection.name);
	console.log("Db connected to");
  } catch (error) {
    console.error(error); 
  }

