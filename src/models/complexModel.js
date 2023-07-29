import mongoose, { Mongoose, version } from "mongoose";

const {schema}=mongoose;

const complexSchema = new schema({   
    name: { type: String, 
        required: true,
        trim: true,
        lowercase: true,
        minlenght: 3,
        maxlenght: 30,
    },

    capacity
    : { type: Number,
        required: true,
        trim: true,
        lowercase: true,
        minlenght: 3,
        maxlenght: 30,
    },

        address: { type: String,
            required: true,
            trim: true,
            lowercase: true,
            minlenght: 3,
            maxlenght: 30,
        },

    idComplex: { type: Mongoose.types.ObjectId,
        required: true,
        inmutable: true,
        default:new Mongoose.types.ObjectId(),
    }
}
, {versionKey: false});

const complexModel = mongoose.model("complex", complexSchema);

export default complexModel;




