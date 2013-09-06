//
// Jobs (Backend)
//
module.exports = {
    'weather': {
        fetch: function(job) {
            console.log('fetched weather')
            job.continue();
        }
    },
    'servers': {
        fetch: function(job) {
            console.log('fetched servers')
            job.continue();
        }
    },
    'transit': {
        fetch: function(job) {
            console.log('fetched transit')
            job.continue();
        }
    },
    'iteration': {
        fetch: function(job) {
            console.log('fetched iteration')
            job.continue();
        }
    },
}