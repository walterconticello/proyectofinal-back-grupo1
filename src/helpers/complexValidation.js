const nameValidation = (name) => {
    const regex = /^[ A-Za-z\u00C0-\u024F0-9,.\:\(\)\[\]\'\"\`]+$/;
    return regex.test(name) && name.length >= 3 && name.length <= 50;
}

const capacityValidation = (capacity) => {
    const regex = /^[0-9]+$/;
    return regex.test(capacity) && capacity >= 1 && capacity <= 100000;
}

const addressValidation = (address) => {
    const regex = /^[ A-Za-z\u00C0-\u024F0-9,.\:\(\)\[\]\'\"\`]+$/;
    return regex.test(address) && address.length >= 3 && address.length <= 50;
}

const idComplexValidation = (idComplex) => {
    const regex = /^[0-9]+$/;
    return regex.test(idComplex) && idComplex >= 1 && idComplex <= 100000;
}

const postComplexDataValidation = (bodycomplex) => {
    return bodycomplex.name && bodycomplex.capacity && bodycomplex.address && bodycomplex.idComplex;
}

const putComplexDataValidation = (bodycomplex) => {
    return bodycomplex.name || bodycomplex.capacity || bodycomplex.address || bodycomplex.idComplex;
}

const postComplexValidation = (bodycomplex) => {
    return nameValidation(bodycomplex.name) && capacityValidation(bodycomplex.capacity) && addressValidation(bodycomplex.address) && idComplexValidation(bodycomplex.idComplex);
}

const putComplexValidation = (bodycomplex) => {
    return nameValidation(bodycomplex.name) && capacityValidation(bodycomplex.capacity) && addressValidation(bodycomplex.address) && idComplexValidation(bodycomplex.idComplex);
}

export default { nameValidation, capacityValidation, addressValidation, idComplexValidation, postComplexDataValidation, putComplexDataValidation, postComplexValidation, putComplexValidation };    