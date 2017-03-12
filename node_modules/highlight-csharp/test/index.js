
var assert = require('assert');
var Highlight = require('highlight');
var csharp = require('highlight-csharp');

var h;

describe('highlight-csharp', function(){
  beforeEach(function(){
    h = Highlight()
      .prefix('')
      .use(csharp);
  });

  it('should expose a plugin function', function(){
    assert.equal('function', typeof csharp);
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

  it('should match strings', function(){
    test('"string"', '<span class="string">&quot;string&quot;</span>');
  })

  it('should mach method calls', function(){
    test('System.Console.WriteLine("such language");', 'System<span class="punctuation">.</span>Console<span class="punctuation">.</span><span class="method">WriteLine<span class="punctuation">(</span></span><span class="string">&quot;such language&quot;</span><span class="punctuation">)</span><span class="punctuation">;</span>');
  })

  it('should match operators', function(){
    test('>>>=', '<span class="operator">&gt;</span><span class="operator">&gt;</span><span class="operator">&gt;=</span>');
  })

  it('should match punctuation', function(){
    test('{ "im" : "testin" }', '<span class="punctuation">{</span> <span class="string">&quot;im&quot;</span> <span class="punctuation">:</span> <span class="string">&quot;testin&quot;</span> <span class="punctuation">}</span>');
  })
});

/**
 * Test convenience.
 *
 * @param {String} input
 * @param {String} output
 */

function test(input, expected){
  var actual = h.string(input, 'csharp');
  try {
    assert.equal(actual, expected);
  } catch (e) {
    console.log('actual   : %s', actual);
    console.log('expected : %s', expected);
    e.actual = actual;
    e.expected = expected;
    e.showDiff = true;
    throw e;
  }
}