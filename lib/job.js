var _ = require('underscore');

var Job = function(params) {
    _.each(params, function(value, param) {
        this[param] = value;
    }, this);
};

Job.prototype.start = function() {
    this.fetch(this);
}

Job.prototype.continue = function() {
    setTimeout(this.fetch, this.interval || 1 * 1000, this)
}

Job.prototype.fetch = function() {
    this.continue();
}

Job.prototype.sync = function() {

}

Job.prototype.end = function() {
    
}

module.exports = Job;