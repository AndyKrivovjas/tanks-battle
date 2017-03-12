
/**
 * Expose `bash`
 */

module.exports = bash;

/**
 * Add `bash` as a language.
 *
 * @param {Highlight} highlight
 * @api public
 */

function bash(highlight){
  highlight.language('sh', bash);
  highlight.language('bash', bash);
  highlight.language('shellscript', bash);
}

/**
 * Comments
 */

bash.comment = /(#.*?$)/m

/**
 * Strings
 */

bash.string = /(("|')(\\?.)*?\2)/;

/**
 * Keywords
 */

bash.keyword = /\b(if|then|else|elif|fi|for|in|do|done|select|case|continue|esac|while|until|return|export|declare|typeset|local|readonly)\b/;

/**
 * Operators
 */

bash.operator = /(;|&&?|\|\||=[=~]?|!=?|&lt;|&gt;|\|)/;

/**
 * Builtins
 */

bash.builtin = /\b(alias|bg|bind|break|builtin|caller|cd|command|compgen|complete|dirs|disown|echo|enable|eval|exec|exit|false|fc|fg|getopts|hash|help|history|jobs|kill|let|logout|popd|printf|pushd|pwd|read|readonly|set|shift|shopt|source|suspend|test|times|trap|true|type|ulimit|umask|unalias|unset|wait)\b/;