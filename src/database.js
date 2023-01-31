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
(async () => {
  try {
    //const db = await mongoose.connect('mongodb://localhost:27017/trivial-app');
	const db = await mongoose.connect('mongodb+srv://fidmugal.x8gl0h8.mongodb.net/?retryWrites=true&w=majority');
    console.log("Db connected to", db.connection.name);
  } catch (error) {
    console.error(error);
  }
})();

