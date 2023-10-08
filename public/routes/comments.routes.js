"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _commentsController = _interopRequireDefault(require("../controllers/comments.controller.js"));
var _verifyToken = require("../utils/verifyToken.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.get("/comments/user/:user", _commentsController["default"].getCommentsByUser);
router.get("/comments/sportcenter/:sportcenter/:page", _commentsController["default"].getCommentsBySportCenter);
router.get("/rating/:sportcenter", _commentsController["default"].getRating);
router.post("/comments", _verifyToken.verifyUser, _commentsController["default"].createComment);
router.put("/comments/:id", _verifyToken.verifyUser, _commentsController["default"].updateComment);
router["delete"]("/comments/:id", _verifyToken.verifyUser, _commentsController["default"].deleteComment);
var _default = exports["default"] = router;