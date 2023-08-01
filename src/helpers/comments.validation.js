const textValidation = (text) => {
    return (typeof text === 'string') && text.length >= 5 && text.length <= 500;
}

const ratingValidation = (rating) => {
    return (typeof rating === 'number') && (rating >= 0) && (rating <= 5);
}

export default {textValidation};