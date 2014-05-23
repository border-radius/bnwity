var should = require('should');
var inlinify = require('../lib/inlinify');

describe('Inline parser', function () {
  it('should parse bold', function () {
    inlinify('**bold**').should.equal('<strong>bold</strong>');
  });

  it('should parse italic', function () {
    inlinify('*italic*').should.equal('<em>italic</em>');
  });

  it('should parse inline code block', function () {
    inlinify('`code`').should.equal('<code>code</code>');
  });

  it('should not parse tags as italic', function () {
    inlinify('*жж *прекрасное').should.equal('*жж *прекрасное');
  });

  it('should parse links', function () {
    inlinify('https://bnw.im').should.equal('<a href="https://bnw.im">https://bnw.im</a>');
    inlinify('[bnw](https://bnw.im)').should.equal('<a href="https://bnw.im">bnw</a>');
  });
});