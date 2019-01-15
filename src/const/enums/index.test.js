// import {
//   agreementDocumentTypes,
//   filterRoleCategory,
// } from '.';

// describe('Get Agreement Document types', () => {
//   it('should return Agreement Document - PreQualification type', () =>
//     expect(agreementDocumentTypes.preQualification).toBe(1));

//   it('should return Agreement Document - NonDisclosure type', () =>
//     expect(agreementDocumentTypes.nonDisclosure).toBe(2));

//   it('should return Agreement Document - TermsAndConditions type', () =>
//     expect(agreementDocumentTypes.termsAndConditions).toBe(3));
// });

// describe('Get Filter Role Categories', () => {
//   it('should return role catogry', () => {
//     expect(filterRoleCategory[0].subCategoryName).toBe('Role Category');
//   });
//   const isShouldReturnSubCategoryDetails = (item, key) => {
//     if (key !== undefined) {
//       it(`should return key of ${item.key}`, () => {
//         expect(item.key).toBe(key);
//       });
//     }
//   };

//   const array = filterRoleCategory[0].subCategoryDetails;

//   array.forEach(item => {
//     switch (item.details) {
//       case 'All':
//         isShouldReturnSubCategoryDetails(item, '0');
//         break;

//       case 'Executive':
//         isShouldReturnSubCategoryDetails(item, '1');
//         break;

//       case 'Professional':
//         isShouldReturnSubCategoryDetails(item, '2');
//         break;

//       case 'Skilled/Semi-Skilled':
//         isShouldReturnSubCategoryDetails(item, '3');
//         break;

//       default:
//         break;
//     }
//   });
// });
