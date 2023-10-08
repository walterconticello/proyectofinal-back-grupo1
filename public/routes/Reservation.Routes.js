"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _reservationControllers = _interopRequireDefault(require("../controllers/reservation-controllers.js"));
var _verifyToken = require("../utils/verifyToken.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.get("/reservation/:id", _reservationControllers["default"].getReservationIdReservation);
router.put("/reservation/:id", _reservationControllers["default"].cancelledReservation);
router.post("/reservation", _verifyToken.verifyUser, _reservationControllers["default"].postReservation);
router.get("/reservationUser", _verifyToken.verifyUser, _reservationControllers["default"].getUserReservation);
router.get("/reservation/field/:field", _verifyToken.verifyUser, _reservationControllers["default"].getReservationByField);
router.get("/reservationOwner", _verifyToken.verifyOwner, _reservationControllers["default"].getOwnerReservation);
router.get("/reservation", _verifyToken.verifyAdmin, _reservationControllers["default"].getAllReservation);
var _default = exports["default"] = router;