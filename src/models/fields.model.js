import mongoose from "mongoose";

const { Schema } = mongoose;

const fieldsSchema = new Schema({
    _idField: ObjectId,
    name: String,
    openHour: Date,
    closeHour: Date,
    pricePerHour: Number,
    _idSportCenter: ObjectId
}, {versionKey: false});