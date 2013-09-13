var request = require('request'),
    async   = require('async'),
    _       = require('underscore');

var serverUpJob = function (job, servers) {
    var requests = [];
    _.each(servers || false, function (server, name) {
        requests.push(function (callback) {
            request({
                uri: server.url,
                method: server.method || 'GET',
                timeout: 10 * 1000
            }, function (err, res, body) {
                if (err || server.test && !server.test(res, body)) {
                    if (server.status === 'maybe-down' ||
                        server.status === 'down') {
                        // Well shit
                        server.status = 'down';
                    } else {
                        // current status was 'up' and we might be 'down'
                        server.status = 'maybe-down';
                    }
                } else {
                    server.status = 'up';
                }
                var current = {
                    name: name,
                    status: server.status
                };
                callback(null, current);
            });
        });
    });
    async.parallel(requests, function (error, servers) {
        servers_up = _(servers).filter(function (server) {
            return server.status !== 'down';
        });
        servers_down = _(servers).filter(function (server) {
            return server.status === 'down';
        });
        total_servers = _(servers).size();
        percent_up = Math.floor(_(servers_up).size() / total_servers * 100);

        data = {
            servers_down: servers_down,
            servers_up: servers_up,
            percent_up: percent_up
        };

        job.continue(data);
    });
};

module.exports = serverUpJob;
