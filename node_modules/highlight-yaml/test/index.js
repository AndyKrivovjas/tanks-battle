
var assert = require('assert');
var Highlight = require('highlight');
var yaml = require('highlight-yaml');

var h;

describe('highlight-yaml', function(){
  beforeEach(function(){
    h = Highlight()
      .prefix('')
      .use(yaml);
  });

  it('should expose a plugin function', function(){
    assert.equal('function', typeof yaml);
  });

  it('should match booleans', function(){
    test('Yes', '<span class="boolean">Yes</span>');
  });

  it('should match comments', function(){
    test('# comment', '<span class="comment"># comment</span>');
  });

  it('should match strings', function(){
    test('"string"', '<span class="string">&quot;string&quot;</span>');
  })

  it('should match numbers', function(){
    test('1', '<span class="number">1</span>');
    test('0.1', '<span class="number">0.1</span>');
  })

  it('should match punctuation', function(){
    test(':', '<span class="punctuation">:</span>');
  })

  it('should match keywords', function(){
    test('keyword:', '<span class="keyword">keyword<span class="punctuation">:</span></span>');
  })
});

/**
 * Test convenience.
 *
 * @param {String} input
 * @param {String} output
 */

function test(input, expected){
  var actual = h.string(input, 'yaml');
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