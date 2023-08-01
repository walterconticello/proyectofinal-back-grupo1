const textValidation = (text) => {
    return (typeof text === 'string') && text.length >= 5 && text.length <= 500;
}

export default {textValidation};