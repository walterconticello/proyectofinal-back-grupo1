import sportCenterModel from "../models/sportCenter.model.js";

const nameValidation = (name) => {
  const regex = /^[ A-Za-z\u00C0-\u024F0-9,.\:\(\)\[\]\'\"\`]+$/;
  return regex.test(name) && name.length >= 3 && name.length <= 50;
};

const openHourValidation = (hour) => {
  hour = parseInt(hour);
  return typeof hour === "number" && hour >= 0 && hour <= 23;
};

const closeHourValidation = (hour) => {
  hour = parseInt(hour);

  return typeof hour === "number" && hour >= 1 && hour <= 24;
};

const hourValidation = (openHour, closeHour) => {
  return (
    openHourValidation(parseInt(openHour)) &&
    closeHourValidation(parseInt(closeHour)) &&
    parseInt(openHour) < parseInt(closeHour)
  );
};

const priceValidation = (price) => {
  price = parseInt(price);
  return typeof price === "number" && price >= 0 && price <= 100000;
};

const sizeValidation = (size) => {
  size = parseInt(size);
  return typeof size === "number" && size >= 5 && size <= 11;
};

const validateSportCenter = async (sportCenter) => {
  const center = await sportCenterModel.findById(sportCenter);
  return center;
};

const createFieldDataValidation = (field) => {
  const keys = Object.keys(field);
  for (let i = 0; i < keys.length; i++) {
    const value = field[keys[i]];
    if (value === undefined) {
      return false;
    }
  }
  return true;
};

export default {
  nameValidation,
  hourValidation,
  priceValidation,
  createFieldDataValidation,
  sizeValidation,
  validateSportCenter,
};
