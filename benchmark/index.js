/* global suite, bench */

var bh = require('./bh.js');
var jsot = require('./jsot.js');

suite('Simple', function () {
    bench('BH', bh(require('./bemjsons/simple.js')));
    bench('JSOT', jsot(require('./bemjsons/simple.js')));
});

suite('Webpage', function () {
    bench('BH', bh(require('./bemjsons/webpage.js')));
    bench('JSOT', jsot(require('./bemjsons/webpage.js')));
});
