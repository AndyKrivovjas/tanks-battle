
/**
 * Expose `objectiveC`
 */

module.exports = objectiveC;

/**
 * Add `Objective-C` as a plugin.
 *
 * @param {Highlight} highlight
 * @api public
 */

function objectiveC(highlight){
  highlight
    .language('objective-c', objectiveC)
    .language('objc', objectiveC);
}

/**
 * Methods
 */

objectiveC.method = /\[\w+ (\w+)\]/;

/**
 * Booleans
 */

objectiveC.boolean = /\b(yes|no|true|false)\b/i;

/**
 * Comments
 */

objectiveC.comment = /(?!\\{2})(\/\*[\w\W]*?\*\/|\/\/.*?$)/m;

/**
 * Classes
 */

objectiveC.class = /@(implementation|interface|class) +(\w+)/;
objectiveC.class.children = { keyword: /@(implementation|interface|class)/ };

/**
 * Keywords
 */

objectiveC.keyword = /\b(void|char|short|int|long|float|double|signed|unsigned|id|const|volatile|in|out|inout|bycopy|byref|oneway|self|super)\b/;

/**
 * Numbers
 */

objectiveC.number = /\b@?[-+]?(0x[A-Fa-f0-9]+|\d+)\b/;

/**
 * Strings
 */

objectiveC.string = /(@?"(\\?.)*?")/;

/**
 * Operator
 */

objectiveC.operator = /([-+]{1,2}|!|&lt;=?|>=?|={1,3}|&lt;{1,2}|>{1,2}|(&amp;){1,2}|\|{1,2}|\?|\*|\/|\~|\^|\%)/;

/**
 * Punctuation
 */

objectiveC.punctuation = /[{}[\];(),.:]/;