/* global describe, it */

var JSOT = require('..');
require('should');

describe('apply', function () {

    it('should preserve _current element in recursion');

    it('should continue to apply matchers for block, that returned undefined', function () {
        var jsot = new JSOT();
        jsot.match({ block: 'li' }, function (context) {
            return '<' + context.tag + '/>';
        });

        jsot.match({ block: 'li' }, function (context) {
            context.tag = 'li';
        });

        jsot.apply({ block: 'li'}).should.equal('<li/>');
    });

    it('should set _current.element for element', function () {
        var jsot = new JSOT();
        jsot.match({ block: 'li' }, function (context) {
            jsot._current.element.tag = 'unli';
            return '<' + context.tag + '></' + context.tag + '>';
        });

        jsot.apply({ block: 'li', tag: 'li' }).should.equal('<unli></unli>');
    });

    it('should set _current.position and _current.length for elements in array of element in array', function () {
        var jsot = new JSOT();
        jsot.match({ block: 'li' }, function (context) {
            return jsot._current.position.toString() + jsot._current.length.toString() + jsot.apply(context.content);
        });

        jsot.apply([
            { block: 'li', content: [ { block: 'li', content: 'x' } ] },
            { block: 'li', content: [ { block: 'li', content: 'x' } ] }
        ]).should.equal('0201x1201x');
    });

    it('should set _current.position and _current.length for arrays in array', function () {
        var jsot = new JSOT();
        jsot.match({ block: 'li' }, function () {
            return jsot._current.position.toString() + jsot._current.length.toString();
        });

        jsot.apply([
            [ { block: 'li' } ],
            [ { block: 'li' } ]
        ]).should.equal('0101');
    });

    it('should set _current.position and _current.length for elements in array', function () {
        var jsot = new JSOT();
        jsot.match({ block: 'li' }, function () {
            return jsot._current.position.toString() + jsot._current.length.toString();
        });

        jsot.apply([{ block: 'li' }]).should.equal('01');
    });

    it('should concatinate output from array', function () {
        var jsot = new JSOT();
        jsot.apply(['some', ' ', 'string']).should.equal('some string');
    });

    it('should return string as is', function () {
        var jsot = new JSOT();
        jsot.apply('string').should.equal('string');
    });

    it('should find matcher for object', function () {
        var jsot = new JSOT();

        jsot.match('block', function(context) {
            return context.block;
        });

        jsot.apply({ block: 'html' }).should.equal('html');
    });

    it('should return source object, if matcher not found', function () {
        var jsot = new JSOT();

        jsot.match('block', function(context) {
            return context;
        });

        jsot.apply({ flock: 'xml' }).should.eql({ flock: 'xml' });
    });
});
