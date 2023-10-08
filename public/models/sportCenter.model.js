"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Schema = _mongoose["default"].Schema;
var sportCenterSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: false,
    minLength: 3,
    maxLength: 50
  },
  address: {
    type: String,
    required: true,
    trim: true,
    lowercase: false,
    minLenght: 3,
    maxLenght: 50
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    minLenght: 7,
    maxLenght: 16
  },
  description: {
    type: String,
    trim: true,
    lowercase: false,
    required: false,
    minLength: 10,
    maxLength: 400
  },
  isActive: {
    type: Boolean,
    "default": true
  },
  ownerId: {
    type: _mongoose["default"].Types.ObjectId,
    required: true
  },
  services: {
    bar: {
      type: Boolean,
      "default": false
    },
    showers: {
      type: Boolean,
      "default": false
    },
    grill: {
      type: Boolean,
      "default": false
    },
    parking: {
      type: Boolean,
      "default": false
    },
    dressingRoom: {
      type: Boolean,
      "default": false
    }
  },
  photo: {
    url: {
      type: String,
      "default": ""
    },
    public_id: {
      type: String,
      "default": ""
    }
  },
  social: {
    facebook: {
      type: String,
      trim: true,
      maxLenght: 150,
      "default": ""
    },
    instagram: {
      type: String,
      trim: true,
      maxLenght: 150,
      "default": ""
    }
  },
  location: {
    latitude: {
      type: String,
      trim: true,
      maxLength: 50,
      "default": ""
    },
    longitude: {
      type: String,
      trim: true,
      maxLength: 50,
      "default": ""
    }
  }
}, {
  versionKey: false
});
var sportCenterModel = _mongoose["default"].model("sportCenter", sportCenterSchema);
var _default = exports["default"] = sportCenterModel;