module.exports.agreementDocumentTypes = {
  preQualification: 1,
  nonDisclosure: 2,
  termsAndConditions: 3,
};

module.exports.PATH = window.location.pathname;

module.exports.IS_OPEN_ROUTES =
  PATH.indexOf('/404') >= 0 ||
  PATH.indexOf('/_') >= 0 ||
  PATH.indexOf('/no-internet-connection') >= 0 ||
  PATH.indexOf('/session-expired') >= 0 ||
  PATH.indexOf('/something-went-wrong') >= 0 ||
  PATH.indexOf('/Employer/createtestimonial') >= 0 ||
  PATH.indexOf('/Employer/Welcome') >= 0 ||
  PATH.indexOf('/Employer/ThankYouPage') >= 0;

module.exports.HAS_BASE =
  PATH.indexOf('/') >= 0 ||
  PATH.indexOf('/404') >= 0 ||
  PATH.indexOf('/_') >= 0 ||
  PATH.indexOf('/no-internet-connection') >= 0 ||
  PATH.indexOf('/session-expired') >= 0 ||
  PATH.indexOf('/something-went-wrong') >= 0 ||
  PATH.indexOf('/documents') >= 0 ||
  PATH.indexOf('/auction') >= 0 ||
  PATH.indexOf('/agencies') >= 0 ||
  PATH.indexOf('/requirements') >= 0 ||
  PATH.indexOf('/profile') >= 0 ||
  PATH.indexOf('/account') >= 0 ||
  PATH.indexOf('/reputation') >= 0 ||
  PATH.indexOf('/settings') >= 0 ||
  PATH.indexOf('/messagecentre') >= 0 ||
  PATH.indexOf('/notification') >= 0 ||
  PATH.indexOf('/activity') >= 0 ||
  PATH.indexOf('/permauction') >= 0 ||
  PATH.indexOf('/perm') >= 0 ||
  PATH.indexOf('/Employer/createtestimonial') >= 0 ||
  PATH.indexOf('/Employer/Welcome') >= 0 ||
  PATH.indexOf('/Employer/ThankYouPage') >= 0;

module.exports.filterRoleCategory = [
  {
    subCategoryName: 'Role Category',
    subCategoryDetails: [
      {
        key: '0',
        details: 'All',
      },
      {
        key: '3',
        details: 'Skilled/Semi-Skilled',
      },
      {
        key: '2',
        details: 'Professional',
      },
      {
        key: '1',
        details: 'Executive',
      },
    ],
  },
];

module.exports.EMAIL_NOTIFICATION = 'notify@ubidy.com';
