'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearNotificationCount = exports.setNotificationCount = exports.getNotificationCount = exports.increaseNotificationCount = exports.redirectToSessionIfExpired = exports.setExpiration = exports.isStillAuthenticated = exports.isExpired = exports.isLoggedOut = exports.AUTH_USER_ID = exports.USER_ID = exports.TENANT_ID = exports.getIsDemo = exports.getTenantId = exports.clearCookie = exports.saveCookie = exports.cookieSave = exports.getAuthorization = exports.encryptAuthorization = exports.saveAuthorization = exports.getUserId = exports.parseAccessToken = exports.getUserRole = exports.getAuthUserId = exports.getAccessToken = exports.getUserType = exports.clearState = exports.saveState = exports.loadState = undefined;

var _reactCookie = require('react-cookie');

var _reactCookie2 = _interopRequireDefault(_reactCookie);

var _environment = require('../environment');

var _crypto = require('../crypto');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isChrome = !!window.chrome && !!window.chrome.webstore;

var getCookie = function getCookie(name) {
  var value = '; ' + window.document.cookie;
  var parts = value.split('; ' + name + '=');
  if (parts.length === 2) {
    var result = parts.pop().split(';').shift();
    return result;
  }
  return '';
};

var bc = {};
if (isChrome) {
  bc = new BroadcastChannel('ubidy_channel');
  bc.onmessage = function (ev) {
    var isReloaded = localStorage.getItem('isReloaded');
    if (ev.data === 'Logged Out' && isReloaded === 'false') {
      localStorage.setItem('isReloaded', 'true');
      window.location.reload(true);
    }
  }; /* receive */
}

var sk = 'WQ6UCMAkSkjOMi0WBZ3V8n94FiX2avOJ5J4E2mpoyc72wtZrhz9oDWwx9d6z0oVc';

