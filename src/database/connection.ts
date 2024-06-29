import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL || "");
    console.log("Database Connected Successfully.");
  } catch (error) {
    console.log("Error While Connecting to database " + error);
  }
};

export default dbConnection;
