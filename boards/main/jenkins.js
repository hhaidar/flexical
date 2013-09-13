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
    url: "http://192.168.1.16:8080/api/json",
    json: true
  }, function (error, response, body) {
    jobs = _(body.jobs).map(function (job) {
      return {'name': job.name, 'status': colormap[job.color]};
    });
    job.continue({
      jobs: jobs
    });
  });
};

module.exports = jenkinsJob;
