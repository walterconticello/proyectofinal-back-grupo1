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

const facebookValidation = (facebook) => {
  const regex= /^https?:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9.-_~!$&'()*+,;=:@?%]+\/?$/;
  return regex.test(facebook) && facebook.length >=7 && facebook.length <= 150;
}

const instagramValidation = (instagram) => {
  const regex= /^https?:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9_]+\/?$/;
  return regex.test(instagram) && instagram.length >=7 && instagram.length <= 150;
}

const latitudeValidation = (latitude) => {
  const regex = /^-?((\d|[1-8]\d)(\.\d{1,6})?|90(\.0{1,9})?)$/;
  return regex.test(latitude) && latitude.length >= 1 && latitude.length <= 50;
};

const longitudeValidation = (longitude) => {
  const regex = /^-?((\d|[1-9]\d|1[0-7]\d)(\.\d{1,6})?|180(\.0{1,9})?)$/;
  return regex.test(longitude) && longitude.length >= 1 && longitude.length <= 50;
};

export default {
  nameValidation,
  addressValidation,
  phoneValidation,
  descriptionValidation,
  facebookValidation,
  instagramValidation,
  latitudeValidation,
  longitudeValidation
};
