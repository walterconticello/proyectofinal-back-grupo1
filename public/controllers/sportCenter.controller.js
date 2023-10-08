"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _sportCenterModel = _interopRequireDefault(require("../models/sportCenter.model.js"));
var _sportCenterValidation = _interopRequireDefault(require("../helpers/sportCenter.validation.js"));
var _fieldsModel = _interopRequireDefault(require("../models/fields.model.js"));
var _cloudinary = require("../utils/cloudinary.js");
var _fsExtra = _interopRequireDefault(require("fs-extra"));
var _error = require("../utils/error.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
//Get

var getAllSportCenters = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var sportCenters, responseSportCenter, i, fields, response;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _sportCenterModel["default"].find();
        case 3:
          sportCenters = _context.sent;
          responseSportCenter = [];
          i = 0;
        case 6:
          if (!(i < sportCenters.length)) {
            _context.next = 15;
            break;
          }
          _context.next = 9;
          return _fieldsModel["default"].find({
            idSportCenter: sportCenters[i]._id
          });
        case 9:
          fields = _context.sent;
          response = _objectSpread(_objectSpread({}, sportCenters[i]._doc), {}, {
            fields: fields
          });
          responseSportCenter.push(response);
        case 12:
          i++;
          _context.next = 6;
          break;
        case 15:
          res.status(200).json(responseSportCenter);
          _context.next = 22;
          break;
        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          res.status(500).json({
            message: _context.t0.message
          });
        case 22:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 18]]);
  }));
  return function getAllSportCenters(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

//Get by id

var getSportCenterById = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res, next) {
    var sportCenter, fields;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _sportCenterModel["default"].findById(req.params.id);
        case 3:
          sportCenter = _context2.sent;
          if (!sportCenter) {
            _context2.next = 11;
            break;
          }
          _context2.next = 7;
          return _fieldsModel["default"].find({
            idSportCenter: sportCenter._id
          });
        case 7:
          fields = _context2.sent;
          res.status(200).json(_objectSpread(_objectSpread({}, sportCenter._doc), {}, {
            fields: fields
          }));
          _context2.next = 12;
          break;
        case 11:
          return _context2.abrupt("return", next((0, _error.createError)(404, "Centro deportivo no encontrado")));
        case 12:
          _context2.next = 18;
          break;
        case 14:
          _context2.prev = 14;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          res.status(500).json({
            message: _context2.t0.message
          });
        case 18:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 14]]);
  }));
  return function getSportCenterById(_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

//GetSportCenterOwner

var getSportCenterOwner = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res, next) {
    var sportCenter;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _sportCenterModel["default"].find({
            ownerId: req.params.id
          });
        case 3:
          sportCenter = _context3.sent;
          if (!sportCenter) {
            _context3.next = 8;
            break;
          }
          res.status(200).json(sportCenter);
          _context3.next = 9;
          break;
        case 8:
          return _context3.abrupt("return", next((0, _error.createError)(404, "Centro deportivo no encontrado")));
        case 9:
          _context3.next = 15;
          break;
        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);
          res.status(500).json({
            message: _context3.t0.message
          });
        case 15:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 11]]);
  }));
  return function getSportCenterOwner(_x6, _x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}();

//Post

