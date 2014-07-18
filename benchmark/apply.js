/* global suite, bench */

var JSOT = require('..');

function benches(jsot) {
    bench('simple value', function () {
        return jsot.apply('string') === 'string';
    });

    bench('short array', function () {
        return jsot.apply(['W', 'o', 'w', ' ', 's', 'u', 'c', 'h', ' ', 'a', 'r', 'r', 'a', 'y']) === 'Wow such array';
    });

    bench('object with out matching property', function () {
        return jsot.apply({ object: 'should not match' }) === '';
    });

    bench('object with matching property', function () {
        return jsot.apply({ block0: 'html', content: 'Matched' }) === '<html>Matched</html>';
    });
}

suite('apply without matches', function () {
    var jsot = new JSOT();
    benches(jsot);
});

suite('apply with match', function () {
    var jsot = new JSOT();

    jsot.match('block0', function(context) {
        return '<' + context.block + '>' + jsot.apply(context.content) + '</' + context.block + '>';
    });

    benches(jsot);
});

suite('apply with multiple matches', function () {
    var jsot = new JSOT();

    for (var i = 0; i < 10; i ++) {
        jsot.match('block' + i, function(context) {
            return '<' + context.block + '>' + jsot.apply(context.content) + '</' + context.block + '>';
        });
    }

    benches(jsot);
});
