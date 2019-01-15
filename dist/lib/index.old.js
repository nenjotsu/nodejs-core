// import moment from 'moment';
// import split from 'lodash/split';
// import findIndex from 'lodash/findIndex';
// import isNumber from 'lodash/isNumber';
// import isNaN from 'lodash/isNaN';
// import defaultLogo from './default-img.png';
// import { getTenantId } from '../settings/LocalStorage';

// const PERCENTAGE_VALUE = 100 / 5;

// export const computePercentage = completion => {
//   let percent = completion.percent || 0;
//   let fields = completion.fields || 'undefined,';

//   if (!(fields.indexOf(completion.title) !== -1)) {
//     percent += +PERCENTAGE_VALUE;
//     const str = fields;
//     fields = str.split('undefined,').join('');
//     fields = fields.split(',,').join(',');
//     fields = `${fields}${completion.title},`;
//   }
//   return { percent, fields };
// };

// export const minusPercentage = completion => {
//   let percent = completion.percent || 0;
//   let fields = completion.fields || 'undefined,';

//   const TITLE = completion.title;
//   if (fields.indexOf(completion.title) !== -1) {
//     fields = fields.split('undefined,').join('');
//     fields = fields.split(TITLE).join('');
//     fields = fields.split(',,').join(',');
//     if (percent <= 0) {
//       percent = 0;
//     } else {
//       percent -= PERCENTAGE_VALUE;
//     }
//   }
//   return { percent, fields };
// };

// export const computeOldPercentage = completion => {
//   const isPercentageCorrect = computePercentage(completion);

//   let fields = completion.fields || 'undefined,';
//   fields = fields.split('undefined,').join('');
//   fields = fields.split(',,').join(',');
//   // fields = fields.substring(0, fields.length - 1);
//   const newFields = fields;
//   fields = fields.split(',').join('","');
//   fields = `"${fields}"`;
//   const array = JSON.parse(`[${fields}]`);

//   const newArray = array.filter(a => a !== 'Testimonials' && a !== '');
//   const newCompletion = {
//     percent: newArray.length * PERCENTAGE_VALUE,
//     fields: newFields,
//   };
//   if (
//     isPercentageCorrect.percent !== completion.percent &&
//     isPercentageCorrect.percent <= 100 &&
//     isPercentageCorrect.fields === newFields
//   ) {
//     const newUpdatedCompletion = {
//       percent: isPercentageCorrect.percent,
//       fields: newFields,
//     };
//     return newUpdatedCompletion;
//   }
//   return newCompletion;
// };

// export const isMatched = (firstValue, secondValue) =>
//   firstValue === secondValue;

// export const dateFormat = 'MM/DD/YYYY';
// export const timeFormat = 'HH:mm:ss';
// export const dateTimeMeridiemFormat = 'MM/DD/YYYY HH:mm A';
// export const dateTime24HourFormat = 'MM/DD/YYYY HH:mm';
// export const dateTimeFormat = 'MM/DD/YYYY HH:mm:ss';
// export const dateTimeFormatLong = 'MMM DD, YYYY HH:mm:ss A';
// export const dateFormatToDB = 'MM/DD/YYYY';

// export const formatDate = date => {
//   const newDate =
//     date !== undefined ? date.toString().replace('T00:00:00', '') : new Date();
//   return moment(newDate).format(dateFormat);
// };

// // the date should be sa moment._d from on change DatePicker
// export const formatDateToDB = date => {
//   const dateBefore = moment(date).format(dateFormatToDB);
//   if (dateBefore === 'Invalid date') {
//     return moment(new Date()).format(dateFormatToDB);
//   }
//   return dateBefore;
// };

// export const formatDateTime = date => {
//   const format = 'MM/DD/YYYY hh:mm a';
//   return moment(date).format(format);
// };

// export const formatLongDateTime = date => {
//   const format = 'MMMM DD YYYY hh:mm a';
//   return moment(date).format(format);
// };

// export const formatDateReadable = date => {
//   const format = 'MMM. DD, YYYY';
//   return moment(date).format(format);
// };

