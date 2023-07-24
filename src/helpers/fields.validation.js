const nameValidation = (name) => {
    const regex = /^[ A-Za-z\u00C0-\u024F0-9,.\:\(\)\[\]\'\"\`]+$/;
    if(!regex.test(name)){
        return false;
    }
    return true;
}

const hourValidation = (hour) => {
    return (typeof hour === 'number') && (hour >= 0) && (hour <= 23);
}

const priceValidation = (price) => {
    return (typeof price === 'number') && (price >= 0) && (price <= 100000);
}

export default {nameValidation, hourValidation, priceValidation};