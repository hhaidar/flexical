//
// Board
//

var _ = require('underscore');

var Widget = require(__dirname + '/widget.js');

var Board = module.exports = function(params) {
    this.options = params.options;
    this.app = params.app;
    this.winston = params.winston;
    this.name = params.options.name;
    this.widgets = {};
};

Board.prototype.load = function() {
    _.each(this.options.widgets, function(options, id) {
        var widget = this.widgets[id] = new Widget({
            id: id,
            options: options,
            winston: this.winston
        }).start();
    }, this);
};

Board.prototype.start = function() {
    this.winston.log('info', 'Started ' + this.name.bold);
    this.load();
    return this;
};