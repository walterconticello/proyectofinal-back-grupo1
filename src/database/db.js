import mongoose from "mongoose";
const URI = process.env.URI;
const DB = process.env.DB;

const connectDB = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to database: " + DB);
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
