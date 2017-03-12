
var assert = require('assert');
var Highlight = require('highlight');
var bash = require('highlight-bash');

var h;

describe('highlight-bash', function(){
  beforeEach(function(){
    h = Highlight()
      .prefix('')
      .use(bash);
  });

  it('should expose a plugin function', function(){
    assert.equal('function', typeof bash);
  });

  it('should match comments', function(){
    test('a # comment', 'a <span class="comment"># comment</span>');
  })

  it('should match strings', function(){
    test('echo "string"', '<span class="builtin">echo</span> <span class="string">&quot;string&quot;</span>');
    test('echo \'string\'', '<span class="builtin">echo</span> <span class="string">&#39;string&#39;</span>');
  })

  it('should match keywords', function(){
    test('if', '<span class="keyword">if</span>');
  })

  it('should match operators', function(){
    test('||', '<span class="operator">||</span>');
  })

  it('should match builtins', function(){
    test('alias', '<span class="builtin">alias</span>');
  })
});

/**
 * Test convenience.
 *
 * @param {String} input
 * @param {String} output
 */

function test(input, expected){
  var actual = h.string(input, 'bash');
  try {
    assert.equal(actual, expected);
  } catch (e) {
    console.log('  actual   : %s', actual);
    console.log('  expected : %s', expected);
    e.actual = actual;
    e.expected = expected;
    e.showDiff = true;
    throw e;
  }
}