// export const formatLongDateTime2 = date => {
//   const format = 'MMMM DD YYYY HH:mm:ss';
//   return moment(date).format(format);
// };

// export const formatDateConvert = date => {
//   const format = 'MM/DD/YYYY';
//   return date.format(format);
// };

// export const getDaysRemaining = date => {
//   // The number of milliseconds in one day
//   const ONE_DAY = 1000 * 60 * 60 * 24;

//   // Convert both dates to milliseconds
//   const date1 = new Date().getTime();
//   const date2 = date.getTime();

//   // Calculate the difference in milliseconds
//   const difference = Math.abs(date2 - date1);

//   // Convert back to days and return
//   const days = Math.round(difference / ONE_DAY);

//   if (days > 0) {
//     if (days === 1) {
//       return '1 day';
//     }
//     return `${days} days`;
//   }
//   return 'Closed';
// };

// export const convertToUTC = date => `${date.toString()}Z`;

// export const removeDuplicatesObjects = array => {
//   const removeNull = array.filter(thing => thing.text !== null);

//   const newArray = removeNull.filter(
//     (thing, index, self) =>
//       self.findIndex(t => t.text === thing.text && t.value === thing.value) ===
//       index,
//   );
//   return newArray;
// };

// const lol = (m, s, c) =>
//   s[m.floor(m.random() * s.length)] + (c && lol(m, s, c - 1));

// export const randColor = lol(Math, '0123456789ABCDEF', 4);

// export const randPastelColor = () => {
//   const hue = 360 * Math.random();
//   const saturation = 70 * Math.random();
//   const brightness = 10 * Math.random();
//   return `hsl(${hue}, ${25 + saturation}%,${70 + brightness}%)`;
// };

// export const getExtension = file => {
//   let extension = split(file, '.').pop();
//   const listOfExtensions = [
//     'doc',
//     'docx',
//     'gif',
//     'jpg',
//     'jpeg',
//     'pdf',
//     'png',
//     'xls',
//     'xlsx',
//     'ppt',
//     'pptx',
//     'svg',
//     'txt',
//   ];
//   const filesGt2007 = [
//     { ext: 'docx', extLt2007: 'doc' },
//     { ext: 'xlsx', extLt2007: 'xls' },
//     { ext: 'pptx', extLt2007: 'ppt' },
//     { ext: 'jpeg', extLt2007: 'jpg' },
//   ];

//   const index = findIndex(listOfExtensions, value => value === extension);

//   if (index > -1) {
//     const ext2007 = filesGt2007.find(value => value.ext === extension);

//     if (ext2007) {
//       extension = ext2007.ext;
//     }
//   } else {
//     extension = '';
//   }

//   return extension;
// };

// export function disabledPastDate(current) {
//   // Can not select days before today and today
//   return (
//     current &&
//     current.valueOf() <
//       moment
//         .utc()
//         .subtract(1, 'days')
//         .toDate()
//   );
// }

// export const isDocumentSupported = extensionType => {
//   if (extensionType === 'xlsx' || extensionType === 'docx') {
//     return false;
//   }
//   return true;
// };

// export const getOrdinal = number => {
//   if (isNumber(number)) {
//     const s = ['th', 'st', 'nd', 'rd'];
//     const v = number % 100;
//     return number + (s[(v - 20) % 10] || s[v] || s[0]);
//   }
//   return '';
// };

// export const getOrdinalSup = number => {
//   if (isNumber(number)) {
//     const s = ['th', 'st', 'nd', 'rd'];
//     const v = number % 100;
//     return s[(v - 20) % 10] || s[v] || s[0];
//   }
//   return '';
// };

// export const columnSorter = name => (a, b) => {
//   let value = 0;
//   if (a[name] < b[name]) {
//     value = -1;
//   } else if (a[name] > b[name]) {
//     value = 1;
//   } else {
//     value = 0;
//   }
//   return value;
// };

