var _ = require('underscore'),
    request = require('request'),
    xml2js = require('xml2js');

var transitJob = function(job) {
    request.get({
        url: 'http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a='+
                 job.options.agency+'&t=0&stopId='+job.options.stop+'&r='+job.options.route,
    }, function (err, response, data) {
        if (err) {
            // YOLO
            return;
        }
        var parser = new xml2js.Parser();
        parser.parseString(response.body, function (err, result) {
            direction =  result.body.predictions[0].direction[0]

            data = {
                title: direction.$.title,
                next_minutes: direction.prediction[0].$.minutes,
                stop_title: result.body.predictions[0].$.stopTitle
            };
            job.continue(data);
        });
    });
};

module.exports = {
    fetch: transitJob
}
