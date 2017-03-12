# simulator [![npm][npm-image]][npm-url] [![size][size-image]][size-url] [![travis][travis-image]][travis-url]

[npm-image]: https://img.shields.io/npm/v/object-defaults.svg?style=flat
[npm-url]: https://npmjs.org/package/object-defaults
[travis-image]: https://img.shields.io/travis/ngryman/object-defaults.svg?style=flat
[travis-url]: https://travis-ci.org/ngryman/object-defaults

> Like _.defaults, assigns properties of source objects to a target, without overriding existing ones.


## Install

```
$ npm install --save object-defaults
```


## Usage

```js
var defaults = require('object-defaults')

// copies source to target
defaults({ foo: 0 }, { bar: 1 })
//=> { foo: 0, bar: 1 }

// multiple sources
defaults({ foo: 0 }, { bar: 1 }, { baz: 2 })
//=> { foo: 0, bar: 1, baz: 2 }

// does not override existing properties
defaults({ foo: 0 }, { foo: 1 }, { foo: 2 })
//=> { foo: 0 }

// ignores falsy sources
defaults({ foo: 0 }, null, '', { bar: 1 }, 0)
//=> { foo: 0, bar: 1 }
```


### `defaults(target, [source], [source, ...])`

Assigns own enumerable properties of `source` objects to the `target` object and returns the
`target` object. Existing properties are not overriden.


## Related

- [`object-assign`](https://github.com/sindresorhus/object-assign): Same thing but overrides existing properties.


## License

MIT © [Nicolas Gryman](http://ngryman.sh)
