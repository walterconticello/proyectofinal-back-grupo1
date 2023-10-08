"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Schema = _mongoose["default"].Schema;
var commentsSchema = new Schema({
  text: {
    type: String,
    required: true,
    trim: false,
    minLength: 5,
    maxLength: 500
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 10
  },
  sportCenterId: {
    type: _mongoose["default"].Types.ObjectId,
    required: true,
    immutable: true,
    ref: "sportCenter"
  },
  userId: {
    type: _mongoose["default"].Types.ObjectId,
    required: true,
    immutable: true,
    ref: "User"
  }
}, {
  versionKey: false,
  timestamps: true
});
var commentModel = _mongoose["default"].model("comments", commentsSchema);
var _default = exports["default"] = commentModel;