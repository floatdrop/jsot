/* global describe, it */

var JSOT = require('..');
require('should');

describe('match', function () {
    it('should reapply jsot, when match returns object', function () {
        var jsot = new JSOT();

        jsot.match('block', function(context) {
            return { 'block-wrap': context };
        });

        jsot.match('block-wrap', function(context) {
            return '<h1>' + context + '</h1>';
        });

        jsot.apply({ block: 'Hello world' }).should.equal('<h1>Hello world</h1>');
    });

    it('should support matching against object', function () {
        var jsot = new JSOT();

        jsot.match({ block: 'html' }, function(context) {
            return '<html>' + context.body + '</html>';
        });

        jsot.apply({ block: 'html', body: 'Hello world!' }).should.equal('<html>Hello world!</html>');
    });
});