// export const columnSorter2 = (prop, name) => (a, b) => {
//   let value = 0;
//   if (a[prop][name] < b[prop][name]) {
//     value = -1;
//   } else if (a[prop][name] > b[prop][name]) {
//     value = 1;
//   } else {
//     value = 0;
//   }
//   return value;
// };

// export const acronymOf = name => {
//   if (typeof name === 'undefined' || !name) return undefined;

//   const vals = name.trim().split(' ');
//   let value = '';
//   if (vals.length > 1) {
//     for (let i = 0; i < 2; i++) {
//       value += vals[i].substring(0, 1);
//     }
//   } else {
//     value = name.substring(0, 2);
//   }

//   return value.toUpperCase();
// };

// export const currencyFormatter = value =>
//   `$ ${value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
// export const currencyParser = value => value.replace(/\$\s?|(,*)/g, '');

// export const numberLeadingZero = (num, size) => {
//   const s = `000000000${num}`;
//   return s.substr(s.length - size);
// };

// export const pageTitle = title => {
//   window.document.title = `Ubidy Employer - ${title}`;
// };
// export const getDistinctCollection = (name, arr) => {
//   const filteredArray = arr.filter(
//     filterItem =>
//       filterItem[name] !== '' &&
//       filterItem[name] !== null &&
//       filterItem[name] !== undefined,
//   );
//   const newArray = filteredArray.map(item => ({
//     text: item[name] || 'No Value',
//     value: item[name] || '',
//   }));
//   const collection = removeDuplicatesObjects(newArray);
//   return collection;
// };

// export const getDistinctCollection2 = (prop, name, arr) => {
//   const ARRAY = arr
//     .filter(filterItem => filterItem[prop][name] !== '')
//     .map(item => ({
//       text: item[prop][name] || 'No Value',
//       value: item[prop][name] || '',
//     }));
//   const collection = removeDuplicatesObjects(ARRAY);
//   return collection;
// };
// export const ifElipsis = (text, count) => {
//   const len = (text || '').length || 0;
//   if (len >= count) {
//     return true;
//   }
//   return false;
// };
// export const isElipsis = text => {
//   const len = (text || '').length;
//   if (len >= 20) {
//     return `${text.substring(0, 20)}${'...'}`;
//   }
//   return text;
// };

// export const isElipsisDynamic = (text, count) => {
//   const len = (text || '').length || 0;
//   if (len > count) {
//     return `${text.substring(0, count)}${'...'}`;
//   }
//   return text;
// };

// export const getDefaultLogo = () => defaultLogo;

// export const getDefaultLogoEditMode = (disabled, imageUrl) => {
//   let logo = imageUrl;
//   if (logo !== '') {
//     logo = imageUrl;
//   } else {
//     const LogoWithCamera = '/images/default-img.png'; // `${GetBaseUrl('employerFrontendUrl')}${defaultLogoWithCamera}`
//     const LogoWithNoCamera = '/images/no-photo.png'; // `${GetBaseUrl('employerFrontendUrl')}${defaultLogoNoCamera}`
//     logo = disabled ? LogoWithNoCamera : LogoWithCamera;
//   }
//   return logo;
// };

// export const getFileType = path => {
//   const filePath = path || 'file';
//   return filePath
//     .split('.')
//     .pop()
//     .toLowerCase();
// };

// export const localDateTime = (date, format) =>
//   moment
//     .utc(date)
//     .local()
//     .format(format);

// export const localMomentDate = date => moment.utc(date).local();

// const biddingDiff = date => {
//   const duration = moment.duration(moment(date).diff(moment().local(true)));
//   return duration.asHours();
// };

// export const calculateHoursDiffFromNow = endDate => {
//   const biddingDaysDiff = Math.round(biddingDiff(localDateTime(endDate)) / 24);
//   const biddingHoursDiff = Math.round(biddingDiff(localDateTime(endDate)) % 24);
//   if (biddingDaysDiff > 0) {
//     return `${biddingDaysDiff} days ${biddingHoursDiff} hour(s)`;
//   }
//   return `${
//     isNaN(biddingHoursDiff) || biddingHoursDiff < 0 ? 0 : biddingHoursDiff
//   } hour(s)`;
// };

