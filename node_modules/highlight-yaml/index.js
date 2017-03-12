
/**
 * Expose `yaml`
 */

module.exports = yaml;

/**
 * Add `yaml` as a language.
 *
 * @param {Highlight} highlight
 * @api public
 */

function yaml(highlight){
  highlight.language('yml', yaml);
  highlight.language('yaml', yaml);
}

/**
 * Boolean
 */

yaml.boolean = /\b(Yes|No)\b/;

/**
 * Numbers
 */

yaml.number = /\b(\d*\.\d+)\b/;

/**
 * Comments
 */

yaml.comment = /(#[^\n]*)/;

/**
 * Keywords
 */

yaml.keyword = /(\w+):/;
yaml.keyword.children = { punctuation: /:/ };

/**
 * Punctuation
 */

yaml.punctuation = /([:|>?])/;

/**
 * Strings
 */

yaml.string = /(("|')(\\?.)*?\2)/;
