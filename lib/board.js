var _ = require('underscore'),
    events = require('events');

var Job = require('./job.js');

var Board = function(params) {
    _.each(params, function(value, param) {
        this[param] = value;
    }, this);
    this.events = new events.EventEmitter();
};

Board.prototype.listen = function() {
    this.events.on('widget.update', _.bind(this.emit, this), this);
};

Board.prototype.loadJobs = function() {
    var that = this;
    this.jobs = this.jobs || {};
    _.each(this.jobs, function(job, id) {
        id = job.id || id;
        that.jobs[id] = new Job(_.extend(job, {
            id: id,
            events: that.events
        }));
        that.jobs[id].start();
    });  
};

Board.prototype.emit = function(id, data) {
    this.io.emit('widget.update', id, data);
}

Board.prototype.start = function() {
    this.listen();
	this.loadJobs();
};

module.exports = Board;