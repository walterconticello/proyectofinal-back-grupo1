import mongoose from "mongoose";

const { Schema } = mongoose;

const servicesSchema = new Schema({
  bar: {
    type: Boolean,
    required: true,
    default: false,
  },
  showers: {
    type: Boolean,
    required: true,
    default: false,
  },
  grill: {
    type: Boolean,
    required: true,
    default: false,
  },
  parking: {
    type: Boolean,
    required: true,
    default: false,
  },
  dressingRoom: {
    type: Boolean,
    required: true,
    default: false,
  }
});

const photoSchema = new Schema({
  url: {
      type: String,
  },
  public_id: {
      type: String,
  }
});

const socialSchema = new Schema({
  facebook: {
    type: String,
    trim: true,
    minLenght: 7,
    maxLenght: 150
  },

  instagram: {
    type: String,
    trim: true,
    minLenght: 7,
    maxLenght: 150
  },
});

const locationSchema = new Schema({
  latitude: {
    type: String,
    trim: true,
    minLength: 3,
    maxLength: 100
  },

  longitude: {
    type: String,
    trim: true,
    minLength: 3,
    maxLength: 100
  },
});

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
      lowercase: false,
      minLength: 3,
      maxLength: 50
    },

    address: {
      type: String,
      required: true,
      trim: true,
      lowercase: false,
      minLenght: 3,
      maxLenght: 50
    },

    phone: {
      type: String,
      required: true,
      trim: true,
      minLenght: 7,
      maxLenght: 16
    },

    description: {
      type: String,
      trim: true,
      lowercase: false,
      required: true,
      minLength: 10,
      maxLength: 400
    },

    services: servicesSchema,

    photo: photoSchema,

    social: socialSchema,

    location: locationSchema,
  },
  { versionKey: false }
);

const sportCenterModel = mongoose.model("sportCenter", sportCenterSchema);

export default sportCenterModel;
