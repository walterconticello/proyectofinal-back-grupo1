"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createError = void 0;
var createError = exports.createError = function createError(status, message) {
  var err = new Error();
  err.status = status;
  err.message = message;
  return err;
};