
var arrays = [];
var array = [];

for (var i = 0; i < 1000; i ++) {
    array.push(i);
}

for (var i = 0; i < 1000; i ++) {
    arrays.push(array);
}

module.exports = arrays;
