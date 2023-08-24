import mongoose from "mongoose";

const { Schema } = mongoose;

const sportCenterSchema = new Schema(
  {
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      minlength: 3,
    },
    
    address: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      minlenght: 3,
      maxlenght: 30,
    },

    phone : {
      type: Number,
      required: true,
      trim: true,
      lowercase: true, 
    },
    
    services: {
      bar: {
        type: Boolean,
        required: true,
        trim: true,
        lowercase: true,
    },
    showers: {
      type: Boolean,
      required: true,
      trim: true,
      lowercase: true,
    },
    Grill: {
      type: Boolean,
      required: true,
      trim: true,
      lowercase: true,
    },
    parking: {
      type: Boolean,
      required: true,
      trim: true,
      lowercase: true,
    },
    },

    fields: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      minlength: 3,
    },

    openHour: {
      type: Number,
      required: true,
      trim: true,
      lowercase: true,
      min: 0,
      max: 24,
    },

    closeHour: {
      type: Number,
      required: true,
      trim: true,
      lowercase: true,
      min: 0,
      max: 24,
    },

    photo: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      minlength: 3,
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

    latitude: {
      type: Number,
      required: true,
      trim: true,
      lowercase: true,
      min: -90,
      max: 90,
    },

    location: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      minlength: 3,
      maxlength: 30,
    },
    
  },
  { versionKey: false }
);


const sportCenterModel = mongoose.model("sportCenter", sportCenterSchema);

export default sportCenterModel;