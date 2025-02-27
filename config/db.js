import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `MongoDB connected: ${connect.connection.host}`.bgMagenta.white
    );
  } catch (error) {
    console.error(`Error in cofig db.js: ${error.message}`.bgRed.white);
  }
};

export default connectDB;
