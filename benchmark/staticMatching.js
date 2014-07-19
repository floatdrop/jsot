/* global suite, bench, set */

function isMatching (a, b) {
    if (a.block !== b.block) { return false; }

    if (a.blockMods) {
        if (!b.blockMods) { return false; }

        for (var mod in a.blockMods) {
            if (a.blockMods[mod] !== b.blockMods[mod]) { return false; }
        }
    }

    if (a.elem) {
        if (a.elem !== b.elem) { return false; }

        if (a.elemMods) {
            if (!b.elemMods) { return false; }

            for (var emod in a.elemMods) {
                if (a.elemMods[emod] !== b.elemMods[emod]) { return false; }
            }
        }
    }

    return true;
}

suite('staticFunction', function () {
    set('mintime', 2000);

    bench('block', function () {
        return isMatching({ block: 'a' }, { block: 'a' }) === true;
    });

    bench('block_mod', function () {
        return isMatching(
            { block: 'a', blockMods: { one: 'yes' } },
            { block: 'a', blockMods: { one: 'yes', two: 'yiss' } }
        ) === true;
    });

    bench('block__elem', function () {
        return isMatching(
            { block: 'a', elem: 'e' },
            { block: 'a', elem: 'e' }
        ) === true;
    });

    bench('block_mod__elem_mod', function () {
        return isMatching(
            { block: 'p', blockMods: { bold: 'yes' }, elem: 'a', elemMods: { italic: true } },
            { block: 'p', blockMods: { bold: 'yes' }, elem: 'a', elemMods: { italic: true } }
        ) === true;
    });
});
