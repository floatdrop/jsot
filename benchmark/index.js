/* global suite, bench, set */

var bh = require('./bh.js');
var jsot = require('./jsot.js');

suite('Simple', function () {
    set('mintime', 1000);

    bench('BH', bh(require('./bemjsons/simple.js')));
    bench('JSOT', jsot(require('./bemjsons/simple.js')));
});

suite('Webpage', function () {
    set('mintime', 1000);

    bench('BH', bh(require('./bemjsons/webpage.js')));
    bench('JSOT', jsot(require('./bemjsons/webpage.js')));
});
