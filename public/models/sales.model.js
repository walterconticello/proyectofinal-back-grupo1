"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var saleSchema = new _mongoose.Schema({
  productId: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  userId: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  quantity: {
    type: Number,
    min: 0,
    max: 100,
    required: true
  },
  totalPrice: {
    type: Number,
    min: 0,
    max: 250000,
    required: true
  },
  date: {
    type: Date,
    "default": Date.now
  }
}, {
  versionKey: false
});
var Sale = (0, _mongoose.model)("Sale", saleSchema);
var _default = exports["default"] = Sale;