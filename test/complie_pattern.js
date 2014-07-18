/* global describe, it */

var compilePattern = require('..').prototype.compilePattern;
require('should');

describe('compilePattern', function () {
    it('should compile string to checking property for undefined', function () {
        compilePattern('property').toString().should.equal(
            [
            'function anonymous(object) {',
            'return object.property;',
            '}'
            ].join('\n')
        );
    });

    it('should escape invalid identifiers', function () {
        compilePattern('prop.erty').toString().should.equal(
            [
            'function anonymous(object) {',
            'return object["prop.erty"];',
            '}'
            ].join('\n')
        );
    });

    it('should compile objects to in-depth checking', function () {
        compilePattern({ block: 'html' }).toString().should.equal(
            [
            'function anonymous(object) {',
            'return object.block === "html";',
            '}'
            ].join('\n')
        );
    });

    it('should insert checks for property existance before going deeper', function () {
        compilePattern({ blockMods: { v: 'yes' } }).toString().should.equal(
            [
            'function anonymous(object) {',
            'return object.blockMods && object.blockMods.v === "yes";',
            '}'
            ].join('\n')
        );
    });
});
