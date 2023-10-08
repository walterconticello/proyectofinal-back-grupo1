"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _verifyToken = require("../utils/verifyToken.js");
var _productsController = _interopRequireDefault(require("../controllers/products.controller.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
//GET /products
router.get("/products", _productsController["default"].getAllProducts);

//GET BY ID /products/:id
router.get("/products/:id", _productsController["default"].getProductById);

//POST /products
router.post("/products", _verifyToken.verifyAdmin, _productsController["default"].createProduct);

//PUT /products/:id
router.put("/products/:id", _verifyToken.verifyAdmin, _productsController["default"].updateProduct);

//DELETE /products/:id
router["delete"]("/products/:id", _verifyToken.verifyAdmin, _productsController["default"].deleteProduct);
var _default = exports["default"] = router;