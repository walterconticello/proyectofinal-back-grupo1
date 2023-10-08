"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _fieldsModel = _interopRequireDefault(require("../models/fields.model.js"));
var _fieldsValidation = _interopRequireDefault(require("../helpers/fields.validation.js"));
var _cloudinary = require("../utils/cloudinary.js");
var _fsExtra = _interopRequireDefault(require("fs-extra"));
var _sportCenterModel = _interopRequireDefault(require("../models/sportCenter.model.js"));
var _error = require("../utils/error.js");
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
//GET
var getAllFields = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var allFields;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _fieldsModel["default"].find();
        case 3:
          allFields = _context.sent;
          res.status(200).json(allFields);
          _context.next = 11;
          break;
        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          res.status(500).json({
            message: _context.t0.message
          });
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 7]]);
  }));
  return function getAllFields(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

//getFieldsBySportCenterId
var getFieldsBySportCenterId = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res, next) {
    var sportCenterId, fields;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          sportCenterId = req.params.id;
          _context2.next = 4;
          return _fieldsModel["default"].find({
            idSportCenter: sportCenterId
          });
        case 4:
          fields = _context2.sent;
          if (!(fields.length > 0)) {
            _context2.next = 9;
            break;
          }
          res.status(200).json(fields);
          _context2.next = 10;
          break;
        case 9:
          return _context2.abrupt("return", next((0, _error.createError)(404, "Couldn't find fields for this sport center")));
        case 10:
          _context2.next = 16;
          break;
        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);
          res.status(500).json({
            message: _context2.t0.message
          });
        case 16:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 12]]);
  }));
  return function getFieldsBySportCenterId(_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();
var getOwnerFields = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var sportCenter, sportCenters, fields, _iterator, _step, id, field;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _sportCenterModel["default"].find({
            ownerId: req.user.id
          });
        case 3:
          sportCenter = _context3.sent;
          if (!(sportCenter.length > 0 && req.user.isOwner == true)) {
            _context3.next = 29;
            break;
          }
          sportCenters = sportCenter.map(function (center) {
            return center._id;
          });
          fields = [];
          _iterator = _createForOfIteratorHelper(sportCenters);
          _context3.prev = 8;
          _iterator.s();
        case 10:
          if ((_step = _iterator.n()).done) {
            _context3.next = 18;
            break;
          }
          id = _step.value;
          _context3.next = 14;
          return _fieldsModel["default"].find({
            idSportCenter: id
          });
        case 14:
          field = _context3.sent;
          fields = fields.concat(field);
        case 16:
          _context3.next = 10;
          break;
        case 18:
          _context3.next = 23;
          break;
        case 20:
          _context3.prev = 20;
          _context3.t0 = _context3["catch"](8);
          _iterator.e(_context3.t0);
        case 23:
          _context3.prev = 23;
          _iterator.f();
          return _context3.finish(23);
        case 26:
          if (!(fields.length > 0)) {
            _context3.next = 28;
            break;
          }
          return _context3.abrupt("return", res.status(200).json(fields));
        case 28:
          res.status(404).json("no tiene sport Center");
        case 29:
          _context3.next = 35;
          break;
        case 31:
          _context3.prev = 31;
          _context3.t1 = _context3["catch"](0);
          console.log(_context3.t1);
          res.status(500).json({
            message: _context3.t1.message
          });
        case 35:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 31], [8, 20, 23, 26]]);
  }));
  return function getOwnerFields(_x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();

//GET by ID
var getFieldByID = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res, next) {
    var field;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return _fieldsModel["default"].findById(req.params.id);
        case 3:
          field = _context4.sent;
          if (!field) {
            _context4.next = 8;
            break;
          }
          res.status(200).json(field);
          _context4.next = 9;
          break;
        case 8:
          return _context4.abrupt("return", next((0, _error.createError)(404, "Cancha no encontrada")));
        case 9:
          _context4.next = 15;
          break;
        case 11:
          _context4.prev = 11;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);
          res.status(500).json({
            message: _context4.t0.message
          });
        case 15:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 11]]);
  }));
  return function getFieldByID(_x8, _x9, _x10) {
    return _ref4.apply(this, arguments);
  };
}();

//GET by page
var getPage = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var page, pagedFields;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          page = parseInt(req.params.page);
          _context5.next = 4;
          return _fieldsModel["default"].find().limit(10).skip(10 * (page - 1));
        case 4:
          pagedFields = _context5.sent;
          res.status(200).json(pagedFields);
          _context5.next = 12;
          break;
        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0);
          res.status(500).json({
            message: _context5.t0.message
          });
        case 12:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 8]]);
  }));
  return function getPage(_x11, _x12) {
    return _ref5.apply(this, arguments);
  };
}();

