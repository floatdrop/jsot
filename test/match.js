/* global describe, it */

var JSOT = require('..');
require('should');

describe('match', function () {
    it('should accept functions as a matchers', function () {
        var jsot = new JSOT();

        jsot.match(function () { return true; }, function(context) {
            return 'Bingo!';
        });

        jsot.apply({ block: 'Hello world' }).should.equal('Bingo!');
    });

    it('should reapply jsot, when match returns object', function () {
        var jsot = new JSOT();

        jsot.match('block', function(context) {
            return { 'block-wrap': context.block };
        });

        jsot.match('block-wrap', function(context) {
            return '<h1>' + context['block-wrap'] + '</h1>';
        });

        jsot.apply({ block: 'Hello world' }).should.equal('<h1>Hello world</h1>');
    });

    it('should support matching against object', function () {
        var jsot = new JSOT();

        jsot.match({ block: 'html', elem: 'p' }, function(context) {
            return '<' + context.block + '><' + context.elem + '>' + context.body + '</' + context.elem + '></' + context.block + '>';
        });

        jsot.apply({ block: 'html', elem: 'p', body: 'Hello world!' }).should.equal('<html><p>Hello world!</p></html>');
    });
});
