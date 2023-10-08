"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _salesController = _interopRequireDefault(require("../controllers/sales.controller.js"));
var _verifyToken = require("../utils/verifyToken.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
//POST /products
router.post("/sales", _verifyToken.verifyUser, _salesController["default"].createSale);

//GET /sales
router.get("/sales", _verifyToken.verifyAdmin, _salesController["default"].getSales); //only admin

//GET BY ID /products/:id
router.get("/sales/:id", _verifyToken.verifyAdmin, _salesController["default"].getSaleById);

//GET BY userId
var _default = exports["default"] = router;