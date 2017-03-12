
/**
 * Expose `csharp`
 */

module.exports = csharp;

/**
 * Add `csharp` as a plugin.
 *
 * @param {Highlight} highlight
 * @api public
 */

function csharp(highlight){
  highlight.language('csharp', csharp);
  highlight.language('c-sharp', csharp);
  highlight.language('c#', csharp);
}

/**
 * Booleans
 */

csharp.boolean = /\b(true|false)\b/;

/**
 * Comments
 */

csharp.comment = /(?!\\{2})(\/\*[\w\W]*?\*\/|\/\/.*?$)/m;

/**
 * Classes
 */

csharp.class = /class +(\w+)/;
csharp.class.children = { keyword: /class/ };

/**
 * Strings
 */

csharp.string = /("(\\?.)*?")/

/**
 * Keywords
 */

csharp.keyword = /\b(abstract|base|bool|break|byte|case|catch|char|class|const|continue|decimal|default|delegate|do|double|else|enum|event|explicit|extern|finally|fixed|float|for|foreach|goto|if|implicit|in|int|interface|internal|lock|long|namespace|null|object|operator|out|override|params|private|protected|public|readonly|ref|return|sbyte|sealed|short|stackalloc|static|string|struct|switch|this|throw|try|uint|ulong|unsafe|ushort|using|virtual|void|volatile|while)\b/;

/**
 * Numbers
 */

csharp.number = /\b[-+]?(0x[\da-f]+|\d*\.?\d+(e-?\d+)?)\b/;

/**
 * Method
 */

csharp.method = /(\w+) *\(/;
csharp.method.children = { punctuation: /\(/ };

/**
 * Operators
 */

csharp.operator = /(await|as|is|new|typeof|checked|unchecked|default|delegate|sizeof|->|[-+]{1,2}|!|&lt;=?|>=?|={1,3}|&lt;{1,2}|>{1,2}|(&amp;){1,2}|\|{1,2}|\?|\*|\/|\~|\^|\%)/;

/**
 * Punctuation
 */

csharp.punctuation = /[{}[\];(),.:]/;