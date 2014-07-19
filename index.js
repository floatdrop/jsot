function JSOT() {
    this._matchers = [];
    this._patterns = [];

    this._current = { length: -1, position: -1 };
}

JSOT.prototype.match = function match(pattern, callback) {
    this._matchers.push(callback.bind(this));
    if (typeof pattern === 'object') {
        this._patterns.push(this.compilePattern(pattern));
    } else {
        this._patterns.push(pattern);
    }
};

JSOT.prototype.apply = function apply(json) {
    if (typeof json === 'string') {
        return json;
    }

    if (Array.isArray(json)) {
        return this.processArray(json);
    }

    if (typeof json === 'object') {
        return this.processObject(json);
    }
};

JSOT.prototype.processArray = function processArray(array) {
    var result = '';
    for (var i = array.length - 1; i >= 0; i--) {
        this._current.length = array.length;
        this._current.position = i;
        var output = this.apply(array[i]);
        result = output + result;
    }
    return result;
};

JSOT.prototype.processObject = function processObject(object) {
    for (var m = this._matchers.length - 1; m >= 0; m--) {
        var key = this._patterns[m];

        if ((typeof key === 'string' && object[key]) ||
            (typeof key === 'function' && key(object)) ||
            (typeof key === 'object' && this.isMatching(key, object))
        ) {
            this._current.element = object;
            var result = this._matchers[m](object);
            if (result) {
                return this.apply(result);
            }
        }
    }

    return object;
};

JSOT.prototype.isMatching = function isMatching(a, b) {
    if (a === b) { return true; }

    if (typeof a === 'object' && typeof b === 'object') {
        for (var key in a) {
            if ((b[key] === undefined) || (!isMatching(a[key], b[key]))) { return false; }
        }
        return true;
    }

    return false;
};

function escapeIdentifier (id) {
    if (/^[$A-Z\_a-z][$_0-9A-Za-z]*$/.test(id)) {
        return '.' + id;
    }
    return '["' + id + '"]';
}

function buildCompareStatement (prefix, object) {
    var statement = [];

    for (var key in object) {
        var nextPrefix = prefix + escapeIdentifier(key);
        if (typeof object[key] === 'object') {
            statement.push(nextPrefix);
            statement.push(buildCompareStatement(nextPrefix, object[key]));
        } else if (typeof object[key] === 'string') {
            statement.push(nextPrefix + ' === "' + object[key] + '"');
        } else {
            statement.push(nextPrefix + ' === ' + object[key]);
        }
    }

    return statement.join(' && ');
}

JSOT.prototype.compilePattern = function compilePatern(pattern) {
    var statement = typeof pattern !== 'string' ?
        buildCompareStatement('object', pattern) :
        'object' + escapeIdentifier(pattern);

    var composedFunction = 'return ' + statement + ';';

    /*jshint -W054*/ /* Yes, this is eval */
    return new Function('object', composedFunction);
};

module.exports = JSOT;
