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
        default: () => new mongoose.Types.ObjectId() //When SportCenter is created we will delete the default value
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        immutable: true,
        default: () => new mongoose.Types.ObjectId() //When Users is created we will delete the default value
    }
}, {versionKey: false, timestamps: true});

const commentModel = mongoose.model("comments", commentsSchema);

export default commentModel;