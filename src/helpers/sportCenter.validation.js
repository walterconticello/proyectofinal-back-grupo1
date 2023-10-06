const nameValidation = (name) => {
  const regex = /^[ A-Za-z\u00C0-\u024F0-9,.\:\(\)\[\]\'\"\`]+$/;
  return regex.test(name) && name.length >= 3 && name.length <= 50;
};

const addressValidation = (address) => {
  const regex = /^[ A-Za-z\u00C0-\u024F0-9,.\:\(\)\[\]\'\"\`]+$/;
  return regex.test(address) && address.length >= 3 && address.length <= 50;
};

const phoneValidation = (phone) => {
  const regex = /^\+\d{1,3}\d{1,4}\d{1,4}\d{1,4}$/; //You've to put + before
  return regex.test(phone) && phone.length >= 7 && phone.length <= 16;
};

const descriptionValidation = (description) => {
  return (
    description.length >= 10 &&
    description.length <= 400
  );
};

const facebookValidation = (facebook) => {
  const regex =
    /^https?:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9.-_~!$&'()*+,;=:@?%]+\/?$/;
  return regex.test(facebook) && facebook.length >= 0 && facebook.length <= 150;
};

const instagramValidation = (instagram) => {
  const regex = /^https?:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9_]+\/?$/;
  return (
    regex.test(instagram) && instagram.length >= 0 && instagram.length <= 150
  );
};

const latitudeValidation = (latitude) => {
  const regex = /^-?((\d|[1-8]\d)(\.\d{1,9})?|90(\.0{1,9})?)$/;
  return (
    true ||
    (regex.test(latitude) && latitude.length >= 0 && latitude.length <= 50)
  );
};

const longitudeValidation = (longitude) => {
  const regex = /^-?((\d|[1-9]\d|1[0-7]\d)(\.\d{1,9})?|180(\.0{1,9})?)$/;
  return (
    true ||
    (regex.test(longitude) && longitude.length >= 0 && longitude.length <= 50)
  );
};

export default {
  nameValidation,
  addressValidation,
  phoneValidation,
  facebookValidation,
  instagramValidation,
  latitudeValidation,
  longitudeValidation,
};
