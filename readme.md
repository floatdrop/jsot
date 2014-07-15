# JSOT - JSON object transformation [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][depstat-image]][depstat-url]

This is implementation of some sort of XSLT paradigm, but with JSON object instead of XML.

## Usage

Some usage examples can be found in `test/benchmark.js` folder. Here one of those:

```js
var jsot = new JSOT();

jsot.match('block', function(context, parent) {
    return this.apply(parent.content, function (err, output) {
        return '<' + context + '>' + output + '</' + context + '>';
    });
});

jsot.apply({ block: 'html', content: [ 'some', 'tags' ] }, function (err, output) {
    // Output should equal '<html>sometags</html>'
});
```

## API

This is pre-alpha version, so API will be changed or modified. Stay tuned!

[npm-url]: https://npmjs.org/package/jsot
[npm-image]: http://img.shields.io/npm/v/jsot.svg

[travis-url]: https://travis-ci.org/floatdrop/jsot
[travis-image]: http://img.shields.io/travis/floatdrop/jsot.svg

[depstat-url]: https://david-dm.org/floatdrop/jsot
[depstat-image]: https://david-dm.org/floatdrop/jsot.svg?theme=shields.io
