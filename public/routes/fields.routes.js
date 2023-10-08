"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _fieldsController = _interopRequireDefault(require("../controllers/fields.controller.js"));
var _verifyToken = require("../utils/verifyToken.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.post("/fields", _verifyToken.verifyOwner, _fieldsController["default"].createField);
router.get("/fields", _fieldsController["default"].getAllFields);
router.get("/fields/:id", _fieldsController["default"].getFieldByID);
router.get("/fieldsPage/:page", _fieldsController["default"].getPage);
router.get("/sportcenter/fields/:id", _verifyToken.verifyOwner, _fieldsController["default"].getFieldsBySportCenterId);
router.get("/fieldsOwner", _verifyToken.verifyOwner, _fieldsController["default"].getOwnerFields);
router.put("/fields/:id", _verifyToken.verifyOwner, _fieldsController["default"].updateField);
router.put("/fields/state/:id", _verifyToken.verifyOwner, _fieldsController["default"].putState);
router["delete"]("/fields/:id", _verifyToken.verifyOwner, _fieldsController["default"].deleteField);
var _default = exports["default"] = router;