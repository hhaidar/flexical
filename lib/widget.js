/**
 * Widget
 **/

var _ = require('underscore'),
    later = require('later');

var Widget = module.exports = function(settings, helpers) {
    this.settings = settings;
    this.helpers = helpers;
    this.id = this.settings.id;
};

Widget.prototype.load = function() {
    this.plugin = require(process.cwd() + '/widgets/flexical-' + this.settings.type + '/widget.js');
    this.interval = this.settings.interval || this.plugin.defaultInterval || false;
    if (this.interval !== false) {
        this.interval = later.parse.text(this.interval);
    }
};

Widget.prototype.fetch = function() {
    var that = this;
    if (!this.plugin.fetch || !this.interval) return;
    this.plugin.fetch.apply(this, [this, function(err, data) {
        that.helpers.app.io.broadcast('job:' + that.id + ':update', data);
        later.setTimeout(function() {
            that.fetch();
        }, that.interval);
    }]);
};

Widget.prototype.start = function() {
    this.load();
    this.helpers.winston.log('info', 'Started widget ' + this.id.bold.blue);
    this.fetch();
    return this;
};