// export const filterUnique = (arr, prop) => {
//   const result = [];
//   let filterVal;
//   let filters;
//   const filterByVal = n => n[prop] === filterVal;
//   for (let i = 0; i < arr.length; i++) {
//     filterVal = arr[i][prop];
//     filters = result.filter(filterByVal);
//     if (filters.length === 0) result.push(arr[i]);
//   }
//   return result;
// };

// export const checkHttpString = url => {
//   const n = url.includes('http');
//   if (n) {
//     return url;
//   }
//   return `http://${url}`;
// };

// export const checkLinkedInUrl = url => {
//   const n = url.includes('linkedin.com');
//   if (n) {
//     return url;
//   }
//   return `https://www.linkedin.com/in/${url}`;
// };

// export const checkTwitterUrl = url => {
//   const n = url.includes('twitter.com');
//   if (n) {
//     return url;
//   }
//   return `https://www.twitter.com/${url}`;
// };

// export const abbrNum = (number, decPlaces) => {
//   let newNumber = number;
//   const newDecPlaces = 10 ** decPlaces;

//   // Enumerate number abbreviations
//   const abbrev = ['k', 'm', 'b', 't'];

//   // Go through the array backwards, so we do the largest first
//   for (let i = abbrev.length - 1; i >= 0; i--) {
//     // Convert array index to "1000", "1000000", etc
//     const size = 10 ** ((i + 1) * 3);

//     const multiplied = number * newDecPlaces;
//     const devided = multiplied / size;

//     // If the number is bigger or equal do the abbreviation
//     if (size <= newNumber) {
//       // Here, we multiply by decPlaces, round, and then divide by decPlaces.
//       // This gives us nice rounding to a particular decimal place.
//       newNumber = Math.round(devided) / newDecPlaces;

//       // Handle special case where we round up to the next abbreviation
//       if (newNumber === 1000 && i < abbrev.length - 1) {
//         newNumber = 1;
//         i++;
//       }
//       newNumber += abbrev[i];
//       break;
//     }
//   }
//   return newNumber;
//   // abbrNum(999995, 4); //       => 999.995k
//   // abbrNum(999995, 2); //       => 1m
//   // abbrNum(999900000,0); //     => 1b
//   // abbrNum(999999900000000,0);//=> 1000t
//   // abbrNum(12 , 1); //          => 12
//   // abbrNum(0 , 2); //           => 0
//   // abbrNum(1234 , 0); //        => 1k
//   // abbrNum(34567 , 2); //       => 34.57k
//   // abbrNum(918395 , 1); //      => 918.4k
//   // abbrNum(2134124 , 2); //     => 2.13m
//   // abbrNum(47475782130 , 2); // => 47.48b
// };

// export const getDocumentViewerPath = currentPath =>
//   `https://docs.google.com/viewerng/viewer?chrome=true&embedded=true&&url=${currentPath}`;

// export const maskEmail = email => {
//   if (email === undefined || email === '') {
//     return '';
//   }
//   const extension = email.slice(email.indexOf('@'), email.length);
//   const finalEmail = `${email.slice(0, 3)}${'*'.repeat(
//     email.slice(3, email.indexOf('@')).length - 1,
//   )}${email.slice(email.indexOf('@') - 1, email.indexOf('@') + 1)}${'*'.repeat(
//     email.indexOf('.com') - email.indexOf('@'),
//   )}${extension.slice(extension.indexOf('.'))}`;
//   return finalEmail;
// };

// export const isQaTesterEmail = email => {
//   if (email === undefined || email === '') {
//     return false;
//   }
//   const isQaTester = email.includes('qa.tester');
//   const isUbidyCom = email.includes('ubidy.com');
//   return isQaTester && isUbidyCom;
// };

