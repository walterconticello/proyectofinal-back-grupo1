"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Schema = _mongoose["default"].Schema;
var fieldsSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: false,
    minLength: 3,
    maxLength: 50
  },
  openHour: {
    type: Number,
    required: true,
    min: 0,
    max: 23
  },
  closeHour: {
    type: Number,
    required: true,
    min: 1,
    max: 24
  },
  pricePerHour: {
    type: Number,
    required: true,
    min: 0,
    max: 100000
  },
  size: {
    type: Number,
    required: true,
    min: 5,
    max: 11
  },
  isActive: {
    type: Boolean,
    "default": true
  },
  idSportCenter: {
    type: _mongoose["default"].Types.ObjectId,
    required: true,
    immutable: true
  },
  photo: {
    url: {
      type: String
    },
    public_id: {
      type: String
    }
  }
}, {
  versionKey: false
});
var fieldModel = _mongoose["default"].model("fields", fieldsSchema);
var _default = exports["default"] = fieldModel;