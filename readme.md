# JSOT - JSON object transformation [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][depstat-image]][depstat-url] [![Coveralls Status][coveralls-image]][coveralls-url]

This is implementation of some sort of XSLT paradigm, but with JSON object instead of XML.

## Usage

Some usage examples can be found in `test/benchmark.js` folder. Here one of those:

```js
var jsot = new JSOT();

jsot.match('block', function(context, parent) {
    return '<' + context + '>' + jsot.apply(parent.content) + '</' + context + '>';
});

jsot.apply({ block: 'html', content: [ 'some', 'tags' ] });
// Returns '<html>sometags</html>'
```

## Benchmarking results

Some benchmarking results. It's not a final numbers (but can be used for bottomline), because `jsot` not implementing huge part of BH functionality.

```
                      compilePattern
      85,485,938 op/s » simple values
      71,320,633 op/s » simple objects
      51,569,471 op/s » bh object
      38,653,995 op/s » bh complex object

                      recursiveMatching
      90,662,768 op/s » simple values
      21,239,967 op/s » simple objects
       8,886,803 op/s » bh object
       5,190,468 op/s » bh complex object
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
