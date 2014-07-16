function JSOT() {
    this._matchers = {};
}

JSOT.prototype.match = function match(pattern, callback) {
    this._matchers[pattern] = callback;
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
    for (var key in this._matchers) {
        if (object[key]) {
            return this.apply(this._matchers[key](object[key], object));
        }
    }
    return '';
};

JSOT.prototype.apply = function apply(json) {
    if (Array.isArray(json)) {
        return this.processArray(json);
    }

    if (typeof json === 'object') {
        return this.processObject(json);
    }

    if (typeof json === 'string') {
        return json;
    }
};

module.exports = JSOT;
