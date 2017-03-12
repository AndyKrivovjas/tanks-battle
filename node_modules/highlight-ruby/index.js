
/**
 * Expose `ruby`
 */

module.exports = ruby;

/**
 * Add `ruby` as a language.
 *
 * @param {Highlight} highlight
 * @api public
 */

function ruby(highlight){
  highlight.language('ruby', ruby);
}

/**
 * Booleans
 */

ruby.boolean = /\b(true|false)\b/;

/**
 * Strings
 */

ruby.string = /(("|')(\\?.)*?\2)/;

/**
 * Comments
 */

ruby.comment = /(?!\\{2})(#.*?$)/m;

/**
 * Classes
 */

ruby.class = /class +(\w+)/;
ruby.class.children = { keyword: /class/ };

/**
 * Keywords
 */

ruby.keyword = /\b(alias|and|begin|break|case|catch|class|def|do|elsif|else|fail|ensure|for|end|if|in|module|next|not|or|raise|redo|rescue|retry|return|then|throw|super|unless|undef|until|when|while|yield)\b/;

/**
 * Numbers
 */

ruby.number = /\b[-+]?(0x[a-fA-F0-9]+|0b[0-1_]+|0[0-7]*|[1-9][0-9_eE.]*)\b/;

/**
 * Functions
 */

ruby.function = /(\w+) *\(/;
ruby.function.children = { punctuation: /\(/ };

/**
 * Operator
 */

ruby.operator = /([-+]{1,2}|!|&lt;=?|>=?|={1,3}|&lt;{1,2}|>{1,2}|(&amp;){1,2}|\|{1,2}|\?|\*|\/|\~|\^|\%)/;

/**
 * Punctuation
 */

ruby.punctuation = /[{}[\];(),.:]/;
