var request = require('request'),
    _       = require('underscore');

var weatherJob = function(job) {
  request.get({
    url: "http://api.openweathermap.org/data/2.5/weather?q=Toronto,Canada",
    json: true
  }, function (error, response, data) {
    job.continue(data);
  });
};


module.exports = {
    interval: 60,
    fetch: weatherJob
}
