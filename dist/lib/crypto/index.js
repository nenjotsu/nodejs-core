'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decrypt = exports.encrypt = undefined;

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var encrypt = exports.encrypt = function encrypt(key, data) {
  var cipher = _crypto2.default.createCipher('aes-256-cbc', key);
  var crypted = cipher.update(data, 'utf-8', 'hex');
  crypted += cipher.final('hex');

  return crypted;
};

var decrypt = exports.decrypt = function decrypt(key, data) {
  var decipher = _crypto2.default.createDecipher('aes-256-cbc', key);
  var decrypted = decipher.update(data, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');

  return decrypted;
};