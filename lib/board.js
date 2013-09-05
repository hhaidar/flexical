var _ = require('underscore');

var Widget = require('./widget.js');

var Board = function(params) {
    _.each(params, function(value, param) {
        this[param] = value;
    }, this);
};

Board.prototype.start = function() {
	var that = this;
	this.widgets = this.widgets || {};
    _.each(this.widgets, function(widget, id) {
        that.widgets[id] = widget;
		that.widgets[id].board = that;
        that.widgets[id].start();
    });
}

module.exports = Board;