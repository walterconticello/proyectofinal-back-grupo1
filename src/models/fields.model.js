import mongoose from "mongoose";

const { Schema } = mongoose;

const fieldsSchema = new Schema({
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
        max: 100000 //Max price $100.000
    },
    size: {
        type: Number,
        required: true,
        min: 5,
        max: 11
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true,
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