
/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * Plugin to highlight CSS code.
 *
 * @param {Highlight} highlight
 */

function plugin(highlight){
  highlight.language('css', grammar);
}

/**
 * Grammar.
 */

var grammar = {};

/**
 * Comments.
 */

grammar.comment = /\/\*[\w\W]*?\*\//m;

/**
 * Strings.
 */

grammar.string = /("|').*?\1/;

/**
 * @-rules.
 */

grammar['at-rule'] = /@[\w-]+\b/;

/**
 * Selectors.
 */

grammar.selector = {
  pattern: /[^\{\}\s][^\{\};]*?\{/,
  children: {
    class: /\.[-.\w]+/,
    id: /#[-\w]+/,
    'pseudo-element': /:(after|before|first-letter|first-line|selection)|::[-\w]+/,
    'pseudo-class': /:[-\w]+(\(.*\))?/,
    punctuation: /\{/
  }
};

/**
 * Functions.
 */

grammar.function = {
  pattern: /[\w-]+\(/,
  children: {
    punctuation: /\(/
  }
};

/**
 * Properties.
 */

grammar.property = /[\w-]+(?=\s*:)/;

/**
 * Keywords.
 */

grammar.keyword = /[\b|!]important|initial|inherit|none|transparent\b/;

/**
 * Numbers.
 */

grammar.number = /(#[A-Fa-f\d]{3,8}|\b\d*\.?\d+)/;

/**
 * Operators.
 */

grammar.operator = /[-+\/*%^]/;

/**
 * Punctuation.
 */

grammar.punctuation = /[{}(),:;]/;

/**
 * Constant.
 */

grammar.constant = /(?!\d)(ch|cm|deg|dpcm|dpi|dppx|em|ex|grad|Hz|kHz|in|mm|pc|pt|px|rad|rem|s|ms|turn|vh|vmax|vmin|vw)\b/;
