var _ = require('underscore'),
    request = require('request');

var weatherJob = function(job) {
    request.get({
        url: 'http://api.openweathermap.org/data/2.5/weather?q=' + job.options.location,
        json: true
    }, function (err, response, data) {
        if (err) {
            // YOLO
            return;
        }
        job.continue({
            location: data.name,
            title: data.weather[0].main,
            description: data.weather[0].description,
            temp: Math.round((data.main.temp - 273.15) * 10) / 10
        });
    });
};

module.exports = {
    interval: 60,
    fetch: weatherJob
}
