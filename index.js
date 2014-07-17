function JSOT() {
    this._matchers = [];
    this._patterns = [];
}

JSOT.prototype.isMatching = require('./is_matching');

JSOT.prototype.match = function match(pattern, callback) {
    this._matchers.push(callback);
    this._patterns.push(pattern);
};

JSOT.prototype.processArray = function processArray(array) {
    var result = '';
    for (var i = 0; i < array.length; i++) {
        var output = this.apply(array[i]);
        result = result + output;
    }
    return result;
};

JSOT.prototype.processObject = function processObject(object) {
    for (var m = this._matchers.length; m >= 0; m--) {
        var key = this._patterns[m];

        if (typeof key === 'string' && object[key]) {
            return this.apply(this._matchers[m](object[key]));
        }

        if (typeof key === 'object' && this.isMatching(key, object)) {
            return this.apply(this._matchers[m](object));
        }
    }
    return '';
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

module.exports = JSOT;
