const nameValidation = (name) => {
  const regex = /^[ A-Za-z\u00C0-\u024F0-9,.\:\(\)\[\]\'\"\`]+$/;
  return regex.test(name);
};

const descriptionValidation = (description) => {
  const regex = /^[ A-Za-z\u00C0-\u024F0-9,.\:\(\)\[\]\'\"\`\n\r]+$/;
  return regex.test(description);
};

const categoriesValidation = (categories) => {
  const Allcategories = [
    "Balones",
    "Calzado",
    "Ropa",
    "Entrenamiento",
    "Accesorios",
  ];

  // Verificar si todas las categorías proporcionadas existen en el array de categorías válidas
  const invalidCategories = categories.filter(
    (category) => !Allcategories.includes(category)
  );

  // Devolver un objeto con información sobre si las categorías son válidas y cuáles son inválidas
  return {
    valid: invalidCategories.length === 0,
    invalidCategories: invalidCategories,
  };
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
