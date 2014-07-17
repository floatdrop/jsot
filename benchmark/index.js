/* global suite, bench, set */

var jsot = require('..');

suite('Arrays', function () {
    set('mintime', 1000);
    // bench('JSOT', jsot(require('./bemjsons/simple.js')));
});

suite('Objects', function () {
    set('mintime', 1000);
    // bench('JSOT', jsot(require('./bemjsons/simple.js')));
});
