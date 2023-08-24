import mongoose from "mongoose";

const { Schema } = mongoose;

const sportCenterSchema = new Schema(
  {
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      // required: true,
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
    },
    
    services: {
      bar: {
        type: Boolean,
    },
    showers: {
      type: Boolean,
    },
    Grill: {
      type: Boolean,
    },
    parking: {
      type: Boolean,
    },
    },

    fields: {
      type: String,
    },

    openHour: {
      type: String,
      lowercase: true,
      // min: 0,
      // max: 24,
    },

    closeHour: {
      type: String,
      trim: true,
      lowercase: true,
      // min: 0,
      // max: 24,
    },

    photo: {
      type: String,  
    },

    social: {
      facebook: {
        type: String,  
      },

      instagram: {
        type: String,
      },
    },

    latitude: {
      type: String,
    },

    location: {
      type: String,
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