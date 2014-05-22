module.exports = inlinify;

function inlinify (line) {
  line = line.replace(/`(.*?)`/g, '<code>$1</code>');
  line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  line = line.replace(/\*(.*?)\*/g, '<em>$1</em>');

  return line;
}