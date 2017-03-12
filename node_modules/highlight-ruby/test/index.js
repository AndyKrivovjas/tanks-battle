
var assert = require('assert');
var Highlight = require('highlight');
var ruby = require('highlight-ruby');

var h;

describe('highlight-ruby', function(){
  beforeEach(function(){
    h = Highlight()
      .prefix('')
      .use(ruby);
  });

  it('should expose a plugin function', function(){
    assert.equal('function', typeof ruby);
  });

  it('should match booleans', function(){
    test('true', '<span class="boolean">true</span>');
    test('false', '<span class="boolean">false</span>');
  });

  it('should match comments', function(){
    test('a # comment', 'a <span class="comment"># comment</span>');
  });

  it('should match numbers', function(){
    test('1', '<span class="number">1</span>');
    test('+1', '<span class="operator">+</span><span class="number">1</span>');
    test('-1', '<span class="operator">-</span><span class="number">1</span>');
    test('0b0', '<span class="number">0b0</span>');
    test('0x0', '<span class="number">0x0</span>');
  })

  it('should match classes', function(){
    test('class Whatever', '<span class="class"><span class="keyword">class</span> Whatever</span>');
  })

  it('should match strings', function(){
    test("'#string'", '<span class="string">&#39;#string&#39;</span>');
  })

  it('should match keywords', function(){
    test('def', '<span class="keyword">def</span>');
  })

  it('should mach method calls', function(){
    test('puts("such language");', '<span class="function">puts<span class="punctuation">(</span></span><span class="string">&quot;such language&quot;</span><span class="punctuation">)</span><span class="punctuation">;</span>');
  })

  it('should match operators', function(){
    test('==', '<span class="operator">==</span>');
  })

  it('should match punctuation', function(){
    test('[1, 2]', '<span class="punctuation">[</span><span class="number">1</span><span class="punctuation">,</span> <span class="number">2</span><span class="punctuation">]</span>');
  })
});

/**
 * Test convenience.
 *
 * @param {String} input
 * @param {String} output
 */

function test(input, expected){
  var actual = h.string(input, 'ruby');
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
