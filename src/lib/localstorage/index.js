import Cookie from 'react-cookie';
import { getBaseUrl } from '../environment';
import { encrypt, decrypt } from '../crypto';

const isChrome = !!window.chrome && !!window.chrome.webstore;

const getCookie = name => {
  const value = `; ${window.document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const result = parts
      .pop()
      .split(';')
      .shift();
    return result;
  }
  return '';
};

let bc = {};
if (isChrome) {
  bc = new BroadcastChannel('ubidy_channel');
  bc.onmessage = ev => {
    const isReloaded = localStorage.getItem('isReloaded');
    if (ev.data === 'Logged Out' && isReloaded === 'false') {
      localStorage.setItem('isReloaded', 'true');
      window.location.reload(true);
    }
  }; /* receive */
}

const sk = 'WQ6UCMAkSkjOMi0WBZ3V8n94FiX2avOJ5J4E2mpoyc72wtZrhz9oDWwx9d6z0oVc';

export const loadState = () => {
  try {
    const serializedState = sessionStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem('state', serializedState);
  } catch (err) {
    return err;
  }
  return undefined;
};

export const clearState = () => {
  sessionStorage.clear();
  localStorage.clear();
};

export const getUserType = () => {
  return getCookie('employer_userType');
};

export const getAccessToken = () => {
  return localStorage.getItem('access_token');
};

export const getAuthUserId = () => {
  return localStorage.getItem('auth_user_id');
};

export const getUserRole = () => {
  return localStorage.getItem('user_role');
};

export const parseAccessToken = token => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
};

export const getUserId = () => {
  return getCookie('employer_userId');
};

const encryptRecord = (object, key) => {
  const data = JSON.stringify(object);
  const encryptedData = encrypt(key, data);
  return encryptedData;
};

export const saveAuthorization = (records, key) => {
  try {
    const encryptedData = encryptRecord(records, key);
    localStorage.setItem('user_authorization', encryptedData);
  } catch (err) {
    return err;
  }
  return undefined;
};

export const encryptAuthorization = authorizationData => {
  const secretKey = sk;
  saveAuthorization(authorizationData, secretKey);
};
export const getAuthorization = () => {
  try {
    const secretKey = sk;
    const userAuthorization = localStorage.getItem('user_authorization');
    if (userAuthorization === null) {
      return undefined;
    }
    const encryptedData = decrypt(secretKey, userAuthorization);
    return JSON.parse(encryptedData);
  } catch (err) {
    return undefined;
  }
};

export const cookieSave = (key = '', value = '', domain = '') => {
  Cookie.save(key, value, { path: '/', domain });
};

const removeAgencyCookies = domain => {
  Cookie.remove('agency_isAuthenticated', { path: '/', domain });
  Cookie.remove('agency_tenantId', { path: '/', domain });
  Cookie.remove('agency_userId', { path: '/', domain });
  Cookie.remove('agency_userType', { path: '/', domain });
  Cookie.remove('agency_messenger_user', { path: '/', domain });
};

export const saveCookie = (payload, domain) => {
  const encryptedData = encryptRecord(payload.messengerUser, domain);
  cookieSave('employer_userType', payload.userType, domain);
  cookieSave('employer_userId', payload.userId, domain);
  cookieSave('employer_tenantId', payload.tenantId, domain);
  cookieSave('employer_isAuthenticated', payload.isAuthenticated, domain);
  cookieSave('employer_messenger_user', encryptedData, domain);
  cookieSave('access_token', payload.accessToken, domain);
  removeAgencyCookies(domain);
};

export const clearCookie = domain => {
  Cookie.remove('employer_isAuthenticated', {
    path: '/',
    domain,
  });
  Cookie.remove('employer_tenantId', {
    path: '/',
    domain,
  });
  Cookie.remove('employer_userId', {
    path: '/',
    domain,
  });
  Cookie.remove('employer_userType', {
    path: '/',
    domain,
  });
  Cookie.remove('employer_messenger_user', {
    path: '/',
    domain,
  });

  removeAgencyCookies(domain);

  Cookie.remove('access_token', {
    path: '/',
    domain,
  });
  Cookie.remove('expires_at', { path: '/', domain });

  Cookie.remove('_ga', {
    path: '/',
    domain: '.auth0.com',
  });
  Cookie.remove('_gid', {
    path: '/',
    domain: '.auth0.com',
  });
  Cookie.remove('ajs_anonymous_id', {
    path: '/',
    domain: '.auth0.com',
  });
  Cookie.remove('ajs_user_id', {
    path: '/',
    domain: '.auth0.com',
  });
  Cookie.remove('auth0l', {
    path: '/',
    domain: '.auth0.com',
  });
  Cookie.remove('current_tenant', {
    path: '/',
    domain: '.auth0.com',
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

export const getTenantId = () => {
  const TENANTID = getCookie('employer_tenantId');
  return TENANTID;
};

export const getIsDemo = () => {
  const isDemo = localStorage.getItem('is_demo');
  return isDemo === 'true';
};

export const TENANT_ID = getTenantId();
export const USER_ID = getUserId();
export const AUTH_USER_ID = getAuthUserId();

export const isLoggedOut = () => {
  // if (!ISAUTH) { }
};

export const isExpired = () => {
  const expiresAt = JSON.parse(localStorage.getItem('expires_at')) || 0;
  const bool = new Date().getTime() > expiresAt;
  return bool;
};

export const isStillAuthenticated = cb => {
  const expiresAt = JSON.parse(localStorage.getItem('expires_at')) || 0;
  if (new Date().getTime() > expiresAt || 0) {
    const domain = getBaseUrl('domainBase');
    const unauthorizedMessage =
      'Your login session has expired. In order to keep a high level of security, you will need to login again.';
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

export const setExpiration = value => {
  const domain = getBaseUrl('domainBase');
  const inSeconds = 300; // 300 in seconds
  const multilpliedSeconds = value * inSeconds;
  const expiresAt = JSON.stringify(multilpliedSeconds + new Date().getTime()); // == 40min expiration
  localStorage.setItem('expires_at', expiresAt);
  cookieSave('expires_at', expiresAt, domain);
};

export const redirectToSessionIfExpired = () => {
  const PATH = window.location.pathname;
  if (!window.navigator.onLine) {
    window.location = '/no-internet-connection';
  }
  if (isExpired()) {
    const domain = getBaseUrl('domainBase');
    clearCookie(domain);
    if (PATH !== '/session-expired') {
      window.location = '/session-expired';
    }
  } else {
    setExpiration(8600);
  }
};

export const increaseNotificationCount = () => {
  let notificationCount = localStorage.getItem('notification_count');

  if (!notificationCount) {
    notificationCount = 0;
  }

  localStorage.setItem(
    'notification_count',
    (parseInt(notificationCount, 10) + 1).toString(),
  );
};

export const getNotificationCount = () => {
  const notificationCount = localStorage.getItem('notification_count');

  if (!notificationCount) {
    return 0;
  }

  return parseInt(notificationCount, 10);
};

export const setNotificationCount = count => {
  let notificationCount = 0;
  if (count) {
    notificationCount = count;
  }
  localStorage.setItem('notification_count', notificationCount);
};

export const clearNotificationCount = () => {
  localStorage.setItem('notification_count', '0');
};
