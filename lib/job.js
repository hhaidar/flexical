var _ = require('underscore');

var Job = function(params) {
    // Params
    _.each(params, function(value, param) {
        this[param] = value;
    }, this);
    // Exception Handling
    this.d = require('domain').create();
    this.continue();
};

Job.prototype.fetch = function() {
    this.continue();
};

Job.prototype.emit = function(data) {
    this.events.emit('job.update', this.id, data);
};

Job.prototype.continue = function(data) {
    this.emit(data);
    this.data = data;
    setTimeout(this.fetch, (this.interval || 1) * 1000, this);
};

Job.prototype.start = function() {
    this.fetch(this);
};

module.exports = Job;