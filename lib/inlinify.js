var _ = require('underscore');

module.exports = inlinify;

function inlinify (line, links) {
  line = line.replace(/`(.*?)`/g, '<code>$1</code>');
  line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  line = line.replace(/\*(.*?[^\s])\*/g, '<em>$1</em>');

  line = line.replace(/\[([^\]]+)\]\[([^\]]+)\]/g, function (match, text, ref) {
    ref = (_.has(links, ref)) ? links[ref] : ref;
    return '['+text+']('+ref+')';
  });

  line = line.replace(/(?:|\[([^\]]*?)\])(?:\((https?:\/\/[^\s]+[^\.,\]\)])\)|(https?:\/\/[^\s]+[^\.,\]\)]))/g, function (match, text, url, url2) {
      text = (url) ? text : url2;
      url = (url) ? url : url2;

      return '<a href="'+url+'">'+text+'</a>';
  });

  return line;
}