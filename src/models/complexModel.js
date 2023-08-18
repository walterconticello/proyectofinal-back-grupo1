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
      lowercase: true,
      min: -90,
      max: 90,
    },

    fields: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      minlength: 3,
    },

    phone : {
      type: Number,
      required: true,
      trim: true,
      lowercase: true, 
    },

    social: {
      facebook: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minlength: 3,
      },
      instagram: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minlength: 3,
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
    
    address: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      minlenght: 3,
      maxlenght: 30,
    },
  },
  { versionKey: false }
);


const complexModel = mongoose.model("complex", complexSchema);

export default complexModel;
