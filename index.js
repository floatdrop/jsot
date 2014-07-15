function JSOT() {
    this._matchers = {};
}

JSOT.prototype.match = function match(pattern, callback) {
    this._matchers[pattern] = callback;
};

JSOT.prototype.apply = function apply(json, callback) {
    var self = this;
    var result = '';

    if (typeof json === 'string') {
        return json;
    }

    if (json instanceof Array) {
        for (var i = 0; i < json.length; i++) {
            result += self.apply(json[i]);
        }
        return result;
    }

    if (typeof json === 'object') {
        for (var key in self._matchers) {
            if (json[key]) {
                result += self._matchers[key](json[key], json);
            }
        }
        return result;
    }
};

module.exports = JSOT;
