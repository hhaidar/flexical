//
// Jobs (Backend)
//
module.exports = {
    'weather': {
        interval: 5,
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
        fetch: function(job) {
            job.continue({
                delays: 'everyday',
                vehicles: ['501', '502', '504']
            });
        }
    },
    'iteration': {
        fetch: function(job) {
            job.continue({
                milestone: '2.24',
                tickets: ['4152', '3781', '4123']
            });
        }
    },
}