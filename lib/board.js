var _ = require('underscore'),
    events = require('events'),
    fs = require('fs'),
    path = require('path');

var Job = require('./job.js');

var Board = function(params) {
    this.options = {};
    _.each(params, function(value, param) {
        this.options[param] = value;
    }, this);
    this.id = this.options.id;
    this.name = this.options.name;
    this.widgets = {};
    this.events = new events.EventEmitter();
};

Board.prototype.listen = function() {
    var that = this;
    this.io.on('connection', function(client) {
        _.each(that.widgets, function(widget) {
            if (!widget.job || !widget.job.data) {
                return;
            }
            that.emit(widget.id, widget.job.data || {});
        });
    })
    this.events.on('job.update', _.bind(this.emit, this), this);
};

Board.prototype.loadWidgets = function() {
    _.each(this.options.widgets, function(widget, id) {
        widget.id = widget.id || id;
        var widgetPath = path.resolve('./widgets/' + widget.type + '/widget.js');
        if (!fs.existsSync(widgetPath)) {
            return;
        }
        var job = require(widgetPath).job || false;
        if (job) {
            widget.job = new Job(_.extend(job, {
                id: id,
                interval: widget.interval || job.interval,
                options: widget.options,
                events: this.events
            }));
            widget.job.start();
        }
        this.widgets[widget.id] = widget;
    }, this);  
};

Board.prototype.emit = function(id, data) {
    this.io.emit('job.update', id, data);
}

Board.prototype.start = function() {
	this.loadWidgets();
    this.listen();
};

module.exports = Board;