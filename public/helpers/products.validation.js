"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var nameValidation = function nameValidation(name) {
  var regex = /^[ A-Za-z\u00C0-\u024F0-9,.\:\(\)\[\]\'\"\`]+$/;
  return regex.test(name) && name.length >= 3 && name.length <= 45;
};
var descriptionValidation = function descriptionValidation(description) {
  var regex = /^[ A-Za-z\u00C0-\u024F0-9,.\:\(\)\[\]\'\"\`\n\r]+$/;
  return regex.test(description) && description.length >= 5 && description.length <= 255;
};
var categoriesValidation = function categoriesValidation(category) {
  var allCategories = ["Balones", "Calzado", "Ropa", "Entrenamiento", "Accesorios"];
  if (!allCategories.includes(category)) {
    return false;
  }
  return true;
};
var priceValidation = function priceValidation(price) {
  var numericPrice = parseFloat(price);
  return !isNaN(numericPrice) && numericPrice >= 0 && numericPrice <= 100000;
};
var stockValidation = function stockValidation(stock) {
  var numericStock = parseFloat(stock);
  return !isNaN(numericStock) && numericStock >= 0 && numericStock <= 10000;
};
var createProductDataValidation = function createProductDataValidation(product) {
  var requiredProperties = ["name", "description", "price", "stock", "categories", "image"];
  for (var _i = 0, _requiredProperties = requiredProperties; _i < _requiredProperties.length; _i++) {
    var property = _requiredProperties[_i];
    if (!product.hasOwnProperty(property) || product[property] === undefined) {
      console.log(JSON.stringify(product) + " has no property " + property);
      return false;
    }
  }
  return true;
};
var validateProduct = function validateProduct(product) {
  var invalidFields = [];
  if (!nameValidation(product.name)) {
    invalidFields.push("name");
  }
  if (!descriptionValidation(product.description)) {
    invalidFields.push("description");
  }
  if (!priceValidation(product.price)) {
    invalidFields.push("price");
  }
  if (!stockValidation(product.stock)) {
    invalidFields.push("stock");
  }
  if (!categoriesValidation(product.categories)) {
    invalidFields.push("categories");
  }
  return {
    isValid: invalidFields.length === 0,
    invalidFields: invalidFields
  };
};
var _default = exports["default"] = {
  nameValidation: nameValidation,
  descriptionValidation: descriptionValidation,
  priceValidation: priceValidation,
  stockValidation: stockValidation,
  categoriesValidation: categoriesValidation,
  createProductDataValidation: createProductDataValidation,
  validateProduct: validateProduct
};