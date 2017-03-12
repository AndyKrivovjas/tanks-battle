
var assert = require('assert');
var Highlight = require('highlight');
var javascript = require('highlight-javascript');

var h;

describe('highlight-javascript', function(){
  beforeEach(function(){
    h = Highlight()
      .prefix('')
      .use(javascript);
  });

  it('should expose a plugin function', function(){
    assert.equal('function', typeof javascript);
  });

  it('should match booleans', function(){
    test('true', '<span class="boolean">true</span>');
    test('false', '<span class="boolean">false</span>');
  });

  it('should match comments', function(){
    test('a // comment', 'a <span class="comment">// comment</span>');
    test('a /* comment \n across lines */', 'a <span class="comment">/* comment \n across lines */</span>');
  });

  it('should match functions', function(){
    test('camelCase()', '<span class="function"><span class="function">camelCase</span><span class="punctuation">(</span></span><span class="punctuation">)</span>');
    test('PascalCase()', '<span class="function"><span class="class">PascalCase</span><span class="punctuation">(</span></span><span class="punctuation">)</span>');
  });

  it('should match numbers', function(){
    test('42', '<span class="number">42</span>');
    test('8.3', '<span class="number">8.3</span>');
    test('-8', '<span class="operator">-</span><span class="number">8</span>');
    test('NaN', '<span class="number">NaN</span>');
    test('Infinity', '<span class="number">Infinity</span>');
  });

  it('should match strings', function(){
    test('"string"', '<span class="string">&quot;string&quot;</span>');
    test('\'string\'', '<span class="string">&#39;string&#39;</span>');
    test('"8"', '<span class="string">&quot;8&quot;</span>');
    test('\'//\'', '<span class="string">&#39;//&#39;</span>');
  });

  it('should match keywords', function(){
    test('if', '<span class="keyword">if</span>');
    test('new', '<span class="keyword">new</span>');
    test('yield', '<span class="keyword">yield</span>');
  });

  it('should match constants', function(){
    test('document', '<span class="constant">document</span>');
    test('window', '<span class="constant">window</span>');
    test('global', '<span class="constant">global</span>');
  });

  it('should match operators', function(){
    test('+', '<span class="operator">+</span>');
    test('===', '<span class="operator">===</span>');
  });

  it('should match punctuation', function(){
    test('.', '<span class="punctuation">.</span>');
  });

  it('should match a complex example', function(){
    var js = ''
      + 'function fixture(arg, thing){\n'
      + '  var life = 42;\n'
      + '  var everything = Infinity;\n'
      + '  var ret = \'the meaning of life is: \' + life; // or so we think\n'
      + '  if (everything) {\n'
      + '    return ret;\n'
      + '  }\n'
      + '}';

    test(js, ''
      + '<span class="keyword">function</span>'
      + ' '
      + '<span class="function">'
      + '<span class="function">fixture</span>'
      + '<span class="punctuation">(</span>'
      + '</span>'
      + 'arg'
      + '<span class="punctuation">,</span>'
      + ' thing'
      + '<span class="punctuation">)</span>'
      + '<span class="punctuation">{</span>'
      + '\n  '
      + '<span class="keyword">var</span>'
      + ' life '
      + '<span class="operator">=</span>'
      + ' '
      + '<span class="number">42</span>'
      + '<span class="punctuation">;</span>'
      + '\n  '
      + '<span class="keyword">var</span>'
      + ' everything '
      + '<span class="operator">=</span>'
      + ' '
      + '<span class="number">Infinity</span>'
      + '<span class="punctuation">;</span>'
      + '\n  '
      + '<span class="keyword">var</span>'
      + ' ret '
      + '<span class="operator">=</span>'
      + ' '
      + '<span class="string">&#39;the meaning of life is: &#39;</span>'
      + ' '
      + '<span class="operator">+</span>'
      + ' life'
      + '<span class="punctuation">;</span>'
      + ' '
      + '<span class="comment">// or so we think</span>'
      + '\n  '
      + '<span class="keyword">if</span>'
      + ' '
      + '<span class="punctuation">(</span>'
      + 'everything'
      + '<span class="punctuation">)</span>'
      + ' '
      + '<span class="punctuation">{</span>'
      + '\n    '
      + '<span class="keyword">return</span>'
      + ' ret'
      + '<span class="punctuation">;</span>'
      + '\n  '
      + '<span class="punctuation">}</span>'
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
  var code = h.string(input, 'javascript');
  try {
    assert.equal(code, output);
  } catch (e) {
    e.expected = output;
    e.actual = code;
    e.showDiff = true;
    throw e;
  }
}