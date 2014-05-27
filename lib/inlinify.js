var _ = require('underscore');
var previews = require('./previews');

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

      if (/\.(jpg|jpe|jpeg|png)$/i.test(url)) {
        previews.push({
          type: 'image',
          url: url
        });
      } else if (/\.gif$/i.test(url)) {
        previews.push({
          type: 'gif',
          url: url
        });
      } else if (/https?:\/\/(|www\.)youtu(\.be|be\.com)/i.test(url)) {
        var parts = url.match(/(?:youtu\.be\/|watch\?v=)([-\w]{11})/);
        if (parts) {
          previews.push({
            type: 'youtube',
            url: url,
            preview: 'https://img.youtube.com/vi/'+parts[1]+'/0.jpg'
          });
        }
      }

      return '<a href="'+url+'">'+text+'</a>';
  });

  return line;
}