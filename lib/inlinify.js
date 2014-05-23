module.exports = inlinify;

function inlinify (line) {
  line = line.replace(/`(.*?)`/g, '<code>$1</code>');
  line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  line = line.replace(/\*(.*?[^\s])\*/g, '<em>$1</em>');

  line = line.replace(/(?:|\[([^\]]*?)\])(?:\((https?:\/\/[^\s]+[A-z0-9\-\_\/])\)|(https?:\/\/[^\s]+[A-z0-9\-\_\/]))/g, function (match, text, url, url2) {
      text = (url) ? text : url2;
      url = (url) ? url : url2;

      return '<a href="'+url+'">'+text+'</a>';
  });

  return line;
}