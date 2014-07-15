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
        return callback(null, json);
    }

    if (json instanceof Array) {
        for (var i = 0; i < json.length; i++) {
            self.apply(json[i], function (err, output) {
                result += output;
            });
        }
        return callback(null, result);
    }

    if (typeof json === 'object') {
        for (var key in json) {
            if (self._matchers[key]) {
                result += self._matchers[key].bind(self)(json[key], json);
            }
        }
        return callback(null, result);
    }

    callback(null, '');
};

module.exports = JSOT;