var postSportCenter = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res, next) {
    var bodySportCenter, photo, result, newSportCenter;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          bodySportCenter = {
            ownerId: req.body.ownerId,
            name: req.body.name,
            address: req.body.address,
            phone: req.body.phone,
            services: {},
            social: {},
            location: {}
          };
          if (req.body.services) {
            if (req.body.services.bar) bodySportCenter.services.bar = req.body.services.bar;
            if (req.body.services.showers) bodySportCenter.services.showers = req.body.services.showers;
            if (req.body.services.grill) bodySportCenter.services.grill = req.body.services.grill;
            if (req.body.services.parking) bodySportCenter.services.parking = req.body.services.parking;
            if (req.body.services.dressingRoom) bodySportCenter.services.dressingRoom = req.body.services.dressingRoom;
          }
          if (req.body.social) {
            if (req.body.social.facebook) bodySportCenter.social.facebook = req.body.social.facebook;
            if (req.body.social.instagram) bodySportCenter.social.instagram = req.body.social.instagram;
          }
          if (req.body.location) {
            if (req.body.location.latitude) bodySportCenter.location.latitude = req.body.location.latitude;
            if (req.body.location.longitude) bodySportCenter.location.longitude = req.body.location.longitude;
          }
          if (!(_sportCenterValidation["default"].nameValidation(bodySportCenter.name) && _sportCenterValidation["default"].addressValidation(bodySportCenter.address) && _sportCenterValidation["default"].phoneValidation(bodySportCenter.phone) && (bodySportCenter.social.facebook ? _sportCenterValidation["default"].facebookValidation(bodySportCenter.social.facebook) : true) && (bodySportCenter.social.instagram ? _sportCenterValidation["default"].instagramValidation(bodySportCenter.social.instagram) : true) && (bodySportCenter.location.latitude ? _sportCenterValidation["default"].latitudeValidation(bodySportCenter.location.latitude) : true) && (true || bodySportCenter.location.longitude ? _sportCenterValidation["default"].longitudeValidation(bodySportCenter.location.longitude) : true))) {
            _context4.next = 20;
            break;
          }
          photo = {
            url: "",
            public_id: ""
          };
          if (!(req.files && req.files.photo)) {
            _context4.next = 14;
            break;
          }
          _context4.next = 10;
          return (0, _cloudinary.uploadSportCenterImage)(req.files.photo.tempFilePath);
        case 10:
          result = _context4.sent;
          photo.url = result.secure_url;
          photo.public_id = result.public_id;
          _fsExtra["default"].remove(req.files.photo.tempFilePath);
        case 14:
          newSportCenter = new _sportCenterModel["default"](_objectSpread(_objectSpread({}, bodySportCenter), {}, {
            photo: photo
          }));
          _context4.next = 17;
          return newSportCenter.save();
        case 17:
          res.status(201).json(newSportCenter);
          _context4.next = 21;
          break;
        case 20:
          return _context4.abrupt("return", next((0, _error.createError)(400, "Los datos ingresados no son válidos")));
        case 21:
          _context4.next = 27;
          break;
        case 23:
          _context4.prev = 23;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);
          res.status(500).json({
            mensaje: _context4.t0.message
          });
        case 27:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 23]]);
  }));
  return function postSportCenter(_x9, _x10, _x11) {
    return _ref4.apply(this, arguments);
  };
}();

/// Put SportCenter

var putSportCenter = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res, next) {
    var sportCenterId, sportCenter, result;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          sportCenterId = req.params.id;
          _context5.next = 4;
          return _sportCenterModel["default"].findById(sportCenterId);
        case 4:
          sportCenter = _context5.sent;
          if (!sportCenter) {
            _context5.next = 42;
            break;
          }
          if (!(sportCenter.ownerId == req.user.id || req.user.isAdmin)) {
            _context5.next = 39;
            break;
          }
          if (req.body.name) sportCenter.name = req.body.name;
          if (req.body.address) sportCenter.address = req.body.address;
          if (req.body.phone) sportCenter.phone = req.body.phone;
          if (typeof req.body.isActive === "boolean") sportCenter.isActive = req.body.isActive;
          if (req.body.services && typeof req.body.services.bar === "boolean") sportCenter.services.bar = req.body.services.bar;
          if (req.body.services && typeof req.body.services.showers === "boolean") sportCenter.services.showers = req.body.services.showers;
          if (req.body.services && typeof req.body.services.grill === "boolean") sportCenter.services.grill = req.body.services.grill;
          if (req.body.services && typeof req.body.services.parking === "boolean") sportCenter.services.parking = req.body.services.parking;
          if (req.body.services && typeof req.body.services.dressingRoom === "boolean") sportCenter.services.dressingRoom = req.body.services.dressingRoom;
          if (req.body.social && req.body.social.facebook) sportCenter.social.facebook = req.body.social.facebook;
          if (req.body.social && req.body.social.instagram) sportCenter.social.instagram = req.body.social.instagram;
          if (req.body.social && req.body.location.latitude) sportCenter.location.latitude = req.body.location.latitude;
          if (req.body.social && req.body.location.longitude) sportCenter.location.longitude = req.body.location.longitude;
          if (!(_sportCenterValidation["default"].nameValidation(sportCenter.name) && _sportCenterValidation["default"].addressValidation(sportCenter.address) && _sportCenterValidation["default"].phoneValidation(sportCenter.phone) && (req.body.social && req.body.social.facebook ? _sportCenterValidation["default"].facebookValidation(req.body.social.facebook) : true) && (req.body.social && req.body.social.instagram ? _sportCenterValidation["default"].instagramValidation(req.body.social.instagram) : true) && (req.body.location && req.body.location.latitude ? _sportCenterValidation["default"].latitudeValidation(req.body.location.latitude) : true) && (req.body.location && req.body.location.longitude ? _sportCenterValidation["default"].longitudeValidation(req.body.location.longitude) : true))) {
            _context5.next = 36;
            break;
          }
          if (!(req.files && req.files.image)) {
            _context5.next = 31;
            break;
          }
          _context5.next = 24;
          return (0, _cloudinary.uploadSportCenterImage)(req.files.image.tempFilePath);
        case 24:
          result = _context5.sent;
          if (!sportCenter.photo.public_id) {
            _context5.next = 28;
            break;
          }
          _context5.next = 28;
          return (0, _cloudinary.deleteImage)(sportCenter.photo.public_id);
        case 28:
          sportCenter.photo.url = result.secure_url;
          sportCenter.photo.public_id = result.public_id;
          _fsExtra["default"].remove(req.files.image.tempFilePath);
        case 31:
          _context5.next = 33;
          return sportCenter.save();
        case 33:
          res.status(200).json(sportCenter);
          _context5.next = 37;
          break;
        case 36:
          return _context5.abrupt("return", next((0, _error.createError)(400, "Información inválida")));
        case 37:
          _context5.next = 40;
          break;
        case 39:
          return _context5.abrupt("return", next((0, _error.createError)(400, "No está autorizado a modificar  este complejo")));
        case 40:
          _context5.next = 43;
          break;
        case 42:
          return _context5.abrupt("return", next((0, _error.createError)(404, "Complejo deportivo no encontrado")));
        case 43:
          _context5.next = 49;
          break;
        case 45:
          _context5.prev = 45;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0);
          res.status(500).json({
            mensaje: _context5.t0.message
          });
        case 49:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 45]]);
  }));
  return function putSportCenter(_x12, _x13, _x14) {
    return _ref5.apply(this, arguments);
  };
}();

