import { assert } from 'chai';

describe('Get Sorting Candidate Configuration', function() {
  function itShouldReturnStatus(item, statusId, sortId) {
    if (statusId !== undefined && sortId !== undefined) {
      it(`should return statusId & sortId of ${item.status}`, function() {
        assert.equal(item.statusId, statusId);
        assert.equal(item.sortId, sortId);
      });
    }
  }

  it('should passed', () => {});
});
