
/**
 * Expose `java`
 */

module.exports = java;

/**
 * Add `java` as a language.
 *
 * @param {Highlight} highlight
 * @api public
 */

function java(highlight){
  highlight.language('java', java);
}

/**
 * Boolean
 */

java.boolean = /\b(true|false)\b/;

/**
 * Comment
 */

java.comment = /(?!\\{2})(\/\*[\w\W]*?\*\/|\/\/.*?$)/m;

/**
 * Class
 */

java.class = /class +(\w+)/;
java.class.children = { keyword: /class/ };

/**
 * Keywords
 */

java.keyword = /\b(abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|native|new|package|protected|public|return|static|staticfp|super|switch|synchronized|this|throw|throws|transient|try|void|volatile|while)\b/;

/**
 * Number
 */

java.number = /\b[-+]?(0[bx][\da-f]+|\d*\.?\d+(e-?\d+)?)\b/;

/**
 * String
 */

java.string = /("(\\?.)*?")/;

/**
 * Method
 */

java.method = /(\w+) *\(/;
java.method.children = { punctuation: /\(/ };

/**
 * Operator
 */

java.operator = /([-+]{1,2}|!|&lt;=?|>=?|={1,3}|&lt;{1,2}|>{1,2}|(&amp;){1,2}|\|{1,2}|\?|\*|\/|\~|\^|\%)/;

/**
 * Punctuation
 */

java.punctuation = /[{}[\];(),.:]/;