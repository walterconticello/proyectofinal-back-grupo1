"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _expressValidator = require("express-validator");
var _userController = require("../controllers/user.controller.js");
var _verifyToken = require("../utils/verifyToken.js");
var _authController = require("../controllers/auth.controller.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.get("/authStatus", _authController.getAuthStatus);
var usernameValidator = (0, _expressValidator.check)("username").optional().isLength({
  min: 4,
  max: 20
}).withMessage("El nombre de usuario debe tener entre 4 y 20 caracteres");
var emailValidator = (0, _expressValidator.check)("email").optional().isEmail().withMessage("Correo electrónico inválido").isLength({
  max: 50
}).withMessage("El correo electrónico debe tener como máximo 24 caracteres");
var passwordValidator = (0, _expressValidator.check)("password").optional().isLength({
  min: 6,
  max: 16
}).withMessage("La contraseña debe tener entre 6 y 16 caracteres");
router.put("/:id", _verifyToken.verifyUser, [usernameValidator, emailValidator, passwordValidator], _userController.updateUser);

// DELETE
router["delete"]("/:id", _verifyToken.verifyUser, _userController.deleteUser);

// GET
router.get("/:id", _verifyToken.verifyUser, _userController.getUser);

// GET ALL
router.get("/", _userController.getUsers);
var _default = exports["default"] = router;