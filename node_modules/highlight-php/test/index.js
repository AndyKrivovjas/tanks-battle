
var assert = require('assert');
var Highlight = require('highlight');
var php = require('highlight-php');

var h;

describe('highlight-php', function(){
  beforeEach(function(){
    h = Highlight()
      .prefix('')
      .use(php);
  });

  it('should expose a plugin function', function(){
    assert.equal('function', typeof php);
  });

  it('should match booleans', function(){
    test('true', '<span class="boolean">true</span>');
    test('false', '<span class="boolean">false</span>');
  });

  it('should match comments', function(){
    test('a // comment', 'a <span class="comment">// comment</span>');
    test('a /* comment \n across lines */', 'a <span class="comment">/* comment \n across lines */</span>');
  });

  it('should match numbers', function(){
    test('1', '<span class="number">1</span>');
    test('+1', '<span class="operator">+</span><span class="number">1</span>');
    test('-1', '<span class="operator">-</span><span class="number">1</span>');
    test('0x0', '<span class="number">0x0</span>');
  })

  it('should match classes', function(){
    test('class Whatever', '<span class="class"><span class="keyword">class</span> Whatever</span>');
  })

  it('should match keywords', function(){
    test('while', '<span class="keyword">while</span>');
  })

  it('should mach php calls', function(){
    test('puts("such language");', '<span class="function">puts<span class="punctuation">(</span></span><span class="string">&quot;such language&quot;</span><span class="punctuation">)</span><span class="punctuation">;</span>');
  })

  it('should match operators', function(){
    test('>>>=', '<span class="operator">&gt;</span><span class="operator">&gt;</span><span class="operator">&gt;=</span>');
  })

  it('should match punctuation', function(){
    test('array( "1" => "2" )', '<span class="keyword">array</span><span class="punctuation">(</span> &quot;<span class="number">1</span><span class="string">&quot; =&gt; &quot;</span><span class="number">2</span>&quot; <span class="punctuation">)</span>');
  })
});

/**
 * Test convenience.
 *
 * @param {String} input
 * @param {String} output
 */

function test(input, expected){
  var actual = h.string(input, 'php');
  try {
    assert.equal(actual, expected);
  } catch (e) {
    console.log('  actual   : %s', actual);
    console.log('  expected : %s', actual);
    e.actual = actual;
    e.expected = expected;
    e.showDiff = true;
    throw e;
  }
}