var dhs = require('../lib');
var should = require('should');

describe('Dhs', function() {
  it('should be clean title', function () {
    dhs.cleanTitle('\n                    kaiquewdev/docker-nodejs-co...\n                    \n                    \n                        \n                            4 months, 3 weeks ago\n                        ').should.be.eql('kaiquewdev/docker-nodejs-co...');
  });

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
      result.should.have.lengthOf(1);
      result[0].title.should.be.eql('kaiquewdev/docker-nodejs-co...');
      done();
    }
    dhs.search('docker-nodejs-compiled', searchHandler); 
  });
});
