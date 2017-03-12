
/**
 * Expose `python`
 */

module.exports = python;

/**
 * Add `python` as a language.
 *
 * @param {Highlight} highlight
 * @api public
 */

function python(highlight){
  highlight.language('python', python);
}

/**
 * Comments
 */

python.comment = /(?!\\{2})(#.*?$)/m;

/**
 * Strings
 */

python.string = /(("""|"|')(\\?.)*?\2)/;

/**
 * Booleans
 */

python.boolean = /\b(True|False)\b/;

/**
 * Keywords
 */

python.keyword = /\b(and|as|assert|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|not|or|pass|print|raise|return|try|while|with|yield)\b/;


/**
 * Classes
 */

python.class = /class +(\w+)/;
python.class.children = { keyword: /class/ };

/**
 * Functions
 */

python.function = /(\w+) *\(/;
python.function.children = { punctuation: /\(/ };
/**
 * Numbers
 */

python.number = /\b[-+]?(0x[a-fA-F0-9]+|0b[0-1]+|0[0-7]+|[1-9][0-9]*)\b/;

/**
 * Operators
 */

python.operator = /([-+]{1,2}|!|&lt;=?|>=?|={1,3}|&lt;{1,2}|>{1,2}|(&amp;){1,2}|\|{1,2}|\?|\*|\/|\~|\^|\%|\*\*?=)/;

/**
 * Punctuation
 */

python.punctuation = /[{}[\];(),.:]/;