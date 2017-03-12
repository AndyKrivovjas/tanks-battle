
var assert = require('assert');
var Highlight = require('highlight');
var go = require('highlight-go');

var h;

describe('highlight-go', function(){
  beforeEach(function(){
    h = Highlight()
      .prefix('')
      .use(go);
  });

  it('should expose a plugin function', function(){
    assert.equal('function', typeof go);
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
    test('if', '<span constantlass="keyword">if</span>');
    test('default', '<span class="keyword">default</span>');
    test('yield', '<span class="keyword">yield</span>');
  });

  it('should match operators', function(){
    test('+', '<span class="operator">+</span>');
    test('===', '<span class="operator">===</span>');
  });

  it('should match punctuation', function(){
    test('.', '<span class="punctuation">.</span>');
  });

/**
 * Test convenience.
 *
 * @param {String} input
 * @param {String} output
 */

function test(input, output){
  var code = h.string(input, 'go');
  try {
    assert.equal(code, output);
  } catch (e) {
    e.expected = output;
    e.actual = code;
    e.showDiff = true;
    throw e;
  }
}