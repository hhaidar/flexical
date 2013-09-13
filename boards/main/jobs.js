//
// Jobs (Backend)
//
//


var request = require('request'),
    _       = require('underscore');

module.exports = {
    'weather': {
        interval: 60,
        fetch: function(job) {
            job.continue({
                temperature: 'HOT AS FUCK',
                cloudy: 'YES'
            });
        }
    },
    'servers': {
        interval: 10,
        fetch: function(job) {
            job.continue({
                servers: ['yes']
            });
        }
    },
    'transit': {
        interval: 60,
        fetch: function(job) {
            job.continue({
                delays: 'everyday',
                vehicles: ['501', '502', '504']
            });
        }
    },
    'iteration': {
        interval: 60,
        fetch: function(job) {
            job.continue({
                milestone: '2.24',
                tickets: ['4152', '3781', '4123']
            });
        }
    },
    'jenkins': {
        interval: 5, // for testing
        fetch: function(job) {
            var colormap = {
                'red': 'failure',
                'blue': 'success',
                'white': 'running'
            }
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

        }
    }
};
