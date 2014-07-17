//
// Widget
//

var _ = require('underscore'),
    later = require('later');

var Widget = module.exports = function(params) {
    this.options = params.options;
    this.winston = params.winston;
    this.id = params.id;
    this.type = params.options.type;
};

Widget.prototype.load = function() {
    this.plugin = require(process.cwd() + '/widgets/flexical-' + this.options.type + '/widget.js');
    this.interval = this.options.interval || this.plugin.defaultInterval || false;
    if (this.interval !== false) {
        this.interval = later.parse.text(this.interval);
    }
};

Widget.prototype.fetch = function() {
    var that = this;
    if (!this.plugin.fetch || !this.interval) return;
    this.plugin.fetch.apply(this, [this, function(err, data) {
        later.setTimeout(function() {
            that.fetch();
        }, that.interval);
    }]);
};

Widget.prototype.start = function() {
    this.load();
    this.fetch();
    this.winston.log('info', 'Started widget ' + this.id);
    return this;
};

