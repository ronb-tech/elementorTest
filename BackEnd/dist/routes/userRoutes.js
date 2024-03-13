"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _userController = require("../controllers/userController");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// routes/userRoutes.ts

var userRoutes = _express["default"].Router();
userRoutes.get('/', _userController.getAllUsers);
userRoutes.get('/:id', _userController.getUserById);
var _default = exports["default"] = userRoutes;