// export const removeTenantIdText = (name, tenantId = '') => {
//   if (name === undefined) {
//     return '';
//   }
//   const TENANT_ID = getTenantId() || tenantId;
//   if (name.includes(TENANT_ID)) {
//     const roleName = name.replace(`${TENANT_ID}=`, '');
//     return roleName;
//   }

//   const roleName = name.replace('Ubidy=', '');
//   return roleName;
// };

// export const getRoleName = (roleId, roleList) => {
//   if (roleId === undefined || roleList === undefined) {
//     return '';
//   }
//   const roles = roleList.find(item => item._id === roleId);
//   if (roles === undefined) {
//     return 'Standard User Account';
//   }
//   const TENANT_ID = getTenantId();
//   if (roles.name.includes(TENANT_ID)) {
//     const roleName = roles.name.replace(`${TENANT_ID}=`, '');
//     return roleName;
//   }
//   const roleName = roles.name.replace('Ubidy=', '');
//   return roleName;
// };

// export const removeTenantIdRoleName = roleName => {
//   if (roleName === undefined) {
//     return '';
//   }
//   const TENANT_ID = getTenantId();
//   if (roleName.includes(TENANT_ID)) {
//     const removeId = roleName.replace(`${TENANT_ID}=`, '');
//     return removeId;
//   }
//   const cleanRoleName = roleName.replace('Ubidy=', '');
//   return cleanRoleName;
// };

// export const isAdminRole = (roleId, tenantId = '', roleList) => {
//   if (roleId === undefined || roleList === undefined) {
//     return '';
//   }
//   const roles = roleList.find(item => item._id === roleId);
//   if (roles === undefined) {
//     return 'Standard User Account';
//   }
//   const TENANT_ID = getTenantId() || tenantId;
//   if (roles.name.includes(TENANT_ID)) {
//     const roleName = roles.name.replace(`${TENANT_ID}=`, '');
//     return roleName;
//   }
//   const roleName = roles.name.replace('Ubidy=', '');
//   const isAdmin = roleName.indexOf('Admin Account') !== -1;
//   return isAdmin;
// };

// export const lowercaseFirstLetter = string =>
//   string.charAt(0).toLowerCase() + string.slice(1);

// export const arrayToObject = arr => {
//   const obj = arr.reduce((acc, cur, i) => {
//     acc[i] = cur;
//     return acc[curr.featureKey];
//   }, {});
//   return obj;
// };

// export const reflectCheckToRelatedModule = (
//   currentPermission = {},
//   newPermission = {},
// ) => {
//   const isNewView = newPermission.featureName.includes('View');
//   const isCurrentView = currentPermission.featureName.includes('View');
//   if (isNewView && !newPermission.status) {
//     return { ...currentPermission, status: false };
//   }
//   if (!isNewView && newPermission.status && isCurrentView) {
//     return { ...currentPermission, status: true };
//   }
//   return currentPermission;
// };

// export const reflectCheckToAuctionStaging = (permissions, payload) => {
//   const { item, checked } = payload;
//   let hasViewAuction = false;

//   const feature = 'View Auctions / Staging';
//   const module = 'Auctions';
//   const viewStagingModules = [
//     'Auctions',
//     'Application Stage',
//     'Clarification',
//     'Bidding Stage',
//     'Fulfillment Stage',
//   ];
//   const viewStagingAccess = [
//     'View Application',
//     'View Details',
//     'View Auctions / Staging',
//   ];
//   const hasViewAuctionModule = permissions.filter(p =>
//     viewStagingModules.includes(p.moduleName),
//   );
//   if (hasViewAuctionModule.length > 0) {
//     hasViewAuctionModule.forEach(am => {
//       const viewAuctionAccess = am.access.find(
//         aa => viewStagingAccess.includes(aa.featureName) && aa.status,
//       );
//       if (viewAuctionAccess !== undefined) {
//         hasViewAuction = true;
//       }
//     });
//   }

