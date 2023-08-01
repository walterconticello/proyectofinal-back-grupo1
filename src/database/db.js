import mongoose from "mongoose";
const URI = process.env.URI; //Getting URI from .env
const DB = process.env.DB; //Getting database name from .env

const connectDB = async () => {
  try {
    await mongoose.connect(`${URI}/${DB}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to database: " + DB);
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
