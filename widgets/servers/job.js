module.exports = {
    interval: 1,
    fetch: function(job) {
        console.log('got')
        job.continue();
    }
}