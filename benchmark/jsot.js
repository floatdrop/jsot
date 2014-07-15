var JSOT = require('..');
var jsot = new JSOT();
var _ = require('lodash');

jsot.match('block', function (context, parent) {
    return this.apply(parent.content, function (err, output) {
        var attrs = '';
        if (parent.attrs) {
            attrs = ' ';
            _.forEach(parent.attrs, function (value, key) {
                attrs = key + '="' + value + '"';
            });
        }
        return '<' + context + attrs + '>' + output + '</html>';
    });
});

module.exports = function (bemjson) {
    return function (done) {
        jsot.apply(bemjson, function (output) {
            setImmediate(done.bind(null, output));
        });
    };
};
