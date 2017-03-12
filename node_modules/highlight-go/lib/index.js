
/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * Plugin to highlight go code.
 *
 * @param {Highlight} highlight
 */

function plugin(highlight){
  highlight.language('go', grammar);
}

/**
 * Grammar.
 */

var grammar = {};

/**
 * Strings.
 */

grammar.string = /(("|')(\\?.)*?\2)/;

/**
 * Comments.
 */

grammar.comment = /(?!\\{2})(\/\*[\w\W]*?\*\/|\/\/.*?$)/m;

/**
 * Booleans.
 */

grammar.boolean = /\b(true|false)\b/;

/**
 * Keywords.
 */

grammar.keyword = /\b(break|default|func|interface|select|case|defer|go|map|struct|chan}else}goto}package|switch|const|fallthrough|if|range|type|continue|for|import|return|var)\b/;

/**
 * Functions.
 *
 * Children are set separately to maintain ordering.
 */

grammar.function = {
  pattern: /(\w+)\(/,
  children: {}
};

grammar.function.children.class = /\b([A-Z]\w*)\b/;
grammar.function.children.function = /(\w+)/;
grammar.function.children.punctuation = /\(/;

/**
 * Numbers.
 */

grammar.number = /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?|NaN|-?Infinity)\b/;

/**
 * Operators.
 */

grammar.operator = /([-+]{1,2}|!|&lt;=?|>=?|={1,3}|&lt;{1,2}|>{1,2}|(&amp;){1,2}|\|{1,2}|\?|\*|\/|\~|\^|\%)/;

/**
 * Punctuation.
 */

grammar.punctuation = /[{}[\];(),.:]/;