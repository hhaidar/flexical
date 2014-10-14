var _ = require('underscore'),
    events = require('events'),
    fs = require('fs'),
    path = require('path');

var Job = require('./job.js');

var Board = function(params) {
    var that = this;
    this.options = {};
    _.each(params, function(value, param) {
        this.options[param] = value;
    }, this);
    //
    // Params
    //
    this.id = this.options.id;
    this.name = this.options.name;
    this.io = this.options.io;
    this.url = this.options.url;
    this.path = this.options.path;
    this.logger = this.options.logger;
    //
    // Widget Collection
    //
    this.widgets = {};
    //
    // Events
    //
    this.events = new events.EventEmitter();
    //
    // Exceptions
    //
    this.d = require('domain').create();
    this.d.on('error', function(err) {
        var message = 'Board Error: ' + that.name;
        that.logger.log('error', message.redBG);
        that.logger.log('error', err.stack);
    })
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
            this.d.run(function() {
                widget.job.start();
            })
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
    this.logger.log('info',
      'started board '
      + String(this.name).bold
      + ' with '
      + String(_.size(this.widgets)).bold
      + ' widgets'.bold);
};

module.exports = Board;