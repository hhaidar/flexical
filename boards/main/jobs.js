//
// Jobs (Backend)
//
//


var jenkinsJob  = require('../../jobs/jenkins/jenkins.js');
var serverUpJob = require('../../jobs/servers/servers.js');

var servers     = require('../../servers_config.js');

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
        interval: 60,
        fetch: jenkinsJob
    },

    'production-servers': {
        interval: 60,
        fetch: function(job) { serverUpJob(job, servers.PRODUCTION); }
    },

    'internal-servers': {
        interval: 60,
        fetch: function(job) { serverUpJob(job, servers.INTERNAL); }
    }
};
