var _ = require('underscore');

var Job = function(params) {
    var that = this;
    // Params
    _.each(params, function(value, param) {
        this[param] = value;
    }, this);
    // Exception Handling
    this.d = require('domain').create();
    this.d.on('error', function(err) {
        // TODO: Add logger broheim
        console.log(err);
        // TODO: Setup job.error event
        that.continue();
    });
};

Job.prototype.fetch = function() {
    this.continue();
};

Job.prototype.emit = function(data) {
    this.events.emit('job.update', this.id, data);
};

Job.prototype.continue = function(data) {
    var that = this;
    this.d.run(function() {
        that.emit(data);
        that.data = data;
        setTimeout(that.fetch, (that.interval || 1) * 1000, that);
    });
};

Job.prototype.start = function() {
    var that = this;
    this.d.run(function() {
        that.fetch(that);
    });
};

module.exports = Job;