//   const newPermissions = permissions.map(p => {
//     if (p.moduleName !== module) {
//       if (!checked) {
//         if (item.featureName === feature) {
//           if (!viewStagingModules.includes(p.moduleName)) {
//             return p;
//           }
//           const newAccess = p.access.map(a => ({ ...a, status: checked }));
//           return { ...p, access: [].concat(newAccess) };
//         }
//         const newAccess = p.access.map(a => {
//           if (a.featureName !== feature) {
//             return a;
//           }
//           return { ...a, status: checked };
//         });
//         return { ...p, access: [].concat(newAccess) };
//       }
//       return p;
//     }
//     if (item.featureName === feature) {
//       const newAccess = p.access.map(a => {
//         if (a.featureName !== feature) {
//           return a;
//         }
//         return { ...a, status: checked };
//       });
//       return { ...p, access: [].concat(newAccess) };
//     }

//     if (hasViewAuction) {
//       const newAccess = p.access.map(a => {
//         if (a.featureName !== feature) {
//           return a;
//         }
//         return { ...a, status: true };
//       });
//       return { ...p, access: [].concat(newAccess) };
//     }
//     const newAccess = p.access.map(a => {
//       if (a.featureName !== feature) {
//         return a;
//       }
//       return { ...a, status: false };
//     });
//     return { ...p, access: [].concat(newAccess) };
//   });
//   return newPermissions;
// };
// export const reflectCheckToMarketplace = (permissions, payload) => {
//   const { item, checked } = payload;
//   let hasViewAccess = false;

//   const feature = 'Search / View Opportunities';
//   const module = 'Marketplace';
//   const viewModules = ['Marketplace', 'Application Stage'];
//   const viewAccess = ['View Application', 'Search / View Opportunities'];
//   const hasViewModule = permissions.filter(p =>
//     viewModules.includes(p.moduleName),
//   );
//   if (hasViewModule.length > 0) {
//     hasViewModule.forEach(am => {
//       const viewAuctionAccess = am.access.find(
//         aa => viewAccess.includes(aa.featureName) && aa.status,
//       );
//       if (viewAuctionAccess !== undefined) {
//         hasViewAccess = true;
//       }
//     });
//   }

//   const newPermissions = permissions.map(p => {
//     if (p.moduleName !== module) {
//       if (!checked) {
//         if (item.featureName === feature) {
//           if (!viewModules.includes(p.moduleName)) {
//             return p;
//           }
//           const newAccess = p.access.map(a => ({ ...a, status: checked }));
//           return { ...p, access: [].concat(newAccess) };
//         }
//         const newAccess = p.access.map(a => {
//           if (a.featureName !== feature) {
//             return a;
//           }
//           return { ...a, status: checked };
//         });
//         return { ...p, access: [].concat(newAccess) };
//       }
//       return p;
//     }
//     if (item.featureName === feature) {
//       const newAccess = p.access.map(a => {
//         if (a.featureName !== feature) {
//           return a;
//         }
//         return { ...a, status: checked };
//       });
//       return { ...p, access: [].concat(newAccess) };
//     }

//     if (hasViewAccess) {
//       const newAccess = p.access.map(a => {
//         if (a.featureName !== feature) {
//           return a;
//         }
//         return { ...a, status: true };
//       });
//       return { ...p, access: [].concat(newAccess) };
//     }
//     const newAccess = p.access.map(a => {
//       if (a.featureName !== feature) {
//         return a;
//       }
//       return { ...a, status: false };
//     });
//     return { ...p, access: [].concat(newAccess) };
//   });
//   return newPermissions;
// };

// export const isPercentageNotCorrect = profileCompletion => {
//   const isCorrect = computePercentage(profileCompletion);
//   if (
//     isCorrect.percent > profileCompletion.percent &&
//     isCorrect.percent <= 100
//   ) {
//     return true;
//   }
//   return false;
// };

// export const isOldProfilePercentage = profileCompletion => {
//   const nums = [1, 2, 3, 4, 5, 6];
//   const num = profileCompletion.percent / (100 / 6);
//   if (!nums.includes(num)) {
//     return true;
//   }
//   if (isPercentageNotCorrect(profileCompletion)) {
//     return true;
//   }
//   return false;
// };
"use strict";