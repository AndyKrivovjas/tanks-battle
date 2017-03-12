
/**
 * Expose `php`
 */

module.exports = php;

/**
 * Add `php` as a language.
 *
 * @param {Highlight} highlight
 * @api public
 */

function php(highlight){
  highlight.language('php', php);
  highlight.language('PHP', php);
}

/**
 * Booleans
 */

php.boolean = /\b(true|false)\b/;

/**
 * Comments
 */

php.comment = /(?!\\{2})(\/\*[\w\W]*?\*\/|\/\/.*?$|#.*?$)/m;

/**
 * Classes
 */

php.class = /class +(\w+)/;
php.class.children = { keyword: /class/ };

/**
 * Keywords
 */

php.keyword = /\b(__halt_compiler|abstract|and|array|as|break|callable|case|catch|class|clone|const|continue|declare|default|die|do|echo|else|elseif|empty|enddeclare|endfor|endforeach|endif|endswitch|endwhile|eval|exit|extends|final|finally|for|foreach|function|global|goto|if|implements|include|include_once|instanceof|insteadof|interface|isset|list|namespace|new|or|print|private|protected|public|require|require_once|return|static|switch|throw|trait|try|unset|use|var|while|xor|yield)\b/;

/**
 * Numbers
 */

php.number = /\b[-+]?(0x[0-9a-fA-F]|0[0-7]+|0b[01]+|[1-9][0-9]*)\b/;

/**
 * String
 */

php.string = /(("|')(\\?.)*?\2)/;

/**
 * Functions
 */

php.function = /(\w+) *\(/;
php.function.children = { punctuation: /\(/ };

/**
 * Operators
 */

php.operator = /([-+]{1,2}|!|&lt;=?|>=?|={1,3}|&lt;{1,2}|>{1,2}|(&amp;){1,2}|\|{1,2}|\?|\*|\/|\~|\^|\%)/;

/**
 * Punctuation
 */

php.punctuation = /[{}[\];(),.]/;