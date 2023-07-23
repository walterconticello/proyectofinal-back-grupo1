const mongoose = require("mongoose");

const uri = process.env.URI;
const db = process.env.DB;

const connectDb = async () => {
  try {
    await mongoose.connect(`${uri}/${db}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("db connection established");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDb;