var loadState = exports.loadState = function loadState() {
  try {
    var serializedState = sessionStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

var saveState = exports.saveState = function saveState(state) {
  try {
    var serializedState = JSON.stringify(state);
    sessionStorage.setItem('state', serializedState);
  } catch (err) {
    return err;
  }
  return undefined;
};

var clearState = exports.clearState = function clearState() {
  sessionStorage.clear();
  localStorage.clear();
};

var getUserType = exports.getUserType = function getUserType() {
  return getCookie('employer_userType');
};

var getAccessToken = exports.getAccessToken = function getAccessToken() {
  return localStorage.getItem('access_token');
};

var getAuthUserId = exports.getAuthUserId = function getAuthUserId() {
  return localStorage.getItem('auth_user_id');
};

var getUserRole = exports.getUserRole = function getUserRole() {
  return localStorage.getItem('user_role');
};

var parseAccessToken = exports.parseAccessToken = function parseAccessToken(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
};

var getUserId = exports.getUserId = function getUserId() {
  return getCookie('employer_userId');
};

var encryptRecord = function encryptRecord(object, key) {
  var data = JSON.stringify(object);
  var encryptedData = (0, _crypto.encrypt)(key, data);
  return encryptedData;
};

var saveAuthorization = exports.saveAuthorization = function saveAuthorization(records, key) {
  try {
    var encryptedData = encryptRecord(records, key);
    localStorage.setItem('user_authorization', encryptedData);
  } catch (err) {
    return err;
  }
  return undefined;
};

var encryptAuthorization = exports.encryptAuthorization = function encryptAuthorization(authorizationData) {
  var secretKey = sk;
  saveAuthorization(authorizationData, secretKey);
};
var getAuthorization = exports.getAuthorization = function getAuthorization() {
  try {
    var secretKey = sk;
    var userAuthorization = localStorage.getItem('user_authorization');
    if (userAuthorization === null) {
      return undefined;
    }
    var encryptedData = (0, _crypto.decrypt)(secretKey, userAuthorization);
    return JSON.parse(encryptedData);
  } catch (err) {
    return undefined;
  }
};

var cookieSave = exports.cookieSave = function cookieSave() {
  var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var domain = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  _reactCookie2.default.save(key, value, { path: '/', domain: domain });
};

var removeAgencyCookies = function removeAgencyCookies(domain) {
  _reactCookie2.default.remove('agency_isAuthenticated', { path: '/', domain: domain });
  _reactCookie2.default.remove('agency_tenantId', { path: '/', domain: domain });
  _reactCookie2.default.remove('agency_userId', { path: '/', domain: domain });
  _reactCookie2.default.remove('agency_userType', { path: '/', domain: domain });
  _reactCookie2.default.remove('agency_messenger_user', { path: '/', domain: domain });
};

var saveCookie = exports.saveCookie = function saveCookie(payload, domain) {
  var encryptedData = encryptRecord(payload.messengerUser, domain);
  cookieSave('employer_userType', payload.userType, domain);
  cookieSave('employer_userId', payload.userId, domain);
  cookieSave('employer_tenantId', payload.tenantId, domain);
  cookieSave('employer_isAuthenticated', payload.isAuthenticated, domain);
  cookieSave('employer_messenger_user', encryptedData, domain);
  cookieSave('access_token', payload.accessToken, domain);
  removeAgencyCookies(domain);
};

var clearCookie = exports.clearCookie = function clearCookie(domain) {
  _reactCookie2.default.remove('employer_isAuthenticated', {
    path: '/',
    domain: domain
  });
  _reactCookie2.default.remove('employer_tenantId', {
    path: '/',
    domain: domain
  });
  _reactCookie2.default.remove('employer_userId', {
    path: '/',
    domain: domain
  });
  _reactCookie2.default.remove('employer_userType', {
    path: '/',
    domain: domain
  });
  _reactCookie2.default.remove('employer_messenger_user', {
    path: '/',
    domain: domain
  });

  removeAgencyCookies(domain);

  _reactCookie2.default.remove('access_token', {
    path: '/',
    domain: domain
  });
  _reactCookie2.default.remove('expires_at', { path: '/', domain: domain });

  _reactCookie2.default.remove('_ga', {
    path: '/',
    domain: '.auth0.com'
  });
  _reactCookie2.default.remove('_gid', {
    path: '/',
    domain: '.auth0.com'
  });
  _reactCookie2.default.remove('ajs_anonymous_id', {
    path: '/',
    domain: '.auth0.com'
  });
  _reactCookie2.default.remove('ajs_user_id', {
    path: '/',
    domain: '.auth0.com'
  });
  _reactCookie2.default.remove('auth0l', {
    path: '/',
    domain: '.auth0.com'
  });
  _reactCookie2.default.remove('current_tenant', {
    path: '/',
    domain: '.auth0.com'
  });

  localStorage.removeItem('tenantInfo');
  localStorage.removeItem('state');
  sessionStorage.removeItem('state');

  localStorage.removeItem('access_token');
  // localStorage.removeItem('id_token');
  localStorage.removeItem('expires_at');

  localStorage.removeItem('auth_user_id');
  localStorage.removeItem('user_role');
  localStorage.removeItem('user_access_token');
  localStorage.removeItem('user_expires_at');
  localStorage.removeItem('user_authorization');

  if (isChrome) {
    bc.postMessage('Logged Out'); /* send */
  }
};

var getTenantId = exports.getTenantId = function getTenantId() {
  var TENANTID = getCookie('employer_tenantId');
  return TENANTID;
};

var getIsDemo = exports.getIsDemo = function getIsDemo() {
  var isDemo = localStorage.getItem('is_demo');
  return isDemo === 'true';
};

var TENANT_ID = exports.TENANT_ID = getTenantId();
var USER_ID = exports.USER_ID = getUserId();
var AUTH_USER_ID = exports.AUTH_USER_ID = getAuthUserId();

var isLoggedOut = exports.isLoggedOut = function isLoggedOut() {
  // if (!ISAUTH) { }
};

var isExpired = exports.isExpired = function isExpired() {
  var expiresAt = JSON.parse(localStorage.getItem('expires_at')) || 0;
  var bool = new Date().getTime() > expiresAt;
  return bool;
};

var isStillAuthenticated = exports.isStillAuthenticated = function isStillAuthenticated(cb) {
  var expiresAt = JSON.parse(localStorage.getItem('expires_at')) || 0;
  if (new Date().getTime() > expiresAt || 0) {
    var domain = (0, _environment.getBaseUrl)('domainBase');
    var unauthorizedMessage = 'Your login session has expired. In order to keep a high level of security, you will need to login again.';
    if (expiresAt !== null) {
      clearCookie(domain);
      cb(unauthorizedMessage);
      // Modal.info({
      //   title: 'Session expired',
      //   content: unauthorizedMessage,
      //   okText: 'OK',
      //   onOk: () => {
      //     window.location = '/';
      //   },
      // });
    }
  }
  return new Date().getTime() < expiresAt;
};

// export const isUnauthorized = () => {
//   // if (status === 401) { }
// };

var setExpiration = exports.setExpiration = function setExpiration(value) {
  var domain = (0, _environment.getBaseUrl)('domainBase');
  var inSeconds = 300; // 300 in seconds
  var multilpliedSeconds = value * inSeconds;
  var expiresAt = JSON.stringify(multilpliedSeconds + new Date().getTime()); // == 40min expiration
  localStorage.setItem('expires_at', expiresAt);
  cookieSave('expires_at', expiresAt, domain);
};

var redirectToSessionIfExpired = exports.redirectToSessionIfExpired = function redirectToSessionIfExpired() {
  var PATH = window.location.pathname;
  if (!window.navigator.onLine) {
    window.location = '/no-internet-connection';
  }
  if (isExpired()) {
    var domain = (0, _environment.getBaseUrl)('domainBase');
    clearCookie(domain);
    if (PATH !== '/session-expired') {
      window.location = '/session-expired';
    }
  } else {
    setExpiration(8600);
  }
};

var increaseNotificationCount = exports.increaseNotificationCount = function increaseNotificationCount() {
  var notificationCount = localStorage.getItem('notification_count');

  if (!notificationCount) {
    notificationCount = 0;
  }

  localStorage.setItem('notification_count', (parseInt(notificationCount, 10) + 1).toString());
};

var getNotificationCount = exports.getNotificationCount = function getNotificationCount() {
  var notificationCount = localStorage.getItem('notification_count');

  if (!notificationCount) {
    return 0;
  }

  return parseInt(notificationCount, 10);
};

var setNotificationCount = exports.setNotificationCount = function setNotificationCount(count) {
  var notificationCount = 0;
  if (count) {
    notificationCount = count;
  }
  localStorage.setItem('notification_count', notificationCount);
};

var clearNotificationCount = exports.clearNotificationCount = function clearNotificationCount() {
  localStorage.setItem('notification_count', '0');
};