"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// This is used if there's a data need to be available first
var partial = exports.partial = function partial(fn) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return fn.bind.apply(fn, [null].concat(args));
};

var _pipe = function _pipe(firstFn, secondFn) {
  return function () {
    return secondFn(firstFn.apply(undefined, arguments));
  };
};

// this is used for piping functions
var pipe = exports.pipe = function pipe() {
  for (var _len2 = arguments.length, fns = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    fns[_key2] = arguments[_key2];
  }

  return fns.reduce(_pipe);
};