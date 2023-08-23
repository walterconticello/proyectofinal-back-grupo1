import mongoose from "mongoose";

const URI = "mongodb://127.0.0.1:27017"
const DB =  "canchasapp"


const connectDB = async () => {
    try {
        await mongoose.connect(`${URI}/${DB}`, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to database: " + DB);
    }
    catch (error) {
        console.log(error);
    }
}

export default connectDB;
