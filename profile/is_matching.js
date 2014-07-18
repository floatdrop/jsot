var isMatching = require('..').prototype.isMatching;

for (var i = 0; i < 1e8; i++) {
    isMatching(
        { block: 'p', blockMods: { bold: 'yes' }, elem: i, mods: { italic: true } },
        { block: 'p', blockMods: { bold: 'yes' }, elem: i, mods: { italic: true }, content: 'some' }
    );
}
