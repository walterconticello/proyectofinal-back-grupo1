const nameValidation = (name) => {
  const regex = /^[ A-Za-z\u00C0-\u024F0-9,.\:\(\)\[\]\'\"\`]+$/;
  return regex.test(name) && name.length >= 3 && name.length <= 50;
};

const addressValidation = (address) => {
  const regex = /^[ A-Za-z\u00C0-\u024F0-9,.\:\(\)\[\]\'\"\`]+$/;
  return regex.test(address) && address.length >= 3 && address.length <= 50;
};

const idComplexValidation = (idComplex) => {
  const regex = /^[0-9]+$/;
  return regex.test(idComplex) && idComplex >= 1 && idComplex <= 100000;
};

const phoneValidation = (phone) => {
  const regex = /^[0-9]+$/;
  return regex.test(phone) && phone.length >= 7 && phone.length <= 20;
};
const photoValidation = (photo) => { URL = require('url').URL;
  try {
    new URL(photo);
    return true;
  } catch (error) {
    return false;
  }
};

const fieldsValidation = (fields) => {
  const regex = /^[ A-Za-z\u00C0-\u024F0-9,.\:\(\)\[\]\'\"\`]+$/;
  return regex.test(fields) && fields.length >= 3 && fields.length <= 100;
};

const openHourValidation = (openHour) => {
  const regex = /^[0-9]+$/;
  return regex.test(openHour) && openHour >= 0 && openHour <= 23;
};

const closeHourValidation = (closeHour) => {
  const regex = /^[0-9]+$/;
  return regex.test(closeHour) && closeHour >= 0 && closeHour <= 23;
};

const socialValidation = (social) => {
  const regex = /^[ A-Za-z\u00C0-\u024F0-9,.\:\(\)\[\]\'\"\`]+$/;
  return (
    regex.test(social.facebook) &&
    social.facebook.length >= 3 &&
    social.facebook.length <= 100 &&
    regex.test(social.instagram) &&
    social.instagram.length >= 3 &&
    social.instagram.length <= 100
  );
};

const latitudeValidation = (latitude) => {
  const regex = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/;
  return regex.test(latitude);
};

const locationValidation = (location) => {
  const regex = /^[ A-Za-z\u00C0-\u024F0-9,.\:\(\)\[\]\'\"\`]+$/;
  return regex.test(location) && location.length >= 3 && location.length <= 100;
};



const postComplexDataValidation = (bodycomplex) => {
  return bodycomplex.name && bodycomplex.address && bodycomplex.phone;
};

const putComplexDataValidation = (bodycomplex) => {
  return (
    bodycomplex.name ||
    bodycomplex.address ||
    bodycomplex.phone ||
    bodycomplex.services ||
    bodycomplex.fields ||
    bodycomplex.openHour ||
    bodycomplex.closeHour ||
    bodycomplex.social ||
    bodycomplex.latitude ||
    bodycomplex.location
  );
};

const postComplexValidation = (bodycomplex) => {
  return (
    nameValidation(bodycomplex.name) &&
    addressValidation(bodycomplex.address) &&
    phoneValidation(bodycomplex.phone)
  );
};

const putComplexValidation = (bodycomplex) => {
  return (
    nameValidation(bodycomplex.name) ||
    addressValidation(bodycomplex.address) ||
    phoneValidation(bodycomplex.phone) ||
    servicesValidation(bodycomplex.services) ||
    fieldsValidation(bodycomplex.fields) ||
    openHourValidation(bodycomplex.openHour) ||
    closeHourValidation(bodycomplex.closeHour) ||
    socialValidation(bodycomplex.social) ||
    latitudeValidation(bodycomplex.latitude) ||
    locationValidation(bodycomplex.location)
  );
};

export default {
  nameValidation,
  addressValidation,
  idComplexValidation,
  phoneValidation,
  fieldsValidation,
  openHourValidation,
  closeHourValidation,
  socialValidation,
  latitudeValidation,
  locationValidation,
  postComplexDataValidation,
  putComplexDataValidation,
  postComplexValidation,
  putComplexValidation,
  photoValidation,
};

