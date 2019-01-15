'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.customPassword = exports.config = undefined;

var _generatePassword = require('generate-password');

var _generatePassword2 = _interopRequireDefault(_generatePassword);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = exports.config = {
  length: 10,
  numbers: true,
  uppercase: true,
  symbols: true,
  excludeSimilarCharacters: true,
  strict: true
};

var customPassword = exports.customPassword = function customPassword() {
  var newPassword = _generatePassword2.default.generate(config);

  if (newPassword.length <= 10) {
    newPassword = newPassword + '_' + _generatePassword2.default.generate(config);
  }
  return newPassword;
};