import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: "string",
      required: true,
      minLength: 3,
      maxLength: 45,
    },
    description: {
      type: "string",
      required: true,
      minLength: 5,
      maxLength: 255,
    },
    price: {
      type: "number",
      required: true,
      min: 0,
      max: 100000,
    },
    stock: {
      type: "number",
      required: true,
      min: 0,
      max: 10000,
    },
    categories: {
      type: [String],
      required: true,
    },
    image: {
      url: "string",
      public_id: "string",
    },
    isValid: {
      type: "boolean",
    },
  },
  { versionKey: false }
);

export default mongoose.model("Product", productSchema);
