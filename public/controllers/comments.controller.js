"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _commentsModel = _interopRequireDefault(require("../models/comments.model.js"));
var _commentsValidation = _interopRequireDefault(require("../helpers/comments.validation.js"));
var _error = require("../utils/error.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
//GET by User
var getCommentsByUser = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res, next) {
    var comments, docs;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _commentsModel["default"].find({
            userId: req.params.user
          }).populate({
            path: "userId",
            select: ["username", "email", "photo"]
          });
        case 3:
          comments = _context.sent;
          _context.next = 6;
          return _commentsModel["default"].find({
            userId: req.params.user
          }).count();
        case 6:
          docs = _context.sent;
          if (!(comments.length > 0)) {
            _context.next = 11;
            break;
          }
          res.status(200).json({
            comments: comments,
            length: docs
          });
          _context.next = 12;
          break;
        case 11:
          return _context.abrupt("return", next((0, _error.createError)(404, "No hay comentarios")));
        case 12:
          _context.next = 18;
          break;
        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          res.status(500).json({
            message: _context.t0.message
          });
        case 18:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 14]]);
  }));
  return function getCommentsByUser(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

//GET by SportCenter
var getCommentsBySportCenter = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res, next) {
    var page, comments, docs;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          page = parseInt(req.params.page);
          _context2.next = 4;
          return _commentsModel["default"].find({
            sportCenterId: req.params.sportcenter
          }).limit(10).skip(10 * (page - 1)).populate({
            path: "userId",
            select: ["username", "email", "photo"]
          });
        case 4:
          comments = _context2.sent;
          _context2.next = 7;
          return _commentsModel["default"].find({
            sportCenterId: req.params.sportcenter
          }).count();
        case 7:
          docs = _context2.sent;
          docs = Math.ceil(docs / 10);
          res.status(200).json({
            comments: comments,
            pages: docs
          });
          _context2.next = 16;
          break;
        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          res.status(500).json({
            message: _context2.t0.message
          });
        case 16:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 12]]);
  }));
  return function getCommentsBySportCenter(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

//POST
var createComment = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res, next) {
    var token, id, bodyComment, newComment;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          token = req.header("access_token");
          id = req.user.id;
          if (!id) {
            _context3.next = 29;
            break;
          }
          bodyComment = {
            text: req.body.text,
            rating: req.body.rating,
            sportCenterId: req.body.sportCenterId,
            userId: id
          };
          if (_commentsValidation["default"].createCommentDataValidation(bodyComment)) {
            _context3.next = 9;
            break;
          }
          return _context3.abrupt("return", next((0, _error.createError)(400, "Falta información por ingresar")));
        case 9:
          _context3.t1 = _commentsValidation["default"].ratingValidation(bodyComment.rating) && _commentsValidation["default"].textValidation(bodyComment.text);
          if (!_context3.t1) {
            _context3.next = 14;
            break;
          }
          _context3.next = 13;
          return _commentsValidation["default"].userValidation(bodyComment.userId);
        case 13:
          _context3.t1 = _context3.sent;
        case 14:
          _context3.t0 = _context3.t1;
          if (!_context3.t0) {
            _context3.next = 19;
            break;
          }
          _context3.next = 18;
          return _commentsValidation["default"].sportCenterValidation(bodyComment.sportCenterId);
        case 18:
          _context3.t0 = _context3.sent;
        case 19:
          if (!_context3.t0) {
            _context3.next = 26;
            break;
          }
          newComment = new _commentsModel["default"](bodyComment);
          _context3.next = 23;
          return newComment.save();
        case 23:
          res.status(201).json(newComment);
          _context3.next = 27;
          break;
        case 26:
          return _context3.abrupt("return", next((0, _error.createError)(400, "Informacion inválida")));
        case 27:
          _context3.next = 30;
          break;
        case 29:
          return _context3.abrupt("return", next((0, _error.createError)(400, "Inicia sesión para comentar")));
        case 30:
          _context3.next = 36;
          break;
        case 32:
          _context3.prev = 32;
          _context3.t2 = _context3["catch"](0);
          console.log(_context3.t2);
          res.status(500).json({
            message: _context3.t2.message
          });
        case 36:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 32]]);
  }));
  return function createComment(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

//PUT
var updateComment = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res, next) {
    var token, id, comment;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          token = req.header("access_token");
          id = req.user.id;
          if (!id) {
            _context4.next = 26;
            break;
          }
          _context4.next = 6;
          return _commentsModel["default"].findById(req.params.id);
        case 6:
          comment = _context4.sent;
          if (!comment) {
            _context4.next = 23;
            break;
          }
          if (!(id == comment.userId)) {
            _context4.next = 20;
            break;
          }
          if (req.body.text) comment.text = req.body.text;
          if (req.body.rating) comment.rating = req.body.rating;
          if (!(_commentsValidation["default"].ratingValidation(comment.rating) && _commentsValidation["default"].textValidation(comment.text))) {
            _context4.next = 17;
            break;
          }
          _context4.next = 14;
          return comment.save();
        case 14:
          res.status(200).json(comment);
          _context4.next = 18;
          break;
        case 17:
          return _context4.abrupt("return", next((0, _error.createError)(400, "Informacion inválida")));
        case 18:
          _context4.next = 21;
          break;
        case 20:
          return _context4.abrupt("return", next((0, _error.createError)(400, "Solo puedes modificar tu propio comentario")));
        case 21:
          _context4.next = 24;
          break;
        case 23:
          return _context4.abrupt("return", next((0, _error.createError)(404, "Comentario no encontrado")));
        case 24:
          _context4.next = 27;
          break;
        case 26:
          return _context4.abrupt("return", next((0, _error.createError)(400, "Inicia sesión para modificar un comentario")));
        case 27:
          _context4.next = 33;
          break;
        case 29:
          _context4.prev = 29;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);
          res.status(500).json({
            message: _context4.t0.message
          });
        case 33:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 29]]);
  }));
  return function updateComment(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

//DELETE
var deleteComment = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res, next) {
    var token, id, comment, deletedComment;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          token = req.header("access_token");
          id = req.user.id;
          if (!id) {
            _context5.next = 25;
            break;
          }
          _context5.next = 6;
          return _commentsModel["default"].findById(req.params.id);
        case 6:
          comment = _context5.sent;
          if (!comment) {
            _context5.next = 22;
            break;
          }
          if (!(id == comment.userId)) {
            _context5.next = 19;
            break;
          }
          _context5.next = 11;
          return _commentsModel["default"].findOneAndDelete({
            _id: {
              $eq: req.params.id
            }
          });
        case 11:
          deletedComment = _context5.sent;
          if (!deletedComment) {
            _context5.next = 16;
            break;
          }
          res.status(200).json({
            message: "The Comment has been deleted",
            comment: deletedComment
          });
          _context5.next = 17;
          break;
        case 16:
          return _context5.abrupt("return", next((0, _error.createError)(404, "Comentario no encontrado")));
        case 17:
          _context5.next = 20;
          break;
        case 19:
          return _context5.abrupt("return", next((0, _error.createError)(400, "Solo puedes eliminar tu propio comentario")));
        case 20:
          _context5.next = 23;
          break;
        case 22:
          return _context5.abrupt("return", next((0, _error.createError)(404, "Comentario no encontrado")));
        case 23:
          _context5.next = 26;
          break;
        case 25:
          return _context5.abrupt("return", next((0, _error.createError)(400, "Inicia sesión para eliminar un comentario")));
        case 26:
          _context5.next = 32;
          break;
        case 28:
          _context5.prev = 28;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0);
          res.status(500).json({
            message: _context5.t0.message
          });
        case 32:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 28]]);
  }));
  return function deleteComment(_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();
var getRating = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var comments, rating, i;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return _commentsModel["default"].find({
            sportCenterId: req.params.sportcenter
          });
        case 3:
          comments = _context6.sent;
          rating = 0;
          if (comments.length > 0) {
            for (i = 0; i < comments.length; i++) {
              rating += comments[i].rating;
            }
            rating = Math.floor(rating / comments.length);
            res.status(200).json(rating);
          } else {
            res.status(200).json(rating);
          }
          _context6.next = 12;
          break;
        case 8:
          _context6.prev = 8;
          _context6.t0 = _context6["catch"](0);
          console.log(_context6.t0);
          res.status(500).json({
            message: _context6.t0.message
          });
        case 12:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 8]]);
  }));
  return function getRating(_x16, _x17) {
    return _ref6.apply(this, arguments);
  };
}();
var _default = exports["default"] = {
  createComment: createComment,
  getCommentsByUser: getCommentsByUser,
  getCommentsBySportCenter: getCommentsBySportCenter,
  updateComment: updateComment,
  deleteComment: deleteComment,
  getRating: getRating
};