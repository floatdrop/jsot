module.exports = function isMatching(a, b) {
    if (a === b) { return true; }

    if (typeof a === 'object' && typeof b === 'object') {
        for (var key in a) {
            if ((b[key] === undefined) || (!isMatching(a[key], b[key]))) { return false; }
        }
        return true;
    }

    return false;
}
