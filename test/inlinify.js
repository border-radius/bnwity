var should = require('should');
var inlinify = require('../lib/inlinify');

describe('Inline parser', function () {
  it('should parse bold', function () {
    inlinify('**bold**').should.equal('<strong>bold</strong>');
  });

  it('should parse italic', function () {
    inlinify('*italic*').should.equal('<em>italic</em>');
  });
});