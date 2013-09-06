var _ = require('underscore');

var Job = require('./job.js');

var Board = function(params) {
    _.each(params, function(value, param) {
        this[param] = value;
    }, this);
};

Board.prototype.start = function() {
	var that = this;
	this.jobs = this.jobs || {};
    _.each(this.jobs, function(job, id) {
        that.jobs[id] = new Job(job);
        that.jobs[id].start();
    });
}

module.exports = Board;