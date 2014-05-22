var _ = require('underscore');

module.exports = htmlify;

function htmlify (lines) {
  var lastType;
  var text = '';

  _.each(lines, function (line) {
    if (lastType != 'code' && line.type == 'code') {
      text += '<pre>';
    } else if (lastType == 'code' && line.type != 'code') {
      text += '</pre>';
    } else if (lastType != 'blockquote' && line.type == 'blockquote') {
      text += '<blockquote>';
    } else if (lastType == 'blockquote' && line.type != 'blockquote') {
      text += '</blockquote>';
    }

    switch (line.type) {
      case 'code':
        text += '<code>' + line.content + '</code>\n';
        break;

      case 'blockquote':
        text += htmlify([line.content]);
        break;

      case 'text':
        text += '<p>' + line.content + '</p>';
        break;
    }

    lastType = line.type;
  });

  if (lastType == 'code') {
    text += '</pre>';
  } else if (lastType == 'blockquote') {
    text += '</blockquote>';
  }

  return text;
}