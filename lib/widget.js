var _ = require('underscore');

var Widget = function(params) {
    _.each(params, function(value, param) {
        this[param] = value;
    }, this);
};

Widget.prototype.start = function() {
    this.fetch(this);
}

Widget.prototype.continue = function() {
    setTimeout(this.fetch, this.interval || 1 * 1000, this)
}

Widget.prototype.fetch = function() {
    this.continue();
}

Widget.prototype.sync = function() {

}

Widget.prototype.end = function() {
    
}

module.exports = Widget;