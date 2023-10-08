"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Schema = _mongoose["default"].Schema;
var productSchema = new Schema({
  name: {
    type: "string",
    required: true,
    minLength: 3,
    maxLength: 45
  },
  description: {
    type: "string",
    required: true,
    minLength: 5,
    maxLength: 255
  },
  price: {
    type: "number",
    required: true,
    min: 0,
    max: 100000
  },
  stock: {
    type: "number",
    required: true,
    min: 0,
    max: 10000
  },
  categories: {
    type: "string",
    required: true
  },
  image: {
    url: "string",
    public_id: "string"
  },
  isValid: {
    type: "boolean"
  }
}, {
  versionKey: false
});
var _default = exports["default"] = _mongoose["default"].model("Product", productSchema);