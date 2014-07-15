var JSOT = require('..');
var jsot = new JSOT();

jsot.match('block', function (context, parent) {
    return this.apply(parent.content, function (err, output) {
        var attrs = '';
        if (parent.attrs) {
            attrs = ' ';
            for (var key in parent.attrs) {
                attrs = key + '="' + parent.attrs[key] + '"';
            }
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
