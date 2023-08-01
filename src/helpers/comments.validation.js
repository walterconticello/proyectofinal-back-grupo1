const textValidation = (text) => {
    return (typeof text === 'string') && text.length >= 5 && text.length <= 500;
} //We could use a test() method of a regex instead of the typeof

const ratingValidation = (rating) => {
    return (typeof rating === 'number') && (rating >= 0) && (rating <= 5);
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

export default {textValidation, ratingValidation, createCommentDataValidation};