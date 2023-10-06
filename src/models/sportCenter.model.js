import mongoose from "mongoose";

const { Schema } = mongoose;
/*
const servicesSchema = new Schema({
  bar: {
    type: Boolean,
    default: false,
  },
  showers: {
    type: Boolean,
    default: false,
  },
  grill: {
    type: Boolean,
    default: false,
  },
  parking: {
    type: Boolean,
    default: false,
  },
  dressingRoom: {
    type: Boolean,
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
    minLength: 1,
    maxLength: 50
  },

  longitude: {
    type: String,
    trim: true,
    minLength: 1,
    maxLength: 50
  },
});*/

const sportCenterSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: false,
      minLength: 3,
      maxLength: 50,
    },

    address: {
      type: String,
      required: true,
      trim: true,
      lowercase: false,
      minLenght: 3,
      maxLenght: 50,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
      minLenght: 7,
      maxLenght: 16,
    },

    description: {
      type: String,
      trim: true,
      lowercase: false,
      required: false,
      minLength: 10,
      maxLength: 400,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    ownerId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },

    services: {
      bar: {
        type: Boolean,
        default: false,
      },
      showers: {
        type: Boolean,
        default: false,
      },
      grill: {
        type: Boolean,
        default: false,
      },
      parking: {
        type: Boolean,
        default: false,
      },
      dressingRoom: {
        type: Boolean,
        default: false,
      },
    },

    photo: {
      url: {
        type: String,
        default: "",
      },
      public_id: {
        type: String,
        default: "",
      },
    },

    social: {
      facebook: {
        type: String,
        trim: true,
        maxLenght: 150,
        default: "",
      },

      instagram: {
        type: String,
        trim: true,
        maxLenght: 150,
        default: "",
      },
    },

    location: {
      latitude: {
        type: String,
        trim: true,
        maxLength: 50,
        default: "",
      },

      longitude: {
        type: String,
        trim: true,
        maxLength: 50,
        default: "",
      },
    },
  },
  { versionKey: false }
);

const sportCenterModel = mongoose.model("sportCenter", sportCenterSchema);

export default sportCenterModel;
