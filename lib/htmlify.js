var _ = require('underscore');
var previews = require('./previews');

module.exports = htmlify;

function htmlify (lines) {
  var lastType;
  var text = '';

  _.each(lines, function (line) {
    if (lastType != 'code' && line.type == 'code') {
      text += '<pre><code>';
    } else if (lastType == 'code' && line.type != 'code') {
      text += '</code></pre>';
    } else if (lastType != 'blockquote' && line.type == 'blockquote') {
      text += '<blockquote>';
    } else if (lastType == 'blockquote' && line.type != 'blockquote') {
      text += '</blockquote>';
    }

    switch (line.type) {
      case 'code':
        if (lastType == 'code') {
          text += '\n';
        }

        text += line.content;
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
    text += '</code></pre>';
  } else if (lastType == 'blockquote') {
    text += '</blockquote>';
  }

  if (previews.length) {
    text += '<div class="bnwity-previews">';

    _.each(previews, function (preview) {
      var img = (preview.preview) ? preview.preview : 'https://uglyhx.appspot.com/thumb?img='+encodeURIComponent(preview.url);
      text += '<a class="bnwity-'+preview.type+'" href="'+preview.url+'"><img src="'+img+'"></a>';
    });

    text += '</div>';

    previews.length = 0;
  }

  return text;
}