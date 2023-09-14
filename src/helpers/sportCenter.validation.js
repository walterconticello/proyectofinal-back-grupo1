//OwnerID is validated in validateOwner

const nameValidation = (name) => {
  const regex = /^[ A-Za-z\u00C0-\u024F0-9,.\:\(\)\[\]\'\"\`]+$/;
  return regex.test(name) && name.length >= 3 && name.length <= 50;
}; //Validate it allow set names with spaces

const addressValidation = (address) => {
  const regex = /^[ A-Za-z\u00C0-\u024F0-9,.\:\(\)\[\]\'\"\`]+$/;
  return regex.test(address) && address.length >= 3 && address.length <= 50;
};

const phoneValidation = (phone) => {
  const regex = /^\+\d{1,3}\d{1,4}\d{1,4}\d{1,4}$/;
  return regex.test(phone) && phone.length >= 7 && phone.length <= 16;
};

const descriptionValidation = (description) => {
  const regex = /^[\w\d\s.,!@#\$%\^&\*\(\)-_+=\[{\]};:'"<>?`~|\\]*$/;
  return regex.test(description) && description.length >= 10 && description.length <= 400;
}

const socialValidation = (social) => {
  URL = require("url").URL;
  try {
    new URL(social);
    return true;
  } catch (error) {
    return false;
  }
};

const latitudeValidation = (latitude) => {
  const regex = /^[0-9]+$/;
  return regex.test(latitude) && latitude >= 0 && latitude <= 90;
};

const locationValidation = (location) => {
  const regex = /^[ A-Za-z\u00C0-\u024F0-9,.\:\(\)\[\]\'\"\`]+$/;
  return regex.test(location) && location.length >= 3 && location.length <= 50;
};

export default {
  nameValidation,
  addressValidation,
  phoneValidation,
  descriptionValidation,
  socialValidation,
  latitudeValidation,
  locationValidation
};
