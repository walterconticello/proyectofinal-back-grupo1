import userModel from "../models/User.model.js";
import sportCenterModel from "../models/complexModel.js";

const textValidation = (text) => {
    return (typeof text === 'string') && text.trim().length >= 5 && text.trim().length <= 500;
} //We could use a test() method of a regex instead of the typeof

const ratingValidation = (rating) => {
    return (typeof rating === 'number') && (rating >= 0) && (rating <= 10);
}

const createCommentDataValidation = (comment) => {
    const keys = Object.keys(comment);
    for (let i = 0; i < keys.length; i++) {
        const value = comment[keys[i]];
        if (value === undefined){
            return false;
        }
    }
    return true;
}

const userValidation = async (userId) => {
    const user = await userModel.findById(userId);
    //validate user is the same user of jwt
    return user;
}

const sportCenterValidation = async (sportId) => {
    const center = await sportCenterModel.findById(sportId);
    return center;
}

export default {textValidation, ratingValidation, createCommentDataValidation, userValidation, sportCenterValidation};