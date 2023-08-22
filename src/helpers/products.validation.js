const nameValidation = (name) => {
  const regex = /^[ A-Za-z\u00C0-\u024F0-9,.\:\(\)\[\]\'\"\`]+$/;
  return regex.test(name) && name.length >= 3 && name.length <= 45;
};

const descriptionValidation = (description) => {
  const regex = /^[ A-Za-z\u00C0-\u024F0-9,.\:\(\)\[\]\'\"\`\n\r]+$/;
  return (
    regex.test(description) &&
    description.length >= 5 &&
    description.length <= 255
  );
};

const categoriesValidation = (categories) => {
  const Allcategories = [
    "Balones",
    "Calzado",
    "Ropa",
    "Entrenamiento",
    "Accesorios",
  ];

  if (!Allcategories.includes(categories)) {
    return false; // Categoría inválida
  }

  return true; // Categoría válida
};

const priceValidation = (price) => {
  const numericPrice = parseFloat(price);
  return !isNaN(numericPrice) && numericPrice >= 0 && numericPrice <= 100000;
};

const stockValidation = (stock) => {
  const numericStock = parseFloat(stock);
  return !isNaN(numericStock) && numericStock >= 0 && numericStock <= 10000;
};

const createProductDataValidation = (product) => {
  const requiredProperties = [
    "name",
    "description",
    "price",
    "stock",
    "categories",
    "image",
  ];

  for (const property of requiredProperties) {
    if (!product.hasOwnProperty(property) || product[property] === undefined) {
      console.log(JSON.stringify(product) + " has no property " + property);
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
  categoriesValidation,
  createProductDataValidation,
};
