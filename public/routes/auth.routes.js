"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _expressValidator = require("express-validator");
var _authController = require("../controllers/auth.controller.js");
var _verifyToken = require("../utils/verifyToken.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
var usernameValidator = (0, _expressValidator.check)("username").notEmpty().withMessage("El nombre de usuario es obligatorio").isLength({
  min: 4,
  max: 20
}).withMessage("El nombre de usuario debe tener entre 4 y 20 caracteres");
var emailValidator = (0, _expressValidator.check)("email").notEmpty().withMessage("El correo electrónico es obligatorio").isEmail().withMessage("Correo electrónico inválido").isLength({
  max: 50
}).withMessage("El correo electrónico debe tener como máximo 24 caracteres");
var passwordValidator = (0, _expressValidator.check)("password").notEmpty().withMessage("La contraseña es obligatoria").isLength({
  min: 6,
  max: 16
}).withMessage("La contraseña debe tener entre 6 y 16 caracteres");
router.post("/register", [usernameValidator, emailValidator, passwordValidator], _authController.register);
router.post("/login", [usernameValidator, passwordValidator], _authController.login);
router.get("/check", _verifyToken.verifyUser, _authController.getAuthStatus);
var _default = exports["default"] = router;