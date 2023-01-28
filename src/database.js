import { connect } from "mongoose";

// connection to db
(async () => {
  try {
    const db = await connect('mongodb://localhost:27017/trivial-app');
    console.log("Db connected to", db.connection.name);
  } catch (error) {
    console.error(error);
  }
})();