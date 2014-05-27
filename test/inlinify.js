var should = require('should');
var inlinify = require('../lib/inlinify');
var previews = require('../lib/previews');

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

  it('should make previews', function () {

    //image

    inlinify('https://server.com/image.jpg');

    var expectation = JSON.stringify([
      {
        type: 'image',
        url: 'https://server.com/image.jpg'
      }
    ]);

    JSON.stringify(previews).should.equal(expectation);

    //gif

    previews.length = 0;

    inlinify('https://server.com/image.gif');

    expectation = JSON.stringify([
      {
        type: 'gif',
        url: 'https://server.com/image.gif'
      }
    ]);

    JSON.stringify(previews).should.equal(expectation);

    //youtube

    previews.length = 0;

    inlinify('http://www.youtube.com/watch?v=JfoGXeksR4M');

    expectation = JSON.stringify([
      {
        type: 'youtube',
        url: 'http://www.youtube.com/watch?v=JfoGXeksR4M',
        preview: 'https://img.youtube.com/vi/JfoGXeksR4M/0.jpg'
      }
    ]);

    JSON.stringify(previews).should.equal(expectation);

    previews.length = 0;
  });
});