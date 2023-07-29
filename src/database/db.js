const mongoose = require('mongoose');

const URI = process.env.URI;
const DB = process.env.DB; 

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