import mongoose from "mongoose";

const { Schema } = mongoose;

const fieldsSchema = new Schema({
    //We'll use the auto-generated mongo's identifiers
    
    // idField: {
    //     type: mongoose.Types.ObjectId,
    //     required: true,
    //     index: true,
    //     unique: true,
    //     immutable: true,
    //     default: () => new mongoose.Types.ObjectId()
    // },
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 50
    },
    openHour: {
        type: Number,
        required: true,
        min: 0,
        max: 23
    },
    closeHour: {
        type: Number,
        required: true,
        min: 0,
        max: 23
    },
    pricePerHour: {
        type: Number,
        required: true,
        min: 0,
        max: 100000
    },
    idSportCenter: {
        type: mongoose.Types.ObjectId,
        required: true,
        immutable: true,
        default: () => new mongoose.Types.ObjectId() //When SportCenter is created we will replace the default value
    }
}, {versionKey: false});

const fieldModel = mongoose.model("fields", fieldsSchema);

export default fieldModel;