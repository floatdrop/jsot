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

module.exports = function (bemjson) {
    return function (done) {
        var html = jsot.apply(bemjson);
        setImmediate(done.bind(null, html));
    };
};
