var should = require('should');
var refs = require('../lib/refs');

describe('Global parser', function () {
  it('should parse referencies', function () {
    var expectation = JSON.stringify({
      links: {
        'bnw': 'https://bnw.im'
      },
      lines: []
    });

    var reality = JSON.stringify(refs([
      '[bnw]: https://bnw.im'
    ]));

    reality.should.equal(expectation);
  });
});