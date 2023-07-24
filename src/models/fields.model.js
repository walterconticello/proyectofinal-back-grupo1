import mongoose from "mongoose";

const { Schema } = mongoose;

const fieldsSchema = new Schema({
    idField: {
        type: mongoose.Types.ObjectId,
        required: true,
        index: true,
        unique: true,
        immutable: true
    },
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
        max: 23,
    },
    closeHour: {
        type: Number,
        required: true,
        min: 0,
        max: 23,
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
        immutable: true
    }
}, {versionKey: false});

const fieldModel = mongoose.model("fields", fieldsSchema);

export default fieldModel;