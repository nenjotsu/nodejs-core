'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBaseUrl = undefined;

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var env = _config2.default.ENV;

var getBaseUrl = exports.getBaseUrl = function getBaseUrl(baseUrl) {
  var url = _config2.default[baseUrl];
  if (env !== '') return url;
  return '';
};