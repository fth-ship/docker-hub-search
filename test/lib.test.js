var dhs = require('../lib');
var should = require('should');

describe('Dhs', function() {
  it('should be return an empty list if has no keyword', function (done) {
    function searchHandler(err, result) {
      err.should.be.eql('Keyword should be an value.'); 
      result.should.be.eql([]);
      done();
    }
    dhs.search('', searchHandler); 
  });

  it('should be return an result', function (done) {
    function searchHandler(err, result) {
      should.not.exist(err); 
      result.should.have.lengthOf(10);
      done();
    }
    dhs.search('ubu', searchHandler); 
  });
});
