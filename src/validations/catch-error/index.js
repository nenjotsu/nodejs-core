import {
  redirectToSessionIfExpired,
  clearCookie,
} from '../../lib/localstorage';

const catchError = error => {
  console.log(error);
  let errorList = [];
  if (error === undefined) {
    errorList = ['No Internet Found'];
    redirectToSessionIfExpired();
    return errorList.join(' ');
  }
  if (error.status === 401) {
    const unauthorizedMessage =
      'Your login session has expired. In order to keep a high level of security, you will need to login again.';
    errorList = [unauthorizedMessage];
    redirectToSessionIfExpired();
    return errorList.join(' ');
  }
  if (error.status === 403) {
    const unauthorizedMessage = error.statusText;
    errorList = [unauthorizedMessage];
    return errorList.join(' ');
  }
  const defaultError =
    'Something went wrong. Please send an email to support@ubidy.com';

  if (error.status === 500) {
    if (
      error.xhr.response !== undefined &&
      error.xhr.response !== null &&
      error.xhr.response.message === 'jwt expired'
    ) {
      errorList = [].concat(['Session Expired']);
      const domain = GetBaseUrl('domainBase');
      clearCookie(domain);
      window.location = '/session-expired';
    } else {
      errorList = [].concat([defaultError]);
    }
  }

  if (error.status === 400 || error.status === 404) {
    if (error.xhr.response !== undefined && error.xhr.response !== null) {
      if (error.xhr.response.message === 'The user already exists.') {
        errorList = [].concat(['The email address already exists']);
      } else if (
        error.xhr.response.err !== undefined &&
        error.xhr.response.err[0] === 'Required FirstName.'
      ) {
        errorList = [].concat('First name is required');
      } else if (
        error.xhr.response.err !== undefined &&
        error.xhr.response.err[0] === 'Required LastName.'
      ) {
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

export default catchError;
