var _ = require('underscore');
var inlinify = require('./inlinify');
var refs = require('./refs');

module.exports = linify;

function linify (lines) {
  var inCodeBlock = false;

  var refsed = refs(lines);
  lines = refsed.lines;

  return _.compact(_.map(lines, function (line) {
    if (!inCodeBlock && /^```([A-z0-9]*)$/.test(line.trim())) {
      inCodeBlock = true;
      return;
    } else if (inCodeBlock && /^```$/.test(line.trim())) {
      inCodeBlock = false;
      return;
    }

    if (inCodeBlock || /^\s{4}/.test(line)) {
      return {
        type: 'code',
        content: (inCodeBlock) ? line : line.replace(/^\s{4}/, '')
      };
    } else if (/^>/.test(line.trim())) {
      return {
        type: 'blockquote',
        content: linify([line.trim().replace(/^>/, '')])[0]
      };
    } else {
      return {
        type: 'text',
        content: inlinify(line.trim(), refsed.links)
      };
    }
  }));
}