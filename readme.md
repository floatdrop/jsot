# JSOT - JSON object transformation [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][depstat-image]][depstat-url] [![Coveralls Status][coveralls-image]][coveralls-url]

This is implementation of some sort of XSLT paradigm, but with JSON object instead of XML.

## Usage

Some usage examples can be found in `test/benchmark.js` folder. Here one of those:

```js
var jsot = new JSOT();

jsot.match('block', function(context) {
    return '<' + context.block + '>' + jsot.apply(context.content) + '</' + context.block + '>';
});

jsot.apply({ block: 'html', content: [ 'some', 'tags' ] });
// Returns '<html>sometags</html>'
```

## Benchmarking results

Benchmarks of internal functionality.

```
                      apply without matches
     103,919,581 op/s » simple value
       2,819,411 op/s » short array
      11,970,026 op/s » object with out matching property
      11,974,662 op/s » object with matching property

                      apply with match
      92,455,116 op/s » simple value
       2,792,904 op/s » short array
       9,769,793 op/s » object with out matching property
       2,911,795 op/s » object with matching property

                      apply with multiple matches
      91,818,607 op/s » simple value
       2,800,602 op/s » short array
       3,014,903 op/s » object with out matching property
       1,767,568 op/s » object with matching property

                      compilePattern
      80,263,295 op/s » simple values
      76,368,544 op/s » simple objects
      51,819,063 op/s » bh object
      39,259,520 op/s » bh complex object

                      recursiveMatching
      93,816,521 op/s » simple values
      21,492,472 op/s » simple objects
       8,277,127 op/s » bh object
       5,112,021 op/s » bh complex object
```

## API

This is pre-alpha version, so API will be changed or modified. Stay tuned!

[npm-url]: https://npmjs.org/package/jsot
[npm-image]: http://img.shields.io/npm/v/jsot.svg

[travis-url]: https://travis-ci.org/floatdrop/jsot
[travis-image]: http://img.shields.io/travis/floatdrop/jsot.svg

[depstat-url]: https://david-dm.org/floatdrop/jsot
[depstat-image]: https://david-dm.org/floatdrop/jsot.svg?theme=shields.io

[coveralls-url]: https://coveralls.io/r/floatdrop/jsot
[coveralls-image]: http://img.shields.io/coveralls/floatdrop/jsot/master.svg
