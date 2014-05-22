var should = require('should');
var linify = require('../lib/linify');

describe('Line parser', function () {
  it('should parse blockquote', function () {
    var expectation = JSON.stringify(
      [
        {
          type: 'blockquote',
          content: {
              type: 'text',
              content: 'blockquote'
          }
        }
      ]
    );

    var reality = JSON.stringify(linify(
      [
        '>blockquote'
      ]
    ));

    reality.should.equal(expectation);
  });



  it('should parse nested blockquotes', function () {
    var expectation = JSON.stringify(
      [
        {
          type: 'blockquote',
          content: {
            type: 'blockquote',
            content: {
              type: 'text',
              content: 'some text'
            }
          }
        }
      ]
    );

    var reality = JSON.stringify(linify(
      [
        '>> some text'
      ]
    ));

    reality.should.equal(expectation);
  });



  it('should parse codeblock indented by spaces', function () {
    var expectation = JSON.stringify(
      [
        {
          type: 'code',
          content: 'some code'
        }
      ]
    );

    var reality = JSON.stringify(linify(
      [
        '    some code'
      ]
    ));

    reality.should.equal(expectation);
  });



  it('should parse codeblock wrapped in ```', function () {
    var expectation = JSON.stringify(
      [
        {
          type: 'code',
          content: 'some code'
        }
      ]
    );

    var reality = JSON.stringify(linify(
      [
        '```',
        'some code',
        '```'
      ]
    ));

    reality.should.equal(expectation);
  });



  it('should parse text as text', function () {
    var expectation = JSON.stringify(
      [
        {
          type: 'text',
          content: 'some text'
        }
      ]
    );

    var reality = JSON.stringify(linify(
      [
        'some text'
      ]
    ));

    reality.should.equal(expectation);
  });
});