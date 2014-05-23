module.exports = inlinify;

function inlinify (line) {
  line = line.replace(/`(.*?)`/g, '<code>$1</code>');
  line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  line = line.replace(/\*(.*?[^\s])\*/g, '<em>$1</em>');

  line = line.replace(/https?:\/\/[^\s]+/g, function (url) {
    return '<a href="'+url+'">'+url+'</a>';
  });

  return line;
}