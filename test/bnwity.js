var should = require('should');
var bnwity = require('../index');

describe('BNW parser', function () {
  it('should replace ** to bold', function () {
    bnwity('ты не **мужик** штоле?').should.equal('<p>ты не <strong>мужик</strong> штоле?</p>');
  });

  it('should replace * to italic', function () {
    bnwity('потрогал тебя прям *тама*').should.equal('<p>потрогал тебя прям <em>тама</em></p>');
  });

  it('should replace ** and * to bold and italic', function () {
    bnwity('*вот **это** вот*').should.equal('<p><em>вот <strong>это</strong> вот</em></p>');
    bnwity('**вот *это* вот**').should.equal('<p><strong>вот <em>это</em> вот</strong></p>');
  });

  it('should replace > to blockquote', function () {
    bnwity('>tfw нет тян').should.equal('<blockquote><p>tfw нет тян</p></blockquote>');
  });

  it('should replace >> to nested blockquote', function () {
    bnwity('>>имплицирую').should.equal('<blockquote><blockquote><p>имплицирую</p></blockquote></blockquote>');
  });

  it('should replace 4 spaces to codeblock', function () {
    bnwity('    змеиться();').should.equal('<pre><code>змеиться();</code></pre>');
  });

  it('should replace wrapped in ``` text to code', function () {
    bnwity('```\nжопа = сука(хер);\n```').should.equal('<pre><code>жопа = сука(хер);</code></pre>');
  });

  it('should replace wrapped in ` text to inline code block', function () {
    bnwity('жопа `сука` хер').should.equal('<p>жопа <code>сука</code> хер</p>');
  });

  it('should replace links with references', function () {
    bnwity('рейт [ми][*], бнвач\n[*]: https://therailway.ru').should.equal('<p>рейт <a href="https://therailway.ru">ми</a>, бнвач</p>');
  });

  it('should make previews', function () {
    bnwity('пикча раз: https://server.com/image.jpg\nгифка два: https://server.com/image.gif\nвидос три: http://www.youtube.com/watch?v=JfoGXeksR4M').should.equal('<p>пикча раз: <a href="https://server.com/image.jpg">https://server.com/image.jpg</a></p><p>гифка два: <a href="https://server.com/image.gif">https://server.com/image.gif</a></p><p>видос три: <a href="http://www.youtube.com/watch?v=JfoGXeksR4M">http://www.youtube.com/watch?v=JfoGXeksR4M</a></p><div class="bnwity-previews"><a class="bnwity-image" href="https://server.com/image.jpg"><img src="https://uglyhx.appspot.com/thumb?img=https%3A%2F%2Fserver.com%2Fimage.jpg"></a><a class="bnwity-gif" href="https://server.com/image.gif"><img src="https://uglyhx.appspot.com/thumb?img=https%3A%2F%2Fserver.com%2Fimage.gif"></a><a class="bnwity-youtube" href="http://www.youtube.com/watch?v=JfoGXeksR4M"><img src="https://img.youtube.com/vi/JfoGXeksR4M/0.jpg"></a></div>');
  });
});