//POST
var createField = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res, next) {
    var bodyfield, sportCenter, photo, result, newField;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          bodyfield = {
            name: req.body.name,
            openHour: req.body.openHour,
            closeHour: req.body.closeHour,
            pricePerHour: req.body.pricePerHour,
            size: req.body.size,
            isActive: req.body.isActive,
            idSportCenter: req.body.idSportCenter
          };
          _context6.next = 4;
          return _fieldsValidation["default"].validateSportCenter(req.body.idSportCenter);
        case 4:
          if (!_context6.sent) {
            _context6.next = 39;
            break;
          }
          _context6.next = 7;
          return _sportCenterModel["default"].findById(bodyfield.idSportCenter);
        case 7:
          sportCenter = _context6.sent;
          if (!(req.user.id == sportCenter.ownerId || req.user.isAdmin)) {
            _context6.next = 36;
            break;
          }
          if (_fieldsValidation["default"].createFieldDataValidation(bodyfield)) {
            _context6.next = 13;
            break;
          }
          return _context6.abrupt("return", next((0, _error.createError)(400, "Falta ingresar información")));
        case 13:
          _context6.t0 = _fieldsValidation["default"].nameValidation(bodyfield.name) && _fieldsValidation["default"].hourValidation(bodyfield.openHour, bodyfield.closeHour) && _fieldsValidation["default"].priceValidation(bodyfield.pricePerHour) && _fieldsValidation["default"].sizeValidation(bodyfield.size);
          if (!_context6.t0) {
            _context6.next = 18;
            break;
          }
          _context6.next = 17;
          return _fieldsValidation["default"].validateSportCenter(bodyfield.idSportCenter);
        case 17:
          _context6.t0 = _context6.sent;
        case 18:
          if (!_context6.t0) {
            _context6.next = 33;
            break;
          }
          photo = {
            url: "",
            public_id: ""
          };
          if (!(req.files && req.files.image)) {
            _context6.next = 27;
            break;
          }
          _context6.next = 23;
          return (0, _cloudinary.uploadFieldImage)(req.files.image.tempFilePath);
        case 23:
          result = _context6.sent;
          photo.url = result.secure_url;
          photo.public_id = result.public_id;
          _fsExtra["default"].remove(req.files.image.tempFilePath);
        case 27:
          newField = new _fieldsModel["default"](_objectSpread(_objectSpread({}, bodyfield), {}, {
            photo: photo
          }));
          _context6.next = 30;
          return newField.save();
        case 30:
          res.status(201).json(newField);
          _context6.next = 34;
          break;
        case 33:
          return _context6.abrupt("return", next((0, _error.createError)(404, "Informacion no válida")));
        case 34:
          _context6.next = 37;
          break;
        case 36:
          return _context6.abrupt("return", next((0, _error.createError)(400, "No esta autorizado a crear canchas en este complejo")));
        case 37:
          _context6.next = 40;
          break;
        case 39:
          return _context6.abrupt("return", next((0, _error.createError)(400, "Complejo no válido")));
        case 40:
          _context6.next = 46;
          break;
        case 42:
          _context6.prev = 42;
          _context6.t1 = _context6["catch"](0);
          console.log(_context6.t1);
          res.status(500).json({
            message: _context6.t1.message
          });
        case 46:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 42]]);
  }));
  return function createField(_x13, _x14, _x15) {
    return _ref6.apply(this, arguments);
  };
}();

