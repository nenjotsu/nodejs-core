'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _localstorage = require('../../lib/localstorage');

var catchError = function catchError(error) {
  console.log(error);
  var errorList = [];
  if (error === undefined) {
    errorList = ['No Internet Found'];
    (0, _localstorage.redirectToSessionIfExpired)();
    return errorList.join(' ');
  }
  if (error.status === 401) {
    var unauthorizedMessage = 'Your login session has expired. In order to keep a high level of security, you will need to login again.';
    errorList = [unauthorizedMessage];
    (0, _localstorage.redirectToSessionIfExpired)();
    return errorList.join(' ');
  }
  if (error.status === 403) {
    var _unauthorizedMessage = error.statusText;
    errorList = [_unauthorizedMessage];
    return errorList.join(' ');
  }
  var defaultError = 'Something went wrong. Please send an email to support@ubidy.com';

  if (error.status === 500) {
    if (error.xhr.response !== undefined && error.xhr.response !== null && error.xhr.response.message === 'jwt expired') {
      errorList = [].concat(['Session Expired']);
      var domain = GetBaseUrl('domainBase');
      (0, _localstorage.clearCookie)(domain);
      window.location = '/session-expired';
    } else {
      errorList = [].concat([defaultError]);
    }
  }

  if (error.status === 400 || error.status === 404) {
    if (error.xhr.response !== undefined && error.xhr.response !== null) {
      if (error.xhr.response.message === 'The user already exists.') {
        errorList = [].concat(['The email address already exists']);
      } else if (error.xhr.response.err !== undefined && error.xhr.response.err[0] === 'Required FirstName.') {
        errorList = [].concat('First name is required');
      } else if (error.xhr.response.err !== undefined && error.xhr.response.err[0] === 'Required LastName.') {
        errorList = [].concat('Last name is required');
      } else if (error.xhr.response.err !== undefined) {
        errorList = [].concat(error.xhr.response.err);
      } else {
        errorList = [].concat(removeTenantIdText(error.xhr.response.message));
      }
    } else {
      errorList = [].concat([defaultError]);
    }
  } else {
    errorList = [].concat([defaultError]);
  }
  return errorList.join(' ');
};

exports.default = catchError;