
/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * Plugin to highlight XML code.
 *
 * @param {Highlight} highlight
 */

function plugin(highlight){
  highlight
    .language('xml', grammar)
    .language('html', grammar);
}

/**
 * Grammar.
 */

var grammar = {};

/**
 * Comments.
 */

grammar.comment = /<!--[\w\W]*?-->/m;

/**
 * Entities.
 */

grammar.entity = /&#?[\dA-Za-z]{1,8};/;

/**
 * Doctypes.
 */

grammar.doctype = /<!DOCTYPE.+?>/i;

/**
 * CDATA.
 */

grammar.cdata = /<!\[CDATA\[[\w\W]*?]]>/i;

/**
 * Prologs.
 */

grammar.prolog = /<\?.+?\?>/;

/**
 * Tags. Children declared separately to maintain order.
 */

var children = {
  string: /('|")[\w\W]*?\1/,
  punctuation: /(^<\/?|\/?>$|=)/,
  name: /^[\w:-]+/,
  attribute: /[\w:-]+/
};

grammar.tag = {
  pattern: /<\/?[\w:-]+\s*(\s+[\w:-]+(=(("|')[\w\W]*\4|[^\s'">=]+))?\s*)*\/?>/,
  children: children
};