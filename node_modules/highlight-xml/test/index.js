
var assert = require('assert');
var Highlight = require('highlight');
var xml = require('highlight-xml');

var h;

describe('highlight-xml', function(){
  beforeEach(function(){
    h = Highlight()
      .prefix('')
      .use(xml);
  });

  it('should expose a plugin function', function(){
    assert.equal('function', typeof xml);
  });

  it('should match comments', function(){
    test(
      '<!-- a multi-\nline comment -->',
      '<span class="comment">&lt;!-- a multi-\nline comment --&gt;</span>'
    );
  });

  it('should match entities', function(){
    test(
      '&amp;',
      '<span class="entity">&amp;amp;</span>'
    );
  });

  it('should match doctypes', function(){
    test(
      '<!DOCTYPE catalog SYSTEM "catalog.dtd">',
      '<span class="doctype">&lt;!DOCTYPE catalog SYSTEM &quot;catalog.dtd&quot;&gt;</span>'
    );
  });

  it('should match entities', function(){
    test(
      '<![CDATA[<sender>John Smith</sender>]]>',
      '<span class="cdata">&lt;![CDATA[&lt;sender&gt;John Smith&lt;/sender&gt;]]&gt;</span>'
    );
  });

  it('should match prologs', function(){
    test(
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<span class="prolog">&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;</span>'
    );
  });

  it('should match tags', function(){
    test('<script src="index.js"></script>', [
      '<span class="tag">',
      '<span class="punctuation">&lt;</span>',
      '<span class="name">script</span>',
      ' ',
      '<span class="attribute">src</span>',
      '<span class="punctuation">=</span>',
      '<span class="string">&quot;index.js&quot;</span>',
      '<span class="punctuation">&gt;</span>',
      '</span>',
      '<span class="tag">',
      '<span class="punctuation">&lt;/</span>',
      '<span class="name">script</span>',
      '<span class="punctuation">&gt;</span>',
      '</span>'
    ].join(''));
  });

  it('should match a complex example', function(){
    var html = [
      '<!doctype html>',
      '<html>',
      '<head>',
      '<meta name="description" content="Description"/>',
      '<title>Title</title>',
      '</head>',
      '</html>'
    ].join('');

    test(html, [
      '<span class="doctype">&lt;!doctype html&gt;</span>',
      '<span class="tag">',
      '<span class="punctuation">&lt;</span>',
      '<span class="name">html</span>',
      '<span class="punctuation">&gt;</span>',
      '</span>',
      '<span class="tag">',
      '<span class="punctuation">&lt;</span>',
      '<span class="name">head</span>',
      '<span class="punctuation">&gt;</span>',
      '</span>',
      '<span class="tag">',
      '<span class="punctuation">&lt;</span>',
      '<span class="name">meta</span>',
      ' ',
      '<span class="attribute">name</span>',
      '<span class="punctuation">=</span>',
      '<span class="string">&quot;description&quot;</span>',
      ' ',
      '<span class="attribute">content</span>',
      '<span class="punctuation">=</span>',
      '<span class="string">&quot;Description&quot;</span>',
      '<span class="punctuation">/&gt;</span>',
      '</span>',
      '<span class="tag">',
      '<span class="punctuation">&lt;</span>',
      '<span class="name">title</span>',
      '<span class="punctuation">&gt;</span>',
      '</span>',
      'Title',
      '<span class="tag">',
      '<span class="punctuation">&lt;/</span>',
      '<span class="name">title</span>',
      '<span class="punctuation">&gt;</span>',
      '</span>',
      '<span class="tag">',
      '<span class="punctuation">&lt;/</span>',
      '<span class="name">head</span>',
      '<span class="punctuation">&gt;</span>',
      '</span>',
      '<span class="tag">',
      '<span class="punctuation">&lt;/</span>',
      '<span class="name">html</span>',
      '<span class="punctuation">&gt;</span>',
      '</span>'
    ].join(''));
  });
});

/**
 * Test convenience.
 *
 * @param {String} input
 * @param {String} output
 */

function test(input, output){
  var code = h.string(input, 'xml');
  assert.equal(code, output);
}