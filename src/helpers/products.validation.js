const nameValidation = (name) => {
  const regex = /^[ A-Za-z\u00C0-\u024F0-9,.\:\(\)\[\]\'\"\`]+$/;
  return regex.test(name);
};

const descriptionValidation = (description) => {
  const regex = /^[ A-Za-z\u00C0-\u024F0-9,.\:\(\)\[\]\'\"\`\n\r]+$/; //allows any character, including newlines and special characters.
  return regex.test(description);
};

const priceValidation = (price) => {
  return typeof price === "number" && price >= 0 && price <= 100000;
};

const stockValidation = (stock) => {
  return typeof stock === "number" && stock >= 0 && stock <= 10000;
};

const createProductDataValidation = (product) => {
  const keys = Object.keys(product);
  for (let i = 0; i < keys.length; i++) {
    const value = product[keys[i]];
    if (value === undefined) {
      return false;
    }
  }
  return true;
};

export default {
  nameValidation,
  descriptionValidation,
  priceValidation,
  stockValidation,
  createProductDataValidation,
};
