const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: "string",
      required: true,
      min: 3,
      max: 45,
    },
    description: {
      type: "string",
      required: true,
      min: 5,
      max: 255,
    },
    price: {
      type: "number",
      required: true,
      min: 0,
    },
    stock: {
      type: "number",
      required: true,
      min: 0,
    },
    categories: {
      type: [String],
      required: true,
    },
  },
  { versionKey: false }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
