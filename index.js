var _ = require('lodash');

function JSOT() {
    this._matchers = {};
}

JSOT.prototype.match = function match(pattern, callback) {
    this._matchers[pattern] = callback;
};

JSOT.prototype.apply = function apply(json, callback) {
    var self = this;
    var result = '';

    if (_.isString(json)) {
        return callback(null, json);
    }

    if (_.isArray(json)) {
        _.forEach(json, function expandItem(item) {
            self.apply(item, function (err, output) {
                result += output;
            });
        });
        return callback(null, result);
    }

    if (_.isObject(json)) {
        _.forEach(json, function findMatcher(context, key) {
            if (self._matchers[key]) {
                result += self._matchers[key].bind(self)(context, json);
            }
        });
        return callback(null, result);
    }

    callback(null, '');
};

module.exports = JSOT;
