import { Schema, model } from "mongoose";

const saleSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
    },
    totalPrice: {
      type: Number,
      min: 0,
      max: 250000,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

const Sale = model("Sale", saleSchema);

export default Sale;
