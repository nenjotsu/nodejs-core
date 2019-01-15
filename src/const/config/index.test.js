// import { sortCandidateConfig } from '.';

// describe('Get Sorting Candidate Configuration', () => {
//   const itShouldReturnStatus = (item, statusId, sortId) => {
//     if (statusId !== undefined && sortId !== undefined) {
//       it(`should return statusId & sortId of ${item.status}`, () => {
//         expect(item.statusId).toBe(statusId);
//         expect(item.sortId).toBe(sortId);
//       });
//     }
//   };

//   sortCandidateConfig.forEach(item => {
//     switch (item.status) {
//       case 'pending':
//         itShouldReturnStatus(item, 1, 1);
//         break;

//       case 'shortlisted':
//         itShouldReturnStatus(item, 4, 2);
//         break;

//       case 'hired':
//         itShouldReturnStatus(item, 2, 3);
//         break;

//       case 'rejected':
//         itShouldReturnStatus(item, 3, 4);
//         break;

//       default:
//         break;
//     }
//   });
// });