//PUT
var updateField = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res, next) {
    var field, sportCenter, result;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return _fieldsModel["default"].findById(req.params.id);
        case 3:
          field = _context7.sent;
          if (!field) {
            _context7.next = 37;
            break;
          }
          _context7.next = 7;
          return _sportCenterModel["default"].findById(field.idSportCenter);
        case 7:
          sportCenter = _context7.sent;
          if (!(sportCenter.ownerId == req.user.id || req.user.isAdmin)) {
            _context7.next = 34;
            break;
          }
          if (req.body.name) field.name = req.body.name;
          if (req.body.openHour) field.openHour = req.body.openHour;
          if (req.body.closeHour) field.closeHour = req.body.closeHour;
          if (req.body.pricePerHour) field.pricePerHour = req.body.pricePerHour;
          if (req.body.size) field.size = req.body.size;
          if (req.body.isActive) field.isActive = req.body.isActive;
          if (!(_fieldsValidation["default"].nameValidation(field.name) && _fieldsValidation["default"].hourValidation(field.openHour, field.closeHour) && _fieldsValidation["default"].priceValidation(field.pricePerHour) && _fieldsValidation["default"].sizeValidation(field.size))) {
            _context7.next = 31;
            break;
          }
          if (!(req.files && req.files.image)) {
            _context7.next = 26;
            break;
          }
          _context7.next = 19;
          return (0, _cloudinary.uploadFieldImage)(req.files.image.tempFilePath);
        case 19:
          result = _context7.sent;
          if (!field.photo.public_id) {
            _context7.next = 23;
            break;
          }
          _context7.next = 23;
          return (0, _cloudinary.deleteImage)(field.photo.public_id);
        case 23:
          field.photo.url = result.secure_url;
          field.photo.public_id = result.public_id;
          _fsExtra["default"].remove(req.files.image.tempFilePath);
        case 26:
          _context7.next = 28;
          return field.save();
        case 28:
          res.status(200).json(field);
          _context7.next = 32;
          break;
        case 31:
          return _context7.abrupt("return", next((0, _error.createError)(400, "Información inválida")));
        case 32:
          _context7.next = 35;
          break;
        case 34:
          return _context7.abrupt("return", next((0, _error.createError)(400, "No está autorizado a modificar canchas en este complejo")));
        case 35:
          _context7.next = 38;
          break;
        case 37:
          return _context7.abrupt("return", next((0, _error.createError)(404, "Cancha no encontrada")));
        case 38:
          _context7.next = 44;
          break;
        case 40:
          _context7.prev = 40;
          _context7.t0 = _context7["catch"](0);
          console.log(_context7.t0);
          res.status(500).json({
            message: _context7.t0.message
          });
        case 44:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 40]]);
  }));
  return function updateField(_x16, _x17, _x18) {
    return _ref7.apply(this, arguments);
  };
}();

// Put State

var putState = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res, next) {
    var field;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return _fieldsModel["default"].findById(req.params.id);
        case 3:
          field = _context8.sent;
          if (!field) {
            _context8.next = 9;
            break;
          }
          field.isActive = !field.isActive;
          _context8.next = 8;
          return field.save();
        case 8:
          return _context8.abrupt("return", res.status(200).json({
            message: "Estado actualizado correctamente",
            isActive: field.isActive
          }));
        case 9:
          _context8.next = 13;
          break;
        case 11:
          _context8.prev = 11;
          _context8.t0 = _context8["catch"](0);
        case 13:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 11]]);
  }));
  return function putState(_x19, _x20, _x21) {
    return _ref8.apply(this, arguments);
  };
}();

//DELETE
var deleteField = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res, next) {
    var field, sportCenter, deletedField;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _context9.next = 3;
          return _fieldsModel["default"].findById(req.params.id);
        case 3:
          field = _context9.sent;
          if (!field) {
            _context9.next = 25;
            break;
          }
          _context9.next = 7;
          return _sportCenterModel["default"].findById(field.idSportCenter);
        case 7:
          sportCenter = _context9.sent;
          if (!(sportCenter.ownerId == req.user.id || req.user.isAdmin)) {
            _context9.next = 22;
            break;
          }
          _context9.next = 11;
          return _fieldsModel["default"].findOneAndDelete({
            _id: {
              $eq: req.params.id
            }
          });
        case 11:
          deletedField = _context9.sent;
          if (!deletedField) {
            _context9.next = 19;
            break;
          }
          if (!(deletedField.photo && deletedField.photo.public_id)) {
            _context9.next = 16;
            break;
          }
          _context9.next = 16;
          return (0, _cloudinary.deleteImage)(deletedField.photo.public_id);
        case 16:
          res.status(200).json({
            message: "La cancha fue eliminada",
            field: deletedField
          });
          _context9.next = 20;
          break;
        case 19:
          return _context9.abrupt("return", next((0, _error.createError)(404, "Cancha no encontrada")));
        case 20:
          _context9.next = 23;
          break;
        case 22:
          return _context9.abrupt("return", next((0, _error.createError)(400, "No está autorizado a eliminar canchas en este complejo")));
        case 23:
          _context9.next = 26;
          break;
        case 25:
          return _context9.abrupt("return", next((0, _error.createError)(404, "Cancha no encontrada")));
        case 26:
          _context9.next = 32;
          break;
        case 28:
          _context9.prev = 28;
          _context9.t0 = _context9["catch"](0);
          console.log(_context9.t0);
          res.status(500).json({
            message: _context9.t0.message
          });
        case 32:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 28]]);
  }));
  return function deleteField(_x22, _x23, _x24) {
    return _ref9.apply(this, arguments);
  };
}();
var _default = exports["default"] = {
  createField: createField,
  getOwnerFields: getOwnerFields,
  putState: putState,
  getAllFields: getAllFields,
  getFieldsBySportCenterId: getFieldsBySportCenterId,
  getFieldByID: getFieldByID,
  updateField: updateField,
  deleteField: deleteField,
  getPage: getPage
};