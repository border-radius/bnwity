/* bnwify */
/* License: Public Domain */
/* Author: https://github.com/border-radius */

var linify = require('./lib/linify');
var htmlify = require('./lib/htmlify');

module.exports = function (text) {
  var lines = linify(text.replace('\r').split('\n'));
  return htmlify(lines);
};