var _ = require('underscore');

var globalLinkRegexp = /^\[([^\]]+)\]:\s*(https?:\/\/[^\s]+)$/i;

module.exports = refs;

function refs (lines) {
  var links = {};

  lines = _.compact(_.map(lines, function (line) {
    if (globalLinkRegexp.test(line.trim())) {
      var parts = line.trim().match(globalLinkRegexp);
      links[parts[1]] = parts[2];
    } else {
      return line;
    }
  }));

  return {
    links: links,
    lines: lines
  };
}