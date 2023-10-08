"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var nameValidation = function nameValidation(name) {
  var regex = /^[ A-Za-z\u00C0-\u024F0-9,.\:\(\)\[\]\'\"\`]+$/;
  return regex.test(name) && name.length >= 3 && name.length <= 50;
};
var addressValidation = function addressValidation(address) {
  var regex = /^[ A-Za-z\u00C0-\u024F0-9,.\:\(\)\[\]\'\"\`]+$/;
  return regex.test(address) && address.length >= 3 && address.length <= 50;
};
var phoneValidation = function phoneValidation(phone) {
  var regex = /^\+\d{1,3}\d{1,4}\d{1,4}\d{1,4}$/; //You've to put + before
  return regex.test(phone) && phone.length >= 7 && phone.length <= 16;
};
var descriptionValidation = function descriptionValidation(description) {
  return description.length >= 10 && description.length <= 400;
};
var facebookValidation = function facebookValidation(facebook) {
  var regex = /^https?:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9.-_~!$&'()*+,;=:@?%]+\/?$/;
  return regex.test(facebook) && facebook.length >= 0 && facebook.length <= 150;
};
var instagramValidation = function instagramValidation(instagram) {
  var regex = /^https?:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9_]+\/?$/;
  return regex.test(instagram) && instagram.length >= 0 && instagram.length <= 150;
};
var latitudeValidation = function latitudeValidation(latitude) {
  var regex = /^-?((\d|[1-8]\d)(\.\d{1,9})?|90(\.0{1,9})?)$/;
  return true || regex.test(latitude) && latitude.length >= 0 && latitude.length <= 50;
};
var longitudeValidation = function longitudeValidation(longitude) {
  var regex = /^-?((\d|[1-9]\d|1[0-7]\d)(\.\d{1,9})?|180(\.0{1,9})?)$/;
  return true || regex.test(longitude) && longitude.length >= 0 && longitude.length <= 50;
};
var _default = exports["default"] = {
  nameValidation: nameValidation,
  addressValidation: addressValidation,
  phoneValidation: phoneValidation,
  facebookValidation: facebookValidation,
  instagramValidation: instagramValidation,
  latitudeValidation: latitudeValidation,
  longitudeValidation: longitudeValidation
};