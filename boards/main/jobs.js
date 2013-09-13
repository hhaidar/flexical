var request = require('request')
var settings = require('../../settings')
//
// Jobs (Backend)
//
//

var settings = require('./settings.js');

var jenkinsJob  = require('../../jobs/jenkins/jenkins.js'),
    serverUpJob = require('../../jobs/servers/servers.js');

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
            var job_settings = settings.ITERATION
            var uri = job_settings.data_source.ssl ? 'https' : 'http' +
                      job_settings.data_source.host +
                      job_settings.data_source.file_path
            var options = {
              'method': 'GET',
              'uri': uri,
              'rejectUnauthorized': false,
              'auth': {
                'user': job_settings.user,
                'pass': job_settings.pass
              },
              'json': true
            }
          request.get(options, function (err, res, data) {
              job.continue(data);
          })
        }
    },
    'jenkins': {
        interval: 60,
        fetch: jenkinsJob
    },
    'production-servers': {
        interval: 3,
        fetch: function(job) {
            serverUpJob(job, settings.PRODUCTION);
        }
    },
    'internal-servers': {
        interval: 3,
        fetch: function(job) {
            serverUpJob(job, settings.INTERNAL);
        }
    }
};
