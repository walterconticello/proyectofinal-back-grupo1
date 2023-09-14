import mongoose from "mongoose";

const { Schema } = mongoose;

const photoSchema = new Schema({
    url: {
        type: String,
    },
    public_id: {
        type: String,
    }
});

const fieldsSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: false,
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
        min: 1,
        max: 24
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
    },
    photo: photoSchema
}, {versionKey: false});

const fieldModel = mongoose.model("fields", fieldsSchema);

export default fieldModel;