"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _userRoutes = _interopRequireDefault(require("./userRoutes"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = (0, _express.Router)();
router.use('/users', _userRoutes["default"]);
var _default = exports["default"] = router;