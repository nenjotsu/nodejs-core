'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.headersFormData = exports.headersJson = exports.headersPlain = exports.headers = undefined;

var _localstorage = require('../../lib/localstorage');

var TOKEN = (0, _localstorage.getAccessToken)();

// form body
var headers = exports.headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
  Authorization: 'Bearer ' + TOKEN
};

// text plain
var headersPlain = exports.headersPlain = {
  'Content-Type': 'text/plain',
  Authorization: 'Bearer ' + TOKEN
};

// normal posting data
var headersJson = exports.headersJson = {
  'Content-Type': 'application/json',
  Authorization: 'Bearer ' + TOKEN
};

// uploading documents
var headersFormData = exports.headersFormData = {
  'Content-Type': 'multipart/form-data',
  Authorization: 'Bearer ' + TOKEN
};