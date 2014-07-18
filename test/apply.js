/* global describe, it */

var JSOT = require('..');
require('should');

describe('apply', function () {

    it('should concatinate output from array', function () {
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

    it('should return empty string, if matcher not found', function () {
        var jsot = new JSOT();

        jsot.match('block', function(context) {
            return context;
        });

        jsot.apply({ flock: 'xml' }).should.equal('');
    });
});
