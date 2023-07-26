const nameValidation = (name) => {
  const regex = /^[ A-Za-z\u00C0-\u024F0-9,.\:\(\)\[\]\'\"\`]+$/;
  return regex.test(name);
};

const priceValidation = (price) => {
  return typeof price === "number" && price >= 0 && price <= 100000;
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

export default { nameValidation, priceValidation, createProductDataValidation };
