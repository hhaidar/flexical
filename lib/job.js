var _ = require('underscore');

var Job = function(params) {
    _.each(params, function(value, param) {
        this[param] = value;
    }, this);
};

Job.prototype.fetch = function() {
    this.continue();
};

Job.prototype.emit = function(data) {
    this.events.emit('widget.update', this.id, data);
};

Job.prototype.continue = function(data) {
    this.emit(data);
    setTimeout(this.fetch, (this.interval || 1) * 1000, this);
};

Job.prototype.start = function() {
    this.fetch(this);
};

module.exports = Job;