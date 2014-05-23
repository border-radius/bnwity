var should = require('should');
var htmlify = require('../lib/htmlify');

describe('HTML generator', function () {
  it('should generate paragraphs', function () {
    var expectation = '<p>some text</p>';

    var reality = htmlify([
      {
        type: 'text',
        content: 'some text'
      }
    ]);

    reality.should.equal(expectation);
  });



  it('should generate blockquotes', function () {
    var expectation = '<blockquote><p>some text</p></blockquote>';

    var reality = htmlify([
      {
        type: 'blockquote',
        content: {
          type: 'text',
          content: 'some text'
        }
      }
    ]);

    reality.should.equal(expectation);
  });



  it('should generate codeblocks', function () {
    var expectation = '<pre><code>some code</code></pre>';

    var reality = htmlify([
      {
        type: 'code',
        content: 'some code'
      }
    ]);

    reality.should.equal(expectation);
  });
});