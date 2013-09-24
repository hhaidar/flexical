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
        // See http://bugs.openweathermap.org/projects/api/wiki/Weather_Condition_Codes#Icon-list
        /*****
            CLEAR_DAY
            CLEAR_NIGHT
            PARTLY_CLOUDY_DAY
            PARTLY_CLOUDY_NIGHT
            CLOUDY
            RAIN
            SLEET
            SNOW
            WIND
            FOG
        *****/
        var iconMap = {
            '01d': 'CLEAR_DAY',
            '01n': 'CLEAR_NIGHT',
            '02d': 'PARTLY_CLOUDY_DAY',
            '02n': 'PARTLY_CLOUDY_NIGHT',
            '03d': 'CLOUDY',
            '03n': 'CLOUDY',
            '04d': 'CLOUDY',
            '04n': 'CLOUDY',
            '09d': 'RAIN',
            '09n': 'RAIN',
            '10d': 'RAIN',
            '10n': 'RAIN',
            '11d': 'RAIN',
            '11n': 'RAIN',
            '13d': 'SNOW',
            '13n': 'SNOW',
            '50d': 'FOG',
            '50n': 'FOG'
        }
        job.continue({
            location: data.name,
            title: data.weather[0].main,
            description: data.weather[0].description,
            icon: iconMap[data.weather[0].icon] || iconMap['CLEAR_DAY'],
            temp: Math.round((data.main.temp - 273.15) * 10) / 10
        });
    });
};

module.exports = {
    interval: 60,
    fetch: weatherJob
}