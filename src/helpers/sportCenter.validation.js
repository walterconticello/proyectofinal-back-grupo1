const nameValidation = (name) => {
  const regex = /^[ A-Za-z\u00C0-\u024F0-9,.\:\(\)\[\]\'\"\`]+$/;
  return regex.test(name) && name.length >= 3 && name.length <= 50;
};

const addressValidation = (address) => {
  const regex = /^[ A-Za-z\u00C0-\u024F0-9,.\:\(\)\[\]\'\"\`]+$/;
  return regex.test(address) && address.length >= 3 && address.length <= 50;
};

const idSportCenterValidation = (idSportCenter) => {
  const regex = /^[0-9]+$/;
  return regex.test(idSportCenter) && idSportCenter >= 1 && idSportCenter <= 100000;
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



const postSportCenterDataValidation = (bodySportCenter) => {
  return bodySportCenter.name && bodySportCenter.address && bodySportCenter.phone;
};

const putSportCenterDataValidation = (bodySportCenter) => {
  return (
    bodySportCenter.name ||
    bodySportCenter.address ||
    bodySportCenter.phone ||
    bodySportCenter.services ||
    bodySportCenter.fields ||
    bodySportCenter.openHour ||
    bodySportCenter.closeHour ||
    bodySportCenter.social ||
    bodySportCenter.latitude ||
    bodySportCenter.location
  );
};

const postSportCenterValidation = (bodySportCenter) => {
  return (
    nameValidation(bodySportCenter.name) &&
    addressValidation(bodySportCenter.address) &&
    phoneValidation(bodySportCenter.phone)
  );
};

const putSportCenterValidation = (bodySportCenter) => {
  return (
    nameValidation(bodySportCenter.name) ||
    addressValidation(bodySportCenter.address) ||
    phoneValidation(bodySportCenter.phone) ||
    servicesValidation(bodySportCenter.services) ||
    fieldsValidation(bodySportCenter.fields) ||
    openHourValidation(bodySportCenter.openHour) ||
    closeHourValidation(bodySportCenter.closeHour) ||
    socialValidation(bodySportCenter.social) ||
    latitudeValidation(bodySportCenter.latitude) ||
    locationValidation(bodySportCenter.location)
  );
};

export default {
  nameValidation,
  addressValidation,
  idSportCenterValidation,
  phoneValidation,
  fieldsValidation,
  openHourValidation,
  closeHourValidation,
  socialValidation,
  latitudeValidation,
  locationValidation,
  postSportCenterDataValidation,
  putSportCenterDataValidation,
  postSportCenterValidation,
  putSportCenterValidation,
  photoValidation,
};