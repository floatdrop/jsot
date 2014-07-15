var JSOT = require('..');
var jsot = new JSOT();

jsot.match('block', function (context, parent) {
    var attrs = '';
    if (parent.attrs) {
        attrs = ' ';
        for (var key in parent.attrs) {
            attrs = key + '="' + parent.attrs[key] + '"';
        }
    }
    return '<' + context + attrs + '>' + jsot.apply(parent.content) + '</html>';
});

function noop () {}
var bemjson = require('../benchmark/bemjsons/webpage.js');

for (var i = 0; i < 10000000; i++) {
    jsot.apply(bemjson, noop);
}