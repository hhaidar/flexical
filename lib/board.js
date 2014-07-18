/**
 * Board
 **/

var _ = require('underscore');

var Widget = require(__dirname + '/widget.js');

var Board = module.exports = function(settings, helpers) {
    this.settings = settings;
    this.helpers = helpers;
    this.name = this.settings.name;
    this.widgets = {};
};

Board.prototype.load = function() {
    _.each(this.settings.widgets, function(widget, id) {
        widget.id = id;
        this.widgets[id] = new Widget(widget, _.extend(this.helpers, {
            board: this
        })).start();
    }, this);
};

Board.prototype.start = function() {
    this.helpers.winston.log('info', 'Started ' + this.name.bold);
    this.load();
    return this;
};