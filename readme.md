# JSOT - JSON object transformation [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][depstat-image]][depstat-url] [![Coveralls Status][coveralls-image]][coveralls-url]

This is implementation of some sort of XSLT paradigm, but with JSON object instead of XML.

## Usage

Some usage examples can be found in `test/benchmark.js` folder. Here one of those:

```js
var jsot = new JSOT();

jsot.match('block', function(context) {
    return '<' + context.block + '>' + this.apply(context.content) + '</' + context.block + '>';
});

jsot.apply({ block: 'html', content: [ 'some', 'tags' ] });
// Returns '<html>sometags</html>'
```


## API

This is pre-alpha version, so API will be changed or modified. Stay tuned!

### JSOT constructor

Takes no parameters. Just use it `var jsot = new JSOT()`.

#### JSOT._current

Stores additional information about current processed object:

 * `JSOT._current.position` - If element in array, it will contain its position (counting from zero).
 * `JSOT._current.length` - If element in array, it will contain length of the array.
 * `JSOT._current.element` - Stores current processed object (same as matcher argument). Useful for wrappers.

### JSOT.match(pattern, matcher)

Stores matcher function, that will be applied on json, when pattern is statisfied.

* __pattern__ - Can be `string` or `object`.
* __matcher__ - Function with next signature: `function (context) { ... }`. It gets context and returns transformated result. Matcher is called with context of `JSOT` object.

##### Context

Context is the part of the json object, that matched pattern including fields, that caused match. For example:

```js
var jsot = new JSOT();

jsot.match('head', function (context) {
    console.log(context); // -> { head: 'title', body: 'text' }
});

jsot.apply({ head: 'title', body: 'text' });
```

##### Result

Result can be one of those types:

 * `string` - final result of transformation
 * `object` - new json object, on which apply will be called again.
 * `Array` - Array with results that will be transformed (in the end) in strings and concatinated.

```js
var jsot = new (require('./index.js'));

jsot.match('list', function (context) {
    return context.list.split(' ').concat('again'); // Returning array
});

jsot.apply({ list: 'Some concatinated words' }); // -> 'Someconcatinatedwordsagain'
```

### JSOT.apply(object)

Apply methods performs recursive transformation with defined matchets by `JSOT.match` method.
Returns string with transformed result.

## Benchmarking results

Benchmarks of internal functionality.

```
                      apply without matches
     103,389,431 op/s » simple value
       3,011,730 op/s » short array
      32,379,635 op/s » object with out matching property
      32,560,504 op/s » object with matching property

                      apply with match
      91,252,892 op/s » simple value
       2,987,821 op/s » short array
      23,274,050 op/s » object with out matching property
       2,421,787 op/s » object with matching property

                      apply with multiple matches
      90,463,954 op/s » simple value
       3,041,107 op/s » short array
       4,000,285 op/s » object with out matching property
       1,534,223 op/s » object with matching property

                      compilePattern
      80,961,900 op/s » simple values
      77,591,186 op/s » simple objects
      52,985,442 op/s » bh object
      38,981,696 op/s » bh complex object

                      recursiveMatching
     102,294,997 op/s » simple values
      21,533,724 op/s » simple objects
       8,999,456 op/s » bh object
       5,313,999 op/s » bh complex object

                      staticFunction
      54,691,285 op/s » block
      23,976,082 op/s » block_mod
      37,837,548 op/s » block__elem
      12,329,327 op/s » block_mod__elem_mod
```

[npm-url]: https://npmjs.org/package/jsot
[npm-image]: http://img.shields.io/npm/v/jsot.svg

[travis-url]: https://travis-ci.org/floatdrop/jsot
[travis-image]: http://img.shields.io/travis/floatdrop/jsot.svg

[depstat-url]: https://david-dm.org/floatdrop/jsot
[depstat-image]: https://david-dm.org/floatdrop/jsot.svg?theme=shields.io

[coveralls-url]: https://coveralls.io/r/floatdrop/jsot
[coveralls-image]: http://img.shields.io/coveralls/floatdrop/jsot/master.svg
