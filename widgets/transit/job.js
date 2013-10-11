var _ = require('underscore'),
    async = require('async'),
    request = require('request');

var transitJob = function(job) {

    var requests = [];
    
    _(job.options.stops).each(function (stop_id) {
        requests.push(function (success_callback) {
            var request_path = 'http://webservices.nextbus.com/service/publicJSONFeed';
            var request_params = '?command=predictions&a=ttc&t=0&stopId=' + stop_id;
            var request_url = request_path + request_params;
            console.log('requesting ' + request_url);

            request.get({
                url: request_url,
                json: true
            }, function (err, response, stop_data) {
                if (err) {
                    // YOLO
                    return;
                }

                success_callback(null, stop_data); 
            });
        });
    });

    async.parallel(requests, function(err, stops_data) {
        console.log(stops_data);
        job.continue(stops_data); 
    });
};

module.exports = {
    fetch: transitJob
}
