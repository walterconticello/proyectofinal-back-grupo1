const nameValidation = (name) => {
    const regex = /^[ A-Za-z\u00C0-\u024F0-9,.\:\(\)\[\]\'\"\`]+$/;
    return regex.test(name);
}

const hourValidation = (hour) => {
    return (typeof hour === 'number') && (hour >= 0) && (hour <= 23);
}

const priceValidation = (price) => {
    return (typeof price === 'number') && (price >= 0) && (price <= 100000);
}

const createFieldDataValidation = (field) => {
    const keys = Object.keys(field);
    for (let i = 0; i < keys.length; i++) {
        const value = field[keys[i]];
        if (value === undefined){
            return false;
        }
    }
    return true;
}

export default {nameValidation, hourValidation, priceValidation, createFieldDataValidation};