import mongoose from "mongoose";

const { Schema } = mongoose;

const complexSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      minlength: 3,
    },
    services: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      minlength: 3,
    },
    latitude: {
      type: Number,
      required: true,
      trim: true,
      min: -90,
      max: 90,
    },
    phone: {
      facebook: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
      },
      instagram: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
      },
    },
    location: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      minlength: 3,
      maxlength: 30,
    },
    openHour: {
      type: Number,
      required: true,
      min: 0,
      max: 23,
    },
    closeHour: {
      type: Number,
      required: true,
      min: 0,
      max: 23,
    },
    address: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      minlength: 3,
      maxlength: 30,
    },
    fields: {
      type: [String],
      required: true,
    },
  },
  { versionKey: false }
);

const SportCenterModel = mongoose.model("complex", complexSchema);

export default SportCenterModel;
