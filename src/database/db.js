import mongoose from "mongoose";

export const connect = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/complex", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database connected");
    } catch (error) {
        console.log(error.message);
    }
    mongoose.connection.on("disconnected", () => {
        console.log("Database disconnected");
    });
};

