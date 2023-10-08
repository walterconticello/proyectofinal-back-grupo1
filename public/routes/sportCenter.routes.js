"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _sportCenterController = _interopRequireDefault(require("../controllers/sportCenter.controller.js"));
var _verifyToken = require("../utils/verifyToken.js");
var _receive = require("../middlewares/receive.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.post("/sportCenter", _verifyToken.verifyOwner, _receive.bodyParser, _sportCenterController["default"].postSportCenter);
router.get("/sportCenter", _sportCenterController["default"].getAllSportCenters);
router.get("/sportCenter/:id", _sportCenterController["default"].getSportCenterById);
router.get("/sportCenter/owner/:id", _verifyToken.verifyOwner, _sportCenterController["default"].getSportCenterOwner);
router.put("/sportCenter/:id", _verifyToken.verifyOwner, _receive.bodyParser, _sportCenterController["default"].putSportCenter);
router["delete"]("/sportCenter/:id", _verifyToken.verifyOwner, _sportCenterController["default"].deleteSportCenter);
var _default = exports["default"] = router;