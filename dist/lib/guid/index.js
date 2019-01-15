"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var S4 = exports.S4 = function S4() {
  return ((1 + Math.random()) * 0x10000 || 0).toString(16).substring(1);
};

var UUID = exports.UUID = function UUID() {
  var guid = (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
  return guid;
};