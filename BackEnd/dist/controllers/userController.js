"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserById = exports.getAllUsers = void 0;
// Mock users data, import it form other const file later
var users = [{
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  username: "John"
}, {
  id: 2,
  name: "Jane Doe",
  email: "jane@example.com",
  username: "Jane"
}];
var getAllUsers = exports.getAllUsers = function getAllUsers(req, res) {
  res.json(users);
  //add error hanlding to response
};
var getUserById = exports.getUserById = function getUserById(req, res) {
  var id = req.params.id;
  var user = users.find(function (user) {
    return user.id.toString() === id;
  });
  if (user) {
    res.json(user);
  } else {
    res.status(404).send("User not found");
  }
};