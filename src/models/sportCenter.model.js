import mongoose from "mongoose";

const { Schema } = mongoose;

const sportCenterSchema = new Schema(
  {
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      unique: true,
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
      type: String,
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

    location: {
      latitude: {
        type: String
      },

      longitude: {
        type: String
      }
    }

  },
  { versionKey: false }
);


const sportCenterModel = mongoose.model("sportCenter", sportCenterSchema);

export default sportCenterModel;