// Delete SportCenter

var deleteSportCenter = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res, next) {
    var sportCenterId, sportCenter, fields, deletedSportCenter;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          sportCenterId = req.params.id;
          _context6.next = 4;
          return _sportCenterModel["default"].findById(sportCenterId);
        case 4:
          sportCenter = _context6.sent;
          if (!sportCenter) {
            _context6.next = 27;
            break;
          }
          if (!(sportCenter.ownerId == req.user.id || req.user.isAdmin)) {
            _context6.next = 24;
            break;
          }
          _context6.next = 9;
          return _fieldsModel["default"].find({
            idSportCenter: {
              $eq: sportCenterId
            }
          });
        case 9:
          fields = _context6.sent;
          if (!(fields.length === 0)) {
            _context6.next = 21;
            break;
          }
          _context6.next = 13;
          return _sportCenterModel["default"].findByIdAndDelete(sportCenterId);
        case 13:
          deletedSportCenter = _context6.sent;
          if (!deletedSportCenter) {
            _context6.next = 19;
            break;
          }
          if (!(deletedSportCenter.photo && deletedSportCenter.photo.public_id)) {
            _context6.next = 18;
            break;
          }
          _context6.next = 18;
          return (0, _cloudinary.deleteImage)(deletedSportCenter.photo.public_id);
        case 18:
          res.status(200).json({
            message: "Complejo eliminado",
            sportCenter: deletedSportCenter
          });
        case 19:
          _context6.next = 22;
          break;
        case 21:
          return _context6.abrupt("return", next((0, _error.createError)(400, "No puede eliminar el complejo si tiene canchas creadas, eliminelas primero")));
        case 22:
          _context6.next = 25;
          break;
        case 24:
          return _context6.abrupt("return", next((0, _error.createError)(400, "No está autorizado a eliminar este complejo")));
        case 25:
          _context6.next = 28;
          break;
        case 27:
          return _context6.abrupt("return", next((0, _error.createError)(404, "Complejo deportivo no encontrado")));
        case 28:
          _context6.next = 34;
          break;
        case 30:
          _context6.prev = 30;
          _context6.t0 = _context6["catch"](0);
          console.log(_context6.t0);
          res.status(500).json({
            mensaje: "Error al eliminar centro deportivo"
          });
        case 34:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 30]]);
  }));
  return function deleteSportCenter(_x15, _x16, _x17) {
    return _ref6.apply(this, arguments);
  };
}();
var _default = exports["default"] = {
  getSportCenterOwner: getSportCenterOwner,
  getAllSportCenters: getAllSportCenters,
  getSportCenterById: getSportCenterById,
  postSportCenter: postSportCenter,
  putSportCenter: putSportCenter,
  deleteSportCenter: deleteSportCenter
};