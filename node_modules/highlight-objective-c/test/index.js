

var assert = require('assert');
var Highlight = require('highlight');
var objectiveC = require('highlight-objective-c');

var h;

describe('highlight-objectiveC', function(){
  beforeEach(function(){
    h = Highlight()
      .prefix('')
      .use(objectiveC);
  });

  it('should expose a plugin function', function(){
    assert.equal('function', typeof objectiveC);
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
    test('@1', '@<span class="number">1</span>');
    test('+1', '<span class="operator">+</span><span class="number">1</span>');
    test('-1', '<span class="operator">-</span><span class="number">1</span>');
    test('0x0', '<span class="number">0x0</span>');
  })

  it('should match classes', function(){
    test('@implementation Whatever', '<span class="class"><span class="keyword">@implementation</span> Whatever</span>');
  })

  it('should match strings', function(){
    test('"string"', '<span class="string">&quot;string&quot;</span>');
  })

  it('should match keywords', function(){
    test('void', '<span class="keyword">void</span>');
  })

  it('should mach method calls', function(){
    test('[self init]', '<span class="method">[self init]</span>');
  })

  it('should match operators', function(){
    test('>>=', '<span class="operator">&gt;</span><span class="operator">&gt;=</span>');
  })

  it('should match punctuation', function(){
    test('[', '<span class="punctuation">[</span>');
  })
});

/**
 * Test convenience.
 *
 * @param {String} input
 * @param {String} output
 */

function test(input, expected){
  var actual = h.string(input, 'objective-c');
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