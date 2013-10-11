var request = require('request'),
    _       = require('underscore');

var jenkinsJob = function(job) {
  var colormap = {
    'red': 'failure',
    'blue': 'success',
    'white': 'running'
  };
  var jobs = [];
  request.get({
    url: job.options.url,
    json: true
  }, function (error, response, body) {
    var jobs = _(body.jobs).map(function (job) {
      return {'name': job.name, 'status': colormap[job.color]};
    });
    job.continue(jobs);
  });
};

module.exports = {
    interval: 30,
    fetch: jenkinsJob
}