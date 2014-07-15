/* global describe, it */

var JSOT = require('..');
require('should');

describe('benchmark sample', function () {
    it('should generate valid output', function (done) {
        var jsot = new JSOT();

        jsot.match('html', function(context) {
            return this.apply(context, function (err, output) {
                return '<html>' + output + '</html>';
            });
        });

        jsot.apply({ html: 'content' }, function (err, output) {
            output.should.equal('<html>content</html>');
            done();
        });
    });

    it('should support parent link', function (done) {
        var jsot = new JSOT();

        jsot.match('block', function(context, parent) {
            return this.apply(parent.content, function (err, output) {
                return '<' + context + '>' + output + '</' + context + '>';
            });
        });

        jsot.apply({ block: 'html', content: [ 'some', 'tags' ] }, function (err, output) {
            output.should.equal('<html>sometags</html>');
            done();
        });
    });
});
