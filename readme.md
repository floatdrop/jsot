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
     105,442,052 op/s » simple value
       3,097,503 op/s » short array
      11,301,935 op/s » object with out matching property
      11,344,759 op/s » object with matching property

                      apply with match
      92,088,004 op/s » simple value
       3,080,371 op/s » short array
       9,278,109 op/s » object with out matching property
       2,495,744 op/s » object with matching property

                      apply with multiple matches
      93,360,287 op/s » simple value
       3,070,958 op/s » short array
       2,987,711 op/s » object with out matching property
       1,722,332 op/s » object with matching property

                      compilePattern
      79,332,043 op/s » simple values
      77,350,453 op/s » simple objects
      50,517,169 op/s » bh object
      38,811,369 op/s » bh complex object

                      recursiveMatching
      94,364,123 op/s » simple values
      21,324,664 op/s » simple objects
       8,775,628 op/s » bh object
       5,192,937 op/s » bh complex object
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
