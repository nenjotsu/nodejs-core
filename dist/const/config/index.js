'use strict';

var paginationConfig = {
  defaultCurrent: 1,
  current: 0,
  defaultPageSize: 10,
  pageSize: 0,
  total: 0,
  hideOnSinglePage: true,
  showTotal: function showTotal(total) {
    return 'Total ' + total + ' records';
  }
};

var sortCandidateConfig = [{
  status: 'pending',
  statusId: 1,
  sortId: 1
}, {
  status: 'shortlisted',
  statusId: 4,
  sortId: 2
}, {
  status: 'hired',
  statusId: 2,
  sortId: 3
}, {
  status: 'rejected',
  statusId: 3,
  sortId: 4
}];

module.exports = {
  paginationConfig: paginationConfig,
  sortCandidateConfig: sortCandidateConfig
};