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
     101,707,826 op/s » simple value
       2,872,773 op/s » short array
      30,948,360 op/s » object with out matching property
      30,942,242 op/s » object with matching property

                      apply with match
      87,199,363 op/s » simple value
       2,957,711 op/s » short array
      22,988,907 op/s » object with out matching property
       2,160,836 op/s » object with matching property

                      apply with multiple matches
      88,600,067 op/s » simple value
       2,908,635 op/s » short array
       7,156,239 op/s » object with out matching property
       1,599,449 op/s » object with matching property

                      compilePattern
      77,000,156 op/s » simple values
      74,135,502 op/s » simple objects
      42,939,839 op/s » bh object
      32,273,702 op/s » bh complex object

                      recursiveMatching
      90,930,827 op/s » simple values
      18,900,108 op/s » simple objects
       7,933,644 op/s » bh object
       4,263,322 op/s » bh complex object

                      staticFunction
      45,792,933 op/s » block
      18,946,571 op/s » block_mod
      34,840,615 op/s » block__elem
      11,880,409 op/s » block_mod__elem_mod
```

[npm-url]: https://npmjs.org/package/jsot
[npm-image]: http://img.shields.io/npm/v/jsot.svg

[travis-url]: https://travis-ci.org/floatdrop/jsot
[travis-image]: http://img.shields.io/travis/floatdrop/jsot.svg

[depstat-url]: https://david-dm.org/floatdrop/jsot
[depstat-image]: https://david-dm.org/floatdrop/jsot.svg?theme=shields.io

[coveralls-url]: https://coveralls.io/r/floatdrop/jsot
[coveralls-image]: http://img.shields.io/coveralls/floatdrop/jsot/master.svg
