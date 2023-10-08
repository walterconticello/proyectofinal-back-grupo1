"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _reservationModel = _interopRequireDefault(require("../models/reservation.model.js"));
var _fieldsModel = _interopRequireDefault(require("../models/fields.model.js"));
var _reservationValidation = _interopRequireWildcard(require("../helpers/reservation.validation.js"));
var _sportCenterModel = _interopRequireDefault(require("../models/sportCenter.model.js"));
var _nodeCron = _interopRequireDefault(require("node-cron"));
var _mongoose = _interopRequireDefault(require("mongoose"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
//CREATE O POST

var postReservation = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var IdUser, IdField, date, isValid, expiration, reservation;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          IdUser = req.user.id;
          _context.next = 4;
          return _fieldsModel["default"].findById(req.body.IdField);
        case 4:
          IdField = _context.sent;
          date = new Date(req.body.ReservationTime);
          if (!IdUser) {
            _context.next = 27;
            break;
          }
          if (!IdField) {
            _context.next = 24;
            break;
          }
          _context.next = 10;
          return (0, _reservationValidation["default"])(date, IdField);
        case 10:
          isValid = _context.sent;
          if (!isValid) {
            _context.next = 21;
            break;
          }
          _context.next = 14;
          return (0, _reservationValidation.ExpirationFunction)(date);
        case 14:
          expiration = _context.sent;
          reservation = new _reservationModel["default"]({
            IdUser: req.user.id,
            IdSportCenter: req.body.IdSportCenter,
            IdField: req.body.IdField,
            ReservationTime: date,
            expirationDate: expiration
          });
          _context.next = 18;
          return reservation.save();
        case 18:
          res.status(201).json(reservation);
          _context.next = 22;
          break;
        case 21:
          res.status(404).json({
            message: "Reserva Existente o Fecha incorrecta"
          });
        case 22:
          _context.next = 25;
          break;
        case 24:
          res.status(404).json({
            message: "Cancha no existente"
          });
        case 25:
          _context.next = 28;
          break;
        case 27:
          res.status(404).json({
            message: "Usuario no encontrado"
          });
        case 28:
          _context.next = 34;
          break;
        case 30:
          _context.prev = 30;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          res.status(_context.t0.code || 500).json({
            message: _context.t0.message || "Ups! Hubo un problema, por favor intenta más tarde"
          });
        case 34:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 30]]);
  }));
  return function postReservation(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

//GET's

var getAllReservation = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var allReservation;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          if (!(req.user.isAdmin == true)) {
            _context2.next = 8;
            break;
          }
          _context2.next = 4;
          return _reservationModel["default"].find();
        case 4:
          allReservation = _context2.sent;
          res.status(200).json(allReservation);
          _context2.next = 9;
          break;
        case 8:
          res.status(404).json({
            message: "usted no es administrador"
          });
        case 9:
          _context2.next = 15;
          break;
        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          res.status(_context2.t0.code || 500).json({
            message: _context2.t0.message || "Ups! Hubo un problema, por favor intenta más tarde"
          });
        case 15:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 11]]);
  }));
  return function getAllReservation(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

//get by field
var getReservationByField = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var fieldId, reservations;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          fieldId = req.params.field;
          _context3.next = 4;
          return _reservationModel["default"].find({
            IdField: fieldId
          });
        case 4:
          reservations = _context3.sent;
          res.status(200).json(reservations);
          _context3.next = 12;
          break;
        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);
          res.status(_context3.t0.code || 500).json({
            message: _context3.t0.message || "Ups! Hubo un problema, por favor intenta más tarde"
          });
        case 12:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 8]]);
  }));
  return function getReservationByField(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

// get User

var getUserReservation = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var idUser, reservationUser;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          if (!(!req.user.isAdmin && !req.user.isOwner)) {
            _context4.next = 9;
            break;
          }
          idUser = req.user.id;
          _context4.next = 5;
          return _reservationModel["default"].find({
            IdUser: idUser
          });
        case 5:
          reservationUser = _context4.sent;
          if (reservationUser) {
            res.json(reservationUser);
          } else {
            res.status(200).json({
              message: "usted no tiene reserva"
            });
          }
          _context4.next = 10;
          break;
        case 9:
          res.status(404).json({
            message: "usted no es usuario"
          });
        case 10:
          _context4.next = 16;
          break;
        case 12:
          _context4.prev = 12;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);
          res.status(_context4.t0.code || 500).json({
            message: _context4.t0.message || "Ups! Hubo un problema, por favor intenta más tarde"
          });
        case 16:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 12]]);
  }));
  return function getUserReservation(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
// get Owner
var getOwnerReservation = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var user, sportCenters, fields, fieldIds, reservations, _iterator, _step, id, reservation;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          if (!req.user.isOwner) {
            _context5.next = 41;
            break;
          }
          user = req.user._id;
          _context5.next = 5;
          return _sportCenterModel["default"].findOne({
            ownerId: user
          });
        case 5:
          sportCenters = _context5.sent;
          if (!sportCenters) {
            _context5.next = 38;
            break;
          }
          _context5.next = 9;
          return _fieldsModel["default"].find({
            idSportCenter: sportCenters._id
          });
        case 9:
          fields = _context5.sent;
          fieldIds = fields.map(function (field) {
            return field.id;
          });
          if (!(fieldIds.length > 0)) {
            _context5.next = 35;
            break;
          }
          reservations = [];
          _iterator = _createForOfIteratorHelper(fieldIds);
          _context5.prev = 14;
          _iterator.s();
        case 16:
          if ((_step = _iterator.n()).done) {
            _context5.next = 24;
            break;
          }
          id = _step.value;
          _context5.next = 20;
          return _reservationModel["default"].findOne({
            IdField: id
          });
        case 20:
          reservation = _context5.sent;
          if (reservations) {
            reservations.push(reservation);
          }
        case 22:
          _context5.next = 16;
          break;
        case 24:
          _context5.next = 29;
          break;
        case 26:
          _context5.prev = 26;
          _context5.t0 = _context5["catch"](14);
          _iterator.e(_context5.t0);
        case 29:
          _context5.prev = 29;
          _iterator.f();
          return _context5.finish(29);
        case 32:
          if (reservations.length > 0) {
            res.status(200).json(reservations);
          }
          _context5.next = 36;
          break;
        case 35:
          res.status(204).json({
            message: "no tiene reservas"
          });
        case 36:
          _context5.next = 39;
          break;
        case 38:
          res.status(404).json({
            message: "no existe el complejo"
          });
        case 39:
          _context5.next = 42;
          break;
        case 41:
          res.status(404).json({
            message: "usted no es owner"
          });
        case 42:
          _context5.next = 48;
          break;
        case 44:
          _context5.prev = 44;
          _context5.t1 = _context5["catch"](0);
          console.log(_context5.t1);
          res.status(_context5.t1.code || 500).json({
            message: _context5.t1.message || "Ups! Hubo un problema, por favor intenta más tarde"
          });
        case 48:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 44], [14, 26, 29, 32]]);
  }));
  return function getOwnerReservation(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
var getReservationIdReservation = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var id, reservation;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          id = req.user.id;
          _context6.next = 4;
          return _reservationModel["default"].findById(id);
        case 4:
          reservation = _context6.sent;
          if (reservation) {
            res.json(reservation);
          } else {
            res.status(404).json({
              message: error.message
            });
          }
          _context6.next = 12;
          break;
        case 8:
          _context6.prev = 8;
          _context6.t0 = _context6["catch"](0);
          console.log(_context6.t0);
          res.status(_context6.t0.code || 500).json({
            message: _context6.t0.message || "Ups! Hubo un problema, por favor intenta más tarde"
          });
        case 12:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 8]]);
  }));
  return function getReservationIdReservation(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
var cancelledReservation = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var userId, reservationId, reservation;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          userId = req.user.id;
          reservationId = req.params.id;
          _context7.next = 5;
          return _reservationModel["default"].findById(reservationId);
        case 5:
          reservation = _context7.sent;
          if (!(reservation.IdUser == userId || req.user.isOwner === true || req.user.isAdmin === true)) {
            _context7.next = 13;
            break;
          }
          reservation.Status = "cancelada";
          _context7.next = 10;
          return reservation.save();
        case 10:
          res.status(200).json({
            message: "Reservation cancelada"
          });
          _context7.next = 14;
          break;
        case 13:
          res.status(404).json({
            message: "No puede cancelar"
          });
        case 14:
          _context7.next = 20;
          break;
        case 16:
          _context7.prev = 16;
          _context7.t0 = _context7["catch"](0);
          console.log(_context7.t0);
          res.status(_context7.t0.code || 500).json({
            message: _context7.t0.message || "Ups! Hubo un problema, por favor intenta más tarde"
          });
        case 20:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 16]]);
  }));
  return function cancelledReservation(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

//Cron for delete the oldest reservations

_nodeCron["default"].schedule("*/1 * * * *", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
  var reservationToDelete, _iterator2, _step2, statusDelete, StringExpiration, idDelete, timeExpiration, _iterator3, _step3, id, deletes;
  return _regeneratorRuntime().wrap(function _callee8$(_context8) {
    while (1) switch (_context8.prev = _context8.next) {
      case 0:
        _context8.prev = 0;
        _context8.next = 3;
        return _reservationModel["default"].find({
          Status: "cancelada"
        });
      case 3:
        reservationToDelete = _context8.sent;
        if (!(reservationToDelete.length > 0)) {
          _context8.next = 42;
          break;
        }
        _iterator2 = _createForOfIteratorHelper(reservationToDelete);
        _context8.prev = 6;
        _iterator2.s();
      case 8:
        if ((_step2 = _iterator2.n()).done) {
          _context8.next = 34;
          break;
        }
        statusDelete = _step2.value;
        StringExpiration = statusDelete.expirationDate;
        idDelete = reservationToDelete.map(function (reservationDelete) {
          return reservationDelete.id;
        });
        timeExpiration = Number(StringExpiration.getTime());
        if (!(timeExpiration < _reservationValidation.currentSecund)) {
          _context8.next = 32;
          break;
        }
        _iterator3 = _createForOfIteratorHelper(idDelete);
        _context8.prev = 15;
        _iterator3.s();
      case 17:
        if ((_step3 = _iterator3.n()).done) {
          _context8.next = 24;
          break;
        }
        id = _step3.value;
        _context8.next = 21;
        return _reservationModel["default"].findByIdAndDelete(id);
      case 21:
        deletes = _context8.sent;
      case 22:
        _context8.next = 17;
        break;
      case 24:
        _context8.next = 29;
        break;
      case 26:
        _context8.prev = 26;
        _context8.t0 = _context8["catch"](15);
        _iterator3.e(_context8.t0);
      case 29:
        _context8.prev = 29;
        _iterator3.f();
        return _context8.finish(29);
      case 32:
        _context8.next = 8;
        break;
      case 34:
        _context8.next = 39;
        break;
      case 36:
        _context8.prev = 36;
        _context8.t1 = _context8["catch"](6);
        _iterator2.e(_context8.t1);
      case 39:
        _context8.prev = 39;
        _iterator2.f();
        return _context8.finish(39);
      case 42:
        _context8.next = 47;
        break;
      case 44:
        _context8.prev = 44;
        _context8.t2 = _context8["catch"](0);
        console.log(_context8.t2);
      case 47:
      case "end":
        return _context8.stop();
    }
  }, _callee8, null, [[0, 44], [6, 36, 39, 42], [15, 26, 29, 32]]);
})));
var _default = exports["default"] = {
  postReservation: postReservation,
  getAllReservation: getAllReservation,
  getUserReservation: getUserReservation,
  getOwnerReservation: getOwnerReservation,
  getReservationIdReservation: getReservationIdReservation,
  getReservationByField: getReservationByField,
  cancelledReservation: cancelledReservation
};