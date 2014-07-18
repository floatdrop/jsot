/* global suite, bench */

var compilePattern = require('..').prototype.compilePattern;

suite('compilePattern', function () {
    var compiledSimpleValuePattern = compilePattern('a');
    bench('simple values', function () {
        return compiledSimpleValuePattern({ a: false }) === true;
    });

    var compiledSimpleObjectPattern = compilePattern({a: 1});
    bench('simple objects', function () {
        return compiledSimpleObjectPattern({a: 1, b: 1}) === true;
    });

    var compiledBhObjectPattern = compilePattern({ block: 'p', blockMods: { bold: 'yes' } });
    bench('bh object ', function () {
        return compiledBhObjectPattern(
            { block: 'p', blockMods: { bold: 'yes' }, content: 'some' }
        ) === true;
    });

    var compiledComplexBhObjectPattern = compilePattern({ block: 'p', blockMods: { bold: 'yes' }, elem: 'a', mods: { italic: true } });
    bench('bh complex object ', function () {
        return compiledComplexBhObjectPattern(
            { block: 'p', blockMods: { bold: 'yes' }, elem: 'a', mods: { italic: true }, content: 'some' }
        ) === true;
    });
});
