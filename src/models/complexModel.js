import mongoose from "mongoose";

const { Schema } = mongoose;

const complexSchema = new Schema({   
    name: { type: String, 
        required: true,
        trim: true,
        lowercase: true,
        minlength: 3,
        
    },

    capacity: { 
        type: Number,  
        required: true,
        trim: true,
        lowercase: true,
        min: 1,
        max: 100000,
    },

        address: { type: String,
            required: true,
            trim: true,
            lowercase: true,
            minlenght: 3,
            maxlenght: 30,
        },

    idComplex: { type: mongoose.Types.ObjectId,
        required: true,
        inmutable: true,
        default:new mongoose.Types.ObjectId(),
    }
}
, {versionKey: false});

const complexModel = mongoose.model("complex", complexSchema);

export default complexModel;




