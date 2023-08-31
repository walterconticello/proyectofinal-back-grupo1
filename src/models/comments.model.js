import mongoose from "mongoose";

const {Schema} = mongoose;

const commentsSchema = new Schema({
    text: {
        type: String,
        required: true,
        trim: true,
        minLength: 5,
        maxLength: 500
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 10
    },
    sportCenterId: {
        type: mongoose.Types.ObjectId,
        required: true,
        immutable: true,
        ref: "sportCenter"
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        immutable: true,
        ref: "User"
    }
}, {versionKey: false, timestamps: true});

const commentModel = mongoose.model("comments", commentsSchema);

export default commentModel;