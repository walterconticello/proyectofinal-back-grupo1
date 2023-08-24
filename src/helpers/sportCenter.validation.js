const nameValidation = (name) => {
  const regex = /^([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\']+[\s])+([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])+[\s]?([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])?$/g
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


const socialValidation = (social) => { 
  URL = require('url').URL;
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
  idSportCenterValidation,
  phoneValidation,
  socialValidation,
  latitudeValidation,
  locationValidation,
  photoValidation,
};