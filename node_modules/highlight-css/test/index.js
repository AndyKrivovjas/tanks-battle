
var assert = require('assert');
var Highlight = require('highlight');
var css = require('highlight-css');

var h;

describe('highlight-css', function(){
  beforeEach(function(){
    h = Highlight()
      .prefix('')
      .use(css);
  });

  it('should expose a plugin function', function(){
    assert.equal('function', typeof css);
  });

  it('should match comments', function(){
    test(
      'a /* comment \n across lines */',
      'a <span class="comment">/* comment \n across lines */</span>'
    );
  });

  it('should match at-rules', function(){
    test(
      '@at-rule',
      '<span class="at-rule">@at-rule</span>'
    );
  });

  it('should match functions', function(){
    test(
      'do()',
      '<span class="function">do' +
      '<span class="punctuation">(</span>' +
      '</span>' +
      '<span class="punctuation">)</span>'
    );
  });

  it('should match keywords', function(){
    test('!important', '<span class="keyword">!important</span>');
    test('inherit', '<span class="keyword">inherit</span>');
  });

  it('should match numbers', function(){
    test('42', '<span class="number">42</span>');
    test('#00f', '<span class="number">#00f</span>');
    test('8.3', '<span class="number">8.3</span>');
    test('-8', '<span class="operator">-</span><span class="number">8</span>');
  });

  it('should match operators', function(){
    test('+', '<span class="operator">+</span>');
    test('*', '<span class="operator">*</span>');
  });

  it('should match properties', function(){

  });

  it('should match strings', function(){
    test('"string"', '<span class="string">&quot;string&quot;</span>');
    test('\'string\'', '<span class="string">&#39;string&#39;</span>');
  });
  it('should match punctuation', function(){
    test(',', '<span class="punctuation">,</span>');
    test('{', '<span class="punctuation">{</span>');
  });

  it('should match a complex example', function(){
    var css = 'div#id.class::pseudo {\n'
      + 'float: left;\n'
      + 'width: 50%;\n'
      + 'font-size: 28em !important;\n'
      + '}\n'
      + '\n'
      + 'body {\n'
      + 'border: none;\n'
      + '}';

    test(css, ''
      + '<span class="selector">div'
      + '<span class="id">#id</span>'
      + '<span class="class">.class</span>'
      + '<span class="pseudo-element">::pseudo</span>'
      + ' '
      + '<span class="punctuation">{</span>'
      + '</span>'
      + '\n'
      + '<span class="property">float</span>'
      + '<span class="punctuation">:</span>'
      + ' left'
      + '<span class="punctuation">;</span>'
      + '\n'
      + '<span class="property">width</span>'
      + '<span class="punctuation">:</span>'
      + ' '
      + '<span class="number">50</span>'
      + '<span class="operator">%</span>'
      + '<span class="punctuation">;</span>'
      + '\n'
      + '<span class="property">font-size</span>'
      + '<span class="punctuation">:</span>'
      + ' '
      + '<span class="number">28</span>'
      + '<span class="constant">em</span>'
      + ' '
      + '<span class="keyword">!important</span>'
      + '<span class="punctuation">;</span>'
      + '\n'
      + '<span class="punctuation">}</span>'
      + '\n\n'
      + '<span class="selector">body '
      + '<span class="punctuation">{</span>'
      + '</span>'
      + '\n'
      + '<span class="property">border</span>'
      + '<span class="punctuation">:</span>'
      + ' '
      + '<span class="keyword">none</span>'
      + '<span class="punctuation">;</span>'
      + '\n'
      + '<span class="punctuation">}</span>');
  });
});

/**
 * Test convenience.
 *
 * @param {String} input
 * @param {String} output
 */

function test(input, output){
  var code = h.string(input, 'css');
  assert.equal(code, output);
}

/**
 * Fixture.
 */

function fixture(arg, thing){
  var life = 42;
  var everything = Infinity;
  var ret = 'the meaning of life is: ' + life; // or so we think
  if (everything) {
    return ret;
  }
}