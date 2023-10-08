"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Schema = _mongoose["default"].Schema;
var reservationSchema = new Schema({
  IdUser: {
    type: _mongoose["default"].ObjectId,
    require: true
  },
  IdSportCenter: {
    type: _mongoose["default"].ObjectId,
    require: true
  },
  IdField: {
    type: _mongoose["default"].ObjectId,
    require: true
  },
  ReservationTime: {
    type: Date,
    require: true
  },
  Status: {
    type: String,
    "enum": ["confirmada", "cancelada", "pendiente"],
    "default": "pendiente"
  },
  expirationDate: {
    type: Date,
    required: true
  }
}, {
  versionKey: false
});
var ReservationModel = _mongoose["default"].model("reservations", reservationSchema);
var _default = exports["default"] = ReservationModel;