const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: "string",
    required: true,
  },
  description: {
    type: "string",
    required: true,
  },
  price: {
    type: "number",
    required: true,
  },
  stock: {
    type: "number",
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
