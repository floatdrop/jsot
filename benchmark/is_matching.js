/* global suite, bench */

var isMatching = require('..').prototype.isMatching;

suite('recursiveMatching', function () {
    bench('simple values', function () {
        return isMatching('a', 'a') === true;
    });

    bench('simple objects', function () {
        return isMatching({a: 1}, {a: 1, b: 1}) === true;
    });

    bench('bh object ', function () {
        return isMatching(
            { block: 'p', blockMods: { bold: 'yes' } },
            { block: 'p', blockMods: { bold: 'yes' }, content: 'some' }
        ) === true;
    });

    bench('bh complex object ', function () {
        return isMatching(
            { block: 'p', blockMods: { bold: 'yes' }, elem: 'a', mods: { italic: true } },
            { block: 'p', blockMods: { bold: 'yes' }, elem: 'a', mods: { italic: true }, content: 'some' }
        ) === true;
    });
});
